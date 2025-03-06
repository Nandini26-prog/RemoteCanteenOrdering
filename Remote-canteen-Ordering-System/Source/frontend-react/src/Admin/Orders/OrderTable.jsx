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
  List,
  ListItem,
  Select,
  TextField
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

const pickupOptions = ["5 mins", "15 mins", "30 mins", "Other"];

const OrdersTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pickupTimes, setPickupTimes] = useState({});
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

  const handlePickupChange = (orderId, value) => {
    setPickupTimes((prev) => ({ ...prev, [orderId]: value }));
  };

  return (
    <Box display="flex" gap={2}>
      <Card className="mt-1" sx={{ flex: 2 }}>
        <CardHeader title={name} />
        <TableContainer>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Order Date & Time</TableCell>
                <TableCell>Pickup Time</TableCell>
                <TableCell>Food Item</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Quantity</TableCell>
                {!isDashboard && <TableCell>Status</TableCell>}
                {!isDashboard && <TableCell>Update</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsOrder.orders?.map((order, orderIndex) =>
                order.items.map((orderItem, itemIndex) => (
                  <TableRow hover key={`${order.id}-${orderItem.food.id}`}>
                    {itemIndex === 0 && (
                      <>
                        <TableCell rowSpan={order.items.length}>{order.id}</TableCell>
                        <TableCell rowSpan={order.items.length}>{order.customer.fullName}</TableCell>
                        <TableCell rowSpan={order.items.length}>₹{order.totalAmount}</TableCell>
                        <TableCell rowSpan={order.items.length}>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        <TableCell rowSpan={order.items.length}>
                          <Select
                            value={pickupTimes[order.id] || ""}
                            onChange={(e) => handlePickupChange(order.id, e.target.value)}
                            displayEmpty
                            sx={{ minWidth: 120 }}
                          >
                            {pickupOptions.map((option) => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                          {pickupTimes[order.id] === "Other" && (
                            <TextField
                              type="number"
                              label="Custom (mins)"
                              variant="outlined"
                              size="small"
                              sx={{ mt: 1, width: "100px" }}
                              onChange={(e) => handlePickupChange(order.id, `${e.target.value} mins`)}
                            />
                          )}
                        </TableCell>
                      </>
                    )}

                    {/* Food Item Name */}
                    <TableCell>
                      <AvatarGroup max={4}>
                        <Avatar
                          alt={orderItem.food.name}
                          src={orderItem.food.images[0]}
                          onClick={() => setSelectedItem(orderItem.food)}
                        />
                      </AvatarGroup>
                      <Typography>{orderItem.food.name}</Typography>
                    </TableCell>

                    {/* Ingredients List */}
                    <TableCell>
                      <List>
                        {orderItem.ingredients?.map((ingredient, index) => (
                          <ListItem key={index}>{ingredient}</ListItem>
                        )) || <Typography>N/A</Typography>}
                      </List>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell>{orderItem.quantity}</TableCell>

                    {/* Status & Update Button */}
                    {!isDashboard && itemIndex === 0 && (
                      <>
                        <TableCell rowSpan={order.items.length}>
                          <Chip
                            label={order.orderStatus}
                            size="small"
                            color={
                              order.orderStatus === "PENDING"
                                ? "info"
                                : order.orderStatus === "DELIVERED"
                                ? "success"
                                : "secondary"
                            }
                          />
                        </TableCell>
                        <TableCell rowSpan={order.items.length}>
                          <Button onClick={(event) => handleUpdateStatusMenuClick(event, orderIndex)}>
                            Status
                          </Button>
                          <Menu
                            anchorEl={anchorElArray[orderIndex]}
                            open={Boolean(anchorElArray[orderIndex])}
                            onClose={() => handleUpdateStatusMenuClose(orderIndex)}
                          >
                            {orderStatus.map((s) => (
                              <MenuItem key={s.value} onClick={() => handleUpdateOrder(order.id, s.value, orderIndex)}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Menu>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Backdrop open={restaurantsOrder.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;



