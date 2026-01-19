import React from 'react'
import { useEffect, useState } from "react";
import { getUserOrders } from "../../services/OrderService/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import DetailModal from "../../components/TableModal/DetailModal";
const Orders = () => {
      const dispatch = useDispatch();
  const [selectOrder, setSelectOrder] = useState(null);

  const deleteOrder = (id) => {};

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const ordersState = useSelector((state) => state.order.orders.data);
  const orders = [];
  for (let i = 0; i < ordersState?.length; i++) {
    orders.push({
      key: i + 1,
      orderId: ordersState[i]._id,
      orderBy: ordersState[i].orderBy.username,
      orderStatus: ordersState[i].status,
      totalAmount: ordersState[i].totalAmount,
      createdAt: ordersState[i].createdAt
    });
  }
  console.log(ordersState)
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Order Management</h1>
      </div>

      <Table
        data={orders}
        onDelete={deleteOrder}
        onView={setSelectOrder}
      />

      {selectOrder && (
        <DetailModal
          data={selectOrder}
          onClose={() => setSelectOrder(null)}
        />
      )}
    </div>
  )
}

export default Orders