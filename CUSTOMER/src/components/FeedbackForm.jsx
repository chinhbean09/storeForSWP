import { useState, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
//use of Context !!
import FeedbackContext from "./context/FeedbackContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { message } from "antd";
import React, { useContext } from "react";

function FeedbackForm() {
  const { feedback } = useContext(FeedbackContext);
  let { id } = useParams();
  id = Number(id);
  const { addFeedback } = useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [btnDisabled, SetBtnDisabled] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(null);

  const getLaundryServiceName = (id) => {
    for (let i = 0; i < feedback.length; i++) {
      if (feedback[i].laundryService?.id === id) {
        return feedback[i].laundryService.name;
      }
    }
    return null;
  };
  const ServiceName = getLaundryServiceName(id);
  const handleTextChange = (e) => {
    if (text === "") {
      SetBtnDisabled(true);
      setFeedbackMessage("Enter a review!");
    } else if (rating === null) {
      SetBtnDisabled(true);
      setFeedbackMessage("Please input star!");
    } else if (text !== "" && text.trim().length <= 10) {
      setFeedbackMessage("Must be more than 10 characters!");
      SetBtnDisabled(true);
    } else if (rating !== null && text.trim().length > 10) {
      setFeedbackMessage(null);
      SetBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const changeRating = (rating) => {
    setRating(rating);
    console.log(rating);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        content: text,
        star: rating,
        serviceId: id,
      };
      const newFeedbackState = {
        content: text,
        star: rating,
        serviceId: id,
        laundryService: {
          name: ServiceName,
        },
      };
      {
        addFeedback(newFeedbackState);
        axios
          .post(
            "https://magpie-aware-lark.ngrok-free.app/api/v1/user/feedback/create",
            newFeedback,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("access_token")
                )}`,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          )
          .then((response) => {
            console.log("Success:", response.data);
            message.success("Feedback successfully!");
          })
          .catch((error) => {
            console.error("Error:", error);
            message.error("Feedback unsuccessfully!");
          });
      }
      setText("");
    }
  };

  return (
    // <Wrapper>

    // <div className="feedback-form">
    //   <Card>
    //     <form onSubmit={handleSubmit}>
    //       <h2>How would you rate your service with us?</h2>
    //       <RatingSelect select={changeRating} />
    //       <div className="input-group">
    //         <input
    //           className="input"
    //           type="text"
    //           placeholder="write a review"
    //           onChange={handleTextChange}
    //           defaultValue={text}
    //         />
    //         <Button type="submit" isDisabled={btnDisabled}>
    //           send
    //         </Button>
    //       </div>
    //       {message && <div className="feedback-message">{message}</div>}
    //     </form>
    //   </Card>
    // </div>
    // </Wrapper>
    <Wrapper>
      <div className="feedback-form">
        <Card>
          <form style={{ paddingTop: "15px" }} onSubmit={handleSubmit}>
            <h2>Bạn nghĩ thế nào về dịch vụ {ServiceName}?</h2>
            <RatingSelect select={changeRating} />
            <div className="input-group">
              <input
                type="text"
                placeholder="Hãy nhập đánh giá"
                onChange={handleTextChange}
                value={text}
              />
              <Button type="submit" isDisabled={btnDisabled}>
                send
              </Button>
            </div>
            {feedbackMessage && (
              <div className="feedback-message">{feedbackMessage}</div>
            )}
          </form>
        </Card>
      </div>
    </Wrapper>
  );
}

export default FeedbackForm;
const Wrapper = styled.section`
  .input {
    padding: 10px;
    border-radius: 5px;
    flex: 1;
    width: 500px;
  }

  Button {
    font-size: 22px;
    height: auto;
    padding: 10px 20px;
    border-radius: 5px;
    margin-left: 10px;
  }
`;
