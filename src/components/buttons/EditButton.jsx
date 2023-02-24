import React from 'react'
import {Link} from 'react-router-dom'

function EditButton({editFunction,children}) {
  return (
      <Link  className='bg-indigo-500 px-2 flex justify-center items-center rounded-full text-sm text-white p-2 hover:bg-indigo-900' to={editFunction}>{children}</Link>    
  )
}

export default EditButton