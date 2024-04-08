import React from 'react'

const WorkShopInput = ({name, type, placeholder, onClick, value}) => {
  return (
    
        <>
            <input type={type} name={name} placeholder={placeholder} onClick={onClick} value={value} {...props} />
        </>
  )
}

export default WorkShopInput;