import React from 'react'
import { Link } from 'react-router-dom'

const Adminpanel = () => {
    
  return (
    <div className="min-h-[500px] bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8'>Admin Panel</h1>
        <div className="space-y-4">
        <Link
          to={'/register'}
          className="block w-full max-w-md mx-auto p-4 bg-indigo-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Create a new user</h5>
        </Link>
        <Link
          to={'/createrole'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Create a new role</h5>
        </Link>
        <Link
          to={'/addcategory'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Add a category</h5>
          </Link>
        <Link
          to={'/allusers'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">See all users</h5>
          </Link>
          
      </div>
    </div>
  )
}

export default Adminpanel