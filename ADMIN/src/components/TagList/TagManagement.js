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

const TagManagement = () => {
  const { material, setMaterial } = useContext(AppContext);
  // const { cloth, setCloth } = useContext(AppContext);
  const [inputMaterialValue, setInputMaterialValue] = useState("");
  // const [inputClothValue, setInputClothValue] = useState("");

  const handleAddMaterial = async () => {
    const newMaterial = { name: inputMaterialValue };
    setInputMaterialValue("");
    try {
      const response = await axios.post(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/material/create",
        newMaterial,
        config
      );
      console.log(response.data);
      message.success("Add successfully!");
      setMaterial([...material, response.data]);
    } catch (error) {
      console.error(error);
      message.error("Cannot access to the server!");
    }
  };

  // const handleAddCloth = async () => {
  //   const newClothState = { id: cloth.length + 1, name: inputClothValue };
  //   const newCloth = { name: inputClothValue };
  //   setCloth([...cloth, newClothState]);
  //   setInputClothValue("");
  //   try {
  //     const response = await axios.post(
  //       "https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/create",
  //       newCloth,
  //       config
  //     );
  //     console.log(response.data);
  //     message.success("Thêm thành công!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleMaterialDeselect = (id) => {
    setMaterial(material.filter((item) => item.id !== id));
    try {
      const response = axios.delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/material/delete/${id}`,
        config
      );
      console.log(response.data);
      message.success("Delete successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  // const handleClothDeselect = (id) => {
  //   setCloth(cloth.filter((item) => item.id !== id));
  //   try {
  //     const response = axios.delete(
  //       `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/cloth/delete/${id}`,
  //       config
  //     );
  //     console.log(response.data);
  //     message.success("Xoá thành công!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const isMaterialExist = material.some(
    (item) => item.name.toUpperCase() === inputMaterialValue.toUpperCase()
  );

  // const isClothExist = cloth.some(
  //   (item) => item.name.toUpperCase() === inputClothValue.toUpperCase()
  // );
  return (
    // <div className="tag-management-container">
    //   <div className="tag-management-row">
    //     <div className="tag-management-column">
    //       <Title>Material tag</Title>
    //       {material.map((item, index) => (
    //         <Space size={[0, 8]} wrap>
    //           <Popconfirm
    //             title="Are you sure to delete this tag?"
    //             onConfirm={() => handleMaterialDeselect(item.id)}
    //             okText="Yes"
    //             cancelText="No"
    //           >
    //             <Tag className="tag-management-tag">{item.name}</Tag>
    //           </Popconfirm>
    //         </Space>
    //       ))}
    //       <br />
    //       <Input
    //         className="tag-management-input"
    //         value={inputMaterialValue}
    //         onChange={(e) => setInputMaterialValue(e.target.value)}
    //         placeholder="Add a new option"
    //       />
    //       <Button
    //         className="tag-management-button"
    //         onClick={handleAddMaterial}
    //         disabled={isMaterialExist}
    //       >
    //         Add material
    //       </Button>
    //       <br />
    //       {isMaterialExist && <small>đã tồn tại vật liệu này</small>}
    //     </div>
    //     { <div className="tag-management-column">
    //       <Title>Cloth tag</Title>
    //       {cloth.map((item, index) => (
    //         <Popconfirm
    //           title="Are you sure to delete this tag?"
    //           onConfirm={() => handleClothDeselect(item.id)}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <Tag className="tag-management-tag">{item.name}</Tag>
    //         </Popconfirm>
    //       ))}
    //       <br />
    //       <Input
    //         className="tag-management-input"
    //         value={inputClothValue}
    //         onChange={(e) => setInputClothValue(e.target.value)}
    //         placeholder="Add a new option"
    //       />
    //       {isClothExist && <small>đã tồn tại loại áo này</small>}
    //       <Button
    //         className="tag-management-button"
    //         onClick={handleAddCloth}
    //         disabled={isClothExist}
    //       >
    //         Add cloth
    //       </Button>
    //     </div> }
    //   </div>
    // </div><div className="tag-management-container">
    // <div className="tag-management-container">
    <div className="tag-management-row">
      <div className="tag-management-column">
        <Title style={{ fontSize: "20px", color: "#333" }}>Material</Title>
        {material.length > 0 ? (
          <>
            {material.map((item, index) => (
              <Space size={[0, 8]} wrap>
                <Popconfirm
                  title="Are you sure to delete this tag?"
                  onConfirm={() => handleMaterialDeselect(item.id)}
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
              Cannot find any materials
            </h3>
          </div>
        )}
        <Input
          className="tag-management-input"
          value={inputMaterialValue}
          onChange={(e) => setInputMaterialValue(e.target.value)}
          placeholder="Add new material"
          style={{ margin: "10px 0" }}
        />
        <Button
          className="tag-management-button"
          onClick={handleAddMaterial}
          disabled={isMaterialExist || inputMaterialValue.trim().length === 0}
          style={{
            backgroundColor:
              isMaterialExist || inputMaterialValue.trim().length === 0
                ? "#ccc"
                : "#1890ff",
            color: "#fff",
            marginTop: "10px",
          }}
        >
          Add material
        </Button>
        <br />
        {isMaterialExist && (
          <small style={{ color: "red" }}>Material has already existed!</small>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
