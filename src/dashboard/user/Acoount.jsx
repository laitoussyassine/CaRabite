import { logout } from "../../store/features/auth/authAction.js";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/profile/me`, {
          headers: {
            'Authorization': `Bearer ${user}`
          }
        });
        setUserInfo(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="md:flex flex-col w-64 bg-cardHoverBg">
        <div className="flex items-center justify-center h-16 bg-cardBg">
          <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-cardHoverBg">
            <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Settings
            </a>
            {user && (
              <button onClick={logoutHandler} className="flex w-full gap-3 items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <IoMdLogOut size={20} />
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {loading ? (
          <p>Loading user profile...</p>
        ) : error ? (
          <p>Error loading user profile: {error}</p>
        ) : (
          userInfo && (
            <>
              <h1 className="text-2xl font-bold">Welcome {userInfo.username}!</h1>
              {/* Display other user profile information here */}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Account;
