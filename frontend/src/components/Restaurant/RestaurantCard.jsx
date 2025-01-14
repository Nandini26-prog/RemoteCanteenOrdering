import React from 'react';
import { Card, Chip, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RestaurantCard = () => {
  const isOpen = true; // Example flag for the restaurant's status
  const isLiked = true; // Example flag for like status

  return (
    <Card className="w-[18rem]">
      <div
        className={`${
          isOpen ? 'cursor-pointer' : 'cursor-not-allowed'
        } relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1707802815/ux3xq93xzfbqhtudigv2.jpg"
          alt="Restaurant"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={isOpen ? 'success' : 'error'}
          label={isOpen ? 'open' : 'closed'}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">Indian Fast Food</p>
          <p className="text-gray-500 text-sm">
            Craving it all? Dive into our global flavors...
          </p>
        </div>
        <div>
          <IconButton>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;