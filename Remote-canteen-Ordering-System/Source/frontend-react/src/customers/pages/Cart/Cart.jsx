import { Button, Card, Divider, IconButton, Snackbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";

// import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
// import { Box, Modal, Grid, TextField } from "@mui/material";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

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

const Cart = () => {
  const [openSnackbar, setOpenSnakbar] = useState();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  // const [openAddressModal, setOpenAddressModal] = useState(false);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        // deliveryAddress: {
        //   fullName: auth.users?.fullName,
        //   streetAddress: values.streetAddress,
        //   city: values.city,
        //   state: values.state,
        //   postalCode: values.pincode,
        //   country: "India",
        // },
      },
    };
    console.log("data", data);
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else setOpenSnakbar(true);
  };

  // const createOrderUsingSelectedAddress = (deliveryAddress) => {
  //   const data = {
  //     token: localStorage.getItem("jwt"),
  //     order: {
  //       restaurantId: cart.cartItems[0].food.restaurant.id,
  //       deliveryAddress: {
  //         fullName: "ashok",
  //         streetAddress: "gujrat",
  //         city: "gujrat",
  //         state: "gujrat",
  //         postalCode: "599000",
  //         country: "India",
  //       },
  //     },
  //   };
  //   if (isValid(cart.cartItems)) {
  //     dispatch(createOrder(data));
  //   } else setOpenSnakbar(true);
  // };

  const handleCloseSankBar = () => setOpenSnakbar(false);

  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, i) => (
              <CartItemCard item={item} key={i} />
            ))}

            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Delivery Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Platform Fee</p>
                  <p>₹5</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>₹33</p>
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>₹{cartTotal(cart.cartItems) + 33}</p>
                </div>
              </div>
            </div>
          </section>
          <Divider orientation="vertical" flexItem />
        </main>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}
      {/* <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal> */}
    </Fragment>
  );
};

export default Cart;
