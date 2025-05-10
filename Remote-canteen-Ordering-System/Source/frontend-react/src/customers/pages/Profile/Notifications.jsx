// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
// import { 
//     Card, 
//     Typography, 
//     Box, 
//     Chip,
//     Grid,
//     IconButton,
//     Tooltip
// } from "@mui/material";
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
// import MarkunreadIcon from '@mui/icons-material/Markunread';

// const Notifications = () => {
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const { order } = useSelector((store) => store);
//     const [expandedNotifications, setExpandedNotifications] = useState({});

//     useEffect(() => {
//         dispatch(getUsersNotificationAction(jwt));
//     }, [dispatch, jwt]);

//     const toggleNotificationExpand = (notificationId) => {
//         setExpandedNotifications(prev => ({
//             ...prev,
//             [notificationId]: !prev[notificationId]
//         }));
//     };

//     const renderNotificationIcon = (notification) => {
//         // Determine icon based on message or restaurant
//         if (notification.restaurant) {
//             return (
//                 <Tooltip title={notification.restaurant.name}>
//                     <RestaurantIcon 
//                         color="primary" 
//                         sx={{ fontSize: 40 }} 
//                     />
//                 </Tooltip>
//             );
//         }
//         return <RestaurantIcon color="default" sx={{ fontSize: 40 }} />;
//     };

//     return (
//         <div className="space-y-5 px-5 lg:px-20">
//             <Typography 
//                 variant="h4" 
//                 className="py-5 font-bold text-center"
//             >
//                 Notifications
//             </Typography>

//             {order.notifications.length === 0 && (
//                 <Typography 
//                     variant="body1" 
//                     color="textSecondary" 
//                     align="center"
//                 >
//                     No notifications at the moment
//                 </Typography>
//             )}

//             {order.notifications.map((notification) => (
//                 <Card 
//                     key={notification.id} 
//                     className={`p-4 mb-3 transition-all duration-300 ease-in-out ${
//                         notification.readStatus 
//                             ? 'opacity-70 bg-gray-100' 
//                             : 'bg-white shadow-sm hover:shadow-md'
//                     }`}
//                 >
//                     <Grid container spacing={2} alignItems="center">
//                         {/* Notification Icon */}
//                         <Grid item xs={2} sm={1}>
//                             {renderNotificationIcon(notification)}
//                         </Grid>

//                         {/* Notification Content */}
//                         <Grid item xs={8} sm={10}>
//                             <Box display="flex" alignItems="center" gap={2}>
//                                 <Typography 
//                                     variant="body1" 
//                                     className={
//                                         notification.readStatus 
//                                             ? 'text-gray-600' 
//                                             : 'font-semibold'
//                                     }
//                                 >
//                                     {notification.message.length > 100 && !expandedNotifications[notification.id]
//                                         ? `${notification.message.slice(0, 100)}...`
//                                         : notification.message}
                                    
//                                     {notification.message.length > 100 && (
//                                         <Typography 
//                                             component="span" 
//                                             color="primary" 
//                                             variant="body2"
//                                             onClick={() => toggleNotificationExpand(notification.id)}
//                                             sx={{ 
//                                                 cursor: 'pointer', 
//                                                 ml: 1,
//                                                 '&:hover': { textDecoration: 'underline' }
//                                             }}
//                                         >
//                                             {expandedNotifications[notification.id] ? 'Show Less' : 'Read More'}
//                                         </Typography>
//                                     )}
//                                 </Typography>

//                                 {!notification.readStatus && (
//                                     <Chip 
//                                         label="New" 
//                                         color="primary" 
//                                         size="small" 
//                                     />
//                                 )}
//                             </Box>

//                             {/* Metadata */}
//                             <Box 
//                                 display="flex" 
//                                 justifyContent="space-between" 
//                                 alignItems="center" 
//                                 mt={1}
//                             >
//                                 {notification.restaurant && (
//                                     <Typography 
//                                         variant="caption" 
//                                         color="textSecondary"
//                                     >
//                                         From: {notification.restaurant.name}
//                                     </Typography>
//                                 )}
//                                 <Typography 
//                                     variant="caption" 
//                                     color="textSecondary"
//                                 >
//                                     {new Date(notification.sentAt).toLocaleString()}
//                                 </Typography>
//                             </Box>
//                         </Grid>

//                         {/* Read/Unread Toggle */}
//                         <Grid item xs={2} sm={1} display="flex" justifyContent="flex-end">
//                             <Tooltip 
//                                 title={notification.readStatus ? "Mark as Unread" : "Mark as Read"}
//                             >
//                                 <IconButton size="small">
//                                     {notification.readStatus ? (
//                                         <MarkunreadIcon color="action" />
//                                     ) : (
//                                         <MarkEmailReadIcon color="primary" />
//                                     )}
//                                 </IconButton>
//                             </Tooltip>
//                         </Grid>
//                     </Grid>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default Notifications;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
import { 
    Card, 
    Typography, 
    Box, 
    Chip,
    Grid,
    IconButton,
    Tooltip
} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import axios from 'axios'; // Assuming you're using axios for API calls

const Notifications = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { order } = useSelector((store) => store);
    const [expandedNotifications, setExpandedNotifications] = useState({});

    useEffect(() => {
        dispatch(getUsersNotificationAction(jwt));
    }, [dispatch, jwt]);

    const toggleNotificationExpand = (notificationId) => {
        setExpandedNotifications(prev => ({
            ...prev,
            [notificationId]: !prev[notificationId]
        }));
    };

    const handleMarkNotification = async (notification) => {
      try {
          const response = await axios.put(`http://localhost:5454/api/notifications/${notification.id}/read`, {}, {
              headers: {
                  Authorization: `Bearer ${jwt}`
              }
          });
  
          // Refresh notifications after marking
          dispatch(getUsersNotificationAction(jwt));
      } catch (error) {
          console.error("Error marking notification:", error.response ? error.response.data : error);
          // Add more detailed error logging
          if (error.response) {
              // The request was made and the server responded with a status code
              console.error("Error data:", error.response.data);
              console.error("Error status:", error.response.status);
              console.error("Error headers:", error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.error("Error request:", error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error message:", error.message);
          }
      }
  };

    const renderNotificationIcon = (notification) => {
        if (notification.restaurant) {
            return (
                <Tooltip title={notification.restaurant.name}>
                    <RestaurantIcon 
                        color="primary" 
                        sx={{ fontSize: 40 }} 
                    />
                </Tooltip>
            );
        }
        return <RestaurantIcon color="default" sx={{ fontSize: 40 }} />;
    };

    return (
        <div className="space-y-5 px-5 lg:px-20">
            <Typography 
                variant="h4" 
                className="py-5 font-bold text-center"
            >
                Notifications
            </Typography>

            {order.notifications.length === 0 && (
                <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    align="center"
                >
                    No notifications at the moment
                </Typography>
            )}

            {order.notifications.map((notification) => (
                <Card 
                    key={notification.id} 
                    className={`p-4 mb-3 transition-all duration-300 ease-in-out ${
                        notification.readStatus 
                            ? 'opacity-70 bg-gray-100' 
                            : 'bg-white shadow-sm hover:shadow-md'
                    }`}
                >
                    <Grid container spacing={2} alignItems="center">
                        {/* Notification Icon */}
                        <Grid item xs={2} sm={1}>
                            {renderNotificationIcon(notification)}
                        </Grid>

                        {/* Notification Content */}
                        <Grid item xs={8} sm={10}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography 
                                    variant="body1" 
                                    className={
                                        notification.readStatus 
                                            ? 'text-gray-600' 
                                            : 'font-semibold'
                                    }
                                >
                                    {notification.message.length > 100 && !expandedNotifications[notification.id]
                                        ? `${notification.message.slice(0, 100)}...`
                                        : notification.message}
                                    
                                    {notification.message.length > 100 && (
                                        <Typography 
                                            component="span" 
                                            color="primary" 
                                            variant="body2"
                                            onClick={() => toggleNotificationExpand(notification.id)}
                                            sx={{ 
                                                cursor: 'pointer', 
                                                ml: 1,
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            {expandedNotifications[notification.id] ? 'Show Less' : 'Read More'}
                                        </Typography>
                                    )}
                                </Typography>

                                {!notification.readStatus && (
                                    <Chip 
                                        label="New" 
                                        color="primary" 
                                        size="small" 
                                    />
                                )}
                            </Box>

                            {/* Metadata */}
                            <Box 
                                display="flex" 
                                justifyContent="space-between" 
                                alignItems="center" 
                                mt={1}
                            >
                                {notification.restaurant && (
                                    <Typography 
                                        variant="caption" 
                                        color="textSecondary"
                                    >
                                        From: {notification.restaurant.name}
                                    </Typography>
                                )}
                                <Typography 
                                    variant="caption" 
                                    color="textSecondary"
                                >
                                    {new Date(notification.sentAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Read/Unread Toggle */}
                        <Grid item xs={2} sm={1} display="flex" justifyContent="flex-end">
                            <Tooltip 
                                title={notification.readStatus ? "Mark as Unread" : "Mark as Read"}
                            >
                                <IconButton 
                                    size="small" 
                                    onClick={() => handleMarkNotification(notification)}
                                >
                                    {notification.readStatus ? (
                                        <MarkunreadIcon color="action" />
                                    ) : (
                                        <MarkEmailReadIcon color="primary" />
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </div>
    );
};

export default Notifications;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
// import { Card } from "@mui/material";

// const Notifications = () => {
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { order } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(getUsersNotificationAction(jwt));
//   }, []);

//   return (
//     <div className="space-y-5 px-5 lg:px-20">
//       <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
//       {order.notifications.map((item) => (
//         <Card key={item.id} className="p-5">
//           <p>{item.message}</p>
//           <p className="text-xs text-gray-500 mt-1">
//             {new Date(item.sentAt).toLocaleString()}
//           </p>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Notifications;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
// import { Card } from "@mui/material";

// const Notifications = () => {
//   const dispatch = useDispatch();
//   const jwt=localStorage.getItem("jwt")

//   const { order } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(getUsersNotificationAction(jwt));
//   }, []);

//   return (
//     <div className="space-y-5 px-5 lg:px-20">
//       <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
//       {order.notifications.map((item) => (
//         <Card className="p-5">
//           <p>{item.message}</p>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default Notifications;
