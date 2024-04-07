
import {BASE_URL} from '../../config.js'
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import uploadImageCloudinary from '../../utils/uploadCloudinary.js';

const WorkshopModal = ({ isOpen, onRequestClose }) => {
    const token = localStorage.getItem('token');
    const [workshopData, setWorkshopData] = useState({
        workshopName: '',
        city: '',
        address: '',
        mobile: '',
        workshopDescription: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const cities = ['Agadir', 'Casablanca', 'Rabat', 'Tanger', 'Marrakech'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkshopData({ ...workshopData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = setSelectedFile(e.target.files[0]);
        console.log(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloaddend = () => {
            setImage(reader.result)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('workshopName', workshopData.workshopName);
            formData.append('city', workshopData.city);
            formData.append('address', workshopData.address);
            formData.append('mobile', workshopData.mobile);
            formData.append('workshopDescription', workshopData.workshopDescription);
            formData.append('image', selectedFile);

            const response = await axios.post(`${BASE_URL}/workshops`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Workshop created successfully:', response.data);
            // Handle success - close modal, show a success message, etc.
            onRequestClose();
        } catch (error) {
            console.error('Error creating workshop:', error.response.data);
            // Handle error - display an error message to the user
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Create Workshop</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="workshopName"
                    placeholder="Workshop Name"
                    value={workshopData.workshopName}
                    onChange={handleChange}
                />
                <select name="city" value={workshopData.city} onChange={handleChange}>
                    <option value="">Select a City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={workshopData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={workshopData.mobile}
                    onChange={handleChange}
                />
                <textarea
                    name="workshopDescription"
                    placeholder="Workshop Description"
                    value={workshopData.workshopDescription}
                    onChange={handleChange}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Add Workshop</button>
                <button onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default WorkshopModal;
