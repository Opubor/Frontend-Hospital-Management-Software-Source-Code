import React from 'react'

function Input({label, ...rest}) {
  return (
    <div className='flex flex-col mb-6'>
        <label htmlFor="" className=' mb-2 text-lg font-semibold'>{label}</label>
        <input {...rest} className='py-2 px-2 border border-gray-300 text-base outline-none rounded-md'/>
    </div>
  )
}

export default Input