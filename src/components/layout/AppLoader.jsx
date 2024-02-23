import { Stack, CircularProgress } from '@mui/material';

const AppLoader = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{ height: '100vh' }}
      bgcolor='#1D1F26'
    >
      <CircularProgress />
    </Stack>
  );
};

export default AppLoader;
