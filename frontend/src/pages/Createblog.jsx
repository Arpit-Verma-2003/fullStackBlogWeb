import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { checkLogin, postBlogs, uploadImage } from '../../Api/Api';
const Createblog = () => {

    const blankBlog = {
        "author" : "",
        "title" : "",
        "image" : "",
        "post" : "<p><br></p>",
        "category" : ""
    }
    const [newblog,setNewblog] = useState(blankBlog);
    const [image,setImage] = useState(null);
    const menu = [
        {text:'Trending',path:'/'},
        {text:'National',path:'/'},
        {text:'Sports',path:'/'},
        {text:'Politics',path:'/'}
      ]
    const handleImage = async(event)=>{
        setImage(event.target.files[0]);
    }

    const handleSubmit = async()=>{
        const checkLogined = await checkLogin(); 
        if(!image){
            alert("Please Upload An Image");
            return;
        }
        let uploadFile = await uploadImage(image);
        if(uploadFile.path){
            setNewblog({...newblog,image:uploadFile.path});
        }else{
            alert('Image Upload Failed');
            return;
        }
        const blogWithAuthor = { ...newblog, author: checkLogined.username,image: uploadFile.path };
        if(!blogWithAuthor.title){
            alert("Please Enter The Title");
            return;
        }
        if(!blogWithAuthor.category){
            alert("Please Select The Category");
            return;
        }
        
        if(!blogWithAuthor.post){
            alert("Please Enter Some Content");
            return;
        }
        
        let createdBlog = await postBlogs(blogWithAuthor);
        if(createdBlog.data == 1){
            setNewblog(blankBlog);
            alert("New Blog Added Sucessfully");
        }
    }

      return (
    <div className='flex w-full items-center justify-center'>
        <div className='bg-slate-200 w-[60%] rounded p-5'>
            <h1 className='text-3xl my-3 font-bold mx-5'>Create Blog</h1>
            <div className='flex flex-col'>
                <label htmlFor="" className='ml-1 text-gray-500'>Title</label>
                <input type="text" value={newblog.title} onChange={(e)=>setNewblog({...newblog,title:e.target.value})} className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <label htmlFor="" className='ml-1 text-gray-500'>Category</label>
                <select name="" value={newblog.category} onChange={(e)=>setNewblog({...newblog,category:e.target.value})} id="" className='h-10 border border-gray-300 rounded my-2 p-2'>
                    <option value="" default disabled>Select Category</option>
                    {menu.map(x=>{
                        return <option value={x.text}>{x.text}</option>
                    })}
                </select>
                <label htmlFor="" className='ml-1 text-gray-500'>Image</label>
                <input type="file" required onChange={(e)=>handleImage(e)} className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <ReactQuill theme="snow" className='bg-white rounded mb-2 mt-2 editingarea' value={newblog.post} onChange={(e)=>{setNewblog({...newblog,post:e})}} />
                <hr />
                <button  onClick={()=>handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Createblog