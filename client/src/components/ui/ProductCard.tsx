import { useState } from "react";
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
      prevIndex === 0 ? productInfo.images.length - 1 : 0
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
          <div className="h-20 w-52 bg-slate-300 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl border absolute top-80 py-1 px-1.5 group-hover:top-72 transition-all duration-500 ease-in-out group-hover:hover:top-56 peer">
            <div className=" py-1 flex justify-between border-b-2 border-gray-400"><h5 className="font-enter font-bold text-sm">QUICK ADD</h5>
                  <button className="font-enter font-bold"><FiPlus/></button></div>
          <div className="grid grid-cols-5 gap-2 px-1 py-3">
          {Allsizes.map(allsize => {
  const matchingSize = productInfo.sizes.find(size => size.name === allsize);
  if (matchingSize) {
    return (
      <button key={matchingSize.name} className="font-enter font-bold text-sm bg-inherit hover:bg-slate-300 rounded-sm  p-0.5">
        {matchingSize.name}
      </button>
    );
  } else {
    return (
      <button key={allsize} className="text-gray-700 font-enter font-bold text-sm- bg-inherit rounded-sm  p-0.5" disabled>
        <del>{allsize}</del>
      </button>
    );
  }
})}


          </div>
          </div>
        {/* Arrow */}

        <div className="w-[310px] absolute bottom-20 flex justify-between group-hover:w-52 peer-hover:w-[310px] transition-all duration-500 ease-in-out">
            <button onClick={handlePreviousImage} className="bg-slate-300 bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-slate-400 rounded-full p-0.5  
            "> <MdKeyboardArrowLeft size={20}  /></button>
          <button onClick={handleNextImage} className="bg-slate-300 bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-slate-400 rounded-full p-0.5 "> <MdKeyboardArrowRight size={20}   /></button>
        </div>
  
        </div>

      </div>
      {/* Details */}
      <div>
        <ul className="group-hover:hidden">
          <li className="font-enter text-sm font-extrabold">{productInfo.productName}</li>
          <li className="font-enter text-[12px] font-extrabold text-gray-700">
            <span>{productInfo.images[currentImage].color}</span>
            <span className="ml-2 text-white bg-gray-800 rounded-md py-0.5 px-1 font-normal">
              {productInfo.images.length} color
            </span>
          </li>
          <li className="font-enter text-[12px] font-extrabold text-gray-800">
            ${productInfo.price}
          </li>
        </ul>

        <div className="hidden w-ful rounded-lg group-hover:flex justify-center w-full bg-slate-300 bg-opacity-60 backdrop-filter backdrop-blur-lg border overflow-x-hidden">
          {productInfo.images.map((image,index) =><div key={index} onClick={()=>{HandelCurrentImage(index)}}><LazyLoadImage className="rounded-lg p-1" width={70} height={70} src={image.image} /></div> )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
