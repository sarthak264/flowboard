import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthScreen from './screens/AuthScreen';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import useStore from './store';
import AppLoader from './components/layout/AppLoader';
import PublicOnlyRoute from './components/utils/PublicOnlyRoute';
import BoardsScreen from './screens/BoardsScreen';
import PrivateOnlyRoute from './components/utils/PrivateOnlyRoute';
import SnackBarManager from './components/layout/SnackBarManager';
import BoardScreen from './screens/BoardScreen';

function App() {
  const { loader, setLoginStatus } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setLoginStatus(!!user);
    });

    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<PublicOnlyRoute Component={AuthScreen} />}
          />
          <Route
            path='/boards'
            element={<PrivateOnlyRoute Component={BoardsScreen} />}
          />
          <Route
            path='/boards/:boardId'
            element={<PrivateOnlyRoute Component={BoardScreen} />}
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
