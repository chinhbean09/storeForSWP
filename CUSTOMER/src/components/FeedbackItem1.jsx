import { FaTimes, FaEdit } from "react-icons/fa";
import Card from "./shared/Card";
// use of Context !!
import { useContext } from "react";
import FeedbackContext from "./context/FeedbackContext";
function FeedbackItem1({ Item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <>
      <Card>
        <div className="name">{Item.user?.email}</div>
        <div className="num-display">{Item?.star}</div>
        {/* <button1 onClick={ () => deleteFeedback(Item.id)} className='close'>
                    <FaTimes color= 'purple'/>
                </button1>
                <button1 onClick ={() => editFeedback(Item)} className="edit">
                    <FaEdit color='blue'/>
                </button1> */}

        <div className="text-display">{Item.content}</div>
      </Card>
    </>
  );
}

Card.defaultProps = {
  reverse: false,
};

export default FeedbackItem1;
