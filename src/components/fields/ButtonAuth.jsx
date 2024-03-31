import React from 'react'

const ButtonAuth = ({children , disabled}) => {
    return (
        <button disabled={disabled} className="relative group block w-full mb-4 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-btnbg rounded-full overflow-hidden" type="submit">
            <div className="absolute top-0 right-full w-full h-full bg-gray-900 transhtmlForm group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
            {children}
        </button>
    )
}

export default ButtonAuth