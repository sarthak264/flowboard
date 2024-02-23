import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme';
import { memo } from 'react';

const BoardTopBar = ({ name, lastUpdated, color, deleteBoard }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position='static'
      sx={{ borderBottom: '5px solid', borderColor: colors[color] }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction='row' alignItems='center' gap={1}>
          <IconButton onClick={() => navigate('/boards')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6'>{name}</Typography>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2}>
          <Typography variant='body2'>Last updated: {lastUpdated}</Typography>
          <IconButton onClick={deleteBoard}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(BoardTopBar);
