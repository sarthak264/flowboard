import { Button, Chip, Dialog, Stack, Typography } from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { statusMap } from './BoardInterface';
import { useState } from 'react';

const ShiftTaskModal = ({ task, onClose, shiftTask }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  return (
    <Dialog open fullWidth maxWidth='xs'>
      <Stack p={2}>
        <ModalHeader title='Shift task' closeModal={onClose} />
        <Stack my={3} spacing={3}>
          <Stack spacing={1}>
            <Typography>Task:</Typography>
            <Typography p={1.5} bgcolor='#45474e'>
              {task.text}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography>Status:</Typography>
            <Stack direction='row' spacing={1}>
              {Object.entries(statusMap).map(([status, label]) => (
                <Chip
                  variant={taskStatus === status ? 'filled' : 'outlined'}
                  label={status}
                  key={label}
                  onClick={() => setTaskStatus(status)}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button variant='contained' onClick={() => shiftTask(taskStatus)}>
          Shift Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;
