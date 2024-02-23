import { Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';
import useStore from '../../store';
import { DragDropContext } from 'react-beautiful-dnd';
import AppLoader from '../../components/layout/AppLoader';

const statusMap = {
  todos: 'Todos',
  inProgress: 'In Progress',
  completed: 'Completed',
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));

  const { updateBoardData } = useApp();
  const { setToasterMsg } = useStore();
  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );

  const handleUpdateBoardData = async (clonedTabs) => {
    await updateBoardData(boardId, clonedTabs);
    setTabs(clonedTabs);
    setAddTaskTo('');
    updateLastUpdated();
    setToasterMsg('Board updated!')
  };

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToasterMsg('Task cannot be empty!');
    const clonedTabs = structuredClone(tabs);
    clonedTabs[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    setLoading(true);
    try {
      await handleUpdateBoardData(clonedTabs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const clonedTabs = structuredClone(tabs);
      const taskIndex = clonedTabs[tab].findIndex((t) => t.id === taskId);
      clonedTabs[tab].splice(taskIndex, 1);
      try {
        await handleUpdateBoardData(clonedTabs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleDnd = async ({ destination, source }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    const clonedTabs = structuredClone(tabs);

    const [draggedTask] = clonedTabs[source.droppableId].splice(
      source.index,
      1
    );
    clonedTabs[destination.droppableId].splice(
      destination.index,
      0,
      draggedTask
    );
    try {
      await handleUpdateBoardData(clonedTabs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AppLoader />;
  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo('')}
          addTask={handleAddTask}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              name={statusMap[status]}
              tasks={tabs[status]}
              status={status}
              openAddTaskModal={handleOpenAddTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
