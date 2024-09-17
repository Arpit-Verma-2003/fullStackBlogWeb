import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAdmin } from '../../Api/Api';
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "reader"
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [roles,setRoles] = useState([]);
    const navigate = useNavigate();


    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/roles');
            setRoles(response.data);
            console.log(roles);
        } catch (err) {
            setError("Failed to fetch roles.");
        }
    };

    useEffect(() => {
        async function checkAdminFunction() {
            const res = await checkAdmin();
            if(!res.valid) navigate('/');
            if(!res.login) navigate('/login')
        }
        checkAdminFunction();
        fetchRoles();
    }, [])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/register', formData);
            setSuccess("The User is Successfully Registered!");
            setFormData({
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                role: "reader"
            });
            setError(null);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Error Registering The User");
            }
            setSuccess(null);
        }
    }
    return (
        <div className='flex flex-col items-center p-6'>
            <h2 className='font-bold text-xl mb-4'>Register</h2>
            {error && <p className='text-red-600 mb-4'>{error}</p>}
            {success && <p className='text-blue-600 mb-4'>{success}</p>}
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
                <div className='mb-4'>
                    <label className='block mb-2' htmlFor="username">Username</label>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        className='border rounded px-3 py-2 w-full'
                        onChange={handleChange}
                        required
                        value={formData.username}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2' htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        className='border rounded px-3 py-2 w-full'
                        onChange={handleChange}
                        required
                        value={formData.email}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2' htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        className='border rounded px-3 py-2 w-full'
                        onChange={handleChange}
                        required
                        value={formData.password}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2' htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id='confirm_password'
                        name='confirm_password'
                        className='border rounded px-3 py-2 w-full'
                        onChange={handleChange}
                        required
                        value={formData.confirm_password}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2' htmlFor="role">Role</label>
                    <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className='border rounded px-3 py-2 w-full'
                    >
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Register</button>
            </form>
            {/* <Link to='/login' className='text-blue-700 py-5'>Already a User ? Wanna Login , Click Me</Link> */}
        </div>
    );
}

export default Register;
