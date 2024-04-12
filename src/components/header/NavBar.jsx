import  {useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearMessage } from "../../store/features/auth/authSlice.js";
import { logout } from "../../store/features/auth/authAction.js";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const { logOutMessage,loggedOut,user } = useSelector((state) => state.auth);

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout());
  }

  useEffect(() => {
    if (loggedOut) {
      navigate('/login');
      toast(logOutMessage, {
        duration: 2000
      })
      dispatch(clearMessage());
    }
  }, [logOutMessage,loggedOut])
  return (
    <>
      <nav className="flex flex-wrap items-center md:justify-around justify-between p-3 bg-slate-100">
        <h2 className='text-mainColoe font-bold text-xl'><Link to={'/'}>CaRabite</Link></h2>
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            {menuOpen ? (
              <img className="block toggle" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" alt="Close" />
            ) : (
              <img className="block toggle" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" alt="Menu" />
            )}
          </button>
        </div>
        <div className={`${menuOpen ? 'flex flex-col' : 'hidden'} w-full md:w-auto md:flex flex-row text-left font-semibold mt-5 md:mt-0`}>
          <Link to={'/'} className="block md:inline-block text-lg text-black hover:text-mainColoe font-semibold px-3 py-3   ">Home</Link>
          <Link to={'/about'} className="block md:inline-block text-lg text-black hover:text-mainColoe font-semibold px-3 py-3   ">About</Link>
          <Link to={'/workshops'} className="block md:inline-block text-lg text-black hover:text-mainColoe font-semibold px-3 py-3   ">Find Workshop</Link>
          <Link to={'/contact'} className="block md:inline-block text-lg text-black hover:text-mainColoe font-semibold px-3 py-3   ">Contact</Link>
        </div>
        <div className={`${menuOpen ? 'flex flex-col gap-4' : 'hidden'} w-full md:w-auto md:flex gap-1`}>
          <Link to="/login" className={`toggle ${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto px-4 py-2 text-right bg-mainColoe font-mono hover:bg-blue-500 text-white `}>Login</Link>
          <Link to="/register" className={`toggle ${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto px-4 py-2 text-right bg-mainColoe font-mono hover:bg-blue-500 text-white `}>Register</Link>
          {user && <button onClick={logoutHandler} className={`toggle ${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto px-4 py-2 text-right bg-btnbg font-mono hover:bg-blue-500 text-white md:rounded`}>Logout</button>}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
