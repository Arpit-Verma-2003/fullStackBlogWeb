import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
const Layout = () => {
  const menu = [
    {text:'Trending',path:'/'},
    {text:'National',path:'/'},
    {text:'Sports',path:'/'},
    {text:'Politics',path:'/'}
  ]
  return (
    <>
      {/* header */}
      <div className="border-b p-5">
        <div className="container flex pb-5 justify-between">
         <Link to='/'><span className='font-extrabold text-2xl'>BlogPost</span></Link>
          <div className="flex">
            <ul className="flex">
              {
                menu.map((x,i)=>{
                  return <li key={i} className='p-2'><Link to={`/?category=${x.text}`}>{x.text}</Link></li>
                })
              }
            </ul>
            <Link to={'/create'}><button className='bg-slate-900 text-white rounded p-1'>Add Blog</button> </Link>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex mx-auto justify-center">
        <div className='my-5 min-h-[500px] w-[1280px]'>
          <Outlet></Outlet>        
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Layout