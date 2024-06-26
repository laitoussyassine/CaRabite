import { BASE_URL } from '../../config.js'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import WorkShopModal from '../../dashboard/mechanic/WorkShopModal';
import { Link } from 'react-router-dom';
import { deleteWorkshop } from '../../store/features/workshop/workshopAction.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GridLoader } from 'react-spinners';
import { logout } from "../../store/features/auth/authAction.js";
import { IoMdLogOut } from "react-icons/io";


const MySwal = withReactContent(Swal);


const Acoount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [created, setCreated] = useState(false);
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout());
  }

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mechanic/profile/me`, {
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




  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [ownerWorkshop, setOwnerWorkshop] = useState([]);
  const getAllWorkshops = useCallback(async () => {
    try {
        setLoad(true);
        const workshops = await axios.get(`${BASE_URL}/workshops`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user}`,
            },
        });
        setOwnerWorkshop(workshops.data.data);
    } catch (error) {
        console.error('Error fetching workshops:', error);
    } finally {
        setLoad(false);
    }
}, [user]);

const handleShowModal = () => {
  setShowModal(true);
  
};

  const handleDelete = (workshopId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this workshop?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWorkshop(workshopId))
          .then(() => {
            MySwal.fire('Deleted!', 'Workshop has been deleted.', 'success');
              getAllWorkshops();
          })
          .catch((error) => {
            console.error('Error deleting workshop:', error);
            MySwal.fire('Error!', 'Failed to delete workshop.', 'error');
          });
      }
    });
  };
  useEffect(() => {
    getAllWorkshops();
  }, []);
  useEffect(() => {
    if(created) {
      getAllWorkshops();
    }
  }, [created]);


  return (
    <div className="flex h-screen bg-gray-100">
      <div className=" md:flex flex-col w-64 bg-cardHoverBg">
        <div className="flex items-center justify-center h-16 bg-cardBg">
          <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-cardHoverBg">
            <a href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Settings
            </a>
            {user && <button onClick={logoutHandler} className={`flex w-full gap-3 items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 `}>
            <IoMdLogOut size={20} />
              Logout
            </button>}
          </nav>
        </div>
      </div>

      <WorkShopModal setCreated={setCreated} isOpen={showModal} onClose={handleCloseModal} />
      <div className="flex flex-col flex-1 overflow-y-auto mx-5">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-mainColoe"><span className='text-black'>Welcome</span> {loading ? "" : userInfo.username} !</h1>
        </div>
        <div className='mx-5'>
          <Button
            onClick={handleShowModal}
            className=" text-white py-2 px-4 rounded-md hover:bg-btnbg transition duration-300">
            Create Your Workshop
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-10">
                    {load ? ( // Display loading spinner if loading is true
                        <div className="col-span-full flex justify-center items-center">
                            <GridLoader color="#032098" size={15} margin={2} />
                        </div>
                    ) : (
                        ownerWorkshop.map((workshop) => (
                            <div key={workshop._id} className="lg:col-span-1 col-span-full gap-5">
                                <div className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center mb-7">
                                    <img
                                        src={workshop.image}
                                        className="shadow rounded-lg overflow-hidden border h-32 w-40 object-cover"
                                        alt="Workshop Image"
                                    />
                                    <div className="mt-8">
                                        <h4 className="font-bold text-xl">{workshop.workshopName}</h4>
                                        <p className="mt-2 text-gray-600">{workshop.address}</p>
                                        <div className="mt-5 flex gap-3">
                                            <Link
                                                to={`/myWorkshop/${workshop._id}`}
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-mainColoe px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                                            >
                                                View
                                            </Link>
                                            <Button
                                                type="button"
                                                onClick={() => handleDelete(workshop._id)}
                                                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
      </div>

    </div>
  )
}

export default Acoount