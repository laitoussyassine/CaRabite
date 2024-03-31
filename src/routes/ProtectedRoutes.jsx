import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
const ProtectedRoutes = ({ children, allowedRole }) => {

    const { user,role } = useSelector((state) => state.auth);
    console.log(user,role);
    const isAllowed = allowedRole.includes(role);
    const accessRoute = user && isAllowed ? children : <Navigate to='/login' />;
    return accessRoute;
}
export default ProtectedRoutes