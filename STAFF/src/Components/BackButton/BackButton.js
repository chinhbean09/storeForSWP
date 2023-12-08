import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

export const BackButton = ({ Root }) => {
  let navigate = useNavigate();
  return (
    <Link to={`/${Root}`}>
      <button className="back-button" type="button">
        <span style={{ marginLeft: "5px" }}>Go back </span>
        <AiIcons.AiOutlineRollback
          style={{ width: "20px", marginLeft: "10px" }}
        />
      </button>
    </Link>
  );
};
