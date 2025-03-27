import React from 'react';

const OrderCard = ({ status, order }) => {
  return (
    <div className="p-3 border-b last:border-b-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {order.food.images && order.food.images.length > 0 && (
            <img 
              src={order.food.images[0]} 
              alt={order.food.name} 
              className="w-16 h-16 object-cover rounded-md mr-3"
            />
          )}
          <div>
            <h3 className="font-semibold">{order.food.name}</h3>
            <p className="text-sm text-gray-600">
              {order.quantity} x ${order.food.price}
            </p>
            {order.ingredients && order.ingredients.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Ingredients: {order.ingredients.join(', ')}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${order.totalPrice}</p>
          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
            status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
            status === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-800' :
            status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

// import React from 'react';

// const OrderCard = ({ status, order, restaurantName }) => {
//   return (
//     <div className="p-4 border rounded-md mb-2">
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-semibold">{order.food.name}</h3>
//           <p className="text-sm text-gray-600">
//             {restaurantName && <span>From: {restaurantName}</span>}
//           </p>
//           <p className="text-sm">Quantity: {order.quantity}</p>
//           <p className="text-sm">Price: ${order.totalPrice}</p>
//           {order.ingredients && order.ingredients.length > 0 && (
//             <p className="text-xs text-gray-500">
//               Ingredients: {order.ingredients.join(', ')}
//             </p>
//           )}
//         </div>
//         <div className="text-right">
//           <span className={`px-2 py-1 rounded-full text-sm ${
//             status === 'DELIVERED' ? 'bg-green-200 text-green-800' :
//             status === 'OUT_FOR_DELIVERY' ? 'bg-blue-200 text-blue-800' :
//             status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
//             'bg-gray-200 text-gray-800'
//           }`}>
//             {status}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;


// import { Button, Card } from "@mui/material";
// import React from "react";

// const OrderCard = ({order,status}) => {
//   return (
//     <Card className="flex justify-between items-center p-5 ">
//       <div className="flex items-center space-x-5">
//         <img
//           className="h-16 w-16"
//           src={order.food.images[0]}
//           alt=""
//         />
//         <div>
//           <p>{order.food.name}</p>
//           <p className="text-gray-400">₹{order.food.price}</p>
//         </div>
//       </div>
//       <div>
//         <Button className="cursor-not-allowed" variant="contained">{status}</Button>
//       </div>
//     </Card>
//   );
// };

// export default OrderCard;
