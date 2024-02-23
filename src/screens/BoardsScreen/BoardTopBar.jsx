import { AppBar, Button, Stack, Toolbar } from '@mui/material';
import LogoImg from '../../assets/logo.svg';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import ImageEl from '../../components/utils/ImageEl';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const BoardTopBar = ({ openModal }) => {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ImageEl src={LogoImg} sx={{ height: '25px' }} alt='logo img' />
        <Stack direction='row' alignItems='center' gap={2}>
          <Button variant='contained' onClick={openModal}>
            Create board
          </Button>
          <Button
            color='inherit'
            startIcon={<LogoutIcon />}
            onClick={() => signOut(auth)}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
