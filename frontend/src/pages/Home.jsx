import React, { useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard'
import { Link } from 'react-router-dom'
import { getBlogs } from '../../Api/Api'
import { useSearchParams } from "react-router-dom";
const Home = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs,setBlogs] = useState(null);
  useEffect(()=>{
    async function fetchData() {
      const allBlogs = await getBlogs();
      setBlogs(allBlogs.data);
    }
    fetchData();
  },[]);
  useEffect(()=>{
    async function fetchData() {
      let category = searchParams.get('category');
      const allBlogs = await getBlogs(category);
      setBlogs(allBlogs.data);
    }
    fetchData();
  },[searchParams]);
  return (
    <>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {blogs && blogs.map((x,i)=>{
            return <Blogcard key={i} blogData = {x}/>
          })}
        </div>
    </>
  )
}

export default Home
