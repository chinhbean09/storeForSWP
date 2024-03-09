import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import * as AiIcons from "react-icons/ai";

export const BackButton = ({ Root }) => {
  const navigate = useNavigate(); // get the navigate function

  return (
    <button
      onClick={() => navigate(`/admin/${Root}`)} // use the navigate function
      className="back-button"
      type="button"
    >
      Back to List{" "}
      <AiIcons.AiOutlineRollback
        style={{ width: "20px", marginLeft: "10px" }}
      />
    </button>
  );
};
