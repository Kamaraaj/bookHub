import React from 'react';
import bookHubLogo from '../data/bookHubLogo.svg';
import wapHeaderMenu from '../data/wapHeaderMenu.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-[#FFFFFF]'>
        <div className='px-6 py-4 lg:px-[150px] lg:py-6 border border-[#E4E7EB] flex flex-row justify-between items-center'>
        <Link to='/home' className="w-[92px] h-[24px] lg:w-[133px] lg:h-[41px]">
                <img
                  // src="https://drive.google.com/uc?export=view&id=17W3o2KXqPFOGXe4M3JXldAZQYy9lIXk4"
                  src={bookHubLogo}
                  className="w-full h-full object-cover"
                  alt="logo"
                  width="100%"
                  height="100%"
                />
        </Link >
        <div className='hidden lg:flex flex-row space-x-6 justify-between items-center' >
            <Link to='/home'>Home</Link>
            <div className='flex flex-row space-x-8 justify-between items-center'>
                <Link to="/BooksListPage">Bookshelves</Link>
                <Link to="/">Logout</Link>                
            </div>

        </div>
        <div className='block lg:hidden relative'>
            <div className='w-[16px] max-w-[16px] h-[16px] max-h-[16px]'>
                <img src={wapHeaderMenu} className='w-full h-full object-cover' alt='wapMenu' width='100%' height='100' />
            </div>

        </div>
        </div>

    </header>
  )
}

export default Header