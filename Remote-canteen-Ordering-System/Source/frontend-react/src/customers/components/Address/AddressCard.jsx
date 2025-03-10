import { useState } from "react";
import { Button, Card, Snackbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    handleSelectAddress(item);
    setOpen(true);
  };

  return (
    <Card className="flex space-x-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
        </p>

        {showButton && (
          <Button onClick={handleClick} variant="outlined" className="w-full">
            Select
          </Button>
        )}

        {/* Snackbar for feedback */}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Order Placed successfully!"
        />
      </div>
    </Card>
  );
};

export default AddressCard;
