import React from "react";

import * as TiIcons from "react-icons/ti";
import * as GiIcons from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import { useEffect, useState } from "react";

function StoreManager() {
  const { stores, setStores } = useContext(AppContext);
  const filteredStores = stores.filter((store) => store.status === "pending");
  const columns = [
    {
      label: "STORENAME",
      field: "storename",
      sort: "asc",
    },
    {
      label: "PHONE",
      field: "phone",
      sort: "asc",
    },
    {
      label: "ADDRESS",
      field: "address",
      sort: "asc",
    },
    {
      label: "DETAILS",
      field: "details",
      sort: "asc",
    },
    {
      label: "ACCEPT",
      field: "accept",
      sort: "asc",
      width: "30px",
    },
    {
      label: "DENY",
      field: "deny",
      sort: "asc",
    },
  ];
  const handleAcceptToggle = (id) => {
    const newStatus = "on"; // or 'off', depending on your needs
    axios
      .patch(`http://localhost:3000/stores/${id}`, {
        status: newStatus,
      })
      .then((response) => {
        console.log(response.data);
        // Update the stores state in your context
        setStores((prevStores) =>
          prevStores.map((store) =>
            store.id === id ? { ...store, status: newStatus } : store
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCancelToggle = (id) => {
    axios
      .delete(`http://localhost:3000/stores/${id}`)
      .then(() => {
        setStores((prevStores) =>
          prevStores.filter((store) => store.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addIconsToArray = (array) => {
    return array.map((item) => ({
      ...item,
      accept: (
        <TiIcons.TiTick
          className="action-icon"
          onClick={() => handleAcceptToggle(item.id)}
        />
      ),
      deny: (
        <GiIcons.GiCancel
          className="action-icon"
          onClick={() => handleCancelToggle(item.id)}
        />
      ),
      details: <Link to={`${item.id}/bio`}>View Details</Link>,
    }));
  };

  const [processedStoresManage, setProcessedStoresManage] = useState([]);

  useEffect(() => {
    setProcessedStoresManage(addIconsToArray(filteredStores));
  }, [stores]);

  const data = {
    columns: columns,
    rows: processedStoresManage,
  };

  return (
    <div className="container">
      <NavLink to="/admin/store/list" className="admintitle multipage">
        <h2>Cửa hàng</h2>
      </NavLink>
      <NavLink to="/admin/store/storemanager" className="admintitle multipage">
        <h2>Duyệt cửa hàng</h2>
      </NavLink>
      <MDBDataTable
        striped
        bordered
        small
        data={data}
        responsiveSm
        noBottomColumns={true}
        className="custom-table custom-store-table"
      />
    </div>
  );
}

export default StoreManager;
