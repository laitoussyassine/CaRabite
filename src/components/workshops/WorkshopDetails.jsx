import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWorkshopById } from '../../store/features/workshop/workshopAction.js';
import convertTime from '@/utils/convertTime.js';

const WorkshopDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { workshop, loading, error } = useSelector((state) => state.workshopDetails);
    console.log(workshop);

    useEffect(() => {
        dispatch(fetchWorkshopById(id));
    }, [dispatch, id]);


    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                {workshop && (
                    <div className=" dark:bg-gray-800 py-16 flex justify-evenly">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row mx-4">
                                <div className="md:flex-1 px-4">
                                    <div className="h-[400px] rounded-lg bg-gray-300 object-cover dark:bg-gray-700 mb-4">
                                        <img src={workshop.image} className="h-full w-full rounded-lg" />
                                    </div>

                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                        {workshop.workshopName}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        <span className="font-bold text-cardHoverBg mr-2 dark:text-gray-300">Adress:</span>
                                        <Link className='text-gray-600 dark:text-gray-300'>{workshop.address}</Link>
                                    </p>
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                            <span className="font-bold text-cardHoverBg mr-2 dark:text-gray-300">ville:</span>
                                            <span className="text-gray-600 dark:text-gray-300">{workshop.city.name}</span>
                                        </div>

                                    </div>

                                    <div className="mb-4">
                                        <span className="font-bold text-cardHoverBg dark:text-gray-300">Services:</span>
                                        <div className="flex items-center mt-2">
                                            {workshop.services.map((item, index) => (
                                                <p key={index} className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{item}</p>

                                            ))}

                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-cardHoverBg dark:text-gray-300">Workshop Description:</span>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                            {workshop.workshopDescription}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[30px] bg-white h-fit py-5 px-10 w-2/12 rounded-lg">
                            <p className="text_para mt-0 font-bold text-cardHoverBg">
                                Available Time Slots:
                            </p>
                            <ul className="mt-3">
                                {
                                    workshop.timeSlots && JSON.parse(workshop.timeSlots).map((item, index) => (
                                        <li key={index} className="flex items-center justify-between mb-2">
                                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                                            </p>
                                            <p className="text-[15px] leading-6 text-textColor font-semibold">
                                                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                )}
            </div>
        </>

    );
};
export default WorkshopDetails;