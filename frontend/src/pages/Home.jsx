import React, { useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard'
import { Link } from 'react-router-dom'
import { getBlogs } from '../../Api/Api'
const Home = () => {
  const [blogs,setBlogs] = useState(null);
  useEffect(()=>{
    async function fetchData() {
      const allBlogs = await getBlogs();
      setBlogs(allBlogs.data);
    }
    fetchData();
  },[]);
  const data = [
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/201/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/202/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/203/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/204/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/209/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/206/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/210/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/208/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/id/209/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    },
    {
      title : 'This is the first blog',
      image : 'https://picsum.photos/250/200',
      description : 'This website is amazing',
      createdon : '08 August , 2024',
      author : 'Arpit Verma',
      comments : "0"
    }
  ]
  return (
    <>
      <Link to='/blog'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {blogs && blogs.map(x=>{
            return <Blogcard blogData = {x}/>
          })}
        </div>
        </Link>
    </>
  )
}

export default Home
