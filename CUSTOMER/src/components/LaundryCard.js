import { Background, color } from "@cloudinary/url-gen/qualifiers/background";
import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { getService } from "../action/features/laundry/laundrySlice";
import { useDispatch } from "react-redux";

const LaundryCard = (curElem) => {
  const { id, name, details, imageBanner, isStandard } = curElem;

  function generateCurrency(params) {
    return params.toLocaleString("it-IT", {
      style: "currency",
      currency: "USD"    });
  }
  const dispatch = useDispatch();

  const handleSubmit = (id) => {
    dispatch(getService(id));
  };

  return (
    <NavLink to={`/single-service/${id}`}>
      <div className="card">
        <figure>
          <img src={imageBanner} alt={name} style={{width:'auto', height:'auto'}} />
        </figure>

        <div className="card-data">
          <h3>{name} Service </h3>
          <div className="card-data-flex">
            <div className="display-6 fw-bold col-8" style={{ color: "green" }}>
              {generateCurrency(details[0].price)} / {details[0].unit}
            </div>

            <Button
              className="col-4"
              style={{ background: "#00A9FF", color: "white" }}
              onClick={handleSubmit(id)}
            >
              Detail
            </Button>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default LaundryCard;
