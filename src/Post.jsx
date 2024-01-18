import { useState } from 'react';
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
// TO DO: FIX! //
    function PublishButton(published) {
        if(published) {
            console.log(published);
            return <button>Unpublish?</button>
        } else {
            console.log(published);
            return <button>Publish?</button>
        }
    }

    return (
        <div className="singlePost">
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
}

export default Post;