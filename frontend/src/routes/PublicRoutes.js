import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSelector } from '../store/reducers/authSlice';


const PublicRoutes = () => {
    const auth = useSelector(authSelector);
    // console.log(auth);
    const isAuthenticated = auth.isAuth;
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}


export default PublicRoutes;