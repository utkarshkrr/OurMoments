import React, { useEffect, useState, useRef } from 'react';
import {
    Paper, Typography, Divider, Button, IconButton, Dialog, Slide,
    DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';

import useStyles from './styles';
import { getPost, getPostsBySearch, likePost, deletePost } from '../../actions/posts';
import Loader from '../loader/Loader';
import CommentSection from './CommentSection';
import Form from '../Form/Form';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Helper component for the alert message
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState([]);
    const [openImage, setOpenImage] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // New state for Snackbar

    // Create a ref for the comment section
    const commentsRef = useRef(null);

    const isVideo = (url) => {
        return url && url.includes('/video/upload/');
    };

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (post) {
            setLikes(post.likes);
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));

            if (location.state?.scrollToComments && commentsRef.current) {
                const yOffset = -120;
                const y = commentsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });

                history.replace(location.pathname, {});
            }
        }
    }, [post, dispatch, location.state, history, location.pathname]);

    if (!post) return null;

    if (isLoading)
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <Loader />
            </Paper>
        );

    const userID = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userID);

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

    const handleOpenDeleteDialog = (e) => {
        e.stopPropagation();
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deletePost(post._id));
        history.push('/');
        setOpenDeleteDialog(false);
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

    const commentCountText = () => {
        const count = post.comments.length;
        if (count === 0) {
            return "Comment";
        } else if (count === 1) {
            return "1 comment";
        } else {
            return `${count} comments`;
        }
    };

    const handleCommentClick = () => {
        if (commentsRef.current) {
            const yOffset = -120;
            const y = commentsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleShare = async () => {
        const postUrl = `${window.location.origin}/posts/${post._id}`;
        try {
            await navigator.clipboard.writeText(postUrl);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Paper style={{ padding: '20px', borderRadius: '15px', marginTop: '120px', backgroundColor: '#fffff2d2', position:'relative' }} elevation={6}>
                <Link to="/" style={{ textDecoration: 'none', color:'#704e2aff',display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', top:'10px', left:'10px', backgroundColor:'#ffe3c7d3', borderRadius:'50%', padding:'2px', height:'28px', width:'28px' }}>
                    <ArrowBackIcon style={{transform:'scale(0.67)',}} />
                </Link>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <div style={{ padding: '20px', borderRadius: '15px', position: 'relative' }}>
                            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                                <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                    <IconButton size="small" onClick={handleEditClick} style={{ color: '#704e2aff', marginRight: '5px', backgroundColor:'#ffe6ccc6' }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={handleOpenDeleteDialog} style={{ color: 'black', backgroundColor:'#ffe6ccc6' }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            )}

                            <Typography variant="h3" component="h2" style={{ fontWeight: 700 }} className={classes.title}>
                                {post.title}
                            </Typography>
                            <Typography className={classes.dateLocation} variant="body1" style={{ color: "#704e2aff", margin: '3px 0', display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon style={{ fontSize: '1.2rem' }} />
                                &nbsp;
                                {(() => {
                                    const date = new Date(post.date);
                                    const day = date.getDate();
                                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                    const month = monthNames[date.getMonth()];
                                    const year = date.getFullYear();
                                    return `${day} ${month} ${year}`;
                                })()}
                            </Typography>
                            <Typography className={classes.dateLocation} variant="body1" style={{ color: "#704e2aff", margin: '3px 0', display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon style={{ fontSize: '1.2rem'}} />
                                &nbsp;
                                {post.location}
                            </Typography>
                            <Typography variant="body1" gutterBottom color="textSecondary" style={{ margin: '4px 0' }}>
                                Created by: <span style={{ fontWeight: '700' }}> {post.name} </span>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                <div className={classes.tagContainer}>
                                    {post.tags.map((tag, index) => (<span key={index} className={classes.tagChip}>#{tag}</span>))}
                                </div>
                            </Typography>
                            <div className={classes.buttonContainer}>
                                <Button className={classes.postActionButton} size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                                    <Likes />
                                </Button>
                                <Button className={classes.postActionButton} size="small" disabled={!user?.result} onClick={handleCommentClick}>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#704e2aff' }}>
                                        <ChatBubbleOutlineIcon fontSize="small" />&nbsp;
                                        <span>{commentCountText()}</span>
                                    </div>
                                </Button>
                                <Button
                                    className={classes.postActionButton}
                                    size="small"
                                    onClick={handleShare}
                                    style={{ color: '#704e2aff' }}
                                    disabled={!user?.result}
                                >
                                    <ShareIcon fontSize="small" style={{ transform: 'scale(0.9)' }} />
                                    &nbsp;SHARE
                                </Button>
                            </div>
                            <Divider style={{ margin: '20px 0' }} />
                            <Typography variant="h5" gutterBottom style={{ fontWeight: 600 }}>The Story</Typography>
                            <Typography className={classes.postStory} variant="body1" component="p" style={{ lineHeight: 1.7 }}>{post.message}</Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <div className={classes.commentSection} ref={commentsRef}>
                                <CommentSection post={post}/>
                            </div>
                            <Divider style={{ margin: '20px 0' }} />
                        </div>
                    </div>
                    <div className={classes.imageSection}>
                        {isVideo(post.selectedFile) ? (
                            <video className={classes.media} src={post.selectedFile} controls muted playsInline onClick={() => setOpenImage(true)} style={{ cursor: 'pointer' }}></video>
                        ) : (
                            <img className={classes.media} src={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={post.title} onClick={() => setOpenImage(true)} style={{ cursor: 'pointer' }} />
                        )}
                    </div>
                </div>

                <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="xl" style={{zIndex:'2002'}}>
                    <div style={{ position: 'relative', background: 'black' }}>
                        <IconButton onClick={() => setOpenImage(false)} style={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 10 }}><CloseIcon /></IconButton>
                        {isVideo(post.selectedFile) ? (
                            <video src={post.selectedFile} controls muted playsInline style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}></video>
                        ) : (
                            <img src={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }} />
                        )}
                    </div>
                </Dialog>

                {recommendedPosts.length > 0 && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like</Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.slice(0, 5).map(({ title, message, name, selectedFile, createdAt, _id }) => (
                                <div key={_id} className={classes.recommendedCard} onClick={() => openPost(_id)} elevation={6}>
                                    {isVideo(selectedFile) ? (
                                        <video src={selectedFile} muted playsInline className={classes.recommendedImage} alt={title}></video>
                                    ) : (
                                        <img src={selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} alt={title} className={classes.recommendedImage} />
                                    )}
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

            <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm" TransitionComponent={Transition} style={{ zIndex: 2003 }}>
                <Form currentId={currentId} setCurrentId={setCurrentId} closeForm={handleCloseForm} />
            </Dialog>

            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-description" >
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Button onClick={handleConfirmDelete} className={classes.confirmDeleteButton} autoFocus>
                        Delete
                    </Button>
                    <Button onClick={handleCloseDeleteDialog} className={classes.cancelDeleteButton}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* The Snackbar for feedback */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="success" classes={{ root: classes.brownAlert }}>
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default PostDetails;