import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [unpublishedPosts, setUnpublishedPosts] = useState([]);
  const [fetchedComments, setFetchedComments] = useState([]);

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

  /*
  function handlePublishtoUnpublishChange (changedPost) {
    setPublishedPosts(publishedPosts.filter out changedPost....);
    setUnpublishedPosts([...unpublishedPosts, changedPost ]);
  }

  function handleUnpublishtoPublishChange (changedPost) {
    setUnpublishedPosts(unpublishedPosts.filter out changed post....);
    setpublishedPosts([...publishedPosts, changedPost ]);
  }

  function handleDeletepublishedPost (deletedPost) {
    setPublishedPosts(publishedPosts.filter out deletedPost....);
  }
  
  function handleDeleteunpublishedPost (deletedPost) {
    setUnpublishedPosts(unpublishedPosts.filter out deletedpost....);
  }

  function handleDeleteComment (deletedComment) {
    setfetchedComments(fetchedComments.filter out deleted comment....);
  }
*/

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchedComments(data);
      });
  }, []);

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
          postId = {post._id}
          title={post.title}
          text={post.text}
          updatedAt={post.updatedAt}
          published={true}
          comments={getPostComments(fetchedComments, post)}
          />)}
      </div>

      <div id="unpublishedPosts">
        <h2>Unpublished Posts</h2>
        {unpublishedPosts.map((post) => 
        <Post 
          key={post._id} 
          postId = {post._id}
          title={post.title}
          text={post.text}
          updatedAt={post.updatedAt}
          published={false}
          comments={getPostComments(fetchedComments, post)}
          />)}
      </div>

        <footer>
          <a href="https://www.freepik.com/free-vector/aged-paper-texture-background-design_14765966.htm#query=faded%20paper&position=0&from_view=keyword&track=ais&uuid=87dc82a0-ecc8-4576-abcf-2a22e659938d">Background Image by boggus</a> on Freepik
        </footer>
    </>
  )
}

export default App
