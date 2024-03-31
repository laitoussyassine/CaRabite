import React, { useEffect, useState } from 'react'
import { parseJwt } from '../function/decodedToken';

const MechanicDashboard = () => {
  const [mechanicInfo, setMechanicInfo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setMechanicInfo(parseJwt(token)); 
  }, []); 

  const {name} = mechanicInfo
  return (
    <div>hello {name}</div>  
  )
}

export default MechanicDashboard