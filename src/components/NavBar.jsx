import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center md:justify-around justify-between p-3 m-10 bg-slate-100">
        <h2 className='text-mainColoe font-bold text-xl'>CaRabite</h2>
        <div className="flex md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            {menuOpen ? (
              <img className="block toggle" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" alt="Close" />
            ) : (
              <img className="block toggle" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" alt="Menu" />
            )}
          </button>
        </div>
        <div className={`${menuOpen ? 'flex flex-col' : 'hidden'} w-full md:w-auto md:flex text-left text-bold mt-5 md:mt-0 `}>
          <a href="#" className="block md:inline-block text-lg text-black hover:text-mainColoe font-bold px-3 py-3   ">Home</a>
          <a href="#" className="block md:inline-block text-lg text-black hover:text-mainColoe font-bold px-3 py-3   ">About</a>
          <a href="#" className="block md:inline-block text-lg text-black hover:text-mainColoe font-bold px-3 py-3   ">Contact</a>
        </div>
        <div className={`${menuOpen ? 'flex flex-col gap-4' : 'hidden'} w-full md:w-auto md:flex gap-1`}>
          <Link to="#" className={`toggle ${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto px-4 py-2 text-right bg-mainColoe font-mono hover:bg-blue-500 text-white md:rounded`}>Login</Link>
          <Link to="#" className={`toggle ${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto px-4 py-2 text-right bg-mainColoe font-mono hover:bg-blue-500 text-white md:rounded`}>Register</Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
