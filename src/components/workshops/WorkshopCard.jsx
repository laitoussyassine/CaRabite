import React from 'react'

const WorkshopCard = ({workshop}) => {
    const {workshopName, city, address, image} = workshop
    
    
  return (
    
        
            
                <div key={workshop._id} className='p-3 lg:col-span-2 md:col-span-2 sm:col-span-full'>
                    <div>
                        <img src={image} className="w-2/4" alt="" />
                    </div>
                    <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 ☐ text-headingColor font-[700] mt-3 lg:mt-5">
                        {workshopName}
                    </h2>
                    <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 ☐ text-headingColor font-[700] mt-3 lg:mt-5">
                        {city.name}
                    </h2>
                    <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 ☐ text-headingColor font-[700] mt-3 lg:mt-5">
                        {address}
                    </h2>
                </div>
        
   
  )
}

export default WorkshopCard