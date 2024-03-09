import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import { useEffect } from "react";
import * as ImIconS from "react-icons/im";
import { message } from "antd";
import { Popconfirm } from "antd";
import { Input, Table } from "antd";

function Store() {
  const { stores, setStores } = useContext(AppContext);

  // First, create a state variable for the switch states.
  const [switchStates, setSwitchStates] = useState(
    stores?.reduce(
      (acc, store) => ({ ...acc, [store.id]: store.user.status }),
      {}
    )
  );

  useEffect(() => {
    setSwitchStates(
      stores?.reduce(
        (acc, store) => ({ ...acc, [store.id]: store.user.status }),
        {}
      )
    );
  }, [stores]);

  // const handleToggle = (id) => {
  //   setSwitchStates((prevStates) => {
  //     const newStatus = prevStates[id] === 1 ? 2 : 1;
  //     axios
  //       .put(
  //         `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/update/${id}?status=${newStatus}`,
  //         {
  //           status: newStatus,
  //         },
  //         config
  //       )
  //       .then((response) => {
  //         console.log("Success:", response.data);
  //         setStores((prevStores) =>
  //           prevStores.map((store) =>
  //             store.user.id === id
  //               ? { ...store, user: { ...store.user, status: newStatus } }
  //               : store
  //           )
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });

  //     return { ...prevStates, [id]: newStatus };
  //   });
  // };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/delete/${id}`
      )
      .then(() => {
        setStores((prevStores) =>
          prevStores.filter((store) => store.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmDelete = (id) => {
    message.success("Delete successfully!");
    handleDelete(id);
  };

  const transformedstores = stores.map((store) => ({
    ...store,
    username: store.user.fullName,
    statusIcon: (
      <Switch
        className="custom-icon"
        checked={switchStates[store.id] === 1}
        // onChange={() => handleToggle(store.id)}
        disabled={true}
      />
    ),
    details: <NavLink to={`/admin/store/${store.id}/bio`}>View detail</NavLink>,
    action: (
      <Popconfirm
        title="Do you want too delete this store?"
        onConfirm={() => confirmDelete(store.user.id)}
        okText="Yes"
        cancelText="No"
      >
        <button>
          <ImIconS.ImBin className="action-icon" style={{ width: "25%" }} />
        </button>
      </Popconfirm>
    ),
  }));
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "username",
      key: "username",
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

  const filteredStores = transformedstores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="admintitle">
        <h2>Store list</h2>
      </div>
      <div className="search-container">
        <Input
          placeholder="Search by storename or owner"
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-bar"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredStores}
        rowKey="id"
        className="store-table"
      />
    </div>
  );
}
export default Store;
