import { Snackbar } from '@mui/material';
import React from 'react';
import useStore from '../../store';

const SnackBarManager = () => {
  const { toasterMsg, setToasterMsg } = useStore();
  return (
    <Snackbar
      message={toasterMsg}
      open={!!toasterMsg}
      autoHideDuration={5000}
      onClose={() => setToasterMsg('')}
    />
  );
};

export default SnackBarManager;
