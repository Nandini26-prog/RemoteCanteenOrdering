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
//   List,
//   ListItem,
//   Select,
//   TextField
// } from "@mui/material";

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRestaurantsOrder,
//   updateOrderStatus,
// } from "../../State/Admin/Order/restaurants.order.action";

// const orderStatus = [
//   { label: "Pending", value: "PENDING" },
//   { label: "Completed", value: "COMPLETED" },
//   { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
//   { label: "Delivered", value: "DELIVERED" },
// ];

// const pickupOptions = ["5 mins", "15 mins", "30 mins", "Other"];

// const OrdersTable = ({ isDashboard, name }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { restaurantsOrder } = useSelector((store) => store);
//   const [anchorElArray, setAnchorElArray] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [pickupTimes, setPickupTimes] = useState({});
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
//     dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
//   };

//   const handlePickupChange = (orderId, value) => {
//     setPickupTimes((prev) => ({ ...prev, [orderId]: value }));
//   };

//   return (
//     <Box display="flex" gap={2}>
//       <Card className="mt-1" sx={{ flex: 2 }}>
//         <CardHeader title={name} />
//         <TableContainer>
//           <Table aria-label="orders table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Order ID</TableCell>
//                 <TableCell>Customer</TableCell>
//                 <TableCell>Total Price</TableCell>
//                 <TableCell>Order Date & Time</TableCell>
//                 <TableCell>Pickup Time</TableCell>
//                 <TableCell>Food Item</TableCell>
//                 <TableCell>Ingredients</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 {!isDashboard && <TableCell>Status</TableCell>}
//                 {!isDashboard && <TableCell>Update</TableCell>}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {restaurantsOrder.orders?.map((order, orderIndex) =>
//                 order.items.map((orderItem, itemIndex) => (
//                   <TableRow hover key={`${order.id}-${orderItem.food.id}`}>
//                     {itemIndex === 0 && (
//                       <>
//                         <TableCell rowSpan={order.items.length}>{order.id}</TableCell>
//                         <TableCell rowSpan={order.items.length}>{order.customer.fullName}</TableCell>
//                         <TableCell rowSpan={order.items.length}>₹{order.totalAmount}</TableCell>
//                         <TableCell rowSpan={order.items.length}>{new Date(order.createdAt).toLocaleString()}</TableCell>
//                         <TableCell rowSpan={order.items.length}>
//                           <Select
//                             value={pickupTimes[order.id] || ""}
//                             onChange={(e) => handlePickupChange(order.id, e.target.value)}
//                             displayEmpty
//                             sx={{ minWidth: 120 }}
//                           >
//                             {pickupOptions.map((option) => (
//                               <MenuItem key={option} value={option}>{option}</MenuItem>
//                             ))}
//                           </Select>
//                           {pickupTimes[order.id] === "Other" && (
//                             <TextField
//                               type="number"
//                               label="Custom (mins)"
//                               variant="outlined"
//                               size="small"
//                               sx={{ mt: 1, width: "100px" }}
//                               onChange={(e) => handlePickupChange(order.id, `${e.target.value} mins`)}
//                             />
//                           )}
//                         </TableCell>
//                       </>
//                     )}

//                     {/* Food Item Name */}
//                     <TableCell>
//                       <AvatarGroup max={4}>
//                         <Avatar
//                           alt={orderItem.food.name}
//                           src={orderItem.food.images[0]}
//                           onClick={() => setSelectedItem(orderItem.food)}
//                         />
//                       </AvatarGroup>
//                       <Typography>{orderItem.food.name}</Typography>
//                     </TableCell>

//                     {/* Ingredients List */}
//                     <TableCell>
//                       <List>
//                         {orderItem.ingredients?.map((ingredient, index) => (
//                           <ListItem key={index}>{ingredient}</ListItem>
//                         )) || <Typography>N/A</Typography>}
//                       </List>
//                     </TableCell>

//                     {/* Quantity */}
//                     <TableCell>{orderItem.quantity}</TableCell>

//                     {/* Status & Update Button */}
//                     {!isDashboard && itemIndex === 0 && (
//                       <>
//                         <TableCell rowSpan={order.items.length}>
//                           <Chip
//                             label={order.orderStatus}
//                             size="small"
//                             color={
//                               order.orderStatus === "PENDING"
//                                 ? "info"
//                                 : order.orderStatus === "DELIVERED"
//                                 ? "success"
//                                 : "secondary"
//                             }
//                           />
//                         </TableCell>
//                         <TableCell rowSpan={order.items.length}>
//                           <Button onClick={(event) => handleUpdateStatusMenuClick(event, orderIndex)}>
//                             Status
//                           </Button>
//                           <Menu
//                             anchorEl={anchorElArray[orderIndex]}
//                             open={Boolean(anchorElArray[orderIndex])}
//                             onClose={() => handleUpdateStatusMenuClose(orderIndex)}
//                           >
//                             {orderStatus.map((s) => (
//                               <MenuItem key={s.value} onClick={() => handleUpdateOrder(order.id, s.value, orderIndex)}>
//                                 {s.label}
//                               </MenuItem>
//                             ))}
//                           </Menu>
//                         </TableCell>
//                       </>
//                     )}
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//       <Backdrop open={restaurantsOrder.loading}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </Box>
//   );
// };

// export default OrdersTable;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../State/Admin/Order/restaurants.order.action";
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
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SettingsIcon from "@mui/icons-material/Settings";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const pickupOptions = ["5 mins", "15 mins", "30 mins", "Other"];

const OrdersTable = ({ isDashboard, name }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const { id } = useParams();
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [pickupTimes, setPickupTimes] = useState({});
  const [customTimes, setCustomTimes] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId: id, orderStatus: null }));
    }
  }, [dispatch, jwt, id]);

  const handleUpdateStatusMenuClick = (event, index) => {
    setAnchorElArray((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = event.currentTarget;
      return updatedArray;
    });
  };

  const handleUpdateStatusMenuClose = (index) => {
    setAnchorElArray((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = null;
      return updatedArray;
    });
  };

  const handleUpdateOrder = (order, orderStatus) => {
    const orderId = order.id;
    if (!orderId) {
      console.error("Error: Order ID is undefined!");
      return;
    }
    
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt })).then(() => {
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId: id }));
    });
  };

  const handlePickupChange = (orderId, value) => {
    if (value === "Other") {
      setPickupTimes((prev) => ({ ...prev, [orderId]: value }));
    } else {
      setPickupTimes((prev) => ({ ...prev, [orderId]: value }));
    }
  };

  const handleCustomTimeChange = (orderId, minutes) => {
    setCustomTimes((prev) => ({ ...prev, [orderId]: minutes }));
    setPickupTimes((prev) => ({ ...prev, [orderId]: `${minutes} mins` }));
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Simple date formatter without dependencies
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      
      return `${month} ${day}, ${year} • ${hours}:${minutes} ${ampm}`;
    } catch (error) {
      return dateString || "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "info";
      case "DELIVERED":
        return "success";
      case "COMPLETED":
        return "success";
      case "OUT_FOR_DELIVERY":
        return "warning";
      default:
        return "secondary";
    }
  };

  // Handle loading state
  const isLoading = restaurantsOrder?.loading || false;

  return (
    <Box sx={{ 
      p: 2, 
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.01)',
      minHeight: '100vh'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box 
          sx={{ 
            p: 3, 
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingBasketIcon sx={{ mr: 1 }} />
            {name || "Restaurant Orders"}
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={() => dispatch(fetchRestaurantsOrder({ jwt, restaurantId: id }))}
            sx={{ boxShadow: 2 }}
          >
            Refresh Orders
          </Button>
        </Box>
        
        <Box sx={{ p: 0 }}>
          {restaurantsOrder.orders?.length > 0 ? (
            <Box>
              {restaurantsOrder.orders.map((orderData, orderIndex) => {
                // Extract order data
                const orderId = orderData.id;
                const order = orderData.parentOrder || orderData;
                const items = orderData.items || [];
                const isExpanded = expandedOrders[orderId] || false;
                
                return (
                  <Paper 
                    key={`order-${orderId}`} 
                    sx={{ 
                      m: 2, 
                      borderRadius: 1, 
                      overflow: 'hidden',
                      boxShadow: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.03)',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        px: 3,
                        py: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={`Order #${orderId}`}
                          color="primary"
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon fontSize="small" color="action" />
                          {order.customer?.fullName || "Guest Customer"}
                        </Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          {formatDate(orderData.createdAt)}
                        </Typography>
                        <Chip
                          label={restaurantsOrder.orders?.find(o => o.id === orderId)?.orderStatus || orderData.orderStatus}
                          size="small"
                          color={getStatusColor(restaurantsOrder.orders?.find(o => o.id === orderId)?.orderStatus || orderData.orderStatus)}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                          ₹{order.totalAmount || 0}
                        </Typography>
                        <IconButton onClick={() => toggleOrderExpand(orderId)}>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Collapse in={isExpanded}>
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                          <Box 
                            sx={{ 
                              p: 2, 
                              flex: 1, 
                              borderRadius: 1,
                              border: `1px solid ${theme.palette.divider}`,
                              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)',
                            }}
                          >
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Ready for Pickup In
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                              <Select
                                value={pickupTimes[orderId] || ""}
                                onChange={(e) => handlePickupChange(orderId, e.target.value)}
                                displayEmpty
                                size="small"
                                sx={{ 
                                  minWidth: 130,
                                  borderRadius: 1,
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.primary.light
                                  }
                                }}
                              >
                                <MenuItem value="">Select time</MenuItem>
                                {pickupOptions.map((option) => (
                                  <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                              </Select>
                              
                              {pickupTimes[orderId] === "Other" && (
                                <TextField
                                  type="number"
                                  label="Minutes"
                                  variant="outlined"
                                  size="small"
                                  value={customTimes[orderId] || ""}
                                  onChange={(e) => handleCustomTimeChange(orderId, e.target.value)}
                                  InputProps={{
                                    endAdornment: <Typography variant="caption">mins</Typography>
                                  }}
                                  sx={{ 
                                    width: 120,
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 1
                                    }
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                          
                          {!isDashboard && (
                            <Box 
                              sx={{ 
                                p: 2, 
                                flex: 1, 
                                borderRadius: 1,
                                border: `1px solid ${theme.palette.divider}`,
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)',
                              }}
                            >
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Update Order Status
                              </Typography>
                              <Button 
                                variant="outlined"
                                color="primary"
                                startIcon={<SettingsIcon />}
                                onClick={(event) => handleUpdateStatusMenuClick(event, orderIndex)}
                                sx={{ 
                                  borderRadius: 1,
                                  textTransform: 'none'
                                }}
                              >
                                Change Status
                              </Button>
                              <Menu
                                anchorEl={anchorElArray[orderIndex]}
                                open={Boolean(anchorElArray[orderIndex])}
                                onClose={() => handleUpdateStatusMenuClose(orderIndex)}
                                PaperProps={{
                                  elevation: 3,
                                  sx: { borderRadius: 1, minWidth: 180 }
                                }}
                              >
                                {orderStatus.map((s) => (
                                  <MenuItem 
                                    key={s.value} 
                                    onClick={() => handleUpdateOrder(orderData, s.value)}
                                    sx={{
                                      py: 1.5,
                                      '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.primary.contrastText
                                      }
                                    }}
                                  >
                                    <Chip
                                      size="small"
                                      label={s.label}
                                      color={getStatusColor(s.value)}
                                      sx={{ mr: 1 }}
                                    />
                                    {s.label}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          )}
                        </Box>
                        
                        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                          <RestaurantIcon sx={{ mr: 1 }} fontSize="small" />
                          Order Items
                        </Typography>
                        
                        <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                          <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Food Item</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ingredients</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {items && items.length > 0 ? (
                                items.map((orderItem, itemIndex) => {
                                  // Extract food data from the item
                                  const foodItem = orderItem.food || orderItem;
                                  
                                  return (
                                    <TableRow 
                                      key={`${orderId}-item-${itemIndex}`}
                                      sx={{ 
                                        '&:nth-of-type(odd)': { 
                                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' 
                                        },
                                        '&:hover': {
                                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                                        }
                                      }}
                                    >
                                      <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <Avatar
                                            src={(foodItem.images && foodItem.images[0]) || "/placeholder.png"}
                                            alt={foodItem.name || "Food"}
                                            sx={{ 
                                              width: 40, 
                                              height: 40,
                                              border: `2px solid ${theme.palette.primary.light}` 
                                            }}
                                          />
                                          <Typography fontWeight="medium">
                                            {foodItem.name || "Unknown Food"}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        {orderItem?.ingredients && Array.isArray(orderItem.ingredients) && orderItem.ingredients.length > 0 ? (
                                          <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                            {orderItem.ingredients.map((ingredient, index) => (
                                              <Chip 
                                                key={index} 
                                                label={ingredient} 
                                                size="small"
                                                variant="outlined"
                                                sx={{ 
                                                  fontSize: '0.7rem', 
                                                  height: 24,
                                                  my: 0.25
                                                }}
                                              />
                                            ))}
                                          </Stack>
                                        ) : (
                                          <Typography variant="body2" color="text.secondary">N/A</Typography>
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={`x${orderItem?.quantity || 0}`} 
                                          size="small"
                                          color="primary"
                                          variant="outlined"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Typography fontWeight="medium">
                                          ₹{(orderItem.price || 0) * (orderItem.quantity || 1)}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} align="center">
                                    <Typography color="text.secondary">No items in this order</Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {isLoading ? "Loading orders..." : "No orders found"}
              </Typography>
              {!isLoading && (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={() => dispatch(fetchRestaurantsOrder({ jwt, restaurantId: id }))}
                  sx={{ mt: 2 }}
                >
                  Refresh Orders
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Paper>
      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;
