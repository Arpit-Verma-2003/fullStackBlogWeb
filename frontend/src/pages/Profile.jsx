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
            navigate('/login');
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
    <div>
        <div className='bg-red-100'>
            <h1 className='font-semibold mb-5'>Your Profile - </h1>
            <h2 className='font-thin mb-3'>Hello {name} , We Hope You Are Enjoying Using Our Website</h2>
            <h2 className='font-thin mb-3'>Your Current Role is - {userRole}</h2>
            <h4 className='font-thin font-serif'>{content}</h4>
        </div>
    </div>
  )
}

export default Profile