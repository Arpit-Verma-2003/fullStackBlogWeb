import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { checkLogin, fetchCategories, postBlogs, uploadImage } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginC';
const Createblog = () => {
    
    const blankBlog = {
        "author" : "",
        "title" : "",
        "image" : "",
        "post" : "<p><br></p>",
        "category" : ""
    }
    const details = useContext(LoginContext);
    const [permissions,setPermissions] = useState([]);
    const navigate = useNavigate();
    const [newblog,setNewblog] = useState(blankBlog);
    const [image,setImage] = useState(null);
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        async function fetchData(){
          const fetchedCategories = await fetchCategories();
          if(fetchedCategories){
          setCategories(fetchedCategories.data);
        }
        }
        fetchData();
    }, [])
    useEffect(()=>{
        async function fetch() {
          if(details.login === false){
            navigate('/login');
          }
          setPermissions(details.cpermissions);
        }
        fetch();
      },[details,navigate])
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
            navigate('/');
        }
    }
    const hasPermission = (permissionName) => permissions.includes(permissionName);
    if (!hasPermission('Create Blog')) {
        return <h2 className='text-2xl font-bold text-center text-gray-800 my-5 bg-red-100 rounded-lg shadow-lg py-3 px-6'>Access Denied</h2>;
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
                    {categories.map(x=>{
                        return <option key={x.id} value={x.name}>{x.name}</option>
                    })}
                </select>
                <label htmlFor="" className='ml-1 text-gray-500'>Image</label>
                <input type="file" required onChange={(e)=>handleImage(e)} className='h-10 border border-gray-300 rounded my-2 p-2'/>
                {/* <ReactQuill theme="snow" className='bg-white rounded mb-2 mt-2 editingarea' value={newblog.post} onChange={(e)=>{setNewblog({...newblog,post:e})}} /> */}
                <CKEditor
                        editor={ClassicEditor}
                        data={newblog.post}
                        className='bg-white rounded mb-2 mt-2 editingarea'
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setNewblog({ ...newblog, post: data });
                        }}
                    />
                <hr />
                <button  onClick={()=>handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Createblog