import React,{useEffect,useState} from 'react'
import { getBlogById } from '../../Api/Api';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import dateFormat from "dateformat";
const Blog = () => {
  const {id} = useParams();
  const [blog,setBlog] = useState(null);
  const apiUrl = "http://localhost:3000/";
  useEffect(()=>{
    window.scrollTo(0, 0);
    async function fetchData() {
      const allBlogs = await getBlogById(id);
      setBlog(allBlogs.data[0]);
    }
    fetchData();
  },[]);
  console.log(blog);
  return (
    <div className='flex justify-center items-center'>
        {blog && <div className='flex flex-col w-[70%] overflow-hidden'>
            <h1 className='mt-1 text-3xl font-extrabold'>{blog.title}</h1>
            <div className='flex my-4 items-center font-semibold'>
                <small>{dateFormat(blog.createdon,"dddd, mmmm dS, yyyy, h:MM TT")} |&nbsp;</small>
                <small>Author : {blog.author}</small>
            </div>
              <img className='rounded-lg object-scale-down max-w-full max-h-full w-[800px] h-[500px]' src={apiUrl+blog.image} alt="photo_lorem" />
            
            <div className='justify-start mt-5'>
              {parse(blog.post)}
            </div>
        </div>}
    </div>
  )
}

export default Blog