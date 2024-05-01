import React from 'react'
import GoogleIcon from"../data/google.svg";
import TwitterIcon from"../data/twitter.svg";
import InstagramIcon from"../data/instagram.svg";
  import YoutubeIcon from"../data/youtube.svg";



const Footer = () => {
  return (
    <footer className='w-full h-[158px] min-h-[158px] lg:h-[221px] lg:min-h-[221px] flex flex-col justify-center items-center bg-[#F5F7FA]'>
      <div className='flex justify-center items-center space-x-6'>
        <div className='w-[18px] h-[18px]'>
          <img src={GoogleIcon} className='w-full h-full object-cover' alt='google' width="100%" height="100%"/>
        </div>
        <div className='w-[18px] h-[18px]'>
          <img src={TwitterIcon} className='w-full h-full object-cover' alt='twitter' width="100%" height="100%"/>
        </div>
        <div className='w-[18px] h-[18px]'>
          <img src={InstagramIcon} className='w-full h-full object-cover' alt='Instagram' width="100%" height="100%"/>
        </div>
        <div className='w-[18px] h-[18px]'>
          <img src={YoutubeIcon} className='w-full h-full object-cover' alt='youtube' width="100%" height="100%"/>
        </div>
      </div>
      <div className='mt-4 w-full'>
        <p className='text-[16px] text-[#3D3C3C] font-semibold text-center'>Contact us</p>
      </div>
    </footer>
  )
}

export default Footer