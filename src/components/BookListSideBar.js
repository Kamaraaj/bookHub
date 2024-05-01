import React from 'react'

const BookListSideBar = () => {
  return (
    <div className='md:p-[32px] md:min-w-[256px] md:w-[256px] md:max-w-[256px]'>
        <h1 className='text-[#334155] text-[20px] font-semibold leading-[32px] mb-[16px]'>
            Bookshelves
        </h1>
        <div className='flex flex-row flex-wrap whitespace-nowrap md:flex-col md:space-y-[12px]'>
        <button className='text-[#0284C7]  text-[12px] text-center leading-[16px] px-[16px] py-[4px] border border-[#0284C7] rounded-full mr-[12px] md:text-[#0284C7] md:text-[16px] md:text-left font-semibold md:leading-[24px] md:p-0 md:border-0 md:rounded-none md:mr-0'>All</button>
            <button className='text-[#0284C7]  text-[12px] text-center leading-[16px] px-[16px] py-[4px] border border-[#0284C7] rounded-full mr-[12px] md:text-[#475569] md:text-[16px] md:text-left font-semibold md:leading-[24px] md:p-0 md:border-0 md:rounded-none md:mr-0'>Read</button>
            <button className='text-[#0284C7]  text-[12px] text-center leading-[16px] px-[16px] py-[4px] border border-[#0284C7] rounded-full sm:mr-[12px] md:text-[#475569] md:text-[16px] md:text-left font-semibold md:leading-[24px] md:p-0 md:border-0 md:rounded-none md:mr-0'>Currently Reading</button>
            <button className='text-[#0284C7]  text-[12px] text-center leading-[16px] px-[16px] py-[4px] border border-[#0284C7] rounded-full mt-[16px] sm:mt-0 md:text-[#475569]  md:text-[16px] md:text-left font-semibold md:leading-[24px] md:p-0 md:border-0 md:rounded-none md:mt-'>Want to Read</button>
        </div>

    </div>
  )
}

export default BookListSideBar