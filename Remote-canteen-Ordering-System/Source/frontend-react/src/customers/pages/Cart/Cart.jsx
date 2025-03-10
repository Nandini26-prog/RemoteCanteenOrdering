// import { Button, Card, Divider, IconButton, Snackbar } from "@mui/material";
// import React, { Fragment, useEffect, useState } from "react";
// import AddressCard from "../../components/Address/AddressCard";
// import CartItemCard from "../../components/CartItem/CartItemCard";
// import { useDispatch, useSelector } from "react-redux";

// import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
// import { Box, Modal, Grid, TextField } from "@mui/material";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { createOrder } from "../../../State/Customers/Orders/Action";
// import { findCart } from "../../../State/Customers/Cart/cart.action";
// import { isValid } from "../../util/ValidToOrder";
// import { cartTotal } from "./totalPay";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

// const initialValues = {
//   streetAddress: "",
//   state: "",
//   pincode: "",
//   city: "",
// };

// const validationSchema = Yup.object().shape({
//   streetAddress: Yup.string().required("Street Address is required"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.string()
//     .required("Pincode is required")
//     .matches(/^\d{6}$/, "Pincode must be 6 digits"),
//   city: Yup.string().required("City is required"),
// });

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   outline: "none",
//   p: 4,
// };

// const Cart = () => {
//   const [openSnackbar, setOpenSnakbar] = useState();
//   const dispatch = useDispatch();
//   const { cart, auth } = useSelector((store) => store);
//   const [openAddressModal, setOpenAddressModal] = useState(false);
//   console.log("cart ", cart);

//   const handleCloseAddressModal = () => {
//     setOpenAddressModal(false);
//   };

//   const handleOpenAddressModal = () => setOpenAddressModal(true);

//   useEffect(() => {
//     dispatch(findCart(localStorage.getItem("jwt")));
//   }, []);

//   const handleSubmit = (values, { resetForm }) => {
//     const data = {
//       jwt: localStorage.getItem("jwt"),
//       order: {
//         restaurantId: cart.cartItems[0].food?.restaurant.id,
//         deliveryAddress: {
//           fullName: auth.users?.fullName,
//           streetAddress: values.streetAddress,
//           city: values.city,
//           state: values.state,
//           postalCode: values.pincode,
//           country: "India",
//         },
//       },
//     };
//     console.log("data",data)
//     if (isValid(cart.cartItems)) {
//       dispatch(createOrder(data));
//     } else setOpenSnakbar(true);
//   };

//   const createOrderUsingSelectedAddress = (deliveryAddress) => {
//     const data = {
//       token: localStorage.getItem("jwt"),
//       order: {
//         restaurantId: cart.cartItems[0].food.restaurant.id,
//         deliveryAddress: {
//           fullName: auth.users?.fullName || "Customer", // Use the user's name from auth
//           streetAddress: deliveryAddress.streetAddress,
//           city: deliveryAddress.city,
//           state: deliveryAddress.state,
//           postalCode: deliveryAddress.postalCode,
//           country: deliveryAddress.country || "India",
//         },
//       },
//     };
    
//     if (isValid(cart.cartItems)) {
//       dispatch(createOrder(data));
//     } else setOpenSnakbar(true);
//   };

//   const handleCloseSankBar = () => setOpenSnakbar(false);

//   return (
//     <Fragment>
//       {cart.cartItems.length > 0 ? (
//         <main className="lg:flex justify-between">
//           <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
//             {cart.cartItems.map((item, i) => (
//               <CartItemCard item={item} />
//             ))}

//             <Divider />
//             <div className="billDetails px-5 text-sm">
//               <p className="font-extralight py-5">Bill Details</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-gray-400">
//                   <p>Item Total</p>
//                   <p>₹{cartTotal(cart.cartItems)}</p>
//                 </div>
//                 <div className="flex justify-between text-gray-400">
//                 <p>Deliver Fee</p>
//                 <p>₹21</p>
//               </div>
//                 <div className="flex justify-between text-gray-400">
//                 <p>Plateform Fee</p>
//                 <p>₹5</p>
//               </div>
//                 <div className="flex justify-between text-gray-400">
//                 <p>GST and Restaurant Charges</p>
//                 <p>₹33</p>
//               </div>
//                 <Divider />
//                 <div className="flex justify-between text-gray-400">
//                   <p>Total Pay</p>
//                   <p>₹{cartTotal(cart.cartItems)+33}</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <Divider orientation="vertical" flexItem />
//           <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
//             <div className="">
//               <h1 className="text-center font-semibold text-2xl py-10">
//               Choose Delivery Address
//             </h1>
//             <div className="flex gap-5 flex-wrap justify-center">
//               {auth.users?.addresses.map((item, index) => (
//                 <AddressCard
//                   handleSelectAddress={createOrderUsingSelectedAddress}
//                   item={item}
//                   showButton={true}
//                 />
//               ))}

//               <Card className="flex flex-col justify-center items-center p-5  w-64 ">
//                 <div className="flex space-x-5">
//                   <AddLocationAltIcon />
//                   <div className="space-y-5">
//                     <p>Add New Address</p>
//                     <Button
//                       onClick={handleOpenAddressModal}
//                       sx={{ padding: ".75rem" }}
//                       fullWidth
//                       variant="contained"
//                     >
//                       Add
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//             </div>
//             {/* <div className="flex justify-center items-center h-[90vh]">
//               <Card className="billDetails px-5 text-sm w-[20vw] p-10 space-y-5">
//                 <p className=" text-xl font-bold text-center">Bill Details</p>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-gray-400">
//                     <p>Item Total</p>
//                     <p>₹{cartTotal(cart.cartItems)}</p>
//                   </div>
//                   <div className="flex justify-between text-gray-400">
//                 <p>Deliver Fee</p>
//                 <p>₹21</p>
//               </div> 
//                   <div className="flex justify-between text-gray-400">
//                 <p>Plateform Fee</p>
//                 <p>₹5</p>
//               </div> 
//                   <div className="flex justify-between text-gray-400">
//                 <p>GST and Restaurant Charges</p>
//                 <p>₹33</p>
//               </div>
//                   <Divider />
//                   <div className="flex justify-between text-gray-400">
//                     <p>Total Pay</p>
//                     <p>₹{cartTotal(cart.cartItems)}</p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={createOrderUsingSelectedAddress}
//                   variant="contained"
//                 >
//                   Checkout
//                 </Button>
//               </Card>
//             </div> */}
//           </section>
//         </main>
//       ) : (
//         <div className="flex h-[90vh] justify-center items-center">
//           <div className="text-center space-y-5">
//             <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
//             <p className="font-bold text-3xl">Your Cart Is Empty</p>
//           </div>
//         </div>
//       )}
//       <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
//         <Box sx={style}>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             <Form>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Field
//                     name="streetAddress"
//                     as={TextField}
//                     label="Street Address"
//                     fullWidth
//                     variant="outlined"
//                     error={!ErrorMessage("streetAddress")}
//                     helperText={
//                       <ErrorMessage name="streetAddress">
//                         {(msg) => <span className="text-red-600">{msg}</span>}
//                       </ErrorMessage>
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Field
//                     name="state"
//                     as={TextField}
//                     label="State"
//                     fullWidth
//                     variant="outlined"
//                     error={!ErrorMessage("state")}
//                     helperText={
//                       <ErrorMessage name="state">
//                         {(msg) => <span className="text-red-600">{msg}</span>}
//                       </ErrorMessage>
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Field
//                     name="pincode"
//                     as={TextField}
//                     label="Pincode"
//                     fullWidth
//                     variant="outlined"
//                     error={!ErrorMessage("pincode")}
//                     helperText={
//                       <ErrorMessage name="pincode">
//                         {(msg) => <span className="text-red-600">{msg}</span>}
//                       </ErrorMessage>
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     name="city"
//                     as={TextField}
//                     label="City"
//                     fullWidth
//                     variant="outlined"
//                     error={!ErrorMessage("city")}
//                     helperText={
//                       <ErrorMessage name="city">
//                         {(msg) => <span className="text-red-600">{msg}</span>}
//                       </ErrorMessage>
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button type="submit" variant="contained" color="primary">
//                     Deliver Here
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Form>
//           </Formik>
//         </Box>
//       </Modal>
//       <Snackbar
//         severity="success"
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSankBar}
//         message="Please Add Items Only From One Restaurants At time"
//       />
//     </Fragment>
//   );
// };

// export default Cart;

// import { Button, Card, Divider, IconButton, Snackbar, Modal, Box, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Grid } from "@mui/material";
// import React, { Fragment, useEffect, useState } from "react";
// import CartItemCard from "../../components/CartItem/CartItemCard";
// import { useDispatch, useSelector } from "react-redux";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import { findCart } from "../../../State/Customers/Cart/cart.action";
// import { createOrder } from "../../../State/Customers/Orders/Action";
// import { isValid } from "../../util/ValidToOrder";
// import { cartTotal } from "./totalPay";

// // Style for modal
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   outline: "none",
//   p: 4,
// };

// const Cart = () => {
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [openPaymentModal, setOpenPaymentModal] = useState(false);
//   const [orderProcessing, setOrderProcessing] = useState(false);
  
//   const dispatch = useDispatch();
//   const { cart, auth } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(findCart(localStorage.getItem("jwt")));
//   }, []);

//   // Validate if all items are from the same restaurant
//   const validateCartItems = () => {
//     if (!cart.cartItems || cart.cartItems.length === 0) {
//       return false;
//     }
    
//     // Get the ID of the first restaurant
//     const firstRestaurantId = cart.cartItems[0]?.food?.restaurant?.id;
    
//     // Check if all items have the same restaurant ID
//     const isAllSameRestaurant = cart.cartItems.every(
//       item => item.food?.restaurant?.id === firstRestaurantId
//     );
    
//     return isAllSameRestaurant;
//   };

//   const handlePaymentMethodChange = (event) => {
//     setPaymentMethod(event.target.value);
//   };

//   const handleClosePaymentModal = () => {
//     setOpenPaymentModal(false);
//   };

//   const handleOpenPaymentModal = () => {
//     if (validateCartItems()) {
//       setOpenPaymentModal(true);
//     } else {
//       setSnackbarMessage("Please add items only from one restaurant at a time");
//       setOpenSnackbar(true);
//     }
//   };

//   const processOnlinePayment = () => {
//     // Simulate online payment process
//     setOrderProcessing(true);
//     setTimeout(() => {
//       placeOrder();
//       setOrderProcessing(false);
//       handleClosePaymentModal();
//     }, 2000);
//   };

//   const placeOrder = () => {
//     // Make sure we have a valid cart with items from the same restaurant
//     if (!validateCartItems()) {
//       setSnackbarMessage("Cannot place order with items from multiple restaurants");
//       setOpenSnackbar(true);
//       return;
//     }

//     // Default address if needed
//     const defaultAddress = auth.users?.addresses[0] || {
//       fullName: auth.users?.fullName || "Customer",
//       streetAddress: "Default Address",
//       city: "Default City",
//       state: "Default State",
//       postalCode: "000000",
//       country: "India"
//     };

//     const data = {
//       jwt: localStorage.getItem("jwt"),
//       order: {
//         restaurantId: cart.cartItems[0].food?.restaurant.id,
//         deliveryAddress: {
//           fullName: defaultAddress.fullName,
//           streetAddress: defaultAddress.streetAddress,
//           city: defaultAddress.city,
//           state: defaultAddress.state,
//           postalCode: defaultAddress.postalCode,
//           country: defaultAddress.country || "India",
//         },
//         paymentMethod: paymentMethod,
//         paymentStatus: paymentMethod === "COD" ? "PENDING" : "COMPLETED",
//         cartItems: cart.cartItems  // Add cart items to ensure they're properly associated
//       },
//     };

//     dispatch(createOrder(data));
//     setSnackbarMessage("Order placed successfully!");
//     setOpenSnackbar(true);
//   };

//   const handleCheckout = () => {
//     if (!validateCartItems()) {
//       setSnackbarMessage("Please add items only from one restaurant at a time");
//       setOpenSnackbar(true);
//       return;
//     }
    
//     if (paymentMethod === "COD") {
//       placeOrder();
//     } else {
//       handleOpenPaymentModal();
//     }
//   };

//   const handleCloseSnackbar = () => setOpenSnackbar(false);

//   // Group cart items by restaurant
//   const groupedItems = () => {
//     const groupedByRestaurant = {};
    
//     cart.cartItems.forEach(item => {
//       const restaurantId = item.food?.restaurant?.id;
//       const restaurantName = item.food?.restaurant?.name || "Unknown Restaurant";
      
//       if (!groupedByRestaurant[restaurantId]) {
//         groupedByRestaurant[restaurantId] = {
//           restaurantName: restaurantName,
//           items: []
//         };
//       }
      
//       groupedByRestaurant[restaurantId].items.push(item);
//     });
    
//     return groupedByRestaurant;
//   };

//   const restaurants = groupedItems();
//   const multipleRestaurants = Object.keys(restaurants).length > 1;

//   return (
//     <Fragment>
//       {cart.cartItems.length > 0 ? (
//         <main className="lg:flex justify-between">
//           <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
//             {multipleRestaurants ? (
//               // Show items grouped by restaurant if there are multiple restaurants
//               Object.entries(restaurants).map(([restaurantId, restaurantData]) => (
//                 <div key={restaurantId} className="mb-6">
//                   <h3 className="font-medium text-lg mb-3 px-5 text-yellow-500">
//                     {restaurantData.restaurantName}
//                   </h3>
//                   {restaurantData.items.map((item, i) => (
//                     <CartItemCard key={i} item={item} />
//                   ))}
//                   <Divider className="mt-4" />
//                 </div>
//               ))
//             ) : (
//               // Show items normally if there's only one restaurant
//               cart.cartItems.map((item, i) => (
//                 <CartItemCard key={i} item={item} />
//               ))
//             )}

//             <Divider />
//             <div className="billDetails px-5 text-sm">
//               <p className="font-extralight py-5">Bill Details</p>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-gray-400">
//                   <p>Item Total</p>
//                   <p>₹{cartTotal(cart.cartItems)}</p>
//                 </div>
//                 <div className="flex justify-between text-gray-400">
//                   <p>Delivery Fee</p>
//                   <p>₹21</p>
//                 </div>
//                 <div className="flex justify-between text-gray-400">
//                   <p>Platform Fee</p>
//                   <p>₹5</p>
//                 </div>
//                 <div className="flex justify-between text-gray-400">
//                   <p>GST and Restaurant Charges</p>
//                   <p>₹33</p>
//                 </div>
//                 <Divider />
//                 <div className="flex justify-between text-gray-400">
//                   <p>Total Pay</p>
//                   <p>₹{cartTotal(cart.cartItems) + 59}</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <Divider orientation="vertical" flexItem />
//           <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
//             <div className="w-full max-w-md mt-10">
//               <h1 className="text-center font-semibold text-2xl py-5">
//                 Payment Options
//               </h1>
              
//               {multipleRestaurants && (
//                 <div className="bg-red-100 text-red-800 p-4 mb-5 rounded-md">
//                   <p className="font-medium">Multiple Restaurants Detected</p>
//                   <p className="text-sm mt-1">
//                     Please remove items so all are from the same restaurant to proceed with checkout.
//                   </p>
//                 </div>
//               )}
              
//               <Card className="p-5 mb-5">
//                 <FormControl component="fieldset">
//                   <RadioGroup
//                     aria-label="payment-method"
//                     name="payment-method"
//                     value={paymentMethod}
//                     onChange={handlePaymentMethodChange}
//                   >
//                     <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
//                     <FormControlLabel value="ONLINE" control={<Radio />} label="Online Payment" />
//                   </RadioGroup>
//                 </FormControl>
//               </Card>
              
//               <div className="text-center">
//                 <Button 
//                   onClick={handleCheckout}
//                   variant="contained" 
//                   color="primary"
//                   size="large"
//                   fullWidth
//                   disabled={multipleRestaurants}
//                 >
//                   Proceed to Checkout
//                 </Button>
//               </div>
//             </div>
//           </section>
//         </main>
//       ) : (
//         <div className="flex h-[90vh] justify-center items-center">
//           <div className="text-center space-y-5">
//             <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
//             <p className="font-bold text-3xl">Your Cart Is Empty</p>
//           </div>
//         </div>
//       )}

//       {/* Online Payment Modal */}
//       <Modal open={openPaymentModal} onClose={handleClosePaymentModal}>
//         <Box sx={style}>
//           <h2 className="text-center font-semibold text-xl mb-5">Online Payment</h2>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Card Number"
//                 fullWidth
//                 variant="outlined"
//                 placeholder="1234 5678 9012 3456"
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Expiry Date"
//                 fullWidth
//                 variant="outlined"
//                 placeholder="MM/YY"
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="CVV"
//                 fullWidth
//                 variant="outlined"
//                 placeholder="123"
//                 type="password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Name on Card"
//                 fullWidth
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button 
//                 onClick={processOnlinePayment} 
//                 variant="contained" 
//                 color="primary"
//                 fullWidth
//                 disabled={orderProcessing}
//               >
//                 {orderProcessing ? "Processing..." : "Pay ₹" + (cartTotal(cart.cartItems) + 59)}
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />
//     </Fragment>
//   );
// };

// export default Cart;



import { Button, Card, Divider, IconButton, Snackbar, Modal, Box, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React, { Fragment, useEffect, useState, useMemo } from "react";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { cartTotal } from "./totalPay";

// Style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Cart = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [ordersPlaced, setOrdersPlaced] = useState(false);
  
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  // Group cart items by restaurant
  const groupedRestaurants = useMemo(() => {
    const groupedByRestaurant = {};
    
    if (!cart.cartItems || cart.cartItems.length === 0) {
      return {};
    }
    
    cart.cartItems.forEach(item => {
      const restaurantId = item.food?.restaurant?.id;
      const restaurantName = item.food?.restaurant?.name || "Unknown Restaurant";
      
      if (!groupedByRestaurant[restaurantId]) {
        groupedByRestaurant[restaurantId] = {
          id: restaurantId,
          name: restaurantName,
          items: [],
          total: 0
        };
      }
      
      groupedByRestaurant[restaurantId].items.push(item);
      // Calculate restaurant subtotal
      groupedByRestaurant[restaurantId].total += item.quantity * item.food.price;
    });
    
    return groupedByRestaurant;
  }, [cart.cartItems]);

  // Calculate individual fees per restaurant
  const calculateRestaurantFees = (restaurantTotal) => {
    const deliveryFee = 21;
    const platformFee = 5;
    const gstAndCharges = Math.round(restaurantTotal * 0.05); // 5% of subtotal for simplicity
    
    return {
      deliveryFee,
      platformFee,
      gstAndCharges,
      totalFees: deliveryFee + platformFee + gstAndCharges
    };
  };

  // Calculate grand total across all restaurants
  const grandTotal = useMemo(() => {
    let total = 0;
    
    Object.values(groupedRestaurants).forEach(restaurant => {
      total += restaurant.total;
      const fees = calculateRestaurantFees(restaurant.total);
      total += fees.totalFees;
    });
    
    return total;
  }, [groupedRestaurants]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
  };

  const handleOpenPaymentModal = () => {
    setOpenPaymentModal(true);
  };

  const processOnlinePayment = () => {
    // Simulate online payment process
    setOrderProcessing(true);
    setTimeout(() => {
      placeMultipleOrders();
      setOrderProcessing(false);
      handleClosePaymentModal();
    }, 2000);
  };


  const placeMultipleOrders = () => {
    if (Object.keys(groupedRestaurants).length === 0) {
      setSnackbarMessage("Your cart is empty");
      setOpenSnackbar(true);
      return;
    }

   // const transactionId = `TXNS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  

    // Default address if needed
    const defaultAddress = auth.users?.addresses[0] || {
      fullName: auth.users?.fullName || "Customer",
      streetAddress: "Default Address",
      city: "Default City",
      state: "Default State",
      postalCode: "000000",
      country: "India"
    };
    
    // Create a unique payment ID for this transaction
    const paymentId = "PAY-" + Date.now();

    const orderPromises = Object.values(groupedRestaurants).map(restaurant => {
      const orderData = {
        jwt: localStorage.getItem("jwt"),
        order: {
          restaurantId: restaurant.id,
          deliveryAddress: {
            fullName: defaultAddress.fullName,
            streetAddress: defaultAddress.streetAddress,
            city: defaultAddress.city,
            state: defaultAddress.state,
            postalCode: defaultAddress.postalCode,
            country: defaultAddress.country || "India",
          },
          paymentMethod: paymentMethod,
          paymentStatus: paymentMethod === "COD" ? "PENDING" : "COMPLETED",
          paymentId: paymentId, // Link all orders with the same payment
          cartItems: restaurant.items,
          orderAmount: restaurant.total + calculateRestaurantFees(restaurant.total).totalFees,
          restaurantName: restaurant.name // Add restaurant name for logging
        },
      };
      
      return dispatch(createOrder(orderData))
        .then(response => {
          console.log(`Order created for restaurant ${restaurant.name}:`, response);
          return response;
        })
        .catch(error => {
          console.error(`Failed to create order for restaurant ${restaurant.name}:`, error);
          throw error; // Re-throw to be caught by Promise.all
        });
    });
  
    // Use Promise.all to handle multiple order creations
    Promise.all(orderPromises)
      .then(results => {
        setSnackbarMessage("All orders placed successfully!");
        setOpenSnackbar(true);
        setOrdersPlaced(true);
      })
      .catch(error => {
        setSnackbarMessage("Failed to place some orders. Please try again.");
        setOpenSnackbar(true);
        console.error("Order placement error:", error);
      });
  };
    
    // Place an order for each restaurant
  //   Object.values(groupedRestaurants).forEach(restaurant => {
  //     const orderData = {
  //       jwt: localStorage.getItem("jwt"),
  //       order: {
  //         restaurantId: restaurant.id,
  //         deliveryAddress: {
  //           fullName: defaultAddress.fullName,
  //           streetAddress: defaultAddress.streetAddress,
  //           city: defaultAddress.city,
  //           state: defaultAddress.state,
  //           postalCode: defaultAddress.postalCode,
  //           country: defaultAddress.country || "India",
  //         },
  //         paymentMethod: paymentMethod,
  //         paymentStatus: paymentMethod === "COD" ? "PENDING" : "COMPLETED",
  //         paymentId: paymentId, // Link all orders with the same payment
  //         cartItems: restaurant.items,
  //         orderAmount: restaurant.total + calculateRestaurantFees(restaurant.total).totalFees
  //       },
  //     };
      
  //     dispatch(createOrder(orderData));
  //   });
    
  //   setSnackbarMessage("All orders placed successfully!");
  //   setOpenSnackbar(true);
  //   setOrdersPlaced(true);
  // };

  const handleCheckout = () => {
    if (paymentMethod === "COD") {
      placeMultipleOrders();
    } else {
      handleOpenPaymentModal();
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Fragment>
      {cart.cartItems && cart.cartItems.length > 0 && !ordersPlaced ? (
        <main className="lg:flex justify-between">
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {/* Display items grouped by restaurant */}
            {Object.values(groupedRestaurants).map((restaurant) => (
              <Accordion key={restaurant.id} defaultExpanded className="mb-4">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`restaurant-${restaurant.id}-content`}
                  id={`restaurant-${restaurant.id}-header`}
                >
                  <Typography className="font-semibold">{restaurant.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="space-y-4">
                    {restaurant.items.map((item, i) => (
                      <CartItemCard key={i} item={item} />
                    ))}
                    
                    <div className="pt-2">
                      <div className="flex justify-between text-gray-600">
                        <p>Subtotal</p>
                        <p>₹{restaurant.total}</p>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <p>Delivery Fee</p>
                        <p>₹{calculateRestaurantFees(restaurant.total).deliveryFee}</p>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <p>Platform Fee</p>
                        <p>₹{calculateRestaurantFees(restaurant.total).platformFee}</p>
                      </div>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <p>GST and Restaurant Charges</p>
                        <p>₹{calculateRestaurantFees(restaurant.total).gstAndCharges}</p>
                      </div>
                      <Divider className="my-2" />
                      <div className="flex justify-between font-medium">
                        <p>Restaurant Total</p>
                        <p>₹{restaurant.total + calculateRestaurantFees(restaurant.total).totalFees}</p>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}

            <Divider />
            <div className="billDetails px-5 text-sm sticky bottom-0 bg-black py-4 shadow-md">
              <p className="font-bold text-lg py-2">Order Summary</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p>Restaurants</p>
                  <p>{Object.keys(groupedRestaurants).length}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Items</p>
                  <p>{cart.cartItems.length}</p>
                </div>
                <Divider />
                <div className="flex justify-between font-bold text-lg">
                  <p>Grand Total</p>
                  <p>₹{grandTotal}</p>
                </div>
              </div>
            </div>
          </section>
          <Divider orientation="vertical" flexItem />
          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div className="w-full max-w-md mt-10">
              <h1 className="text-center font-semibold text-2xl py-5">
                Payment Options
              </h1>
              
              <Card className="p-5 mb-5">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                    <FormControlLabel value="ONLINE" control={<Radio />} label="Online Payment" />
                  </RadioGroup>
                </FormControl>
                
                <div className="mt-5 p-3 bg-black-100 rounded-md">
                  <Typography variant="subtitle2" className="font-medium mb-2">Order Summary</Typography>
                  {Object.values(groupedRestaurants).map((restaurant) => (
                    <div key={restaurant.id} className="flex justify-between text-sm mb-1">
                      <p>{restaurant.name}</p>
                      <p>₹{restaurant.total + calculateRestaurantFees(restaurant.total).totalFees}</p>
                    </div>
                  ))}
                  <Divider className="my-2" />
                  <div className="flex justify-between font-bold">
                    <p>Total Amount</p>
                    <p>₹{grandTotal}</p>
                  </div>
                </div>
              </Card>
              
              <div className="text-center">
                <Button 
                  onClick={handleCheckout}
                  variant="contained" 
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {paymentMethod === "COD" ? "Place Orders" : "Proceed to Payment"}
                </Button>
              </div>
              
              <div className="mt-5 text-xs text-gray-500 text-center">
                <p>By proceeding, you agree to place separate orders for each restaurant.</p>
                <p>Each restaurant will prepare and consider your order separately.</p>
              </div>
            </div>
          </section>
        </main>
      ) : ordersPlaced ? (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <div className="text-green-500 text-8xl">✓</div>
            <p className="font-bold text-3xl">Orders Placed Successfully!</p>
            <p className="text-gray-500">Your orders have been placed with each restaurant.</p>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => window.location.href = '/orders'} // Redirect to orders page
            >
              View My Orders
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* Online Payment Modal */}
      <Modal open={openPaymentModal} onClose={handleClosePaymentModal}>
        <Box sx={style}>
          <h2 className="text-center font-semibold text-xl mb-5">Online Payment</h2>
          <div className="mb-4 p-3 bg-gray-100 rounded-md">
            <p className="font-medium">Amount: ₹{grandTotal}</p>
            <p className="text-sm text-gray-500">Payment for {Object.keys(groupedRestaurants).length} restaurant(s)</p>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                placeholder="1234 5678 9012 3456"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date"
                fullWidth
                variant="outlined"
                placeholder="MM/YY"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                fullWidth
                variant="outlined"
                placeholder="123"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name on Card"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                onClick={processOnlinePayment} 
                variant="contained" 
                color="primary"
                fullWidth
                disabled={orderProcessing}
              >
                {orderProcessing ? "Processing..." : `Pay ₹${grandTotal}`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Fragment>
  );
};

export default Cart;