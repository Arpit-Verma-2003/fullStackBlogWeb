import React, { useContext, useEffect, useState } from 'react'
import { addCategory, fetchCategories } from '../../Api/Api';
import {useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginC';
const Addcategory = () => {
    const navigate = useNavigate();
    const [categories,setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const details = useContext(LoginContext);
    const [permissions,setPermissions] = useState([]);
    useEffect(()=>{
      async function fetch() {
        console.log(details.login);
        if(details.login === false){
          navigate('/login');
        }
        setPermissions(details.cpermissions);
      }
      fetch();
    },[details])
    useEffect(() => {
        async function fetchData(){
          const fetchedCategories = await fetchCategories();
          if(fetchedCategories){
          setCategories(fetchedCategories.data);
        }
        }
        fetchData();
    }, [])
    const handleAddCategory = async () => {
        if (!newCategory) {
          setErrorMessage("Category name cannot be empty.");
          return;
        }
        const response = await addCategory(newCategory);
        if (response.success) {
          setCategories([...categories, { name: newCategory }]);
          setNewCategory("");
          alert("Category Added Successfully");
        }
      };
  const hasPermission = (permissionName) => permissions.includes(permissionName);
  if(details === null){
    return <div>Loading...</div>
  }

  if (!hasPermission('Add Category')) {
    return <h2 className='text-2xl font-bold text-center text-gray-800 my-5 bg-red-100 rounded-lg shadow-lg py-3 px-6'>Access Denied</h2>;
  }
  return (
    <div>
        <h2 className='text-xl font-semibold mb-4'>Currently Added Categories : </h2>
        <ul className='flex flex-wrap gap-3'>
            {categories.map((x,i)=>{
                return <li key={i} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">{x.name}</li>
            })}
        </ul>
        <div className='mt-5'>
        <h3 className='text-lg font-medium'>Add New Category</h3>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className='border rounded p-2 my-2 w-[200px]'
        />
        <button
          onClick={handleAddCategory}
          className='bg-green-500 text-white ml-3 py-2 px-4 rounded hover:bg-green-600 transition-colors'
        >
          Add Category
        </button>
        </div>
    </div>
  )
}

export default Addcategory