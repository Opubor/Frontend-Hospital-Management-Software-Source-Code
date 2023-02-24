import React from 'react'

function Thead({children}) {
  return (
    <thead>
        <tr className='border border-gray-300 text-left bg-indigo-800 text-white text-base'>
            {children}
        </tr>
    </thead>
  )
}

export default Thead