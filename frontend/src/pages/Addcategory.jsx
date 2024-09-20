import React, { useEffect, useState } from 'react'
import { addCategory, fetchCategories } from '../../Api/Api';
const Addcategory = () => {
    const [categories,setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
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
    
  return (
    <div>
        <h2 className='text-xl font-semibold mb-4'>Currently Added Categories : </h2>
        <ul className='flex flex-wrap gap-3'>
            {categories.map((x,i)=>{
                return <li className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">{x.name}</li>
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