import React from 'react';
import './Home.css';
import MultiItemCarousel from './MultiItemCarousel';
import RestaurantCard from './Restaurant/RestaurantCard';

const restaurant = [1, 1, 1, 1, 1, 1, 1, 1];

const Home = () => {
  return (
    <div className="pb-10">
      {/* Banner Section */}
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <h1 className="text-2xl lg:text-6xl font-bold z-10 py-5">SnapPick</h1>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Taste the Convenience: Food, Fast and Delivered
          </p>
        </div>
        {/* Background Cover */}
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>

      {/* Top Meals Section */}
      <section className="p-10 lg:py-10 lg:px-20">
        <h2 className="text-2xl font-semibold text-gray-400 py-3">Top Meals</h2>
        <MultiItemCarousel />
      </section>

      {/* Handpicked Favourites Section */}
      <section className="px-5 lg:px-20 pt-10">
        <h2 className="text-2xl font-semibold text-gray-400 pb-8">
          Order From Our Handpicked Favourites
        </h2>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurant.map((item, index) => (
            <RestaurantCard key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;