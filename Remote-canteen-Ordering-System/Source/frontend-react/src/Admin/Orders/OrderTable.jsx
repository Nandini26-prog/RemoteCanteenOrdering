// import {
//   Avatar,
//   AvatarGroup,
//   Backdrop,
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Chip,
//   CircularProgress,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";

// import React, { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRestaurantsOrder,
//   updateOrderStatus,
// } from "../../State/Admin/Order/restaurants.order.action";
// // import {
// //   confirmOrder,
// //   deleteOrder,
// //   deliveredOrder,
// //   getOrders,
// //   shipOrder,
// // } from "../../state/Admin/Order/Action";

// const orderStatus = [
//   { label: "Pending", value: "PENDING" },
//   { label: "Completed", value: "COMPLETED" },
//   { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
//   { label: "Delivered", value: "DELIVERED" },
// ];

// const OrdersTable = ({ isDashboard, name }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ status: "", sort: "" });
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { restaurantsOrder } = useSelector((store) => store);
//   const [anchorElArray, setAnchorElArray] = useState([]);
//   const { id } = useParams();

//   const handleUpdateStatusMenuClick = (event, index) => {
//     const newAnchorElArray = [...anchorElArray];
//     newAnchorElArray[index] = event.currentTarget;
//     setAnchorElArray(newAnchorElArray);
//   };

//   const handleUpdateStatusMenuClose = (index) => {
//     const newAnchorElArray = [...anchorElArray];
//     newAnchorElArray[index] = null;
//     setAnchorElArray(newAnchorElArray);
//   };

//   const handleUpdateOrder = (orderId, orderStatus, index) => {
//     handleUpdateStatusMenuClose(index);
//     dispatch(updateOrderStatus({ orderId, orderStatus,jwt }));
//   };

//   // console.log("restaurants orders store ", restaurantsOrder)

//   return (
//     <Box>
//       <Card className="mt-1">
//         <CardHeader
//           title={name}
//           sx={{
//             pt: 2,
//             alignItems: "center",
//             "& .MuiCardHeader-action": { mt: 0.6 },
//           }}
//         />
//         <TableContainer>
//           <Table sx={{}} aria-label="table in dashboard">
//             <TableHead>
//               <TableRow>
//               <TableCell>Id</TableCell>
//                 <TableCell>Image</TableCell>
//                 {/* {!isDashboard && <TableCell>Title</TableCell>} */}
//                 <TableCell>Customer</TableCell>
//                 <TableCell>Price</TableCell>
             
//                 <TableCell>Name</TableCell>
//                 {!isDashboard && <TableCell>Ingredients</TableCell>}
//                 {!isDashboard &&<TableCell>Status</TableCell>}
//                 {!isDashboard && (
//                   <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
//                 )}
//                 {/* {!isDashboard && (
//                   <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
//                 )} */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {restaurantsOrder.orders
//                 ?.slice(0, isDashboard ? 7 : restaurantsOrder.orders.length)
//                 .map((item, index) => (
//                   <TableRow
//                     className="cursor-pointer"
//                     hover
//                     key={item.id}
//                     sx={{
//                       "&:last-of-type td, &:last-of-type th": { border: 0 },
//                     }}
//                   >
//                     <TableCell>{item?.id}</TableCell>
//                     <TableCell sx={{}}>
//                       <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
//                         {item.items.map((orderItem) => (
//                           <Avatar
//                             alt={orderItem.food.name}
//                             src={orderItem.food?.images[0]}
//                           />
//                         ))}
//                       </AvatarGroup>{" "}
//                     </TableCell>

//                     <TableCell sx={{}}>
//                       {item?.customer.email}
//                     </TableCell>

//                     <TableCell>₹{item?.totalAmount}</TableCell>
                    
//                     <TableCell className="">
//                       {item.items.map((orderItem) => (
//                         <p>
//                           {orderItem.food?.name}
//                         </p>
//                       ))}
//                     </TableCell>
//                   {!isDashboard &&  <TableCell className="space-y-2">
//                       {item.items.map((orderItem) =>
//                       <div className="flex gap-1 flex-wrap">
//                        { orderItem.ingredients?.map((ingre) => (
//                           <Chip label={ingre} />
//                         ))}
//                       </div>
                        
//                       )}
//                     </TableCell>}
//                     {!isDashboard &&<TableCell className="text-white">
//                       <Chip
//                         sx={{
//                           color: "white !important",
//                           fontWeight: "bold",
//                           textAlign: "center",
//                         }}
//                         label={item?.orderStatus}
//                         size="small"
//                         color={
//                           item.orderStatus === "PENDING"
//                             ? "info"
//                             : item?.orderStatus === "DELIVERED"
//                             ? "success"
//                             : "secondary"
//                         }
//                         className="text-white"
//                       />
//                     </TableCell>}
//                     {!isDashboard && (
//                       <TableCell
//                         sx={{ textAlign: "center" }}
//                         className="text-white"
//                       >
//                         <div>
//                           <Button
//                             id={`basic-button-${item?.id}`}
//                             aria-controls={`basic-menu-${item.id}`}
//                             aria-haspopup="true"
//                             aria-expanded={Boolean(anchorElArray[index])}
//                             onClick={(event) =>
//                               handleUpdateStatusMenuClick(event, index)
//                             }
//                           >
//                             Status
//                           </Button>
//                           <Menu
//                             id={`basic-menu-${item?.id}`}
//                             anchorEl={anchorElArray[index]}
//                             open={Boolean(anchorElArray[index])}
//                             onClose={() => handleUpdateStatusMenuClose(index)}
//                             MenuListProps={{
//                               "aria-labelledby": `basic-button-${item.id}`,
//                             }}
//                           >
//                             {orderStatus.map((s) => (
//                               <MenuItem
//                                 onClick={() =>
//                                   handleUpdateOrder(item.id, s.value, index)
//                                 }
//                               >
//                                 {s.label}
//                               </MenuItem>
//                             ))}
//                           </Menu>
//                         </div>
//                       </TableCell>
//                     )}
//                     {/* {!isDashboard && (
//                     <TableCell
//                       sx={{ textAlign: "center" }}
//                       className="text-white"
//                     >
//                       <Button
//                         onClick={() => handleDeleteOrder(item._id)}
//                         variant="text"
//                       >
//                         delete
//                       </Button>
//                     </TableCell>
//                   )} */}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
      

//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={restaurantsOrder.loading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Box>
//   );
// };

// export default OrdersTable;

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

  const handlePreviewItem = (item) => {
    setSelectedItem(item);
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
                        <TableCell rowSpan={order.items.length}>{new Date(order.date).toLocaleString()}</TableCell>
                      </>
                    )}

                    {/* Food Item Name */}
                    <TableCell>
                      <AvatarGroup max={4}>
                        <Avatar
                          alt={orderItem.food.name}
                          src={orderItem.food.images[0]}
                          onClick={() => handlePreviewItem(orderItem.food)}
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
      
      {/* Preview Section */}
      {selectedItem && (
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Preview</Typography>
          <Avatar src={selectedItem.images[0]} sx={{ width: 100, height: 100, my: 2 }} />
          <Typography>Name: {selectedItem.name}</Typography>
          <Typography>Price: ₹{selectedItem.price}</Typography>
          <Typography>Ingredients:</Typography>
          <List>
            {selectedItem.ingredients?.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            )) || <Typography>N/A</Typography>}
          </List>
        </Card>
      )}

      <Backdrop open={restaurantsOrder.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;