import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import Comment from './Comment';

function Post({ postid, post, title, text, updatedAt, comments, published, updatePublishtoUnpublishStatus, updateUnpublishtoPublishStatus, handleDeletePost, handleDeleteComment }) {

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
        fetch(`http://localhost:3000/api/post/${postid}/update`, {
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
        updateUnpublishtoPublishStatus(post);
    }

    function onClickUnpublish() {
        fetch(`http://localhost:3000/api/post/${postid}/update`, {
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
        updatePublishtoUnpublishStatus(post);
    }

    function onClickDelete() {
        fetch(`http://localhost:3000/api/post/${postid}/delete`, {
            method: "POST", 
            body: JSON.stringify({
                postid: postid,
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        }).then((res) => {
            return res.json();
        });
        handleDeletePost(post);
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
                        commentid={comment._id}
                        comment={comment}
                        title={comment.title}
                        text={comment.text}
                        authorName={comment.authorName} 
                        updatedAt={comment.updatedAt}
                        handleDeleteComment={handleDeleteComment}
                    />
                )}
            </div>
            <PublishButton published={published}/>
            <button onClick={onClickDelete}>Delete?</button>
        </div>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
    comments: PropTypes.array,
    postid: PropTypes.string,
    published: PropTypes.bool,
    updatePublishtoUnpublishStatus: PropTypes.func,
    updateUnpublishtoPublishStatus: PropTypes.func,
    handleDeletePost: PropTypes.func,
    handleDeleteComment: PropTypes.func,
    post: PropTypes.object,
}

export default Post;