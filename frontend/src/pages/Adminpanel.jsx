import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginC';
const Adminpanel = () => {
  const details = useContext(LoginContext);
  const [permissions,setPermissions] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetch() {
      if(details.login === false){
        navigate('/login');
      }
      setPermissions(details.cpermissions);
    }
    fetch();
  },[details,navigate])
  const hasPermission = (permissionName) => permissions.includes(permissionName);
  if (!hasPermission('Admin Panel')) {
      return <h2 className='text-2xl font-bold text-center text-gray-800 my-5 bg-red-100 rounded-lg shadow-lg py-3 px-6'>Access Denied</h2>;
  }
  return (
    <div className="min-h-[500px] bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8'>Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <Link
          to={'/register'}
          className="block w-full max-w-md mx-auto p-4 bg-indigo-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Create a New User</h5>
        </Link>
        <Link
          to={'/createrole'}
          className="block w-full max-w-md mx-auto p-4 bg-indigo-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Create a New Role</h5>
        </Link>
        <Link
          to={'/addcategory'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Modify Categories</h5>
          </Link>
        <Link
          to={'/allusers'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Modify Users</h5>
          </Link>
          <Link
          to={'/allblogs'}
          className="block w-full max-w-md mx-auto p-4 bg-green-600 text-white text-center rounded-lg shadow-md"
        >
          <h5 className="text-lg font-semibold">Modify Blogs</h5>
          </Link>
      </div>
    </div>
  )
}

export default Adminpanel