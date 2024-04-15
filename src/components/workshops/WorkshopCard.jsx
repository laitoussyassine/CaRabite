import React from 'react'
import { BsArrowDownRight } from "react-icons/bs";
import { Link } from 'react-router-dom';


const WorkshopCard = ({ workshop }) => {
    const { workshopName, city, address, image } = workshop


    return (

            <div key={workshop._id} className="w-72 lg:col-span-2 col-span-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link to={`/workshop/${workshop._id}`}>
                    <img src={image} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                    <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">{workshopName}</span>
                        <p className="text-lg font-bold text-black truncate block capitalize">{city.name}</p>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-black cursor-auto my-3">{address}</p>
                            <div className="ml-auto">
                                <Link to={`/workshop/${workshop._id}`}>
                                    <BsArrowDownRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>        
   
  )
}

export default WorkshopCard