import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Card, Spin, Tag } from "antd";

function StoreService() {
  let { id } = useParams();
  id = Number(id);
  const [specialServices, setSpecialServices] = useState([]);
  const [standardServices, setStandardServices] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    axios
      .get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/special-service/store/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setSpecialServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/standard-service/store/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setStandardServices(response.data.details);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Spin style={{ marginTop: "200px", marginLeft: "450px" }} size="large" />
    );
  }

  return (
    <div className="container profile-container mt-0">
      <div className="row">
        <div className="col-md-12 profile-info">
          <Card title="Store's services" className="bio-graph-card shadow-1">
            <h4>Special service</h4>
            {specialServices && specialServices.length > 0 ? (
              <div className="d-flex flex-row justify-content-start flex-wrap">
                {specialServices.map((item, index) => (
                  <Tag color="blue" key={index}>
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      {item.details[0].price.toLocaleString()}₫
                    </p>
                    <p>
                      <strong>Material: </strong>
                      {item.materials?.map((item, index) => (
                        <span key={index}>{item?.name} </span>
                      ))}
                    </p>
                    <p>
                      <strong>Cloth type:</strong> {item.cloth.name}
                    </p>
                  </Tag>
                ))}
              </div>
            ) : (
              <h5>Cannot find any special services!</h5>
            )}

            <h4>Normal service</h4>
            {standardServices && standardServices.length > 0 ? (
              <div className="d-flex flex-row justify-content-start flex-wrap">
                {standardServices.map((item) => (
                  <Tag color="green">
                    <p>
                      <strong>From:</strong> {item.from} <strong>to: </strong>
                      {""}
                      {item.to} <strong>kg</strong>
                    </p>

                    <p>
                      <strong>Price:</strong> {item.price.toLocaleString()}$
                    </p>
                  </Tag>
                ))}
              </div>
            ) : (
              <h5>Cannot find any normal services!</h5>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
export default StoreService;
