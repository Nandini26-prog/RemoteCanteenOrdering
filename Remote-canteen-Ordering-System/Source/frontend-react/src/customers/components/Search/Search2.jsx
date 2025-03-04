import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../State/Customers/Menu/menu.action";

const dish = [1, 1, 1, 1];
const Search = () => {
  const dispatch = useDispatch();
  const { menu,auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  // const handleSearchMenu = (keyword) => {
  //   dispatch(searchMenuItem({keyword,jwt:auth.jwt || jwt }));
  // };
  

  const handleSearchMenu = (keyword) => {
    console.log("Searching for:", keyword); // Debugging log
    dispatch(searchMenuItem({ keyword, jwt: auth.jwt || jwt }));
};

  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeels.slice(0, 9).map((item, index) => (
            <PopularCuisines key={index} image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      {/* <div className=" mt-7">
        {menu.search.map((item) => (
          <SearchDishCard item={item} />
        ))}
      </div> */}

<div className="mt-7">
  {/* {menu.search && menu.search.length > 0 ? (
    menu.search.map((item) => <SearchDishCard key={item.id} item={item} />)
  ) : (
    <p className="text-gray-500">No results found.</p>
  )} */}

    { menu.search.map((item, index) => (
      <SearchDishCard key={index} item={item} />
  ))}
</div>
    </div>
  );
};

export default Search;
