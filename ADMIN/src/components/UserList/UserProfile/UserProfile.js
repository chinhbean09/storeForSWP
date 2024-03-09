import "./UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../BackButton/BackButton";
import { useContext } from "react";
import { AppContext } from "../../../ContextProvider";
import { Card, Descriptions, Avatar, List } from "antd";
import { Link } from "react-router-dom";
function UserProfile1() {
  const { users } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);
  const thisUser = users.find((prod) => prod.id === id);
  return thisUser ? (
    <div className="container profile-container">
      <BackButton Root={"user"} />
      <div className="row">
        <div className="col-md-3 profile-nav">
          <Card>
            <div className="text-center">
              
              <h3>{thisUser?.fullName}</h3>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={["Information"]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<i class="fa fa-user"></i>}
                    title={<Link to={`/admin/user/${id}`}>{item}</Link>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="col-md-7 profile-info">
          <Card title="User information">
            <Descriptions column={2}>
              <Descriptions.Item label="Full name">
                {thisUser?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {thisUser?.status === 1 ? "Active" : "Inactive"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone number">
                {thisUser?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {thisUser?.role === "STORE" ? "Store" : "Customer"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {thisUser?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {thisUser?.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h2 style={{ color: "#6c757d", fontFamily: "Arial, sans-serif" }}>
        This user does not exist!
      </h2>
    </div>
  );
}
export default UserProfile1;
