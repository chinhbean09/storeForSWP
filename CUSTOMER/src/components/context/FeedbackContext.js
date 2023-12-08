import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";
import FeedbackData from "../../data/FeedbackData";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/user/feedback/all",
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
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    Edit: false,
  });

  const deleteFeedback = async (id) => {
    {
      try {
        const response = await axios.delete(
          `https://magpie-aware-lark.ngrok-free.app/api/v1/user/feedback/delete/${id}`,
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
        );
        if (response.status === 200) {
          console.log("Feedback deleted successfully");
          setFeedback(feedback.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete feedback");
        }
      } catch (error) {
        console.error("An error occurred while deleting the feedback:", error);
      }
    }
  };

  // Add feedback.
  const addFeedback = (newFeedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  // Update feedback item .
  const updateFeedback = (id, upItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...upItem } : item))
    );
  };

  // Set item to be Updated !
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
