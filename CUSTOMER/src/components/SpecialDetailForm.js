//import { NavLink } from "react-router-dom";
import styled from "styled-components";
//import { Button } from "../style/Button";
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem1 from './FeedbackItem1'
import FeedbackContext from './context/FeedbackContext'
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../action/features/cart/cartSlice";
import { useContext } from 'react';

import { Card, Space, Tag, Button } from 'antd';
import { getService } from "../action/features/laundry/laundrySlice";

import { resetState } from "../action/features/store/storeSlice";


const SpecialDetailForm = () => {
    const { id } = useParams();
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

    
    // const {feedback} = useContext(FeedbackContext)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState);

        dispatch(getService(id));

    }, [id, dispatch]);

    const singleService = useSelector((state) => state.laundry.singleService);
    const { name, imageBanner, details, cloth, materials, store, isStandard, description,feedbacks } = singleService;

    const [inputValues, setInputValue] = useState({
        id,
        name,
        imageBanner,
        price: "",
        storeId: store?.id,
        isStandard,
    });

    const handleAddToCart = (product) => {
        product.price = details[0].price;
        product.imageBanner = imageBanner;
        dispatch(addToCart(product));


    };
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.star
    }, 0) / feedback.length

    average = average.toFixed(1).replace(/[.,]0$/, "")
    function starRating(params) {
        const stars = [];
        for (let index = 0; index < params; index++) {
            stars.push(<AiFillStar className='checked' key={index} />);
        }

        return stars;
    }

    function generateCurrency(params) {
        return params.toLocaleString('it-IT', { style: 'currency', currency: 'USD' });
    }

    return (
        <Wrapper>
            {
                singleService.isStandard || singleService == null ? <p>không tìm thấy dịch vụ</p> :

                    <div class="container-fluid">
                        <div class="row">
                            <div>
                                <div className="">
                                    <div class="row">
                                        <div class="col-lg-4 d-flex justify-content-center py-5">
                                            <figure>
                                                <img
                                                    src={imageBanner}
                                                    alt={name}
                                                    style={{ height: '100%', width: '100%' }}
                                                />
                                            </figure>
                                        </div>

                                        <div class="col-lg-8 py-5">
                                            <div className="card mb-4">
                                                <div className="card-body px-5">
                                                    <h2 className="fw-bolder">{name}</h2>
                                                    {materials?.map((item) => (
                                                        <Space size={[0, 8]} wrap>
                                                            <Tag key={item.id} color="blue">
                                                                {item.name}
                                                            </Tag>
                                                        </Space>
                                                    ))}
                                                    <Tag key={cloth?.id} color="red">
                                                        {cloth?.name}
                                                    </Tag>

                                                    <p className="h4 py-3 fw-bold">Description: </p>
                                                    <p>{description}</p>

                                                    <br />
                                                    {details?.map((item) => (
                                                        <p
                                                            className="mx-2 display-1 fw-bold"
                                                            style={{ color: 'green' }}
                                                        >
                                                            Price: {generateCurrency(item.price)}/{item.unit}
                                                        </p>
                                                    ))}

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

                                <div
                                    class="card mb-4"
                                    style={{ background: '#DCDCDC', borderRadius: '10px' }}
                                >
                                    <div class="card-body py-5">
                                        <h2 class="" style={{fontWeight:'bolder' }}>
                                            Feedback from customer{' '}
                                        </h2>
                                        <div className='feedback-stats'>
                                            <h3>{feedback.length} Reviews</h3>
                                            <h3>Average Rating : {isNaN(average) ? 0 : average}</h3>
                                        </div>

                                        <AnimatePresence>
                                        {console.log("Feedback data:", feedback)}
                                            {feedback === null ? (
                                                
                                                <Card>
                                                    <p className="text-center" style={{ opacity: '60%' }}>
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
                        </div>
                    </div>

            }

        </Wrapper >




    );
};

const Wrapper = styled.section`
  padding: 10px;


  .ant-table-thead .ant-table-cell {
    background-color:#00A9FF;
    color:white;
    border-radius: 0;
  }

  


  .checked {  
    color :#Ffee21 ;  
    font-size : 20px;  
}  
.unchecked {  
    font-size : 20px;  
}  

  img {
    max-width: 30rem;
    height: 50rem;
    border-radius: 1rem;
  }
`;

export default SpecialDetailForm;