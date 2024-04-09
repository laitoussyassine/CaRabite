import { BASE_URL } from '../../config.js'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import WorkShopModal from '../../dashboard/mechanic/WorkShopModal';


const Acoount = () => {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [ownerWorkshop, setOwnerWorkshop] = useState([]);
  const getAllworkshps = useCallback(async() =>  {
    try {
      const workshops = await axios.get(`${BASE_URL}/workshops`, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${user}`, // Include authorization token
        },
      });
      setOwnerWorkshop(workshops.data.data);
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  })
  useEffect(() => {
    getAllworkshps();
  }, [getAllworkshps]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className=" md:flex flex-col w-64 bg-cardHoverBg">
        <div className="flex items-center justify-center h-16 bg-cardBg">
          <span className="text-white font-bold uppercase">Sidebar</span>
        </div>
        {/* <div className="flex flex-col flex-1 overflow-y-auto">
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
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
              Messages
            </a>
            <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Settings
            </a>
          </nav>
        </div> */}
      </div>
      
      <WorkShopModal isOpen={showModal} onClose={handleCloseModal}/>
      <div className="flex flex-col flex-1 overflow-y-auto mx-5">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
          <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p>
        </div>
        <div className='mx-5'>
          <Button
          onClick={handleShowModal}
          className=" text-white py-2 px-4 rounded-md hover:bg-btnbg transition duration-300">
          Créer Workshop
        </Button>
        </div>
        <div className='grid grid-cols-3'>
          {
            ownerWorkshop.map((workshop,index) => (

            <div key={index} className='lg:col-span-1 col-span-full'>
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
                <img src={workshop.image} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{workshop.city.name}</h3>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{workshop.owner.username}</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{workshop.workshopName}</div>
              </article>
                {
                workshop.timeSlots && JSON.parse(workshop.timeSlots).map((item,index) => (
                  <ul key={index}>
                  <li>
                    <p className='text-black'>Day: {item.day}</p>
                  </li>
                  <li>
                    <p className='text-black'>Ouverture: {item.startingTime}</p>
                  </li>
                  <li>
                    <p className='text-black'>Férmeture: {item.endingTime}</p>
                  </li>
                </ul>
                ))}
                <div>
            Services:
            {workshop.services.map((service, index) => (
              <span key={index}>
                <p>{service}</p>
              </span>
            ))}
          </div>
            </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Acoount