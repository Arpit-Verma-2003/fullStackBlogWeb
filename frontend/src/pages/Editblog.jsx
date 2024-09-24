import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImage, getBlogById, fetchCategories,checkLogin, updateBlog } from '../../Api/Api'
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/LoginC';
const Editblog = () => {
    const blankBlog = {
        "author" : "",
        "title" : "",
        "image" : "",
        "post" : "<p><br></p>",
        "category" : ""
    }

    const details = useContext(LoginContext);
    const [permissions,setPermissions] = useState([]);
    const [blogData,setBlogData] = useState(blankBlog);
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const quillRef = useRef(null);
    const { id } = useParams(); 
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const fetchedCategories = await fetchCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories.data);
            }
            const blog = await getBlogById(id); 
            const blogPrevData = blog.data[0];
            if (blogPrevData) {
                setBlogData({
                    title: blogPrevData.title,
                    image: blogPrevData.image,
                    post: blogPrevData.post,
                    category: blogPrevData.category,
                });
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);
    useEffect(()=>{
        async function fetch() {
          if(details.login === false){
            navigate('/login');
          }
          setPermissions(details.cpermissions);
        }
        fetch();
      },[details,navigate])
    const handleImage = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!blogData.title) {
            alert('Please Enter The Title');
            return;
        }
        if (!blogData.category) {
            alert('Please Select The Category');
            return;
        }
        if (blogData.post === '<p><br></p>') {
            alert('Please Enter Some Content');
            return;
        }

        let imagePath = blogData.image;
        if (image) {
            const uploadFile = await uploadImage(image);
            if (uploadFile.path) {
                imagePath = uploadFile.path;
            } else {
                alert('Image Upload Failed');
                return;
            }
        }

        const updatedBlog = {
            ...blogData,
            image: imagePath
        };
        const result = await updateBlog(id, updatedBlog);
        if (result.success) {
            alert('Blog Updated Successfully');
            navigate(`/blog/${id}`);
        } else {
            alert('Failed to Update Blog');
        }
    };
    const hasPermission = (permissionName) => permissions.includes(permissionName);
    if (!hasPermission('Edit Blog')) {
        return <h2 className='text-2xl font-bold text-center text-gray-800 my-5 bg-red-100 rounded-lg shadow-lg py-3 px-6'>Access Denied</h2>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
    <div className='flex w-full items-center justify-center'>
        <div className='bg-slate-200 w-[60%] rounded p-5'>
            <h1 className='text-3xl my-3 font-bold '>Edit Blog</h1>
            <div className='flex flex-col'>
                <label htmlFor="" className='ml-1 text-gray-500'>Title</label>
                <input type="text" value={blogData.title} onChange={(e)=>setBlogData({...blogData,title:e.target.value})} className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <label htmlFor="" className='ml-1 text-gray-500'>Category</label>
                <select name="" value={blogData.category} onChange={(e)=>setBlogData({...blogData,category:e.target.value})} className='h-10 border border-gray-300 rounded my-2 p-2' id="">
                    <option value="" default disabled>Select Category</option>
                    {categories.map(x=>{
                        return <option key={x.id} value={x.name}>{x.name}</option>
                    })}
                </select>
                <label htmlFor="" className='ml-1 text-gray-500'>Image (Leave Empty For No Change)</label>
                <input type="file" required onChange={(e)=>handleImage(e)} className='h-10 border border-gray-300 rounded my-2 p-2'/>
                <ReactQuill theme="snow" ref={quillRef} className='bg-white rounded mb-2 mt-2 editingarea' value={blogData.post} onChange={(e)=>{setBlogData({...blogData,post:e})}} />
                <hr />
                <button  onClick={()=>handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Editblog
