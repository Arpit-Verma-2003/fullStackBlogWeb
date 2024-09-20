import React from 'react'
import {Link} from 'react-router-dom'
const Blogcard = ({blogData,handleDelete, showDelete}) => {
  const apiUrl = "http://localhost:3000/";
  const truncateTitle = (title) =>{
    return title.length > 30 ? title.substring(0,30) + "...":title;
  }
  return (
    <div className='bg-white'>
      <div className='flex w-full flex-col shadow-md overflow-hidden rounded-md'>
        <Link to={`/blog/${blogData.id}`}>
            <img src={apiUrl+blogData.image} className='w-full object-fill h-300' alt="" />
            </Link>
          </div>
            <div className='p-2 flex justify-between items-center'>
              <div>
                <h2 className='text-xl text-left mt-1'>{truncateTitle(blogData.title)}</h2>
                <p className='text-sm text-left opacity-75'>{blogData.category}</p>
              </div>
              {showDelete && (
          <button 
            onClick={() => handleDelete(blogData.id)} 
            className='bg-red-600 text-white rounded p-1 ml-4 text-xs'
          >
            Delete
          </button>
        )}
            </div>
    </div>
  )
}
export default Blogcard