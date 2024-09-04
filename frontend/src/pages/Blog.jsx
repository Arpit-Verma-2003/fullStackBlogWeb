import React from 'react'

const Blog = () => {
  return (
    <div className='flex justify-center '>
        <div className='flex flex-col w-[70%] overflow-hidden'>
            <h1 className='mt-1 text-3xl font-extrabold'>Title Of The Blog</h1>
            <div className='flex my-4 justify-end items-center'>
                <small>08 August 2024 |&nbsp;</small>
                <small>Author : Arpit Verma</small>
            </div>
            <img className='rounded-lg' src="https://picsum.photos/id/206/250/200" alt="photo_lorem" />
            <div className='justify-start'>
                <h2 className='text-2xl my-3'>What is the BlogPost?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, modi! Earum aliquid voluptas numquam, expedita quas aliquam possimus perferendis vitae voluptate molestias eligendi ipsa esse nisi consectetur aperiam hic at provident enim iusto quis sed fugiat. Ea mollitia soluta assumenda nostrum, eveniet fuga, fugiat quo ipsam eius laboriosam, dolor praesentium.</p>
            </div>
        </div>
    </div>
  )
}

export default Blog