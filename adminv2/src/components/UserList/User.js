import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import * as ImIconS from "react-icons/im";
import { config } from "../axios/auth-header";
import { message } from "antd";
import { Popconfirm } from "antd";
import { Table } from "antd";
import { Input } from "antd";

function User() {
  const { users, setUsers } = useContext(AppContext);
  const { setStores } = useContext(AppContext);
  const [switchStates, setSwitchStates] = useState(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
  );

  useEffect(() => {
    setSwitchStates(
      users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
    );
  }, [users]);

  const handleToggle = (id) => {
    setSwitchStates((prevStates) => {
      const newStatus = prevStates[id] === 1 ? 2 : 1;
      axios
        .put(
          `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/update/${id}?status=${newStatus}`,
          {
            status: newStatus,
          },
          config
        )
        .then((response) => {
          console.log("Success:", response.data);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id ? { ...user, status: newStatus } : user
            )
          );
          setStores((prevStores) =>
            prevStores.map((store) =>
              store.user.id === id
                ? { ...store, user: { ...store.user, status: newStatus } }
                : store
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          message.error("Change state unsuccessfully!");
        });

      return { ...prevStates, [id]: newStatus };
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/delete/${id}`,
        config
      )
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        message.success("Delete account successfully!");
      })
      .catch((error) => {
        console.error(error);
        message.error("Delete account unsuccessfully!");
      });
  };

  const confirmDelete = (id) => {
    handleDelete(id);
  };

  const transformedUsers = users.map((user) => ({
    ...user,
    statusIcon: (
      <Switch
        checked={switchStates[user.id] === 1}
        onChange={() => handleToggle(user.id)}
        color="warning"
        className="custom-icon"
      />
    ),
    details: <Link to={`${user.id}`}>View detail</Link>,
    action: (
      <Popconfirm
        title="Do you want to delete this user?"
        onConfirm={() => confirmDelete(user.id)}
        okText="Yes"
        cancelText="No"
      >
        <ImIconS.ImBin className="action-icon" style={{ width: "25%" }} />
      </Popconfirm>
    ),
  }));
  const columns = [
    // {
    //   title: "Avatar",
    //   dataIndex: "image",
    //   key: "image",
    // },
    {
      title: "Username",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "statusIcon",
      key: "statusIcon",
    },
    {
      title: "Detail",
      dataIndex: "details",
      key: "details",
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = transformedUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="admintitle">
        <h2>User list</h2>
      </div>
      <div className="search-container">
        <Input
          placeholder="Search by username"
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-bar"
        />
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          className="user-table"
        />
      </div>
    </div>
  );
}

export default User;
