import { useState } from 'react';
import BoardTopBar from './BoardTopBar';
import CreateBoardModal from './CreateBoardModal';
import NoBoards from './NoBoards';
import { Grid, Stack } from '@mui/material';
import BoardCard from './BoardCard';
import { useEffect } from 'react';
import useApp from '../../hooks/useApp';
import AppLoader from '../../components/layout/AppLoader';
import useStore from '../../store';

const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { fetchBoards } = useApp();
  const { areBoardsFetched, boards } = useStore();

  useEffect(() => {
    if (!areBoardsFetched) {
      fetchBoards(setLoading);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <AppLoader />;

  return (
    <>
      <BoardTopBar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      {/* <NoBoards /> */}
      <Stack mt={5} px={3}>
        <Grid container spacing={4}>
          {boards.map((board) => (
            <BoardCard key={board.id} {...board} />
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default BoardsScreen;
