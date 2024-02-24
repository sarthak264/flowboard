import {
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Task from './Task';
import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import StrictModeDroppable from '../../components/utils/StrictModeDroppable';

const BoardTab = ({
  name,
  tasks,
  openAddTaskModal,
  openShiftTaskModal,
  status,
  removeTask,
}) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  return (
    <StrictModeDroppable droppableId={status}>
      {(provided) => (
        <Grid
          {...provided.droppableProps}
          ref={provided.innerRef}
          item
          xs={12}
          sm={4}
        >
          <Stack p={3} bgcolor='black'>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h6' fontWeight='400'>
                {name}
              </Typography>
              <IconButton onClick={() => openAddTaskModal(status)}>
                <AddIcon fontSize='small' />
              </IconButton>
            </Stack>
            <Stack mt={3} spacing={2}>
              {tasks.map((task, i) => (
                <Task
                  onClick={
                    isXs
                      ? () =>
                          openShiftTaskModal({
                            text: task.text,
                            index: i,
                            status: status,
                          })
                      : null
                  }
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  removeTask={() => removeTask(status, task.id)}
                  index={i}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </StrictModeDroppable>
  );
};

export default memo(BoardTab);
