import { Grid, IconButton, Stack, Typography } from '@mui/material';
import OpenIcon from '@mui/icons-material/Launch';
import { colors } from '../../theme';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ name, color, createdAt, id }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={3}>
      <Stack
        borderLeft='5px solid'
        borderColor={colors[color]}
        p={2}
        bgcolor='background.paper'
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography
            variant='h6'
            fontWeight='400'
            width='60%'
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {name}
          </Typography>
          <IconButton size='small' onClick={() => navigate(`/boards/${id}`)}>
            <OpenIcon />
          </IconButton>
        </Stack>
        <Typography variant='caption'>Created at: {createdAt}</Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;
