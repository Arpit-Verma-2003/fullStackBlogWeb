import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  const menu = [
    {text:'Trending',path:'/'},
    {text:'National',path:'/'},
    {text:'Sports',path:'/'},
    {text:'Politics',path:'/'}
  ]
  return (
    <div>
      {/* header */}
      <div className="border-b">
        <div className="container flex pb-5 justify-between">
         <Link to='/'><span className='font-extrabold text-2xl'>BlogPost</span></Link>
          <div className="flex">
            <ul className="flex">
              {
                menu.map(x=>{
                  return <li className='p-2'><Link>{x.text}</Link></li>
                })
              }
            </ul>
            <Link to={'/create'}><button className='bg-slate-900 text-white rounded p-1'>Add Blog</button> </Link>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex mx-auto">
        <div className='my-5 min-h-[500px] w-full'>
          <Outlet></Outlet>        
        </div>
      </div>
      {/* footer */}
      <div className='flex bg-slate-400'>
        <div className='justify-center items-center flex mx-auto p-20'>
          <h3 className='text-white text-2xl'>BlogPost</h3>
        </div>
      </div>
    </div>
  )
}

export default Layout