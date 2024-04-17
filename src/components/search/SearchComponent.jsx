import React, { useState } from 'react';

const SearchComponent = () => {
  // State for selected values
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Function to handle search button click
  const handleSearch = () => {
    // Perform search operation based on selected values
    console.log('Searching...');
  };

  return (
    <div className="flex items-center justify-center gap-2 bg-white py-20 w-2/5 mx-auto my-8 -mt-16 mb-8 absolute left-1/2 transform -translate-x-1/2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
  {/* City Select */}
  <select
    className="border border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:ring focus:border-blue-500"
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
  >
    <option value="">City</option>
    {/* Populate options dynamically */}
    {/* Example: <option value="city1">City 1</option> */}
  </select>

  {/* Province Select */}
  <select
    className="border border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:ring focus:border-blue-500"
    value={selectedProvince}
    onChange={(e) => setSelectedProvince(e.target.value)}
  >
    <option value="">Province</option>
    {/* Populate options dynamically */}
    {/* Example: <option value="province1">Province 1</option> */}
  </select>

  {/* Service Select */}
  <select
    className="border border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:ring focus:border-blue-500"
    value={selectedService}
    onChange={(e) => setSelectedService(e.target.value)}
  >
    <option value="">Service</option>
    {/* Populate options dynamically */}
    {/* Example: <option value="service1">Service 1</option> */}
  </select>

  {/* Search Button */}
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
    onClick={handleSearch}
  >
    Search
  </button>
</div>

  );
};

export default SearchComponent;
