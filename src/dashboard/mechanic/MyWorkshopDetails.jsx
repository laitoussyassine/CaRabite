import convertTime from '@/utils/convertTime.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { OwnerWorkshopDetails } from '../../store/features/workshop/workshopAction.js';

const MyWorkshopDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { workshop, loading, error } = useSelector((state) => state.workshops); // Include selectedWorkshop from state


    useEffect(() => {
        dispatch(OwnerWorkshopDetails(id));
    }, [dispatch, id]);

    

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {loading ? ( 
                <div className='flex justify-center items-center h-screen'>
                    <GridLoader color="#032098" size={15} margin={2} />
                </div>
            ) : workshop ? (
                <section className="overflow-hidden bg-white py-8 sm:py-16 mx-auto">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
                            <div className='lg:col-span-1 col-span-full'>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Owner: {workshop.owner.username}</p>
                                <h2 className="text-base font-semibold leading-7 text-mainColoe"><span className='mr-2 text-gray-950'>Workshop Name:</span> {workshop.workshopName}</h2>
                                <h2 className="text-base font-semibold leading-7 text-mainColoe"><span className='mr-2 text-gray-950'>City:</span> {workshop.city.name}</h2>
                                <h2 className="text-base font-semibold leading-7 text-mainColoe"><span className='mr-2 text-gray-950'>Phone Number:</span> {workshop.mobile}</h2>
                                <h2 className="text-base font-semibold leading-7 text-mainColoe"><span className='mr-2 text-gray-950'>Address:</span> {workshop.address}</h2>
                                <h2 className="text-base font-semibold leading-7 text-mainColoe"><span className='mr-2 text-gray-950'>Description:</span> {workshop.workshopDescription}</h2>
                                <div className="mb-3">
                                    <span className="font-bold text-cardHoverBg dark:text-gray-300">Services:</span>
                                    <div className="flex items-center mt-2">
                                        {workshop.services.map((item, index) => (
                                            <p key={index} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{item}</p>
                                        ))}
                                    </div>
                                </div>
                                {/* Display time slots */}
                                <div className="mt-[30px] bg-white h-fit py-5">
                                    <p className="text_para mt-0 font-bold text-cardHoverBg">
                                        Available Time Slots:
                                    </p>
                                    <ul className="mt-3">
                                        {workshop.timeSlots && JSON.parse(workshop.timeSlots).map((item, index) => (
                                            <li key={index} className="flex items-center justify-between mb-2">
                                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                                                </p>
                                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                                    {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='lg:col-span-1 col-span-full'>
                                {/* Display workshop image */}
                                <img src={workshop.image} alt="Workshop" className="w-[40rem] max-w-none object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
                            </div>
                        </div>
                    </div>
                </section>
            ) : ( // If workshop data is not available
                <p>Workshop not found.</p>
            )}
        </>
    );
};

export default MyWorkshopDetails;
