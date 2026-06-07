import { useState, memo } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Product from "@/Interfaces/Product";
import { useNavigate } from "react-router-dom";

function ProductCard({productInfo}:{productInfo:Product}) {
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate();

  const Allsizes:string[] = ["XS","S","M","L","XL"]

  const distinctColors = new Set(productInfo.images.map((img) => img.color)).size;

  // Commented out API URL - using dummy data images directly
  // const url ="http://127.0.0.1:8000/media/"

  function HandelCurrentImage(indexOfCurrentImage:number) {
    setCurrentImage(indexOfCurrentImage)
  }
  function handlePreviousImage(){
    setCurrentImage(prevIndex =>
      prevIndex === 0 ? productInfo.images.length - 1 : prevIndex - 1
    );
  };

  function handleNextImage (){
    setCurrentImage(prevIndex =>
      (prevIndex + 1) % productInfo.images.length
    );
  };

  const handleCardClick = () => {
    navigate(`/products/${productInfo.id}`);
  };

  return (
    <div
      className="w-64 h-98 my-20 group overflow-hidden grid grid-rows-4 gap-2 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="w-full  row-span-3 relative overflow-hidden">
        <div className="w-full flex justify-center">
          <LazyLoadImage
            className="rounded-xl w-full h-[320px]"
            src={productInfo.images[currentImage].image}
            height="320"
            alt="igm1"
          />
          {/* Add to Cart */}
          <div className="h-20 w-52 bg-slate-300 dark:bg-neutral-800 bg-opacity-60 dark:bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-xl border dark:border-neutral-700 absolute top-80 py-1 px-1.5 group-hover:top-72 transition-all duration-500 ease-in-out group-hover:hover:top-56 peer">
            <div className=" py-1 flex justify-between border-b-2 border-gray-400 dark:border-neutral-600"><h5 className="font-enter font-bold text-sm">QUICK ADD</h5>
                  <button className="font-enter font-bold"><FiPlus/></button></div>
          <div className="grid grid-cols-5 gap-2 px-1 py-3">
          {Allsizes.map(allsize => {
  const matchingSize = productInfo.sizes.find(size => size.name === allsize);
  if (matchingSize) {
    return (
      <button key={matchingSize.name} className="font-enter font-bold text-sm bg-inherit hover:bg-slate-300 dark:hover:bg-neutral-600 rounded-sm  p-0.5">
        {matchingSize.name}
      </button>
    );
  } else {
    return (
      <button key={allsize} className="text-gray-700 dark:text-neutral-400 font-enter font-bold text-sm- bg-inherit rounded-sm  p-0.5" disabled>
        <del>{allsize}</del>
      </button>
    );
  }
})}


          </div>
          </div>
        {/* Arrow */}

        <div className="w-[310px] absolute bottom-20 flex justify-between group-hover:w-52 peer-hover:w-[310px] transition-all duration-500 ease-in-out">
            <button onClick={handlePreviousImage} className="bg-slate-300 dark:bg-neutral-700 bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-slate-400 dark:hover:bg-neutral-600 rounded-full p-0.5
            "> <MdKeyboardArrowLeft size={20}  /></button>
          <button onClick={handleNextImage} className="bg-slate-300 dark:bg-neutral-700 bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-slate-400 dark:hover:bg-neutral-600 rounded-full p-0.5 "> <MdKeyboardArrowRight size={20}   /></button>
        </div>

        </div>

      </div>
      {/* Details */}
      <div>
        <ul className="group-hover:hidden">
          <li className="font-enter text-sm font-extrabold">{productInfo.productName}</li>
          <li className="font-enter text-[12px] font-extrabold text-gray-700 dark:text-neutral-400">
            <span>{productInfo.images[currentImage].color}</span>
            {distinctColors > 1 && (
              <span className="ml-2 text-white bg-gray-800 dark:bg-neutral-700 rounded-md py-0.5 px-1 font-normal">
                {distinctColors} color
              </span>
            )}
          </li>
          <li className="font-enter text-[12px] font-extrabold text-gray-800 dark:text-neutral-300">
            ${productInfo.price}
          </li>
        </ul>

        <div className="hidden w-ful rounded-lg group-hover:flex justify-center w-full bg-slate-300 dark:bg-neutral-800 bg-opacity-60 backdrop-filter backdrop-blur-lg border dark:border-neutral-700 overflow-x-hidden">
          {productInfo.images.map((image,index) =><div key={index} onClick={()=>{HandelCurrentImage(index)}} className="cursor-pointer"><LazyLoadImage className="rounded-lg p-0.5" width={44} height={44} src={image.image} /></div> )}
        </div>
      </div>
    </div>
  );
}

// Memoized: each carousel renders many cards; this avoids re-rendering them
// all when a parent's state (e.g. the gender toggle) changes.
export default memo(ProductCard);
