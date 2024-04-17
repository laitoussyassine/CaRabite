import React from 'react'
import service1_image from "../../images/homePage/service/service1_image.jpg"
import service2_image from "../../images/homePage/service/service2_image.jpg"
import service3_image from "../../images/homePage/service/service3_image.jpg"

const ProvideServices = () => {
    return (
        <div className="mx-auto text-center mt-5 dark:bg-gray-900">
            <div className="grid grid-cols-3 gap-10 sm:text-center">
                <div
                    className="lg:col-span-1 col-span-full flex flex-col w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10"
                    href="#"
                    target="_blank"
                >
                    <img
                        className="mr-4 w-full mx-auto object-cover rounded-lg"
                        src={service1_image}
                        alt="Framework7"
                    />
                    <div>
                        <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">SERVICING & REPAIR</div>
                        <div className="text-sm opacity-75">
                        Most of the vehicles get damaged just because of maintenance
                        </div>
                    </div>
                </div>
                <div
                    className="lg:col-span-1 col-span-full flex flex-col w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10"

                    href="#"
                    target="_blank"
                >
                    <img
                        className="mr-4 w-full mx-auto object-cover rounded-lg"
                        src={service2_image}
                        alt="Atropos"
                    />
                    <div>
                        <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">VEHICLE COLLECTION</div>
                        <div className="text-sm opacity-75">Most of the vehicles get damaged just because of maintenance</div>
                    </div>
                </div>
                <div
                    className="lg:col-span-1 col-span-full flex flex-col w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10"

                    href="#"
                    target="_blank"
                >
                    <img
                        className="mr-4 w-full mx-auto object-cover rounded-lg"
                        src={service3_image}
                        alt="Konsta UI"
                    />
                    <div>
                        <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">SAFEGUARD</div>
                        <div className="text-sm opacity-75">Most of the vehicles get damaged just because of maintenance</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProvideServices