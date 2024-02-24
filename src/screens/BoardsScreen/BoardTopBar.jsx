import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import LogoImg from '../../assets/logo.svg';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CreateBoardIcon from '@mui/icons-material/AddCircle';
import ImageEl from '../../components/utils/ImageEl';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const BoardTopBar = ({ openModal }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ImageEl src={LogoImg} sx={{ height: '25px' }} alt='logo img' />
        <Stack direction='row' alignItems='center' gap={2}>
          {isXs ? (
            <>
              <IconButton color='primary' onClick={openModal}>
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
