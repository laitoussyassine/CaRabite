import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WorkshopUpdateModal = ({ isOpen, onClose, initialWorkshop }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [workshopData, setWorkshopData] = useState({
    workshopName: '',
    city: '',
    address: '',
    mobile: '',
    services: [],
    workshopDescription: '',
    timeSlots: [],
    image: null
  });

  useEffect(() => {
    if (initialWorkshop) {
      setWorkshopData({
        ...initialWorkshop
      });
    }
  }, [initialWorkshop]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData({ ...workshopData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        updateWorkshopById({
          id: workshopData._id, // Provide the workshop ID to update
          updateData: workshopData,
          token: user // Pass the user token for authorization
        })
      );

      console.log('Workshop updated successfully:', response.payload);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating workshop:', error);
      // Handle error state or display error message
    }
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="bg-white px-10 py-6 rounded-lg shadow-xl w-full max-w-lg mx-auto my-28 max-h-[500px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Update Workshop</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Input
            type="text"
            name="workshopName"
            placeholder="Workshop Name"
            value={workshopData.workshopName}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="city"
            placeholder="City"
            value={workshopData.city}
            onChange={handleInputChange}
          />

          <Textarea
            name="workshopDescription"
            placeholder="Workshop Description"
            value={workshopData.workshopDescription}
            onChange={handleInputChange}
          />

          {/* Additional form fields for address, mobile, services, etc. */}
          
          <div className="flex justify-between items-center">
            <Button type="submit">Update Workshop</Button>
            <Button className="bg-red-600" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WorkshopUpdateModal;
