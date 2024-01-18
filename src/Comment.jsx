import PropTypes from "prop-types";
import { DateTime } from "luxon";

function Comment ( { title, text, authorName, updatedAt }) {

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    return (
        <p className="singleComment">{`${authorName} says... ${title} - ${text}`} <i>{`(${formatDate(updatedAt)})`}</i></p>
    )
}

Comment.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    updatedAt: PropTypes.string
}

export default Comment;