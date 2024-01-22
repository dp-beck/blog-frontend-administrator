import PropTypes from "prop-types";
import { DateTime } from "luxon";

function Comment ( { commentid, comment, title, text, authorName, updatedAt, handleDeleteComment }) {

    function onClickDelete() {
        fetch(`http://localhost:3000/api/comment/${commentid}/delete`, {
            method: "POST", 
            body: JSON.stringify({
                commentid: commentid,
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((res) => {
            return res.json();
        });
        handleDeleteComment(comment);
    }

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    return (
        <p className="singleComment">{`${authorName} says... ${title} - ${text}`} <i>{`(${formatDate(updatedAt)})`}</i>
            <button onClick={onClickDelete}>Delete?</button>
        </p>
    )
}

Comment.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    authorName: PropTypes.string,
    updatedAt: PropTypes.string,
    handleDeleteComment: PropTypes.func,
    comment: PropTypes.object,
    commentid: PropTypes.string,
}

export default Comment;