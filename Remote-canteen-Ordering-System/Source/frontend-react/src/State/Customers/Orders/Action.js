import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
//import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS,GET_USERS_ORDERS_REQUEST } from "./ActionTypes";
import {
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  // Import other action types as needed
} from "./ActionTypes";


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.post('/api/order', reqData.order,{
        headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
      });
      if(data.payment_url){
        window.location.href=data.payment_url;
      }
      console.log("created order data",data)
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.log("error ",error)
      dispatch(createOrderFailure(error));
    }
  };
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    
    try {
      const response = await api.get('/api/order/user', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        timeout: 10000
      });

      console.log("Raw API Response:", response.data);

      const processedData = (response.data || []).map(order => {
        // Debug logging for each order
        console.log("Processing Order:", order);

        return {
          ...order,
          date: order.createdAt ? new Date(order.createdAt) : new Date(),
          restaurantOrders: (order.restaurantOrders || []).map(ro => {
            // Additional logging for restaurant orders
            console.log("Restaurant Order:", ro);
            console.log("Items in Restaurant Order:", ro.items);

            return {
              ...ro,
              restaurant: ro.restaurant || { 
                name: ro.restaurantName || "Unknown Restaurant" 
              },
              restaurantName: ro.restaurant?.name || ro.restaurantName || "Unknown Restaurant",
              // Try different paths to fetch items
              items: ro.items || 
                     ro.orderItems || 
                     ro.restaurantOrderItems || 
                     [],
              displayStatus: ro.orderStatus || ro.displayStatus || 'PENDING'
            };
          })
        };
      });

      console.log("Processed Orders with Debugging:", processedData);
      dispatch(getUsersOrdersSuccess(processedData));
    } catch (error) {
      console.error("Order fetch error:", error);
      dispatch(getUsersOrdersFailure(error.message));
    }
  };
};


// export const getUsersNotificationAction = (jwt) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USERS_ORDERS_REQUEST });
//     try {
//       const { data } = await api.get('/api/notifications', {
//         headers: {
//           Authorization: `Bearer ${jwt}`
//         }
//       });
//       console.log("all notifications ", data);
//       dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
//     } catch (error) {
//       console.log("error ", error);
//       dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error });
//     }
//   };
// };

export const getUsersNotificationAction = (jwt) => {
  return async (dispatch) => {
      dispatch({ type: GET_USERS_ORDERS_REQUEST });
      try {
          const { data } = await api.get('/api/notifications', {
              headers: {
                  Authorization: `Bearer ${jwt}`
              }
          });
          
          // Optional: Sort notifications by most recent first
          const sortedNotifications = data.sort((a, b) => 
              new Date(b.sentAt) - new Date(a.sentAt)
          );
          
          console.log("Fetched notifications", sortedNotifications);
          
          dispatch({ 
              type: GET_USERS_NOTIFICATION_SUCCESS, 
              payload: sortedNotifications 
          });
      } catch (error) {
          console.error("Notification fetch error:", error);
          dispatch({ 
              type: GET_USERS_NOTIFICATION_FAILURE, 
              payload: error 
          });
      }
  };
};