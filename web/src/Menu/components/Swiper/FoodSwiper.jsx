import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import './FoodSwiper.css'

import { StoreContext } from '../../../context/StoreContext';
import Product_Card from '../Product_Card/Product_Card';
import My_Product_Card from '../Product_Card/My_Product_Card';


function FoodSwiper({ category }) {

  const { onSaleProduct } = useContext(StoreContext)
  const food_list = onSaleProduct()

  let filteredList = []

  if (category===0) {filteredList = food_list}
  else {filteredList = food_list.filter(food => food.category == category)};

  console.log("Food list:", food_list);
  console.log("Category:", category);

  return (
    <div className='container'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView="auto"
        navigation={true}
        pagination={{ clickable: true,
                      type: "progressbar"
         }}
      >
        {filteredList.map((food) => (
          <SwiperSlide className='swiper-slide' key={food._id}>
            <My_Product_Card food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FoodSwiper
