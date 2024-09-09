import React from 'react'
import {Link} from 'react-router-dom'
const Blogcard = ({blogData}) => {
  const apiUrl = "http://localhost:3000/";
  return (
    <div className='bg-white'>
      <Link to={`/blog/${blogData.id}`}>
        <div className='flex w-full flex-col shadow-md overflow-hidden rounded-md'>
            <img src={apiUrl+blogData.image} className='object-fill h-300' alt="" />
            <div className='p-2'>
                <h2 className='text-xl text-left mt-1'>{blogData.title}</h2>
                <p className='text-sm text-left opacity-75'>{blogData.category}</p>
            </div>
        </div>
      </Link>
    </div>
  )
}
export default Blogcard