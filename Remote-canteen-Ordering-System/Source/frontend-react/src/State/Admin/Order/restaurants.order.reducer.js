// // reducers.js
// import {
//   UPDATE_ORDER_STATUS_REQUEST,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   GET_RESTAURANTS_ORDER_REQUEST,
//   GET_RESTAURANTS_ORDER_SUCCESS,
//   GET_RESTAURANTS_ORDER_FAILURE,
// } from "./ActionType.js";

// const initialState = {
//   loading: false,
//   error: null,
//   orders:[]
// };

// const restaurantsOrderReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_RESTAURANTS_ORDER_REQUEST:
//     case UPDATE_ORDER_STATUS_REQUEST:
//       return { ...state, loading: true, error: null };
//     case GET_RESTAURANTS_ORDER_SUCCESS:
//       return { ...state, loading: false, orders: action.payload };
//     case UPDATE_ORDER_STATUS_SUCCESS:
//       const updatedOrders = state.orders.map((order) => 
//         order.id === action.payload.id?action.payload:order
//       );
//       return { ...state, loading: false, orders: updatedOrders };
//     case GET_RESTAURANTS_ORDER_FAILURE:
//     case UPDATE_ORDER_STATUS_FAILURE:
//       return { ...state, loading: false, error: action.error };
//     default:
//       return state;
//   }
// };

// export default restaurantsOrderReducer;


// import {
//   UPDATE_ORDER_STATUS_REQUEST,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   GET_RESTAURANTS_ORDER_REQUEST,
//   GET_RESTAURANTS_ORDER_SUCCESS,
//   GET_RESTAURANTS_ORDER_FAILURE,
// } from "./ActionType.js";

// const initialState = {
//   loading: false,
//   error: null,
//   orders: []
// };

// const restaurantsOrderReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_RESTAURANTS_ORDER_REQUEST:
//     case UPDATE_ORDER_STATUS_REQUEST:
//       return { ...state, loading: true, error: null };
//     case GET_RESTAURANTS_ORDER_SUCCESS:
//       return { ...state, loading: false, orders: action.payload };
//     case UPDATE_ORDER_STATUS_SUCCESS:
//       const updatedOrders = state.orders.map((order) => 
//         order.id === action.payload.id ? action.payload : order
//       );
//       return { ...state, loading: false, orders: updatedOrders };
//     case GET_RESTAURANTS_ORDER_FAILURE:
//     case UPDATE_ORDER_STATUS_FAILURE:
//       return { ...state, loading: false, error: action.error };
//     default:
//       return state;
//   }
// };

// export default restaurantsOrderReducer;

// restaurants.order.reducer.js
// restaurantsOrderReducer.js
import {
  FETCH_RESTAURANT_ORDER_REQUEST,
  FETCH_RESTAURANT_ORDER_SUCCESS,
  FETCH_RESTAURANT_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType.js";

const initialState = {
  loading: false,
  error: null,
  orders: []
};

const restaurantsOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT_ORDER_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_RESTAURANT_ORDER_SUCCESS:
      let processedOrders = [];
      try {
        // Check if payload is already parsed
        if (Array.isArray(action.payload)) {
          processedOrders = action.payload;
        } 
        // Check if payload has a data property that's a string
        else if (action.payload?.data && typeof action.payload.data === 'string') {
          processedOrders = JSON.parse(action.payload.data);
        }
        // Check if payload has a data property that's an array
        else if (action.payload?.data && Array.isArray(action.payload.data)) {
          processedOrders = action.payload.data;
        }
        // If payload is a string, try to parse it
        else if (typeof action.payload === 'string') {
          processedOrders = JSON.parse(action.payload);
        }
        // Default case - use the payload as is
        else {
          processedOrders = action.payload || [];
        }
      } catch (err) {
        console.error("Error parsing orders data:", err);
        processedOrders = [];
      }
      
      return {
        ...state,
        loading: false,
        orders: processedOrders,
        error: null
      };
    
    case UPDATE_ORDER_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) => 
        order.id === action.payload.id ? action.payload : order
      );
      return { ...state, loading: false, orders: updatedOrders };
    
    case FETCH_RESTAURANT_ORDER_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export default restaurantsOrderReducer;