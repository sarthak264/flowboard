import { Grid, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Task from './Task';
import { memo } from 'react';

const BoardTab = ({ name, tasks, openAddTaskModal, status, removeTask }) => {
  return (
    <Grid item xs={4}>
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
          {tasks.map((task) => (
            <Task
              key={task.id}
              text={task.text}
              id={task.id}
              removeTask={() => removeTask(status, task.id)}
            />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(BoardTab);
