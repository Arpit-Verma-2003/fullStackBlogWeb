import React, { useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard'
import { deleteBlog, getBlogsByAuthor } from '../../Api/Api';
import {useNavigate } from 'react-router-dom'
const Myblogs = () => {
    const navigate = useNavigate();
    const [blogs,setBlogs] = useState(null);
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
    useEffect(()=>{
        async function fetchData() {
          const allBlogs = await getBlogsByAuthor();
          if(!allBlogs.valid){
            navigate('/login');
          }
          setBlogs(allBlogs.data);
        }
        fetchData();
      },[]);
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {blogs &&  blogs.length > 0 ? ( blogs.map((x,i)=>{
            return <Blogcard key={i} blogData = {x} handleDelete={handleDelete}
            showDelete={true}/>
          })) :(
            <p>You haven't posted any Blogs Yet :(</p>
          )}
        </div>
  )
}

export default Myblogs