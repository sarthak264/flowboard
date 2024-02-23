import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BoardTopBar from './BoardTopBar';
import Apploader from '../../components/layout/AppLoader';
import BoardInterface from './BoardInterface';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../store';
import useApp from '../../hooks/useApp';
import BoardNotReady from './BoardNotReady';

const BoardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { boardId } = useParams();
  const { boards, areBoardsFetched } = useStore();
  const { fetchBoard, deleteBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id == boardId));
  const boardData = useMemo(() => data, [data]);

  const navigate = useNavigate();

  const handleUpdateLastUpdate = useCallback(
    () => setLastUpdated(new Date().toLocaleString('en-US')),
    []
  );

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setLastUpdated(lastUpdated.toDate().toLocaleString('en-US'));
        setData(tabs);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm('Do you want to delete this board?')) return;
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate('/boards');
    else handleFetchBoard();
  }, []);

  if (!board) return null;
  if (loading) return <Apploader />;
  if (!data) return <BoardNotReady />;

  return (
    <>
      <BoardTopBar
        name={board.name}
        lastUpdated={lastUpdated}
        color={board.color}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdate}
      />
    </>
  );
};

export default BoardScreen;
