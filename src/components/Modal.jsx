import React, {useState} from 'react'

function Modal() {
    const [showModal, setShowModal] = React.useState(false);
  return (
    <div>

                    <>
                        <div className='justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                            <div className='mx-auto mb-auto w-2/5 rounded-md p-8 m-8 bg-white'>

                                <h3 className='text-center font-semibold mb-4'>EDIT DEPARTMENT</h3>
                                <div>
                                    <form action="">
                                        <div className='flex flex-col mb-6'>
                                            <label htmlFor="" className=' mb-2 text-lg'>Department</label>
                                            <input type="text" name='department' className='py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300'/>
                                        </div>

                                        <div className='flex flex-col mb-6'>
                                            <label htmlFor="" className=' mb-2 text-lg'>Description</label>
                                            <input type="text" name='description' className='py-2 px-2 border border-gray-300 rounded-md focus:border-blue-300'/>
                                        </div>

                                        <div className='flex gap-4'>
                                            <button onClick={() => setShowModal(false)} className='bg-red-500 px-4 py-2 rounded-md text-base text-white hover:bg-red-600'>Cancel</button>

                                            <button className='bg-indigo-700 px-4 py-2 rounded-md text-base text-white hover:bg-indigo-900'>Edit Department</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
    </div>
  )
}

export default Modal