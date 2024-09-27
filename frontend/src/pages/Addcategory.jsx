import React, { useContext, useEffect, useState } from 'react'
import { addCategory, deleteCategory, fetchCategories } from '../../Api/Api';
import {useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginC';
import Swal from 'sweetalert2';
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
          Swal.fire("Category Added Successfully");
        }
      };
      const handleDeleteCategory = async (categoryName) => {
        const confirmed = Swal.fire({text:`Are you sure you want to delete the category "${categoryName}"?`,
            showCancelButton : true,
            confirmButtonText : "Yes",
            confirmButtonColor: '#d33'
          });
        if ((await confirmed).isConfirmed) {
          const response = await deleteCategory(categoryName);
          if (response.success) {
            setCategories(categories.filter((category) => category.name !== categoryName));
            Swal.fire("Category deleted successfully.");
          } else {
            Swal.fire({text:"Failed to delete category.",
              icon: "warning"
            });
          }
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
    <div className="p-6 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Currently Added Categories:</h2>
    <ul className="space-y-2">
      {categories.map((category, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-blue-100 text-blue-800 p-3 rounded-lg shadow-sm"
        >
          <span className="font-medium text-lg">{category.name}</span>
          <button
            onClick={() => handleDeleteCategory(category.name)}
            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>

    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-800">Add New Category</h3>
      <div className="flex mt-3">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded p-2 w-full sm:w-64"
        />
        <button
          onClick={handleAddCategory}
          className="ml-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Add Category
        </button>
      </div>
    </div>
  </div>
  )
}

export default Addcategory