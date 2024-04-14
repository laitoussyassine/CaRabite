import React from 'react'

const Input = ({name,type,placeholder, ...props}) => {
    return (
        <>
            <input type={type} name={name} placeholder={placeholder} {...props} className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" required />
        </>
    )
}

export default Input