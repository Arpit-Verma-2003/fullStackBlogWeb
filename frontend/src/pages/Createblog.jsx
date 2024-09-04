import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Createblog = () => {
    const [value, setValue] = useState('');
    const menu = [
        {text:'Trending',path:'/'},
        {text:'National',path:'/'},
        {text:'Sports',path:'/'},
        {text:'Politics',path:'/'}
      ]
  return (
    <div className='flex w-full items-center justify-center'>
        <div className='bg-slate-200 w-[60%] rounded p-5'>
            <h1 className='text-3xl my-3 font-bold mx-5'>Create Blog</h1>
            <div className='flex flex-col'>
                <label htmlFor="" className='ml-1 text-gray-500'>Title</label>
                <input type="text" className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <label htmlFor="" className='ml-1 text-gray-500'>Category</label>
                <select name="" id="">
                    {menu.map(x=>{
                        return <option value="{x.text}">{x.text}</option>
                    })}
                </select>
                <label htmlFor="" className='ml-1 text-gray-500'>Image</label>
                <input type="file" className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <ReactQuill theme="snow" className='bg-white rounded mb-2 mt-2 editingarea' value={value} onChange={setValue} />
                <hr />
                <button className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Createblog