import React from "react";
import StatBox from "./Component/StatBox";
import user from "./image/user.png";
import timeimage from "./image/chronometer.png";
import activeUser from "./image/active-user.png";
import materialimage from "./image/fabric-pattern.png";
import activeStore from "./image/seller.png";
import clothimage from "./image/clothes-hanger.png";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import TagManagement from "../TagList/TagManagement";
import ClothManagement from "../TagList/ClothManagement";
import TimeCategory from "../TagList/TimeCategory";

function Home() {
  const { stores } = useContext(AppContext);
  const { users } = useContext(AppContext);
  const { material } = useContext(AppContext);
  const { cloth } = useContext(AppContext);
  const { timeCategory } = useContext(AppContext);
  // const filteredStores = stores.filter(
  //   (store) => store.status === "on" || store.status === "off"
  // );
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <StatBox
          img={activeUser}
          text="Active user"
          value={users.filter((item) => item.status === 1).length}
          position={"top"}
        ></StatBox>
        <StatBox
          img={activeStore}
          text="Active store"
          value={stores.filter((item) => item.user.status === 1).length}
          position={"top"}
        ></StatBox>
        {/* <StatBox
          img={order}
          text="Đơn hàng"
          value={orders.length}
          position={"top"}
        ></StatBox> */}
      </div>
      <div className="row justify-content-center mt-5">
        {/* <StatBox
          img={activeUser}
          text="Active user"
          value={users.filter((item) => item.status === 1).length}
        ></StatBox>
        <StatBox
          img={activeStore}
          text="Active store"
          value={stores.filter((item) => item.user.status === 1).length}
        ></StatBox> */}
        <div className="row justify-content-center">
          <StatBox
            img={materialimage}
            text="Material"
            value={material.length}
          ></StatBox>
          <StatBox img={clothimage} text="Cloth" value={cloth.length}></StatBox>
        
          <StatBox
            img={timeimage}
            text="Time category"
            value={timeCategory.length}
          ></StatBox>
        </div>

        <div className="row d-flex justify-content-end">
          <div className="col-sm-12 col-md-6 mt-5">
            <div className="card shadow-1" style={{ background: "#91b4ed" }}>
              <TagManagement />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mt-5 ">
            <div className="card shadow-1" style={{ background: "#91b4ed" }}>
              <ClothManagement />
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-end mt-5">
          <div className="col-sm-12 col-md-6">
            <div className="card shadow-1" style={{ background: "#91b4ed" }}>
              <TimeCategory></TimeCategory>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            {/* You can put another component here to take up the other half of the row */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
