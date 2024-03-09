import React, { useState } from "react";
import { Input, Button } from "antd";
import { AppContext } from "../../ContextProvider";
import { useContext } from "react";
import { Typography } from "antd";
import axios from "axios";
import { config } from "../axios/auth-header";
import { Tag, Space } from "antd";
import "./TagManagement.css";
import { Popconfirm, message } from "antd";

const { Title } = Typography;

const TimeCategory = () => {
  const { timeCategory, setTimeCategory } = useContext(AppContext);
  const [inputTimeCategoryValue, setInputTimeCategoryValue] = useState("");

  const handleAddTimeCategory = async () => {
    const newTimeCategory = { name: inputTimeCategoryValue };
    setInputTimeCategoryValue("");
    try {
      const response = await axios.post(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/time-category/create",
        newTimeCategory,
        config
      );
      console.log(response.data);
      message.success("Add successfully!");
      setTimeCategory([...timeCategory, response.data]);
    } catch (error) {
      console.error(error);
      message.error("Cannot access to the server!");
    }
  };

  const handleTimeCategoryDeselect = (id) => {
    setTimeCategory(timeCategory.filter((item) => item.id !== id));
    try {
      const response = axios.delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/time-category/delete/${id}`,
        config
      );
      console.log(response.data);
      message.success("Delete successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const isTimeCategoryExist = timeCategory.some(
    (item) => item.name.toUpperCase() === inputTimeCategoryValue.toUpperCase()
  );
  return (
    <div className="tag-management-row">
      <div className="tag-management-column">
        <Title style={{ fontSize: "20px", color: "#333" }}>Time Category</Title>
        {timeCategory.length > 0 ? (
          <>
            {timeCategory.map((item, index) => (
              <Space size={[0, 8]} wrap>
                <Popconfirm
                  title="Are you sure to delete this tag?"
                  onConfirm={() => handleTimeCategoryDeselect(item.id)}
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
              </Space>
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
              Cannot find any time categories
            </h3>
          </div>
        )}
        <Input
          className="tag-management-input"
          value={inputTimeCategoryValue}
          onChange={(e) => setInputTimeCategoryValue(e.target.value)}
          placeholder="Add new time category"
          style={{ margin: "10px 0" }}
        />
        <Button
          className="tag-management-button"
          onClick={handleAddTimeCategory}
          disabled={
            isTimeCategoryExist || inputTimeCategoryValue.trim().length === 0
          }
          style={{
            backgroundColor:
              isTimeCategoryExist || inputTimeCategoryValue.trim().length === 0
                ? "#ccc"
                : "#1890ff",
            color: "#fff",
            marginTop: "10px",
          }}
        >
          Add Time Category
        </Button>
        <br />
        {isTimeCategoryExist && (
          <small style={{ color: "red" }}>
            This time category has already existed!
          </small>
        )}
      </div>
    </div>
  );
};

export default TimeCategory;
