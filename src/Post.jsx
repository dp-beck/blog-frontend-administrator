import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import Comment from './Comment';

function Post({ postId, title, text, updatedAt, comments, published }) {

    function formatDate(date) {
        if (typeof date === "string") {
            return DateTime.fromISO(updatedAt.slice(0,10)).toLocaleString(DateTime.DATE_FULL);
        } else {
            return "no date provided"
        }    
    }

    function PublishButton({published}) {
        if(published === true) {
            return <button onClick={onClickUnpublish}>Unpublish?</button>
        } else {
            return <button onClick={onClickPublish}>Publish?</button>
        }
    }

    function onClickPublish() {
        fetch(`http://localhost:3000/api/post/${postId}/update`, {
            method: "POST", 
            body: JSON.stringify({
                title: title,
                text: text,
                published: true,
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((res) => {
            return res.json();
        });
    }

    function onClickUnpublish() {
        fetch(`http://localhost:3000/api/post/${postId}/update`, {
            method: "POST", 
            body: JSON.stringify({
                title: title,
                text: text,
                published: false,
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((res) => {
            return res.json();
        });
        document.getElementById("singlePost").classList.add("unpublished");
    }

    return (
        <div id="singlePost">
            <div>
                <h2 className='postTitle'>{title}  </h2>
                <p className='publishedDate'>{`(published on ${formatDate(updatedAt)})`}</p>
            </div>
            <p>{text}</p>
            
            <h3>Comments</h3>
            <div className='comments-section'>
                {comments.map((comment) =>
                    <Comment
                        key={comment._id}
                        title={comment.title}
                        text={comment.text}
                        authorName={comment.authorName} 
                        updatedAt={comment.updatedAt}
                    />
                )}
            </div>
            <PublishButton published={published}/>
        </div>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
    comments: PropTypes.array,
    postId: PropTypes.string,
    published: PropTypes.bool,
}

export default Post;