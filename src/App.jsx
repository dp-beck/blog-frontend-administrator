import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [unpublishedPosts, setUnpublishedPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    text: '',
    published: false,
  });

  // INITIAL CALLS TO DATABASE FOR POSTS AND COMMENTS
  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPublishedPosts(data.filter((post) => post.published === true));
        setUnpublishedPosts(data.filter((post) => post.published === false));
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllComments(data);
      });
  }, []);

  // HANDLER FUNCTIONS FOR CHANGING PUBLICATION STATUS

  function handlePublishtoUnpublishChange (changedPost) {
    setPublishedPosts(publishedPosts.filter(post => post._id !== changedPost._id));
    setUnpublishedPosts([...unpublishedPosts, changedPost ]);
  }

  function handleUnpublishtoPublishChange (changedPost) {
    console.log(changedPost);
    setUnpublishedPosts(unpublishedPosts.filter(post => post._id !== changedPost._id));
    setPublishedPosts([...publishedPosts, changedPost ]);
  }


  // HANDLER FUNCTIONS FOR DELETING POSTS/COMMENTS

  function handleDeletePost (deletedPost) {
    if (deletedPost.published) {
      setPublishedPosts(publishedPosts.filter(post => post._id !== deletedPost._id));
    } else {
      setUnpublishedPosts(unpublishedPosts.filter(post => post._id !== deletedPost._id));
    }
  }
  
  function handleDeleteComment (deletedComment) {
    setAllComments(allComments.filter(comment => comment._id !== deletedComment._id));
  }

  // HANDLER FUNCTIONS FOR CREATING NEW POST

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevProps) => ({
        ...prevProps,
        [name] : value
    }));
  };

  const createNewPost = () => {
    fetch('http://localhost:3000/api/post/create', {
        method: "POST", 
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    }).then((res) => {
        return res.json();
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewPost();
    if (newPost.published) {
      setPublishedPosts([...publishedPosts, newPost]);
    } else {
      setUnpublishedPosts([...unpublishedPosts, newPost])
    }
  };

  // HANDLER FUNCTION FOR FILTERING COMMENTS PER POST

  function getPostComments(comments, post) {
    return comments.filter((comment) => comment.post[0] === post._id)
  }

  return (
    <>
      <header>
        <h1>{`Dan's Blog (Administrator)`} </h1>
      </header>

      <div id="publishedPosts">
        <h2>Published Posts</h2>
        {publishedPosts.map((post) => 
        <Post 
          key={post._id} 
          post={post}
          postid = {post._id}
          title={post.title}
          text={post.text}
          updatedAt={post.updatedAt}
          published={true}
          comments={getPostComments(allComments, post)}
          updatePublishtoUnpublishStatus={handlePublishtoUnpublishChange}
          handleDeletePost={handleDeletePost}
          handleDeleteComment={handleDeleteComment}
          />)}
      </div>

      <div id="unpublishedPosts">
        <h2>Unpublished Posts</h2>
        {unpublishedPosts.map((post) => 
        <Post 
          key={post._id} 
          post={post}
          postid = {post._id}
          title={post.title}
          text={post.text}
          updatedAt={post.updatedAt}
          published={false}
          comments={getPostComments(allComments, post)}
          updateUnpublishtoPublishStatus={handleUnpublishtoPublishChange}
          handleDeletePost={handleDeletePost}
          handleDeleteComment={handleDeleteComment}
          />)}
      </div>

      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} className='newPostForm'>

        <div className='formTitleInput'> 
          <label htmlFor="title">Title:</label> <br />
          <input type="text" name="title" id="title" onChange={handleInputChange} required />
        </div>

        <div className='formTextInput'>
          <label htmlFor="text">Post:</label> <br />
          <textarea name="text" id="text" cols="50" rows="10" required onChange={handleInputChange}>Write your post here!</textarea>
        </div>

        <div className='formPublishInput'>
          <label htmlFor="publish">Publish upon Creation?</label>
          <input type="checkbox" name="publish" id="publish" value="true" />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>

      </form>

    </>
  )
}

export default App
