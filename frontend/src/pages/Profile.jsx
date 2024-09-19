import React, { useEffect, useState } from 'react'
import { checkLogin } from '../../Api/Api';
const Profile = () => {
    const [name,setName] = useState("");
    const [userRole,setUserRole] = useState("");
    const [content,setContent] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
          const response = await checkLogin();
          if (!response.valid) {
            setName("Guest");
            setUserRole("Viewer");
            setContent("Hence, You can only View blogs and don't have other permissions");
          } else {
            setName(response.username);
            if(response.role==1){
                setUserRole("Admin");
                setContent("Hence, You have all the permissions in this website");
            }else if(response.role==2){
                setUserRole("Author");
                setContent("Hence, You can Access, Create or Delete your own Blogs");
            }else{
                setUserRole("Viewer");
                setContent("Hence, You can only View blogs and don't have other permissions");
            }
          }
        };
    
        fetchData();
      }, []);
  return (
    <div className="flex items-center justify-center min-h-[500px] bg-gradient-to-b from-gray-100 to-red-100">
        <div className='bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200'>
            <h1 className='text-3xl font-semibold text-red-600 mb-5 border-b pb-4'>Your Profile - </h1>
            <h2 className='text-xl font-medium text-gray-700 mb-4'>Hello, <span className="font-bold text-gray-900">{name}</span> , We Hope You Are Enjoying Using Our Website</h2>
            <h3 className='text-lg text-gray-600 mb-2'>Your current role is: <span className="font-bold text-indigo-500">{userRole}</span></h3>
            <h4 className='text-md text-gray-500'>{content}</h4>
        </div>
    </div>
  )
}

export default Profile