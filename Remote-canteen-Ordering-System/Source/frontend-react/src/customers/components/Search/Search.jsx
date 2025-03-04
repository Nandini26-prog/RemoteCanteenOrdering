import React, { useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../State/Customers/Menu/menu.action";

const Search = () => {
  const dispatch = useDispatch();
  const { menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search to reduce unnecessary API calls
  const handleSearchMenu = useCallback((keyword) => {
    // Only dispatch search if keyword is not empty
    if (keyword.trim() !== "") {
      console.log("Searching for:", keyword);
      dispatch(searchMenuItem({ 
        keyword, 
        jwt: auth.jwt || jwt 
      }));
    }
  }, [dispatch, auth.jwt, jwt]);

  // Controlled input with debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Use debounce to reduce API calls
    const timeoutId = setTimeout(() => {
      handleSearchMenu(value);
    }, 500); // 500ms delay

    // Clear timeout to prevent multiple calls
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2 text-gray-400" />
        <input
          value={searchTerm}
          onChange={handleInputChange}
          className="p-2 py-3 pl-12 w-full bg-[#242B2E] rounded-sm outline-none text-white"
          type="text"
          placeholder="Search food..."
        />
      </div>
      
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap">
          {topMeels.slice(0, 9).map((item, index) => (
            <PopularCuisines 
              key={index} 
              image={item.image} 
              title={item.title} 
            />
          ))}
        </div>
      </div>
      
      <div className="mt-7">
        {menu.search.length > 0 ? (
          menu.search.map((item, index) => (
            <SearchDishCard 
              key={item.id || index} 
              item={item} 
            />
          ))
        ) : (
          searchTerm.trim() !== "" ? (
            <p className="text-gray-500">No results found.</p>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Search;