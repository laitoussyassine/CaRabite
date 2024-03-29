import React from 'react'
import { useSelector } from 'react-redux';
import { parseJwt } from '../function/decodedToken';

const MechanicDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const mechanicInfo = parseJwt(user);
  console.log(mechanicInfo);
  return (
    <div>hello {mechanicInfo.name}</div>  
  )
}

export default MechanicDashboard