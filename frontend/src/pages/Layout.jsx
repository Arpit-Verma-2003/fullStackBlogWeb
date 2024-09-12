import React, { useEffect ,useState } from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { checkLogin } from '../../Api/Api'
import axios from 'axios'
const Layout = () => {
  const [checkButtonAccess, setCheckButtonAccess] = useState(false);
  const [checkLoginAccess, setCheckLoginAccess] = useState(false);
  const [checkAdminAccess, setCheckAdminAccess] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    async function fetchData() {
      const checkLogined = await checkLogin();
      if(!checkLogined.valid){
        console.log("You are not logined");
        navigate('/login');
      }
      else{
        if(checkLogined.role === 2 ){
          setCheckButtonAccess(true);
        }
        if(checkLogined.role === 1){
          setCheckAdminAccess(true);
        }
        setCheckLoginAccess(true);
        console.log("You are logined");
      } 
    }
    fetchData();
  },[navigate]);
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout");
    if(confirmLogout){
      try {
        const response = await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
        if (response.status === 200) {
          alert("Logout Successful");
          console.log("Logout successful");
          setCheckButtonAccess(false);
          setCheckLoginAccess(false);
          setCheckAdminAccess(false);
          navigate('/login'); // Redirect user to login page after logout
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };
  const menu = [
    {text:'Trending',path:'/'},
    {text:'National',path:'/'},
    {text:'Sports',path:'/'},
    {text:'Politics',path:'/'}
  ]
  return (
    <>
      {/* header */}
       <div className="border-b p-5">
        <div className="container flex pb-5 justify-between">
         <Link to='/'><span className='font-extrabold text-2xl'>BlogPost</span></Link>
          {checkLoginAccess && <div className="flex">
            <ul className="flex">
              {
                menu.map((x,i)=>{
                  return <li key={i} className='p-2'><Link to={`/?category=${x.text}`}>{x.text}</Link></li>
                })
              }
            </ul>
             <Link to={'/create'}>{checkButtonAccess && <button className='bg-blue-600 text-white rounded p-1 mr-3'>Add Blog</button>} </Link>
             <Link to={'/myblogs'}>{checkButtonAccess && <button className='bg-blue-600 text-white rounded p-1 mr-3'>My Blogs</button>} </Link>
             <Link to={'/register'}>{checkAdminAccess && <button className='bg-blue-600 text-white rounded p-1 mr-3'>Create User</button>} </Link>
             <button onClick={handleLogout} className='bg-red-600 text-white rounded p-1'>Logout</button>
          </div>}
        </div>
      </div>
      {/* body */}
      <div className="flex mx-auto justify-center">
        <div className='my-5 min-h-[500px] w-[1280px]'>
          <Outlet></Outlet>        
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Layout