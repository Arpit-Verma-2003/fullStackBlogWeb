import React, { useContext, useEffect ,useState } from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Footer from '../components/Footer'
import { checkLogin, fetchCategories } from '../../Api/Api'
import axios from 'axios'
import { LoginContext } from '../context/LoginC';
import Spinner from '../components/Spinner';

const apiUrl = 'https://blog-backend-hcqx.onrender.com';
const Layout = () => {
  const loginVar = useContext(LoginContext);
  const [checkLoginAccess, setCheckLoginAccess] = useState(false);
  const [permissions,setPermissions] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      const checkLogined = await checkLogin();
      if(!checkLogined.valid){
        console.log("You are not logined");
      }
      else{
        setCheckLoginAccess(true);
        setPermissions(checkLogined.permissions);
      } 
      const fetchedCategories = await fetchCategories();
      if(fetchedCategories){
        setCategories(fetchedCategories.data);
        setLoading(false);
      }
    }
    fetchData();
  },[navigate]);
  const handleLogout = async () => {
    const confirmLogout = Swal.fire({
      text : "Are you sure you want to logout",
      showCancelButton : true,
      confirmButtonText : "Yes",
      confirmButtonColor: '#d33'
    })
    if((await confirmLogout).isConfirmed){
      try {
        const response = await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });
        if (response.status === 200) {
          Swal.fire("Logout Successful");
          console.log("Logout successful");
          loginVar.setLogin(false);
          loginVar.setCPermissions([]);
          setCheckLoginAccess(false);
          setPermissions([]);
          navigate('/login');
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };
  const hasPermission = (permissionName) => permissions.includes(permissionName);
  return (
    <>
      {/* header */}
       <div className="border-b p-5">
        <div className="container flex pb-5 justify-between">
         <Link to='/'><span className='font-extrabold text-2xl'>BlogPost</span></Link>
           <div className="flex">
            <ul className="flex">
              {
                categories.map((x,i)=>{
                  return <li key={i} className='p-2'><Link to={`/?category=${x.name}`}>{x.name}</Link></li>
                })
              }
            </ul>
             {!checkLoginAccess && (<Link to={'/login'}><button className='bg-blue-600 text-white rounded p-1 mr-3'>Login</button></Link>)}
             {checkLoginAccess && (<Link to={'/profile'}><img src="/profile-circle-icon-2048x2048-cqe5466q.png" alt="Profile" className='w-[35px] p-1 mr-3'/></Link>)}
             {checkLoginAccess && (<Link><button onClick={handleLogout} className='bg-red-600 text-white rounded p-1'>Logout</button></Link>)}
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex mx-auto justify-center">
        <div className='my-5 min-h-[500px] w-[1280px]'>
        {loading ? <Spinner /> : <Outlet />}     
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Layout
