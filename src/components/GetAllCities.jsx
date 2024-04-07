import axios from 'axios';
import  { useEffect, useState } from 'react'
import { BASE_URL } from '../config';

const getAllCities = ({value,onChange,name}) => {
    const [cities, setCities] = useState([]);
    useEffect(() => {
    axios.get(`${BASE_URL}/cities`)
    .then(response => {
        setCities(response.data.data);
    })
    .catch(error => {
        console.error('Error fetching cities:', error);
    });
    }, []);
  return (
    <>
        <select name={name} value={value} onChange={onChange}>
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
    </>
  )
}

export default getAllCities