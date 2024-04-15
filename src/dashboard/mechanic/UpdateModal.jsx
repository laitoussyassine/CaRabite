import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateWorkshop } from '../../store/features/workshop/workshopAction.js';
import GetAllCities from '../../components/GetAllCities';
import { Textarea } from '@/components/ui/textarea.jsx';
import { convertTobase64 } from '../../utils/convertTobase64.js';
import Input from '@/components/fields/Input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { MdDelete } from 'react-icons/md';
import { FaCalendarDays } from 'react-icons/fa6';

const UpdateModal = ({ isOpen, onClose, workshop }) => {
    const [workshopData, setWorkshopData] = useState({
        workshopName: '',
        city: '',
        address: '',
        mobile: '',
        services: [],
        workshopDescription: '',
        timeSlots: [], // Initialize timeSlots as an empty array
        image: null
    });

    useEffect(() => {
        if (isOpen && workshop) {
            const {
                workshopName,
                city,
                address,
                mobile,
                services,
                workshopDescription,
                timeSlots
            } = workshop;
            
            let parsedTimeSlots = [];
            try {
                parsedTimeSlots = JSON.parse(timeSlots); // Attempt to parse the timeSlots string
            } catch (error) {
                console.error('Error parsing timeSlots:', error);
            }
    
            const mappedTimeSlots = parsedTimeSlots.map(slot => ({
                day: slot.day,
                startingTime: slot.startingTime,
                endingTime: slot.endingTime
            }));
    
            setWorkshopData({
                workshopName,
                city: city.name,
                address,
                mobile,
                services,
                workshopDescription,
                timeSlots: mappedTimeSlots,
                image: null
            });
        }
    }, [isOpen, workshop]);
    

    const handleCloseModal = () => {
        onClose();
    };

    const handleTimeSlotChange = (event, index) => {
        const { name, value } = event.target;

        setWorkshopData(prevData => {
            const updatedTimeSlots = [...prevData.timeSlots];
            updatedTimeSlots[index][name] = value;
            return { ...prevData, timeSlots: updatedTimeSlots };
        });
    };

    const addTimeSlot = () => {
        setWorkshopData(prevData => ({
            ...prevData,
            timeSlots: [...prevData.timeSlots, { day: '', startingTime: '', endingTime: '' }]
        }));
    };

    const deleteTimeSlot = (index) => {
        setWorkshopData(prevData => ({
            ...prevData,
            timeSlots: prevData.timeSlots.filter((_, i) => i !== index)
        }));
    };

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWorkshopData = {
            workshopName: workshopData.workshopName,
            city: workshopData.city,
            address: workshopData.address,
            mobile: workshopData.mobile,
            services: workshopData.services,
            workshopDescription: workshopData.workshopDescription,
            timeSlots: workshopData.timeSlots,
            image: workshopData.image
        };

        try {
            await dispatch(updateWorkshop({ id: workshop.id, data: updatedWorkshopData }));
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error('Failed to update workshop:', error);
        }
    };

    const services = ['Mechanic', 'Car Wash', 'Oil Change', 'Tire Rotation'];
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
            <div className="bg-white px-10 py-6 rounded-lg shadow-xl w-full max-w-lg mx-auto my-28 max-h-[500px] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Update Workshop</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex justify-between gap-5 mb-5">
                        {/* Input fields */}
                        <Input
                            type="text"
                            name="workshopName"
                            placeholder="Workshop Name"
                            value={workshopData.workshopName}
                            onChange={(e) => setWorkshopData({ ...workshopData, workshopName: e.target.value })}
                        />
                        <GetAllCities
                            className="w-44 border-slate-300 rounded-md h-9 drop-shadow-sm py-0"
                            name="city"
                            value={workshopData.city}
                            onChange={(e) => setWorkshopData({ ...workshopData, city: e.target.value })}
                        />
                    </div>
                    {/* Additional input fields */}
                    <Textarea
                        className="w-full mb-4"
                        name="workshopDescription"
                        placeholder="Workshop Description"
                        value={workshopData.workshopDescription}
                        onChange={(e) => setWorkshopData({ ...workshopData, workshopDescription: e.target.value })}
                    />
                    <div>
                        <p>Select Services:</p>
                        {/* Render services checkboxes */}
                        {services.map((service, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name={`service-${index}`}
                                    value={service}
                                    checked={workshopData.services.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                />
                                <span className="ml-2">{service}</span>
                            </label>
                        ))}
                    </div>
                    <div className='mb-5 w-full'>
                        {workshopData.timeSlots.map((item, index) => (
                            <div key={index} className="md:flex mb-5 justify-between">
                                <div>
                                    <p>Jour*</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        className="border-slate-300 rounded-md h-9 drop-shadow-sm py-0"
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    >
                                        <option value="">Select</option>
                                        <option value="lundi">Lundi</option>
                                        <option value="mardi">Mardi</option>
                                        <option value="mercredi">Mercredi</option>
                                        <option value="jeudi">Jeudi</option>
                                        <option value="vendredi">Vendredi</option>
                                        <option value="samedi">Samedi</option>
                                        <option value="dimanche">Dimanche</option>
                                    </select>
                                </div>
                                <div>
                                    <p>ouverture*</p>
                                    <Input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p>fermeture*</p>
                                    <Input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        onChange={(e) => handleTimeSlotChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <Button className="bg-red-600" onClick={() => deleteTimeSlot(index)}>
                                        <MdDelete />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Button className="mb-5" onClick={addTimeSlot}>
                            <span className="mr-2">Add Time Slot</span>
                            <FaCalendarDays />
                        </Button>
                    </div>
                    {/* Additional elements for image upload */}
                    <div className="flex justify-between items-center">
                        <Button
                            type="submit"
                            className="bg-mainColoe px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Update Workshop
                        </Button>
                        <Button className="bg-red-600" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateModal;
