import React, { useState } from "react";
import { 
  Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    // Add state for the modal
    const [openDialog, setOpenDialog] = useState(false);

    const userID = user?.result.googleId || user?.result._id;
    const hasLikedPost = likes.find((like) => like === userID);

    const date = new Date(post.date);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    const isVideo = (url) => {
        return url && url.includes('/video/upload/');
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userID));
        } else {
            setLikes([...likes, userID]);
        }
    };

    // Open the confirmation dialog
    const handleOpenDialog = (e) => {
        e.stopPropagation(); // Prevents the ButtonBase from triggering
        setOpenDialog(true);
    };

    // Close the dialog without deleting
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle deletion after confirmation
    const handleConfirmDelete = () => {
        dispatch(deletePost(post._id));
        setOpenDialog(false); // Close the dialog after deletion
    };

    const Likes = () => {
        const likeColor = "#E91E63";
        if (likes.length > 0) {
            return likes.find((like) => like === userID) ? (
                <>
                    <FavoriteIcon fontSize="small" style={{ color: likeColor }} />&nbsp;
                    <span style={{ color: likeColor }}>
                        {`${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </span>
                </>
            ) : (
                <>
                    <FavoriteBorderIcon fontSize="small" style={{ color: likeColor }} />&nbsp;
                    <span style={{ color: likeColor }}>
                        {`${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </span>
                </>
            );
        }
        return (
            <>
                <FavoriteBorderIcon fontSize="small" style={{ color: likeColor }} />&nbsp;
                <span style={{ color: likeColor }}>Like</span>
            </>
        );
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={4}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                {isVideo(post.selectedFile) ? (
                    <video className={classes.media} src={post.selectedFile} controls muted playsInline></video>
                ) : (
                    <CardMedia className={classes.media} image={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} title={post.title} />
                )}
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body1" style={{ margin: '2px 0' }}>
                        {formattedDate}
                    </Typography>
                    <Typography variant="body1">
                        {post.location}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom style={{ margin: '5px' }}>{post.title}</Typography>
                <div className={classes.details}>
                    {post.tags.map((tag, index) => (
                        <span key={index} className={classes.tagChip}>
                            #{tag}
                        </span>
                    ))}
                </div>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom style={{ margin: '-10px 5px' }}>
                        {post.message.length > 30 ? `${post.message.substring(0, 30)}...` : post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2} name="edit">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small"
                    >
                        <EditIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <IconButton
                        size="small"
                        onClick={handleOpenDialog} // Open the dialog on click
                        style={{ color: 'black', padding: '4px' }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </CardActions>
            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-description">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>
                    <Button onClick={handleConfirmDelete} className={classes.confirmDeleteButton} autoFocus>
                        Delete
                    </Button>
                    <Button onClick={handleCloseDialog} className={classes.cancelDeleteButton}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Post;