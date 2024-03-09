import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { addToCart } from "../action/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem1 from "./FeedbackItem1";
import { useContext } from "react";
import axios from "axios";
import FeedbackContext from "./context/FeedbackContext";
const StandardDetailForm = () => {
  const imageUrl =
    process.env.PUBLIC_URL + "https://www.housedigest.com/img/gallery/60-laundry-room-ideas-that-will-make-you-think-about-a-remodel/an-ombre-paint-wall-1643295784.jpg";
  // const { name, image } = myData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const standardLaundries = useSelector(
    (state) => state.laundry.standardLaundries
  );
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8001/api/v1/base/laundry/feedback/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id, name, description, imageBanner, isStandard, store, details } =
    standardLaundries;

  const [inputValues, setInputValue] = useState({
    id,
    name,
    isStandard,
    storeId: store?.id,
  });

  function starRating(params) {
    const stars = [];
    for (let index = 0; index < params; index++) {
      stars.push(<AiFillStar className="checked" key={index} />);
    }

    return stars;
  }

  function generateCurrency(params) {
    return params.toLocaleString("it-IT", {
      style: "currency",
      currency: "USD",
    });
  }
  const columns = [
   
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const data = [];

  for (let i = 0; i < details?.length; i++) {
    data.push({
      from: details[i].from,
      to: details[i].to,
      price: generateCurrency(details[i].price),
      unit: details[i].unit,
    });
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    //navigate('/cart');
  };
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.star;
    }, 0) / feedback.length;
  return (
    <Wrapper>
      {standardLaundries.details?.length > 0 ? (
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <img
                      src={imageUrl}
                      alt={name}
                      style={{ width: "100%", height: '50%' }}
                    />
                  </div>
                </div>
              </div>

              <h3 className="px-5 fw-bold">Price list : </h3>

              <Table
                columns={columns}
                key={data.key}
                dataSource={data}
                size="middle"
                bordered
                className="my-4"
                pagination={false}
              ></Table>

              <div
                class="card mb-4"
                style={{ background: "#DCDCDC", borderRadius: "10px" }}
              >
                <div class="card-body py-5">
                  <h2
                    class=""
                    style={{ color: "black", fontWeight: "bolder  " }}
                  >
                    Feedback from customer{" "}
                  </h2>

                  <div className="feedback-stats">
                    <h3>{feedback.length} Reviews</h3>
                    <h3>Average Rating : {isNaN(average) ? 0 : average}</h3>
                  </div>
                  <AnimatePresence>
                    {feedback === null ? (
                      <Card>
                        <p className="text-center" style={{ opacity: "60%" }}>
                        There are no feedbacks yet
                        </p>
                      </Card>
                    ) : (
                      feedback?.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <FeedbackItem1 key={item.id} Item={item} />
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body px-5">
                  <h2 class="fw-bolder">{name}</h2>
                  <p> </p>
                  <p class="h4 fw-bold">Description: </p>
                  <p>{description}</p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="my-4 col-12"
                    onClick={() => handleAddToCart(inputValues)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>The store does not have this service yet</h3>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 10px;

  .ant-table-thead .ant-table-cell {
    background-color: #00a9ff;
    color: white;
    border-radius: 0;
    text-align: center;
  }
  .ant-table-tbody .ant-table-cell {
    text-align: center;
  }

  .img-logo-section {
    min-width: 50rem;
    height: 350px;
  }

  .checked {
    color: #ffee21;
    font-size: 20px;
  }
  .unchecked {
    font-size: 20px;
  }

  img {
    min-width: 200px;
    height: 20rem;
    border-radius: 1rem;
  }

  .hero-section-data {
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-left: 10%;
    }
  }

  .hero-section-image {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default StandardDetailForm;
