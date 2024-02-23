import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalHeader = ({ title, closeModal }) => {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography variant='h6'>{title}</Typography>
      <IconButton size='small' onClick={closeModal}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default ModalHeader;
