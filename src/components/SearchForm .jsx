// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SearchForm = ({ handleSearch }) => {
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedServices, setSelectedServices] = useState([]);

//   useEffect(() => {
//     // Fetch list of cities from the backend
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/cities`);
//         setCities(response.data.data);
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   const handleServiceChange = (e) => {
//     const serviceName = e.target.value;
//     if (e.target.checked) {
//       setSelectedServices([...selectedServices, serviceName]);
//     } else {
//       setSelectedServices(selectedServices.filter((service) => service !== serviceName));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSearch(selectedCity, selectedServices);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="city">Select City:</label>
//         <select id="city" value={selectedCity} onChange={handleCityChange}>
//           <option value="">-- Select City --</option>
//           {cities.map((city) => (
//             <option key={city._id} value={city._id}>
//               {city.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Choose Services:</label>
//         {services.map((service) => (
//           <div key={service}>
//             <input
//               type="checkbox"
//               id={service}
//               value={service}
//               checked={selectedServices.includes(service)}
//               onChange={handleServiceChange}
//             />
//             <label htmlFor={service}>{service}</label>
//           </div>
//         ))}
//       </div>
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchForm;
