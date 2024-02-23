import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

const useApp = () => {
  const { boards, setBoards, addBoard, setToasterMsg } = useStore();
  const navigate = useNavigate();

  const {
    currentUser: { uid },
  } = getAuth();
  const boardsRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardsRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString('en-US'),
        id: doc.id,
      });
    } catch (err) {
      setToasterMsg('Error creating board');
      throw err;
    }
  };

  const deleteBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boards/${boardId}`);
    try {
      await deleteDoc(docRef);
      const tBoards = boards.filter((board) => board.id !== boardId);
      setBoards(tBoards);
      navigate('/boards');
    } catch (err) {
      setToasterMsg('Error deleting the board');
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (err) {
      setToasterMsg('Error updating board');
      throw err;
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.exists) {
        return docSnapShot.data();
      } else return null;
    } catch (err) {
      setToasterMsg('Error fetching board');
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString('en-US'),
      }));
      console.log(boards);
      setBoards(boards);
    } catch (err) {
      setToasterMsg('Error fetching boards');
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, deleteBoard, fetchBoard, fetchBoards, updateBoardData };
};

export default useApp;
