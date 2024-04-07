import { BASE_URL } from '../../config.js'
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { convertTobase64 } from '../../utils/convertTobase64.js';
import GetAllCities from '../../components/GetAllCities.jsx';

const Acoount = () => {
  const { user } = useSelector((state) => state.auth);
  const [workshopData, setWorkshopData] = useState({
    workshopName: "",
    city: "",
    address: '',
    mobile: '',
    workshopDescription: '',
    timeSlots: [],
    image: null
  });
  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const base64 = await convertTobase64(file)
    console.log(base64);
    setWorkshopData({ ...workshopData, image: base64 })
  }
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setWorkshopData(prevWorkShopData => {
      const updateItems = [...prevWorkShopData[key]]

      updateItems[index][name] = value;

      return {
        ...prevWorkShopData,
        [key]: updateItems,
      };
    });
  }
 

  const addItem = (key, item) => {
    setWorkshopData(prevWorkShopData => ({
      ...prevWorkShopData,
      [key]: [...prevWorkShopData[key], item]
    }))
  }
  const deleteItem = (key, index) => {
    setWorkshopData(prevWorkShopData => ({
      ...prevWorkShopData,
      [key]: prevWorkShopData[key].filter((_, i) => i !== index)
    }))
  }
  const addTimeSlot = e => {
    e.preventDefault();
    addItem("timeSlots", { day: "Lundi", startingTime: "10:00", endingTime: "4:30" });
  }

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };
  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index)
  }


  const handleInputChange = (e) => {
    setWorkshopData({ ...workshopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append('workshopName', workshopData.workshopName);
      formData.append('city', workshopData.city);
      formData.append('address', workshopData.address);
      formData.append('mobile', workshopData.mobile);
      formData.append('workshopDescription', workshopData.workshopDescription);
      formData.append('timeSlots', JSON.stringify(workshopData.timeSlots)); // Convert array to string
      formData.append('image', workshopData.image);

      const response = await axios.post(`${BASE_URL}/workshops`, formData, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${user}`, // Include authorization token
        },
      });
      console.log('Workshop created successfully:', response.data);
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
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
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto mx-5">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
          <p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="workshopName"
            placeholder="WorkshopName"
            value={workshopData.workshopName}
            onChange={handleInputChange}
          />
          <GetAllCities name="city" value={workshopData.city} onChange={handleInputChange} />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={workshopData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={workshopData.mobile}
            onChange={handleInputChange}
          />
          <textarea
            name="workshopDescription"
            placeholder="Workshop Description"
            value={workshopData.workshopDescription}
            onChange={handleInputChange}
          />

          <div className='mb-5 w-2/4'>
            {workshopData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-3'>
                  <div>
                    <p className="form_label">Jour*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="forminput py-3.5"
                      onChange={e => handleTimeSlotChange(e, index)}>
                      <option value="">Select</option>
                      <option value="lundi">Lundi</option>
                      <option value="mardi">Mardi</option>
                      <option value="mercredi">Mercredi</option>
                      <option value="jeudi">Jeudi</option>
                      <option value="vendredi">Vendredi</option>
                      <option value="semdi">Samedi</option>
                      <option value="dimench">Dimench</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">heures d'ouverture*</p>
                    <input
                      type='time'
                      name={item.startingTime}
                      className="form_input"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">heures de fermeture*</p>
                    <input
                      type='time'
                      name={item.endingTime}
                      className="form_input"
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                </div>
                <div className='flex items-center'>
                  <button className='bg-red-600' onClick={e => deleteTimeSlots(e, index)}>supprimer </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button className='bg-blue-600' onClick={addTimeSlot}>Ajouter houraires</button>
          </div>
          <input type="file" name="image" accept=".jpeg, .png, .jpg" onChange={handleFileInputChange} />
          <button type="submit">Add Workshop</button>
        </form>
        <div className='grid grid-cols-3'>
          {
            ownerWorkshop.map((workshop,index) => (

            <div key={index} className='lg:col-span-1 col-span-full'>
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
                <img src={workshop.image} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{workshop.city.name}</h3>
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{workshop.workshopName}</div>
              </article>
            </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Acoount