import React, { useEffect, useState } from "react";
import { 
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { api } from "../../config/api";

const RestaurantTable = ({ isDashboard, name }) => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector((store) => store);
    
    // State for action dialog and snackbar
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // New state for action dialog
    const [actionType, setActionType] = useState("feedback");
    const [actionFeedback, setActionFeedback] = useState("");

    // Fetch all restaurants when component mounts
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const { data } = await api.get("/api/restaurants");
                
                dispatch({
                    type: 'GET_ALL_RESTAURANTS_SUCCESS', 
                    payload: data
                });
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                
                dispatch({
                    type: 'GET_ALL_RESTAURANTS_FAILURE', 
                    payload: error
                });

                // Show error snackbar
                setSnackbarMessage("Failed to fetch restaurants");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchRestaurants();
    }, [dispatch]);

    // Open action dialog
    const openActionDialog = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setActionDialogOpen(true);
        // Reset form
        setActionType("feedback");
        setActionFeedback("");
    };

    // Handle action submission
    const handleActionSubmit = async () => {
        try {
            // This is a placeholder for action submission
            // In a real-world scenario, you might want to send this to a specific endpoint
            await api.post('/api/admin/restaurant-action', {
                restaurantId: selectedRestaurant.id,
                actionType,
                feedback: actionFeedback
            });

            // Close dialog
            setActionDialogOpen(false);

            // Show success snackbar
            setSnackbarMessage(`Action "${actionType}" submitted for ${selectedRestaurant.name}`);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error submitting action:", error);

            // Show error snackbar
            setSnackbarMessage(`Failed to submit action: ${error.message}`);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // Determine which restaurants to display
    const displayRestaurants = isDashboard 
        ? restaurant.restaurants.slice(0, 7) 
        : restaurant.restaurants;

    return (
        <Box width="100%">
            <Card className="mt-1">
                <CardHeader
                    title={name || "Restaurants"}
                    sx={{
                        pt: 2,
                        alignItems: "center",
                        "& .MuiCardHeader-action": { mt: 0.6 },
                    }}
                />
                <TableContainer>
                    <Table aria-label="restaurants table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Banner</TableCell>
                                <TableCell>Restaurant Details</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                                {!isDashboard && (
                                    <>
                                        <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayRestaurants.map((restaurant) => (
                                <TableRow
                                    hover
                                    key={restaurant.id}
                                    sx={{ 
                                        "&:last-of-type td, &:last-of-type th": { border: 0 } 
                                    }}
                                >
                                    <TableCell>
                                        <Avatar 
                                            alt={restaurant.name} 
                                            src={restaurant.imageUrl} 
                                            variant="rounded"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: "0.875rem !important",
                                                }}
                                            >
                                                {restaurant.name}
                                            </Typography>
                                            <Typography variant="caption">
                                                {restaurant.description || 'No description'}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.owner?.fullName || 'Unknown Owner'}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.cuisineType || 'Not Specified'}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.address 
                                            ? `${restaurant.address.city}, ${restaurant.address.state}` 
                                            : 'No Location'}
                                    </TableCell>

                                    {!isDashboard && (
                                        <>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                {restaurant.contactInformation?.email || 'No Contact'}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: "center" }}>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => openActionDialog(restaurant)}
                                                >
                                                    Take Action
                                                </Button>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Action Dialog */}
            <Dialog
                open={actionDialogOpen}
                onClose={() => setActionDialogOpen(false)}
                aria-labelledby="action-dialog-title"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="action-dialog-title">
                    Take Action for {selectedRestaurant?.name}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Action Type</InputLabel>
                            <Select
                                value={actionType}
                                label="Action Type"
                                onChange={(e) => setActionType(e.target.value)}
                            >
                                <MenuItem value="feedback">Provide Feedback</MenuItem>
                                <MenuItem value="warning">Issue Warning</MenuItem>
                                <MenuItem value="review">Request Review</MenuItem>
                                <MenuItem value="investigation">Initiate Investigation</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Additional Details"
                            value={actionFeedback}
                            onChange={(e) => setActionFeedback(e.target.value)}
                            placeholder="Provide additional context or details about your action"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setActionDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleActionSubmit} 
                        color="primary" 
                        variant="contained"
                        disabled={!actionFeedback.trim()}
                    >
                        Submit Action
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={restaurant.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default RestaurantTable;

// import React, { useEffect, useState } from "react";
// import { 
//     Avatar,
//     Backdrop,
//     Box,
//     Button,
//     Card,
//     CardHeader,
//     CircularProgress,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
//     Snackbar,
//     Alert
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import { api } from "../../config/api";

// const RestaurantTable = ({ isDashboard, name }) => {
//     const dispatch = useDispatch();
//     const { restaurant } = useSelector((store) => store);
    
//     // State for delete confirmation and snackbar
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//     // Fetch all restaurants when component mounts
//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 const { data } = await api.get("/api/restaurants");
                
//                 dispatch({
//                     type: 'GET_ALL_RESTAURANTS_SUCCESS', 
//                     payload: data
//                 });
//             } catch (error) {
//                 console.error("Error fetching restaurants:", error);
                
//                 dispatch({
//                     type: 'GET_ALL_RESTAURANTS_FAILURE', 
//                     payload: error
//                 });

//                 // Show error snackbar
//                 setSnackbarMessage("Failed to fetch restaurants");
//                 setSnackbarSeverity("error");
//                 setSnackbarOpen(true);
//             }
//         };

//         fetchRestaurants();
//     }, [dispatch]);

//     // Handle restaurant deletion
//     const handleDeleteRestaurant = async () => {
//         if (!selectedRestaurant) return;

//         try {
//             // Perform deletion via API
//             await api.delete(`/api/admin/restaurant/${selectedRestaurant.id}`);

//             // Remove restaurant from local state
//             dispatch({
//                 type: 'DELETE_RESTAURANT_SUCCESS',
//                 payload: selectedRestaurant.id
//             });

//             // Close delete dialog
//             setDeleteDialogOpen(false);

//             // Show success snackbar
//             setSnackbarMessage(`Restaurant "${selectedRestaurant.name}" deleted successfully`);
//             setSnackbarSeverity("success");
//             setSnackbarOpen(true);
//         } catch (error) {
//             console.error("Error deleting restaurant:", error);

//             // Show error snackbar
//             setSnackbarMessage(`Failed to delete restaurant: ${error.message}`);
//             setSnackbarSeverity("error");
//             setSnackbarOpen(true);
//         }
//     };

//     // Open delete confirmation dialog
//     const openDeleteDialog = (restaurant) => {
//         setSelectedRestaurant(restaurant);
//         setDeleteDialogOpen(true);
//     };

//     // Determine which restaurants to display
//     const displayRestaurants = isDashboard 
//         ? restaurant.restaurants.slice(0, 7) 
//         : restaurant.restaurants;

//     return (
//         <Box width="100%">
//             <Card className="mt-1">
//                 <CardHeader
//                     title={name || "Restaurants"}
//                     sx={{
//                         pt: 2,
//                         alignItems: "center",
//                         "& .MuiCardHeader-action": { mt: 0.6 },
//                     }}
//                 />
//                 <TableContainer>
//                     <Table aria-label="restaurants table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Banner</TableCell>
//                                 <TableCell>Restaurant Details</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
//                                 {!isDashboard && (
//                                     <>
//                                         <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
//                                         <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
//                                     </>
//                                 )}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {displayRestaurants.map((restaurant) => (
//                                 <TableRow
//                                     hover
//                                     key={restaurant.id}
//                                     sx={{ 
//                                         "&:last-of-type td, &:last-of-type th": { border: 0 } 
//                                     }}
//                                 >
//                                     <TableCell>
//                                         <Avatar 
//                                             alt={restaurant.name} 
//                                             src={restaurant.imageUrl} 
//                                             variant="rounded"
//                                             sx={{ width: 56, height: 56 }}
//                                         />
//                                     </TableCell>

//                                     <TableCell>
//                                         <Box sx={{ display: "flex", flexDirection: "column" }}>
//                                             <Typography
//                                                 sx={{
//                                                     fontWeight: 500,
//                                                     fontSize: "0.875rem !important",
//                                                 }}
//                                             >
//                                                 {restaurant.name}
//                                             </Typography>
//                                             <Typography variant="caption">
//                                                 {restaurant.description || 'No description'}
//                                             </Typography>
//                                         </Box>
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.owner?.fullName || 'Unknown Owner'}
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.cuisineType || 'Not Specified'}
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.address 
//                                             ? `${restaurant.address.city}, ${restaurant.address.state}` 
//                                             : 'No Location'}
//                                     </TableCell>

//                                     {!isDashboard && (
//                                         <>
//                                             <TableCell sx={{ textAlign: "center" }}>
//                                                 {restaurant.contactInformation?.email || 'No Contact'}
//                                             </TableCell>
//                                             <TableCell sx={{ textAlign: "center" }}>
//                                                 <Button 
//                                                     variant="contained" 
//                                                     color="error"
//                                                     size="small"
//                                                     onClick={() => openDeleteDialog(restaurant)}
//                                                 >
//                                                     Delete
//                                                 </Button>
//                                             </TableCell>
//                                         </>
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Card>

//             {/* Delete Confirmation Dialog */}
//             <Dialog
//                 open={deleteDialogOpen}
//                 onClose={() => setDeleteDialogOpen(false)}
//                 aria-labelledby="delete-dialog-title"
//                 aria-describedby="delete-dialog-description"
//             >
//                 <DialogTitle id="delete-dialog-title">
//                     {"Confirm Restaurant Deletion"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="delete-dialog-description">
//                         Are you sure you want to delete the restaurant "{selectedRestaurant?.name}"? 
//                         This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteDialogOpen(false)}>
//                         Cancel
//                     </Button>
//                     <Button 
//                         onClick={handleDeleteRestaurant} 
//                         color="error" 
//                         autoFocus
//                     >
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for Notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbarOpen(false)}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             >
//                 <Alert 
//                     onClose={() => setSnackbarOpen(false)}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>

//             <Backdrop
//                 sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                 open={restaurant.loading}
//             >
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         </Box>
//     );
// };

// export default RestaurantTable;


// import React, { useEffect } from "react";
// import { 
//     Avatar,
//     Backdrop,
//     Box,
//     Card,
//     CardHeader,
//     CircularProgress,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import { api } from "../../config/api"; // Adjust import path as needed

// const RestaurantTable = ({ isDashboard, name }) => {
//     const dispatch = useDispatch();
//     const { restaurant } = useSelector((store) => store);

//     // Fetch all restaurants when component mounts
//     useEffect(() => {
//         const fetchRestaurants = async () => {
//             try {
//                 // Direct API call without JWT for super admin page
//                 const { data } = await api.get("/api/restaurants");
                
//                 // Dispatch action to update Redux store
//                 dispatch({
//                     type: 'GET_ALL_RESTAURANTS_SUCCESS', 
//                     payload: data
//                 });
//             } catch (error) {
//                 console.error("Error fetching restaurants:", error);
                
//                 // Dispatch failure action
//                 dispatch({
//                     type: 'GET_ALL_RESTAURANTS_FAILURE', 
//                     payload: error
//                 });
//             }
//         };

//         fetchRestaurants();
//     }, [dispatch]);

//     // Determine which restaurants to display based on isDashboard prop
//     const displayRestaurants = isDashboard 
//         ? restaurant.restaurants.slice(0, 7) 
//         : restaurant.restaurants;

//     return (
//         <Box width="100%">
//             <Card className="mt-1">
//                 <CardHeader
//                     title={name || "Restaurants"}
//                     sx={{
//                         pt: 2,
//                         alignItems: "center",
//                         "& .MuiCardHeader-action": { mt: 0.6 },
//                     }}
//                 />
//                 <TableContainer>
//                     <Table aria-label="restaurants table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Banner</TableCell>
//                                 <TableCell>Restaurant Details</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
//                                 <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
//                                 {!isDashboard && (
//                                     <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
//                                 )}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {displayRestaurants.map((restaurant) => (
//                                 <TableRow
//                                     hover
//                                     key={restaurant.id}
//                                     sx={{ 
//                                         "&:last-of-type td, &:last-of-type th": { border: 0 } 
//                                     }}
//                                 >
//                                     <TableCell>
//                                         <Avatar 
//                                             alt={restaurant.name} 
//                                             src={restaurant.imageUrl} 
//                                             variant="rounded"
//                                             sx={{ width: 56, height: 56 }}
//                                         />
//                                     </TableCell>

//                                     <TableCell>
//                                         <Box sx={{ display: "flex", flexDirection: "column" }}>
//                                             <Typography
//                                                 sx={{
//                                                     fontWeight: 500,
//                                                     fontSize: "0.875rem !important",
//                                                 }}
//                                             >
//                                                 {restaurant.name}
//                                             </Typography>
//                                             <Typography variant="caption">
//                                                 {restaurant.description || 'No description'}
//                                             </Typography>
//                                         </Box>
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.owner?.fullName || 'Unknown Owner'}
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.cuisineType || 'Not Specified'}
//                                     </TableCell>

//                                     <TableCell sx={{ textAlign: "center" }}>
//                                         {restaurant.address 
//                                             ? `${restaurant.address.city}, ${restaurant.address.state}` 
//                                             : 'No Location'}
//                                     </TableCell>

//                                     {!isDashboard && (
//                                         <TableCell sx={{ textAlign: "center" }}>
//                                             {restaurant.contactInformation?.email || 'No Contact'}
//                                         </TableCell>
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Card>

//             <Backdrop
//                 sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                 open={restaurant.loading}
//             >
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         </Box>
//     );
// };

// export default RestaurantTable;



// import {
//     Avatar,
//     Backdrop,
//     Box,
//     Button,
//     Card,
//     CardHeader,
//     CircularProgress,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//   } from "@mui/material";
  
//   import React, { useEffect } from "react";
//   import { useParams } from "react-router-dom";
  
//   import { useDispatch, useSelector } from "react-redux";
//   import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
  
//   const RestaurantTable = ({ isDashboard, name }) => {
//     const dispatch = useDispatch();
//     const { restaurant } = useSelector((store) => store);
//    const { id } = useParams();
//    const { loading, error, restaurants } = useSelector((store) => store.restaurant);
// console.log("Redux State:", { loading, error, restaurants });
  
//    useEffect(() => {
//     if (id) {
//       dispatch(getMenuItemsByRestaurantId({ restaurantId: id, jwt: "your_token_here" }));
//     }
//   }, [dispatch, id]);
  
//     const handleDeleteProduct = (productId) => {
//       console.log("delete product ", productId);
//     };
  
//     return (
//       <Box width={"100%"}>
//         <Card className="mt-1">
//           <CardHeader
//             title={name}
//             sx={{
//               pt: 2,
//               alignItems: "center",
//               "& .MuiCardHeader-action": { mt: 0.6 },
//             }}
//           />
//           <TableContainer>
//             <Table  aria-label="table in dashboard">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Banner</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
//                   {!isDashboard && <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {restaurant.restaurants.slice(0,isDashboard?7:restaurant.restaurants.length).map((item) => (
//                   <TableRow
//                     hover
//                     key={item.name}
//                     sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
//                   >
//                     <TableCell>
//                       {" "}
//                       <Avatar alt={item.name} src={item.imageUrl} />{" "}
//                     </TableCell>
  
//                     <TableCell
//                       sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
//                     >
//                       <Box sx={{ display: "flex", flexDirection: "column" }}>
//                         <Typography
//                           sx={{
//                             fontWeight: 500,
//                             fontSize: "0.875rem !important",
//                           }}
//                         >
//                           {item.name}
//                         </Typography>
//                         <Typography variant="caption">{item.brand}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       {item.owner.fullName}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       {item.cuisineType}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       {item.address.city}
//                     </TableCell>
  
//                     {!isDashboard && <TableCell sx={{ textAlign: "center" }}>
//                       {item.contactInformation.email}
//                     </TableCell>}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Card>
  
//         <Backdrop
//           sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//           open={restaurant.loading}
//         >
//           <CircularProgress color="inherit" />
//         </Backdrop>
//       </Box>
//     );
//   };
  
//   export default RestaurantTable;
  