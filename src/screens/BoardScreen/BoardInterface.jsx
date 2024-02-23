import { Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';
import useStore from '../../store';

const statusMap = {
  todos: 'Todos',
  inProgress: 'In Progress',
  completed: 'Completed',
};

const BoardInterface = ({ boardData, boardId, handleLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));

  const { updateBoardData } = useApp();
  const { setToasterMsg } = useStore();
  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToasterMsg('Task cannot be empty!');
    const clonedTabs = structuredClone(tabs);
    clonedTabs[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    setLoading(true);
    try {
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs);
      setAddTaskTo('');
      handleLastUpdated();
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
        await updateBoardData(boardId, clonedTabs);
        setTabs(clonedTabs);
        handleLastUpdated();
      } catch (err) {
        console.log(err);
      }
    },
    [tabs]
  );

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo('')}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
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
    </>
  );
};

export default BoardInterface;
