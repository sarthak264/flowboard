import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  toasterMsg: '',
  setToasterMsg: (toasterMsg) => set({ toasterMsg }, false, 'setToasterMsg'),
  boards: [],
  areBoardsFetched: false,
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, 'setBoards'),
  addBoard: (board) =>
    set((old) => ({ boards: [board, ...old.boards] }), false, 'addBoard'),
  setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      'setLoginStatus'
    ),
});

const useStore = create(devtools(store));

export default useStore;
