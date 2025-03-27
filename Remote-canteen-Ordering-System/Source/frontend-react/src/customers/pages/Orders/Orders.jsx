// import React, { useEffect, useMemo } from 'react';
// import OrderCard from '../../components/Order/OrderCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUsersOrders } from '../../../State/Customers/Orders/Action';

// const Orders = () => {
//   const { order, auth } = useSelector(store => store);
//   const orders = useSelector(state => state.orders)
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   useEffect(() => {
//         if (jwt) dispatch(getUsersOrders(jwt));
//       }, [auth.jwt]);
//       useEffect(() => {
//         console.log("API response for orders:", order.orders);
//       }, [order.orders]);

//   // useEffect(() => {
//   //   if (jwt) dispatch(getUsersOrders(jwt));
//   // }, [jwt, dispatch]);

//   // Detailed debug logging
//   useEffect(() => {
//     console.log("Current orders state:", order);
//   }, [order]);

//   // Memoized order processing with more robust checks
//   const processedOrders = useMemo(() => {
//     if (!order.orders || order.orders.length === 0) return [];
  
//     return order.orders.map(parentOrder => ({
//       ...parentOrder,
//       totalRestaurants: parentOrder.restaurantOrders?.length || 0,
//       totalItems: parentOrder.restaurantOrders?.reduce(
//         (total, resto) => total + (resto.items?.length || 0), 
//         0
//       ),
//       hasValidRestaurantOrders: parentOrder.restaurantOrders?.length > 0,
//       restaurantOrders: parentOrder.restaurantOrders?.map(ro => ({
//         ...ro,
//         restaurantName: ro.restaurant?.name || "Unknown Restaurant",  // Ensure restaurant name is used
//         items: ro.items || []  // Ensure items array exists
//       })) || []
//     }));
//   }, [order.orders]);
  
// //   const processedOrders = useMemo(() => {
// //     if (!order.orders || order.orders.length === 0) return [];

// //     return order.orders.map(parentOrder => {
// //       return {
// //         ...parentOrder,
// //         totalRestaurants: parentOrder.restaurantOrders?.length || 0,
// //         totalItems: parentOrder.restaurantOrders?.reduce(
// //           (total, resto) => total + (resto.items?.length || 0), 
// //           0
// //         ),
// //         hasValidRestaurantOrders: parentOrder.restaurantOrders?.length > 0
// //       };
// //     });
// // }, [order.orders]);

//   // Loading and error states
//   if (order.loading) return <div className='text-center py-7'>Loading orders...</div>;
//   if (order.error) return <div className='text-center py-7 text-red-500'>Failed to load orders. Please try again!</div>;
//   if (!processedOrders.length) return <div className='text-center py-7'>No orders found.</div>;

//   return (
//     <div className='flex items-center flex-col'>
//       <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
//       <div className='space-y-5 w-full lg:w-1/2'>
//         {processedOrders.map((parentOrder) => (
//           <div 
//             key={parentOrder.id} 
//             className="border p-4 rounded-lg mb-4 shadow-md"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <div>
//                 <span className="text-lg font-bold">Order #{parentOrder.id}</span>
//                 <span className="ml-2 text-sm text-gray-600">
//                   {parentOrder.totalRestaurants} Restaurant(s), {parentOrder.totalItems} Item(s)
//                 </span>
//               </div>
//               <div>
//               {parentOrder.restaurantOrders.map(restaurantOrder => (
//   <div key={restaurantOrder.id} className="text-sm font-medium text-gray-700">
//     {restaurantOrder.restaurantName} {/* Updated key */}
//   </div>
// ))}
// </div>
//             </div>
            
//             <div className='text-sm text-gray-500 mb-3'>
//               Placed on: {parentOrder.date ? new Date(parentOrder.date).toLocaleDateString() : 'Unknown Date'}
//             </div>
            
//             {parentOrder.restaurantOrders && parentOrder.restaurantOrders.length > 0 ? (
//               parentOrder.restaurantOrders.map((restaurantOrder) => (
//                 <div 
//                   key={restaurantOrder.id} 
//                   className="mb-4 border-t pt-3"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                   <div className="font-semibold">
//   {restaurantOrder.restaurant && restaurantOrder.restaurant.name
//     ? restaurantOrder.restaurant.name
//     : "Unknown Restaurant"}
// </div>
//                     <div className="text-sm text-gray-600">
//                       {restaurantOrder.displayStatus || 'Unknown Status'}
//                     </div>
//                   </div>
                  
//                   {restaurantOrder.items && restaurantOrder.items.length > 0 ? (
//                     <div className="space-y-2">
//                       {restaurantOrder.items.map((item) => (
//                         <OrderCard 
//                           key={item.id} 
//                           status={restaurantOrder.displayStatus} 
//                           order={item} 
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className='text-gray-500 text-sm italic'>
//                       No items found in this restaurant order.
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className='text-gray-500 text-sm italic'>
//                 No restaurant orders associated with this order.
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;



// import React, { useEffect, useMemo } from 'react';
// import OrderCard from '../../components/Order/OrderCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUsersOrders } from '../../../State/Customers/Orders/Action';
// import { Clock, MapPin, ShoppingBag } from 'lucide-react';

// const OrderStatusBadge = ({ status }) => {
//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED': return 'bg-green-100 text-green-800';
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'CANCELLED': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
//       {status || 'PENDING'}
//     </span>
//   );
// };

// const Orders = () => {
//   const { order, auth } = useSelector(store => store);
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) dispatch(getUsersOrders(jwt));
//   }, [auth.jwt]);

//   // Memoized order processing with enhanced error handling
//   const processedOrders = useMemo(() => {
//     if (!order.orders || order.orders.length === 0) return [];
  
//     return order.orders.map(parentOrder => ({
//       ...parentOrder,
//       totalRestaurants: parentOrder.restaurantOrders?.length || 0,
//       totalItems: parentOrder.restaurantOrders?.reduce(
//         (total, resto) => total + (resto.items?.length || 0), 
//         0
//       ),
//       restaurantOrders: parentOrder.restaurantOrders?.map(ro => ({
//         ...ro,
//         restaurantName: ro.restaurant?.name || ro.restaurantName || "Unknown Restaurant",
//         restaurant: ro.restaurant || { name: ro.restaurantName || "Unknown Restaurant" },
//         items: ro.items || ro.orderItems || ro.restaurantOrderItems || [],
//         displayStatus: ro.orderStatus || ro.displayStatus || 'PENDING',
//         subtotalAmount: ro.subtotalAmount || 0,
//         pickupTime: ro.pickupTime
//       })) || []
//     }));
//   }, [order.orders]);

//   // Loading and error states
//   if (order.loading) return <div className='text-center py-7'>Loading orders...</div>;
//   if (order.error) return <div className='text-center py-7 text-red-500'>Failed to load orders. Please try again!</div>;
//   if (!processedOrders.length) return <div className='text-center py-7'>No orders found.</div>;

//   return (
//     <div className='flex items-center flex-col bg-gray-50 min-h-screen p-4'>
//       <h1 className='text-2xl text-center py-7 font-bold text-gray-800'>My Orders</h1>
//       <div className='space-y-6 w-full max-w-4xl'>
//         {processedOrders.map((parentOrder) => (
//           <div 
//             key={parentOrder.id} 
//             className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
//           >
//             <div className="p-4 bg-gray-100 flex justify-between items-center">
//               <div>
//                 <span className="text-lg font-bold text-gray-800">Order #{parentOrder.id}</span>
//                 <span className="ml-3 text-sm text-gray-600">
//                   <ShoppingBag className="inline-block mr-1 h-4 w-4" />
//                   {parentOrder.totalRestaurants} Restaurant(s), {parentOrder.totalItems} Item(s)
//                 </span>
//               </div>
//               <OrderStatusBadge status={parentOrder.orderStatus} />
//             </div>
            
//             <div className='px-4 py-2 text-sm text-gray-500 border-b border-gray-200 flex justify-between items-center'>
//               <div>
//                 <MapPin className="inline-block mr-1 h-4 w-4" />
//                 Placed on: {parentOrder.date ? new Date(parentOrder.date).toLocaleDateString() : 'Unknown Date'}
//               </div>
//               <div className="font-semibold text-gray-700">
//                 Total Amount: ₹{parentOrder.totalAmount?.toFixed(2) || '0.00'}
//               </div>
//             </div>
            
//             {parentOrder.restaurantOrders && parentOrder.restaurantOrders.length > 0 ? (
//               parentOrder.restaurantOrders.map((restaurantOrder) => (
//                 <div 
//                   key={restaurantOrder.id} 
//                   className="px-4 py-3 border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex justify-between items-center mb-3">
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {restaurantOrder.restaurant?.name || restaurantOrder.restaurantName || "Unknown Restaurant"}
//                       </h3>
//                       <div className="text-sm text-gray-600 flex items-center mt-1">
//                         <Clock className="mr-1 h-4 w-4" />
//                         Pickup Time: {restaurantOrder.pickupTime || 'Not Specified'}
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <OrderStatusBadge status={restaurantOrder.displayStatus} />
//                       <span className="text-sm text-gray-600 mt-1">
//                         Subtotal: ₹{(restaurantOrder.subtotalAmount || 0).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {restaurantOrder.items && restaurantOrder.items.length > 0 ? (
//                     <div className="space-y-2">
//                       {restaurantOrder.items.map((item) => (
//                         <OrderCard 
//                           key={item.id} 
//                           status={restaurantOrder.displayStatus} 
//                           order={item} 
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className='text-gray-500 text-sm italic text-center'>
//                       No items found in this restaurant order.
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className='text-gray-500 text-sm italic text-center p-4'>
//                 No restaurant orders associated with this order.
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useMemo } from 'react';
import OrderCard from '../../components/Order/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import { Clock, MapPin, ShoppingBag } from 'lucide-react';

const formatPickupTime = (pickupTime) => {
  if (!pickupTime) return 'Not Specified';
  
  try {
    const time = new Date(pickupTime);
    return time.toLocaleString('en-US', {
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting pickup time:', error);
    return pickupTime;
  }
};

const OrderStatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status || 'PENDING'}
    </span>
  );
};

const Orders = () => {
  const { order, auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

  // Enhanced debug logging for order items
  useEffect(() => {
    console.log("Full order state:", order);
    if (order.orders) {
      order.orders.forEach((parentOrder, parentIndex) => {
        console.log(`Parent Order ${parentIndex} Restaurant Orders:`, parentOrder.restaurantOrders);
        parentOrder.restaurantOrders?.forEach((ro, roIndex) => {
          console.log(`Restaurant Order ${roIndex} Items:`, ro.items);
          console.log(`Restaurant Order ${roIndex} Order Items:`, ro.orderItems);
          console.log(`Restaurant Order ${roIndex} Restaurant Order Items:`, ro.restaurantOrderItems);
        });
      });
    }
  }, [order.orders]);

  // Memoized order processing with enhanced error handling
  const processedOrders = useMemo(() => {
    if (!order.orders || order.orders.length === 0) return [];
  
    return order.orders.map(parentOrder => ({
      ...parentOrder,
      totalRestaurants: parentOrder.restaurantOrders?.length || 0,
      totalItems: parentOrder.restaurantOrders?.reduce(
        (total, resto) => total + (
          resto.items?.length || 
          resto.orderItems?.length || 
          resto.restaurantOrderItems?.length || 
          0
        ), 
        0
      ),
      restaurantOrders: parentOrder.restaurantOrders?.map(ro => {
        // Prioritize different item sources
        const items = ro.items || ro.orderItems || ro.restaurantOrderItems || [];
        
        return {
          ...ro,
          restaurantName: ro.restaurant?.name || ro.restaurantName || "Unknown Restaurant",
          restaurant: ro.restaurant || { name: ro.restaurantName || "Unknown Restaurant" },
          items: items,
          displayStatus: ro.orderStatus || ro.displayStatus || 'PENDING',
          subtotalAmount: ro.subtotalAmount || 0,
          pickupTime: ro.pickupTime
        };
      }) || []
    }));
  }, [order.orders]);

  // Loading and error states
  if (order.loading) return <div className='text-center py-7'>Loading orders...</div>;
  if (order.error) return <div className='text-center py-7 text-red-500'>Failed to load orders. Please try again!</div>;
  if (!processedOrders.length) return <div className='text-center py-7'>No orders found.</div>;

  return (
    <div className='flex items-center flex-col bg-gray-50 min-h-screen p-4'>
      <h1 className='text-2xl text-center py-7 font-bold text-gray-800'>My Orders</h1>
      <div className='space-y-6 w-full max-w-4xl'>
        {processedOrders.map((parentOrder) => (
          <div 
            key={parentOrder.id} 
            className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <div>
                <span className="text-lg font-bold text-gray-800">Order #{parentOrder.id}</span>
                <span className="ml-3 text-sm text-gray-600">
                  <ShoppingBag className="inline-block mr-1 h-4 w-4" />
                  {parentOrder.totalRestaurants} Restaurant(s), {parentOrder.totalItems} Item(s)
                </span>
              </div>
              <OrderStatusBadge status={parentOrder.orderStatus} />
            </div>
            
            <div className='px-4 py-2 text-sm text-gray-500 border-b border-gray-200 flex justify-between items-center'>
              <div>
                <MapPin className="inline-block mr-1 h-4 w-4" />
                Placed on: {parentOrder.date ? new Date(parentOrder.date).toLocaleDateString() : 'Unknown Date'}
              </div>
              <div className="font-semibold text-gray-700">
                Total Amount: ₹{parentOrder.totalAmount?.toFixed(2) || '0.00'}
              </div>
            </div>
            
            {parentOrder.restaurantOrders && parentOrder.restaurantOrders.length > 0 ? (
              parentOrder.restaurantOrders.map((restaurantOrder) => (
                <div 
                  key={restaurantOrder.id} 
                  className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {restaurantOrder.restaurant?.name || restaurantOrder.restaurantName || "Unknown Restaurant"}
                      </h3>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="mr-1 h-4 w-4" />
                        Pickup Time: {formatPickupTime(restaurantOrder.pickupTime)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <OrderStatusBadge status={restaurantOrder.displayStatus} />
                      <span className="text-sm text-gray-600 mt-1">
                        Subtotal: ₹{(restaurantOrder.subtotalAmount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {restaurantOrder.items && restaurantOrder.items.length > 0 ? (
                    <div className="space-y-2">
                      {restaurantOrder.items.map((item) => (
                        <OrderCard 
                          key={item.id} 
                          status={restaurantOrder.displayStatus} 
                          order={item} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='text-gray-500 text-sm italic text-center'>
                      No items found in this restaurant order.
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-gray-500 text-sm italic text-center p-4'>
                No restaurant orders associated with this order.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;