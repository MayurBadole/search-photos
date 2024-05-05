import React from 'react'

const Jumbutron = ({ children }) => {
  return (
    <div className="bg-gray-700 flex items-center py-6 w-full fixed top-0">
      <div className='max-w-md mx-auto w-full'>
        <h1 className='text-white text-center text-2xl font-bold mb-5'>Search Photos</h1>
        {children}
      </div>
    </div>
  )
}

export default Jumbutron