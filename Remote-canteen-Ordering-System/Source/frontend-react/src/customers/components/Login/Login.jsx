import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../State/Authentication/Action";

// ✅ Initial values for the form
const initialValues = {
  email: "",
  password: "",
};

// ✅ Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Handle form submission
  const handleSubmit = async (values) => {
    console.log("Login form values:", values);

    // ✅ Super Admin credentials check
    if (
      values.email === "superadmin@snappick.com" &&
      values.password === "superadmin123"
    ) {
      console.log("Redirecting to Super Admin Dashboard...");
      navigate("/super-admin/");
      return;
    }

    try {
      // ✅ Dispatch Redux action to login other users
      const res = await dispatch(loginUser({ data: values, navigate }));

      // ✅ Check user role and redirect accordingly
      if (res?.data?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res?.data?.role === "customer") {
        navigate("/customer/dashboard");
      } else {
        console.log("Unknown role or no role found.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Login
        </Typography>

        {/* ✅ Formik Form Setup */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* ✅ Email Field */}
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              id="email"
              autoComplete="email"
              helperText={<ErrorMessage name="email" />}
            />

            {/* ✅ Password Field */}
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={<ErrorMessage name="password" />}
            />

            {/* ✅ Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, padding: "0.8rem" }}
            >
              Login
            </Button>
          </Form>
        </Formik>

        {/* ✅ Registration Option */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/account/register")}>
            Register
          </Button>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginForm;


// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   Button,
//   TextField,
//   Typography,
//   CssBaseline,
//   Container,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../../State/Authentication/Action";

// const initialValues = {
//   email: "",
//   password: "",
// };

// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSubmit = (values) => {
//     // You can handle login submission here, e.g., send data to your server
//     console.log("Login form values:", values);
//     dispatch(loginUser({ data: values, navigate }));
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div>
//         <Typography className="text-center" variant="h5">
//           Login
//         </Typography>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <Field
//               as={TextField}
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Email Address"
//               name="email"
//               id="email"
//               autoComplete="email"
//               helperText={<ErrorMessage name="email" />}
//             />
//             <Field
//               as={TextField}
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               helperText={<ErrorMessage name="password" />}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2,padding:"1rem" }}
//             >
//               Login
//             </Button>
//           </Form>
//         </Formik>
//         <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//           Don't have an account?{" "}
//           <Button onClick={() => navigate("/account/register")}>
//             Register
//           </Button>
//         </Typography>
//       </div>
//     </Container>
//   );
// };

// export default LoginForm; 