"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const SimilarProductsSlider = ({ similarProducts }) => {
  return (
    <div className="w-full max-w-[90vw] md:max-w-[680px] lg:max-w-4xl mx-auto pb-8"> {/* Constrain max width */}
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="pb-10 w-full" // Ensure Swiper itself has w-full
          style={{ maxWidth: "100%" }} // Inline style to enforce boundary
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group h-[340px] bg-white shadow-lg rounded-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-[200px] h-[200px] overflow-hidden rounded-lg">
                  <Image
                    width={200}
                    height={200}
                    src={product.product_photo}
                    alt={product.product_title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm mt-3 font-medium text-gray-700 text-center line-clamp-1 md:line-clamp-2">
                  {product.product_title}
                </h3>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  {product.product_price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Centered Pagination Below */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductsSlider;