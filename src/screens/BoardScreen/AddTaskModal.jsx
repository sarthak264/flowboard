import {
  Dialog,
  Typography,
  Stack,
  Chip,
  OutlinedInput,
  Button,
} from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { useState } from 'react';

const AddTaskModal = ({ tabName, onClose, addTask }) => {
  const [text, setText] = useState('');
  return (
    <Dialog open fullWidth maxWidth='xs' onClose={onClose}>
      <Stack p={2}>
        <ModalHeader title='Add task' closeModal={onClose} />
        <Stack spacing={2} mt={3}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>Status:</Typography>
            <Chip label={tabName} size='small' />
          </Stack>
          <OutlinedInput
            placeholder='Task'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant='contained' onClick={() => addTask(text)}>
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
