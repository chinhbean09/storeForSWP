import { motion, AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import { useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
function FeedbackList() {
  const [feedback, setFeedback] = useState([]);
  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/v1/user/feedback/all",
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
      setFeedback(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedback();

    const interval = setInterval(() => {
      fetchFeedback();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback().finally(() => setLoading(false));
  }, []);
  if (!feedback || feedback.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: " center",
          height: " 50vh",
        }}
      >
        <h2 style={{ color: "#6c757d", fontFamily: "Arial, sans-serif" }}>
        No feedbacks found
        </h2>
      </div>
    );
  }
  return (
    <div className="feedback-List">
      {loading ? (
        <Spin
          style={{ marginTop: "15px" }}
          tip="Đang lấy dữ liệu..."
          size="large"
        >
          <div className="content" />
        </Spin>
      ) : (
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem key={item.id} Item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

export default FeedbackList;
