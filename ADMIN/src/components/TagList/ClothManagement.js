import React, { useState } from "react";
import { Input, Button } from "antd";
import { AppContext } from "../../ContextProvider";
import { useContext } from "react";
import { Typography } from "antd";
import axios from "axios";
import { config } from "../axios/auth-header";
import { Tag } from "antd";
import "./TagManagement.css";
import { Popconfirm, message } from "antd";
const { Title } = Typography;
const ClothManagement = () => {
  const { cloth, setCloth } = useContext(AppContext);
  const [inputClothValue, setInputClothValue] = useState("");
  const handleAddCloth = async () => {
    const newCloth = { name: inputClothValue };
    setInputClothValue("");
    try {
      const response = await axios.post(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/create",
        newCloth,
        config
      );
      console.log(response.data);
      message.success("Add successfully!");
      setCloth([...cloth, response.data]);
    } catch (error) {
      console.error(error);
      message.error("Cannot access to the server!");
    }
  };
  const handleClothDeselect = (id) => {
    setCloth(cloth.filter((item) => item.id !== id));
    try {
      const response = axios.delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/delete/${id}`,
        config
      );
      console.log(response.data);

      message.success("Delete successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const isClothExist = cloth.some(
    (item) => item.name.toUpperCase() === inputClothValue.toUpperCase()
  );
  return (
    <div className="tag-management-row">
      <div className="tag-management-column">
        <Title style={{ fontSize: "20px", color: "#333" }}>Cloth type</Title>
        {cloth.length > 0 ? (
          <>
            {cloth.map((item, index) => (
              <Popconfirm
                title="Are you sure to delete this tag?"
                onConfirm={() => handleClothDeselect(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tag
                  className="tag-management-tag"
                  style={{ margin: "5px 5px", backgroundColor: "#f0f0f0" }}
                >
                  {item.name}
                </Tag>
              </Popconfirm>
            ))}
            <br />
          </>
        ) : (
          <div
            style={{
              display: "flex",

              alignItems: " center",
            }}
          >
            <h3
              style={{
                margin: "5px 0px",
                color: "#6c757d",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Cannot find any cloth types
            </h3>
          </div>
        )}
        <Input
          className="tag-management-input"
          value={inputClothValue}
          onChange={(e) => setInputClothValue(e.target.value)}
          placeholder="Add new cloth"
          style={{ margin: "10px 0" }}
        />
        <Button
          className="tag-management-button"
          onClick={handleAddCloth}
          disabled={isClothExist || inputClothValue.trim().length === 0}
          style={{
            backgroundColor:
              isClothExist || inputClothValue.trim().length === 0
                ? "#ccc"
                : "#1890ff",
            color: "#fff",
            marginTop: "10px",
          }}
        >
          Add cloth
        </Button>
        <br />
        {isClothExist && (
          <small style={{ color: "red" }}>Cloth type has alreay existed!</small>
        )}
      </div>
    </div>
  );
};

export default ClothManagement;
