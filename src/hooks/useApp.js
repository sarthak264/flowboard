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
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import useStore from '../store';

const useApp = () => {
  const { setBoards, addBoard } = useStore();

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
      console.log(err);
      throw err;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
      throw err;
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoard, fetchBoards, updateBoardData };
};

export default useApp;
