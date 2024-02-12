import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import AlbumItems from "./AlbumItems";
import { useRef } from "react";

const Slider = ({ data }) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 800;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 800;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <MdOutlineKeyboardArrowLeft className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer lg:block"  onClick={scrollLeft}/>

      <div className="grid grid-rows-2 lg:grid-rows-2 grid-flow-col-dense justify-between items-center gap-4 overflow-x-scroll w-full lg:w-[78vw] px-5 scroll-hide" ref={scrollRef}>

        {data?.map((album) => (
          <AlbumItems key={album.id} {...album} />
        ))}
      </div>

      <MdOutlineKeyboardArrowRight className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer lg:block" onClick={scrollRight} />
    </div>
  );
};

export default Slider;
