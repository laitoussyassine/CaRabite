import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Acoount = () => {
  return (
    <div class="flex h-screen bg-gray-100">
      <div class=" md:flex flex-col w-64 bg-cardHoverBg">
        <div class="flex items-center justify-center h-16 bg-cardBg">
          <span class="text-white font-bold uppercase">Sidebar</span>
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
          <nav class="flex-1 px-2 py-4 bg-cardHoverBg">
            <a href="#" class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Dashboard
            </a>
            <a href="#" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
              Messages
            </a>
            <a href="#" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Settings
            </a>
          </nav>
        </div>
      </div>

      <div class="flex flex-col flex-1 overflow-y-auto mx-5">
        <div class="p-4">
          <h1 class="text-2xl font-bold">Welcome to my dashboard!</h1>
          <p class="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p>
        </div>
        <div className='grid grid-cols-3'>
         <div className='lg:col-span-1 col-span-full'>
          <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" alt="University of Southern California" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 class="z-10 mt-3 text-3xl font-bold text-white">Paris</h3>
              <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">City of love</div>
            </article>
         </div>
        </div>
      </div>

    </div>
  )
}

export default Acoount