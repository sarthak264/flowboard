import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import LogoImg from '../../assets/logo.svg';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import useStore from '../../store';

const initForm = {
  email: '',
  password: '',
};

const AuthScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);

  const { setToasterMsg } = useStore();

  const authText = isLogin
    ? 'Do not have an account?'
    : 'Already have an account?';

  const handleForm = (e) => {
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      const err_msg = err.code.split('auth/')[1].split('-').join(' ');
      setToasterMsg(err_msg);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='xs' sx={{ mt: 10 }}>
      <Stack alignItems='center' textAlign='center' gap={4} mb={6}>
        <img src={LogoImg} alt='Flowboard logo' />
        <Typography color='rgba(255,255,255,0.6)'>
          Visualize Your Workflow for Increased Productivity.
          <br />
          Access Your Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack gap={2}>
        <TextField
          name='email'
          label='Email'
          value={form.email}
          onChange={handleForm}
        />
        <TextField
          name='password'
          label='Password'
          value={form.password}
          onChange={handleForm}
          type='password'
        />
        <Button
          variant='contained'
          size='large'
          onClick={(e) => handleAuth(e)}
          disabled={!form.email.trim() || !form.password.trim() || loading}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </Stack>
      <Typography
        textAlign='center'
        mt={3}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => {
          setIsLogin((o) => !o);
        }}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
