import React, { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Button, IconButton, Dialog, Slide } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import useStyles from './styles';
import { getPost, getPostsBySearch, likePost, deletePost } from '../../actions/posts';
import Loader from '../loader/Loader';
import CommentSection from './CommentSection';
import Form from '../Form/Form';

// Define the transition for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState([]);
  const [openImage, setOpenImage] = useState(false);

  // State for the edit form dialog
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  if (!post) return null;

  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Loader />
      </Paper>
    );

  const userID = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userID);

  // Handlers for the edit form
  const handleEditClick = () => {
    setCurrentId(post._id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userID));
    } else {
      setLikes([...likes, userID]);
    }
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    history.push('/');
  };

  const Likes = () => {
    const likeColor = '#E91E63';
    if (likes.length > 0) {
      return likes.find((like) => like === userID) ? (
        <><FavoriteIcon fontSize="small" style={{ color: likeColor }} />&nbsp;<span style={{ color: likeColor }}>{`${likes.length} like${likes.length > 1 ? 's' : ''}`}</span></>
      ) : (
        <><FavoriteBorderIcon fontSize="small" style={{ color: likeColor }} />&nbsp;<span style={{ color: likeColor }}>{`${likes.length} like${likes.length > 1 ? 's' : ''}`}</span></>
      );
    }
    return <><FavoriteBorderIcon fontSize="small" style={{ color: likeColor }} />&nbsp;<span style={{ color: likeColor }}>Like</span></>;
  };

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <>
      <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '120px', backgroundColor: '#fffff8ff', }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <div style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#fafafa', position: 'relative' }}>

              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                  {/* EDIT BUTTON */}
                  <IconButton size="small" onClick={handleEditClick} style={{ color: 'black', marginRight: '5px' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* DELETE BUTTON */}
                  <IconButton size="small" onClick={handleDelete} style={{ color: 'black' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              )}

              <Typography variant="h3" component="h2" style={{ fontWeight: 700 }}>
                {post.title}
              </Typography>

              <Typography variant="body1" style={{ color:"#704e2aff", margin:'3px 0'}}>
                {(() => {
                  const date = new Date(post.date);
                  const day = date.getDate();
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const month = monthNames[date.getMonth()];
                  const year = date.getFullYear();
                  return `${day} ${month} ${year}`;
                })()}
              </Typography>
              
              <Typography variant="body1" style={{ color:"#704e2aff", margin:'3px 0'}}>
                {post.location}
              </Typography>

              <Typography variant="body2" gutterBottom color="textSecondary" style={{ margin:'4px 0'}}>
                Created by: {post.name}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                <div className={classes.details}>
                  {post.tags.map((tag, index) => (<span key={index} className={classes.tagChip}>#{tag}</span>))}
                </div>
              </Typography>

              <div style={{ margin: '10px 0' }}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                  <Likes />
                </Button>
              </div>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>The Story</Typography>
              <Typography variant="body1" component="p" style={{ lineHeight: 1.7 }}>{post.message}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} />
              <Divider style={{ margin: '20px 0' }} />
            </div>
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={post.title} onClick={() => setOpenImage(true)} style={{ cursor: 'pointer' }}/>
          </div>
        </div>

        <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="xl">
          <div style={{ position: 'relative', background: 'black' }}>
            <IconButton onClick={() => setOpenImage(false)} style={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 10 }}><CloseIcon /></IconButton>
            <img src={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}/>
          </div>
        </Dialog>

        {recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">You might also like</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.slice(0, 5).map(({ title, message, name, selectedFile, createdAt, _id }) => (
                <div key={_id} className={classes.recommendedCard} onClick={() => openPost(_id)} elevation={6}>
                  <img src={selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={title} className={classes.recommendedImage}/>
                  <div className={classes.recommendedContent}>
                    <Typography variant="h6" style={{ fontWeight: '600' }}>{title}</Typography>
                    <Typography variant="subtitle2">{name}</Typography>
                    <Typography variant="body2" color="textSecondary">{message.length > 30 ? `${message.substring(0, 30)}...` : message}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Paper>

      {/* EDIT FORM DIALOG */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm" TransitionComponent={Transition}>
        <Form currentId={currentId} setCurrentId={setCurrentId} closeForm={handleCloseForm} />
      </Dialog>
    </>
  );
};

export default PostDetails;