import React, { useEffect } from 'react'
import { useState } from 'react';
import {parseJwt} from '../function/decodedToken.js'

const CarOwnerProfile = () => {

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserInfo(parseJwt(token)); 
  }, []); 

  const {name, email} =  userInfo;


  return (
    <div>
        <h1>hello Mr: {name}</h1>
        <h1>your Email: {email}</h1>
    </div>
  )
}

export default CarOwnerProfile