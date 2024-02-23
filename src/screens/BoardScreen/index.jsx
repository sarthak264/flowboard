import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BoardTopBar from './BoardTopBar';
import Apploader from '../../components/layout/AppLoader';
import BoardInterface from './BoardInterface';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../store';
import useApp from '../../hooks/useApp';

const BoardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { boardId } = useParams();
  const { boards, areBoardsFetched } = useStore();
  const { fetchBoard } = useApp();
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

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate('/boards');
    else handleFetchBoard();
  }, []);

  if (!board) return null;
  if (loading) return <Apploader />;

  return (
    <>
      <BoardTopBar
        name={board.name}
        lastUpdated={lastUpdated}
        color={board.color}
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
