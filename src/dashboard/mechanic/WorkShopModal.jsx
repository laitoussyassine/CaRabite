import Modal from 'react-modal';
import { BASE_URL } from '../../config.js'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { convertTobase64 } from '../../utils/convertTobase64.js';
import GetAllCities from '../../components/GetAllCities.jsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { MdDelete } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaCalendarDays } from "react-icons/fa6";
import { GridLoader } from 'react-spinners';

const WorkshopModal = ({ isOpen, onClose, setCreated }) => {
  const handleCloseModal = () => {
    onClose();
  };
  const { user } = useSelector((state) => state.auth);
  const [workshopData, setWorkshopData] = useState({
    workshopName: "",
    city: "",
    address: '',
    mobile: '',
    services: [],
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
 
  const services = ['Mechanic', 'Car Wash', 'Oil Change', 'Tire Rotation'];
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the selected service to the array of services
      setWorkshopData({ ...workshopData, services: [...workshopData.services, value] });
    } else {
      // Remove the deselected service from the array of services
      setWorkshopData({
        ...workshopData,
        services: workshopData.services.filter((service) => service !== value)
      });
    }
  };
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    
    try {
      const formData = new FormData()
      formData.append('workshopName', workshopData.workshopName);
      formData.append('city', workshopData.city);
      formData.append('address', workshopData.address);
      formData.append('mobile', workshopData.mobile);
      formData.append('workshopDescription', workshopData.workshopDescription);
      formData.append('timeSlots', JSON.stringify(workshopData.timeSlots)); // Convert array to string
      formData.append('services', JSON.stringify(workshopData.services)); // Convert array to string
      formData.append('image', workshopData.image);

      const response = await axios.post(`${BASE_URL}/workshops`, formData, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${user}`, // Include authorization token
        },
      });
      console.log('Workshop created successfully:', response.data);
      setWorkshopData({
        workshopName: "",
        city: "",
        address: "",
        mobile: "",
        services: [],
        workshopDescription: "",
        timeSlots: [],
        image: null,
      });
      setLoading(false);
      setCreated(true);
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="bg-white px-10 py-6 rounded-lg shadow-xl w-full max-w-lg mx-auto my-28 max-h-[500px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create</h2>
        
        {loading ?  
          <div className="flex items-center justify-center">
          <GridLoader color="#032098" size={15} />
        </div>
        : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='flex justify-between gap-5 mb-5'>

            <Input type="text"
              name="workshopName"
              placeholder="WorkshopName"
              value={workshopData.workshopName} onChange={handleInputChange} />
            <GetAllCities className='w-44  border-slate-300 rounded-md h-9 drop-shadow-sm py-0' name="city" value={workshopData.city} onChange={handleInputChange} />
          </div>
          <div className='flex gap-5 mb-5'>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={workshopData.address}
              onChange={handleInputChange}
            />
            <Input
              type="Number"
              name="mobile"
              placeholder="Mobile Number"
              value={workshopData.mobile}
              onChange={handleInputChange}
            />
          </div>
          <Textarea className='w-full mb-4'
            name="workshopDescription"
            placeholder="Workshop Description"
            value={workshopData.workshopDescription}
            onChange={handleInputChange} />
          <div>
            <p>Select Services:</p>
            {services.map((service, index) => (
              <label key={index}>
                <input className='rounded-full'
                  type="checkbox"
                  name="services"
                  value={service}
                  onChange={handleServiceChange}
                  checked={workshopData.services.includes(service)}
                />
                <span className='mr-2'>{service}</span>
                
              </label>
            ))}
          </div>
          <div className='mb-5 w-full'>
            {workshopData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div className='md:flex mb-5 justify-between'>
                  <div className=''>
                    <p className="">Jour*</p>
                    <select
                      name="day"
                      value={item.day}
                      className=" border-slate-300 rounded-md h-9 drop-shadow-sm py-0"
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
                  <div className=''>
                    <p className="">ouverture*</p>
                    <Input
                      type='time'
                      name={item.startingTime}
                      className=""
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div className=''>
                    <p className="">fermeture*</p>
                    <Input
                      type='time'
                      name={item.endingTime}
                      className=""
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>
                </div>
                <div className='flex items-center'>
                  <Button className='bg-red-600' onClick={e => deleteTimeSlots(e, index)}><MdDelete /></Button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button className='mb-5' onClick={addTimeSlot}><span className='mr-2'>Add TimeSlots</span><FaCalendarDays /></Button>
          </div>
          <div className='mb-5'>
            <p className='font-semibolds '>Workshop Image</p>
            <Input type="file" className="py-0" name="image" accept=".jpeg, .png, .jpg" onChange={handleFileInputChange} />
          </div>
          <div className='flex justify-between items-center'>
            <Button type="submit">Create Workshop</Button>
            <Button className="bg-red-600" onClick={handleCloseModal} ><ImCancelCircle /></Button>
          </div>
        </form>

        )
        }
      </div>
    </Modal>
  );
};
export default WorkshopModal;