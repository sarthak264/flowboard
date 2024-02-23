import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { colors } from '../../theme';
import { useState } from 'react';
import useApp from '../../hooks/useApp';

const CreateBoardModal = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);

  const { createBoard } = useApp();

  const handleCreate = async () => {
    try {
      setLoading(true);
      await createBoard({ name, color });
      closeModal();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog open fullWidth maxWidth='xs' onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader title='Create Board' closeModal={closeModal} />
        <Stack my={5} spacing={3}>
          <TextField
            label='Board name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Stack direction='row' spacing={1.5}>
            <Typography>Color: </Typography>
            {colors.map((clr, ind) => (
              <Box
                sx={{
                  cursor: 'pointer',
                  border: color === ind ? '3px solid #383838' : 'none',
                  outline: color === ind ? `2px solid ${clr}` : 'none',
                }}
                height={25}
                width={25}
                borderRadius='50%'
                bgcolor={clr}
                key={clr}
                onClick={() => setColor(ind)}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          variant='contained'
          size='large'
          disabled={loading}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
