import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Createblog from './pages/Createblog';
import Nopage from './components/Nopage';
import Policy from './pages/Policy';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Myblogs from './pages/Myblogs';
import Profile from './pages/Profile';
import Editblog from './pages/Editblog';
import Adminpanel from './pages/Adminpanel';
import Createrole from './pages/Createrole';
import Allusers from './pages/Allusers';
import Addcategory from './pages/Addcategory';
import AllBlogs from './pages/AllBlogs';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/blog/:id' element={<Blog/>}></Route>
            <Route path='/create' element={<Createblog/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/privacy-policy' element={<Policy/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/myblogs' element={<Myblogs/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/editblog/:id' element={<Editblog/>}></Route>
            <Route path='/adminpanel' element={<Adminpanel/>}></Route>
            <Route path='/createrole' element={<Createrole/>}></Route>
            <Route path='/allusers' element={<Allusers/>}></Route>
            <Route path='/addcategory' element={<Addcategory/>}></Route>
            <Route path='/allblogs' element={<AllBlogs/>}></Route>
            <Route path='*' element={<Nopage/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
