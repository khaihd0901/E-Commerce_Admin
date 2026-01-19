import React from 'react'
import { useEffect, useState } from "react";
import { getUsers } from "../../services/uerService/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableModal/Table";
import DetailModal from "../../components/TableModal/DetailModal";
const Orders = () => {
      const dispatch = useDispatch();
  const [selectUser, setSelectUser] = useState(null);

  const deleteUser = (id) => {};

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const usersState = useSelector((state) => state.user.users.data);
  const users = [];
  for (let i = 0; i < usersState?.length; i++) {
    users.push({
      key: i + 1,
      userId: usersState[i]._id,
      username: usersState[i].username,
      phone: usersState[i].phone,
      createdAt: usersState[i].createdAt,
      accountVerified: ((usersState[i].isVerified === true) ? "Verified" : "Not Verify"),
    });
  }
  console.log(users)
  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl shadow">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">User Management</h1>
      </div>

      <Table
        data={users}
        onDelete={deleteUser}
        onView={setSelectUser}
      />

      {selectUser && (
        <DetailModal
          data={selectUser}
          onClose={() => setSelectUser(null)}
        />
      )}
    </div>
  )
}

export default Orders