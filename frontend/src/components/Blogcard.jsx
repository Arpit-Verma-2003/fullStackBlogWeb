import React from 'react'

const Blogcard = ({blogData}) => {
  return (
    <div className='bg-white'>
        <div className='flex w-full flex-col shadow-md overflow-hidden rounded-md'>
            <img src={blogData.image} alt="" />
            <div className='p-2'>
                <h2 className='text-xl text-left mt-1'>{blogData.title}</h2>
                <p className='text-sm text-left opacity-75'>{blogData.description}</p>
            </div>
        </div>
    </div>
  )
}

export default Blogcard