// // actions.js
// import axios from "axios";
// import {
//   UPDATE_ORDER_STATUS_REQUEST,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   GET_RESTAURANTS_ORDER_REQUEST,
//   GET_RESTAURANTS_ORDER_SUCCESS,
//   GET_RESTAURANTS_ORDER_FAILURE,
// } from "./ActionType.js";
// import { api } from "../../../config/api.js";

// export const updateOrderStatus = ({orderId,orderStatus,jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

//       const response = await api.put(
//         `/api/admin/orders/${orderId}/${orderStatus}`,{},{
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       const updatedOrder = response.data;

//       console.log("udpdated order ", updatedOrder);

//       dispatch({
//         type: UPDATE_ORDER_STATUS_SUCCESS,
//         payload: updatedOrder,
//       });
//     } catch (error) {
//       console.log("catch error ", error);
//       dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
//     }
//   };
// };

// export const fetchRestaurantsOrder = ({restaurantId,orderStatus,jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

//       const { data } = await api.get(
//         `/api/admin/order/restaurant/${restaurantId}`,{
//           params: { order_status:orderStatus},
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       const orders = data;
//       console.log("restaurants order ------ ", orders);
//       dispatch({
//         type: GET_RESTAURANTS_ORDER_SUCCESS,
//         payload: orders,
//       });
//     } catch (error) {
//       dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
//     }
//   };
// };


// import axios from "axios";
// import {
//   UPDATE_ORDER_STATUS_REQUEST,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   GET_RESTAURANTS_ORDER_REQUEST,
//   GET_RESTAURANTS_ORDER_SUCCESS,
//   GET_RESTAURANTS_ORDER_FAILURE,
// } from "./ActionType.js";
// import { api } from "../../../config/api.js";

// export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

//       // This path should match your backend RestaurantOrderController endpoint
//       const response = await api.put(
//         `/api/restaurant-orders/${orderId}/status?orderStatus=${orderStatus}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       const updatedOrder = response.data;
//       console.log("updated order ", updatedOrder);

//       dispatch({
//         type: UPDATE_ORDER_STATUS_SUCCESS,
//         payload: updatedOrder,
//       });
//     } catch (error) {
//       console.log("catch error ", error);
//       dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
//     }
//   };
// };

// export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

//       const response = await api.get(
//         `/api/restaurant-orders/restaurant/${restaurantId}`,
//         {
//           params: { orderStatus },
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       // Just use the raw data directly without parsing
//       dispatch({
//         type: GET_RESTAURANTS_ORDER_SUCCESS,
//         payload: [], // Send empty array for now to prevent errors
//       });
      
//       // Log the raw response for debugging
//       console.log("Raw API response:", response);
      
//     } catch (error) {
//       dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
//     }
//   };
// };

// export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

//       const { data } = await api.get(
//         `/api/restaurant-orders/restaurant/${restaurantId}`,
//         {
//           params: { orderStatus },
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       // Parse the data if it's a string
//       const orders = typeof data === 'string' ? JSON.parse(data) : data;
      
//       dispatch({
//         type: GET_RESTAURANTS_ORDER_SUCCESS,
//         payload: orders,
//       });
//     } catch (error) {
//       dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, error });
//     }
//   };
// };
// import axios from "axios";
// import {
//   UPDATE_ORDER_STATUS_REQUEST,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   GET_RESTAURANTS_ORDER_REQUEST,
//   GET_RESTAURANTS_ORDER_SUCCESS,
//   GET_RESTAURANTS_ORDER_FAILURE,
// } from "./ActionType.js";
// import { api } from "../../../config/api.js";

// export const updateOrderStatus = ({orderId, orderStatus, jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

//       // Make sure this endpoint matches your backend controller
//       const response = await api.put(
//         `/api/admin/orders/${orderId}/${orderStatus}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       const updatedOrder = response.data;
//       console.log("updated order ", updatedOrder);

//       dispatch({
//         type: UPDATE_ORDER_STATUS_SUCCESS,
//         payload: updatedOrder,
//       });
//     } catch (error) {
//       console.log("catch error ", error);
//       dispatch({ 
//         type: UPDATE_ORDER_STATUS_FAILURE, 
//         payload: error.message || "Failed to update order status" 
//       });
//     }
//   };
// };

// export const fetchRestaurantsOrder = ({restaurantId, orderStatus, jwt}) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

//       // Make sure this endpoint matches your backend controller
//       const response = await api.get(
//         `/api/admin/order/restaurant/${restaurantId}`,
//         {
//           params: orderStatus ? { order_status: orderStatus } : {},
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       // Ensure orders is always an array
//       let orders = response.data;
      
//       // If it's not an array but has items property, it might be a single order
//       if (!Array.isArray(orders) && orders && typeof orders === 'object') {
//         if (Array.isArray(orders.items)) {
//           // It's a single order, wrap it in an array
//           orders = [orders];
//         } else if (orders.orders && Array.isArray(orders.orders)) {
//           // It might be a wrapper object
//           orders = orders.orders;
//         }
//       }
      
//       console.log("restaurants orders (processed):", orders);
      
//       dispatch({
//         type: GET_RESTAURANTS_ORDER_SUCCESS,
//         payload: orders,
//       });
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       dispatch({ 
//         type: GET_RESTAURANTS_ORDER_FAILURE, 
//         payload: error.message || "Failed to fetch restaurant orders" 
//       });
//     }
//   };
// };



// restaurants.order.action.js



// Action to fetch restaurant orders
// In restaurants.order.action.js
// export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => async (dispatch) => {
//   dispatch({ type: FETCH_RESTAURANT_ORDER_REQUEST });
  
//   try {
//     const response = await api.get(
//       `/api/restaurant-orders/restaurant/${restaurantId}`,
//       {
//         params: { order_status: orderStatus },
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       }
//     );
    
//     // Log the raw response
//     console.log("Raw API response:", response);
    
//     // Ensure we're using the data correctly
//     const ordersData = response.data;
    
//     dispatch({ 
//       type: FETCH_RESTAURANT_ORDER_SUCCESS, 
//       payload: ordersData 
//     });
//   } catch (error) {
//     console.error("Error fetching restaurant orders:", error);
//     dispatch({ type: FETCH_RESTAURANT_ORDER_FAILURE, payload: error });
//   }
// };
import { api } from "../../../config/api";
import {
  FETCH_RESTAURANT_ORDER_REQUEST,
  FETCH_RESTAURANT_ORDER_SUCCESS,
  FETCH_RESTAURANT_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE
} from "./ActionType.js";

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANT_ORDER_REQUEST });

  try {
    const response = await api.get(
      `/api/restaurant-orders/restaurant/${restaurantId}`,
      {
        params: { order_status: orderStatus },
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    console.log("Raw API response:", response);  // Log raw response

    let ordersData = response.data;
    
    // Check if ordersData is a string, then parse it
    if (typeof ordersData === "string") {
      ordersData = JSON.parse(ordersData);
    }

    console.log("Orders Data Before Dispatch:", ordersData);

    dispatch({ type: FETCH_RESTAURANT_ORDER_SUCCESS, payload: ordersData });

  } catch (error) {
    console.error("Error fetching restaurant orders:", error);
    dispatch({ type: FETCH_RESTAURANT_ORDER_FAILURE, payload: error });
  }
};


// Action to update order status
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    
    // Use axios consistent with your other API calls
    const response = await api.put(
      `/api/restaurant-orders/${orderId}/status`, 
      {}, // Empty body since we're using query params
      {
        params: { order_status: orderStatus }, // Match the param name in RestaurantOrderController
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    
    console.log("Update order response:", response.data);
    
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: response.data });
    
    // Optionally refresh the orders list after successful update
    // dispatch(fetchRestaurantsOrder({ restaurantId, jwt }));
    
  } catch (error) {
    console.error("Error updating order status:", error);
    dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.message });
  }
};