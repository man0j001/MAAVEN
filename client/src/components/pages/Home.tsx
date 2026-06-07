import { useEffect, useState } from 'react'
import HeroVideo from "../../assets/video/4.mp4"
import HeroVideo1 from "../../assets/video/4a.mp4"
import { NewArrival } from '../layout/NewArrival'
import FourCollections from '../layout/FourCollections'
import ProductCarousel from '../layout/ProductCarousel'
import ShopByCategory from '../layout/ShopByCategory'

const isClient = typeof window !== 'undefined'

function Home() {
  // Load only the video for the current breakpoint — avoids downloading both
  // hero videos (~50MB combined) on every page load.
  const [isDesktop, setIsDesktop] = useState(() =>
    isClient ? window.matchMedia('(min-width: 768px)').matches : true
  )
  const [reduceMotion, setReduceMotion] = useState(() =>
    isClient ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onResize = () => setIsDesktop(mq.matches)
    const onMotion = () => setReduceMotion(rm.matches)
    mq.addEventListener('change', onResize)
    rm.addEventListener('change', onMotion)
    return () => {
      mq.removeEventListener('change', onResize)
      rm.removeEventListener('change', onMotion)
    }
  }, [])

  const heroSrc = isDesktop ? HeroVideo : HeroVideo1

  return (
    <>
      <div className='mx-6 lg:mx-16 mt-8 md:mt-16 pb-16 md:pb-24'>
        <div className='rounded-xl relative '>
          {/* Single hero video for the active breakpoint. Honors reduced-motion:
              no autoplay, shows controls so the user can play it manually. */}
          <video
            key={heroSrc}
            className={isDesktop ? 'rounded-[30px] w-full' : 'rounded-2xl w-full'}
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
            controls={reduceMotion}
          >
            <source src={heroSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='absolute bottom-0 p-3 md:p-9 '>
            <h2 className="font-monument text-black text-2xl md:text-6xl font-extrabold">RIGHT TO</h2>
            <h2 className="font-monument text-black text-3xl md:text-7xl font-extrabold">FASHION</h2>
            <a className='flex' href=''><p className='mr-3 font-bold rounded-3xl  text:lg md:text-xl md:py-2 md:px-3 py-1 px-2 bg-gray-600 hover:bg-gray-500 bg-opacity-60 backdrop-filter backdrop-blur-lg font-nlink'>SHOP NOW</p></a>
          </div>
        </div>
        <NewArrival />
        <FourCollections />
        <ProductCarousel title="New fit energy" eyebrow="Just dropped" showGenderToggle defaultGender="Women" />
        <ShopByCategory />
      </div>
    </>
  )
}

export default Home
