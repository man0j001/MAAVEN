import React from 'react'
import HeroVideo from "../../assets/video/4.mp4"
import HeroVideo1 from "../../assets/video/4a.mp4"
import ProductGroup from '../layout/ProductGroup'
import { NewArrival } from '../layout/NewArrival'


function Home() {
  return (<>
    <div className='mx-6 lg:mx-16 mt-8 md:mt-16'>
    <div className='rounded-xl relative '>
      <video  className='rounded-[30px] hidden md:block' autoPlay muted loop>
       <source src={HeroVideo} type="video/mp4"/>
  Your browser does not support the video tag.
      </video>

      <video  className='rounded-2xl md:hidden' autoPlay muted loop>
       <source src={HeroVideo1} type="video/mp4"/>
  Your browser does not support the video tag.
      </video>
      <div className='absolute bottom-0 p-3 md:p-9 '>
        <h2 className="font-monument text-black text-2xl md:text-6xl font-extrabold">RIGHT TO</h2>
        <h2 className="font-monument text-black text-3xl md:text-7xl font-extrabold">FASHION</h2>
        <a className='flex' href=''><p className='mr-3 font-bold rounded-3xl  text:lg md:text-xl md:py-2 md:px-3 py-1 px-2 bg-gray-600 hover:bg-gray-500 bg-opacity-60 backdrop-filter backdrop-blur-lg font-nlink'>SHOP NOW</p></a>
      </div>
      </div>
      <NewArrival/>
      </div>
      </>
  )
}

export default Home