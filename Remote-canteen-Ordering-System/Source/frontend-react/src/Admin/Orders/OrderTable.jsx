import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../State/Admin/Order/restaurants.order.action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrdersTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateOrder = (orderId, orderStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantity((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + value),
    }));
  };

  const handlePreviewItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box display="flex" gap={2}>
      <Card className="mt-1" sx={{ flex: 2 }}>
        <CardHeader title={name} />
        <TableContainer>
          <Table aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                {!isDashboard && <TableCell>Status</TableCell>}
                {!isDashboard && <TableCell>Update</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsOrder.orders?.map((item, index) => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <AvatarGroup max={4}>
                      {item.items.map((orderItem) => (
                        <Avatar
                          key={orderItem.food.id}
                          alt={orderItem.food.name}
                          src={orderItem.food.images[0]}
                          onClick={() => handlePreviewItem(orderItem.food)}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>{item.customer.email}</TableCell>
                  <TableCell>₹{item.totalAmount}</TableCell>
                  <TableCell>
                    {item.items.map((orderItem) => (
                      <p key={orderItem.food.id}>{orderItem.food.name}</p>
                    ))}
                  </TableCell>
                  <TableCell>
                    {item.items.map((orderItem) => (
                      <Box key={orderItem.food.id} display="flex" alignItems="center" gap={1}>
                        <Button onClick={() => handleQuantityChange(orderItem.food.id, -1)}>-</Button>
                        <Typography>{quantity[orderItem.food.id] || 1}</Typography>
                        <Button onClick={() => handleQuantityChange(orderItem.food.id, 1)}>+</Button>
                      </Box>
                    ))}
                  </TableCell>
                  {!isDashboard && (
                    <TableCell>
                      <Chip label={item.orderStatus} size="small" color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "DELIVERED"
                          ? "success"
                          : "secondary"
                      } />
                    </TableCell>
                  )}
                  {!isDashboard && (
                    <TableCell>
                      <Button onClick={(event) => handleUpdateStatusMenuClick(event, index)}>
                        Status
                      </Button>
                      <Menu
                        anchorEl={anchorElArray[index]}
                        open={Boolean(anchorElArray[index])}
                        onClose={() => handleUpdateStatusMenuClose(index)}
                      >
                        {orderStatus.map((s) => (
                          <MenuItem key={s.value} onClick={() => handleUpdateOrder(item.id, s.value, index)}>
                            {s.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {selectedItem && (
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Preview</Typography>
          <Avatar src={selectedItem.images[0]} sx={{ width: 100, height: 100, my: 2 }} />
          <Typography>Name: {selectedItem.name}</Typography>
          <Typography>Price: ₹{selectedItem.price}</Typography>
        </Card>
      )}
      <Backdrop open={restaurantsOrder.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;
