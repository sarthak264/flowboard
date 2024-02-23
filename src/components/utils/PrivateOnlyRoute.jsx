import { Navigate } from 'react-router-dom';
import useStore from '../../store';

const PrivateOnlyRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();
  return !isLoggedIn ? <Navigate to='/' replace /> : <Component />
};

export default PrivateOnlyRoute;
