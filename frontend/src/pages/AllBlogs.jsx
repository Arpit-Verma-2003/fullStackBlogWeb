import React, { useContext, useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard'
import { getBlogs,deleteBlog } from '../../Api/Api'
import { useSearchParams ,useNavigate } from "react-router-dom";
import { LoginContext } from '../context/LoginC';
const AllBlogs = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [blogs,setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const details = useContext(LoginContext);
    const [permissions,setPermissions] = useState([]);
    const category = searchParams.get('category') || 'all';
    const navigate = useNavigate();
    useEffect(() => {
      window.scrollTo(0, 0);
      const fetchData = async () => {
        const response = await getBlogs(category, 1,9,searchQuery);
          setBlogs(response.data);
          setPage(1);
          setHasMore(response.data.length === 9);
      };
  
      fetchData();
    }, [category, navigate,searchQuery]);
    useEffect(()=>{
        async function fetch() {
          if(details.login === false){
            navigate('/login');
          }
          setPermissions(details.cpermissions);
        }
        fetch();
      },[details,navigate])
    useEffect(() => {
      const fetchData = async () => {
        const response = await getBlogs(category, page,9,searchQuery);
  
          setBlogs(prevBlogs => [...prevBlogs, ...response.data]);
          setHasMore(response.data.length === 9);
  
      };
  
      if (page > 1) {
        fetchData();
      }
    }, [page,category,searchQuery]);
    const handleDelete = async (blogId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (confirmDelete) {
          const response = await deleteBlog(blogId);
          if (response.valid) {
            setBlogs(blogs.filter(blog => blog.id !== blogId));
            alert("Blog deleted successfully");
          } else {
            alert("Failed to delete blog");
          }
        }
    };
    const handleEdit = async(blogId) =>{
      const confirmEdit = window.confirm("Are you sure you want to edit this blog?");
      if(confirmEdit) navigate(`/editblog/${blogId}`);
    }
    const loadMore = () => {
      setPage(prevPage => prevPage + 1);
    };
    const hasPermission = (permissionName) => permissions.includes(permissionName);
    if (!hasPermission('All Blogs')) {
        return <h2 className='text-2xl font-bold text-center text-gray-800 my-5 bg-red-100 rounded-lg shadow-lg py-3 px-6'>Access Denied</h2>;
    }
    return (
      <>  
            <div className='mb-4'>
              <input
                  type='text' placeholder='Search blogs...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-md'
              />
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {blogs &&  blogs.length > 0 ? ( blogs.map((x,i)=>{
              return <Blogcard key={i} blogData = {x} handleDelete={handleDelete} handleEdit={handleEdit} showDelete={true} showEdit={true}/>
            })):(
              <p>No Blogs Found :(</p>
            )
            }
          </div>
          {hasMore && (
          <button onClick={loadMore} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
            Load More
          </button>
        )}
      </>
    )
}

export default AllBlogs