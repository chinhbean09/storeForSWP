import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import { Card, Descriptions } from "antd";

function StoreBio() {
  const { stores } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);

  let thisStore;

  thisStore = stores.find((prod) => prod.id === id);

  return (
    <div className="container profile-container mt-0">
      <div className="col-md-9 profile-info">
        <Card title="Store information">
          {thisStore ? (
            <Descriptions column={2}>
              <Descriptions.Item label="Store name">
                {thisStore?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {thisStore?.user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone number">
                {thisStore?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {thisStore?.user.status === 1 ? "Active" : "Inactive"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {thisStore?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Owner">
                {thisStore?.user.fullName}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <h2 style={{ color: "#6c757d", fontFamily: "Arial, sans-serif" }}>
                This store does not exist!
              </h2>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
export default StoreBio;
