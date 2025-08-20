import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, IconButton } from '@material-ui/core';
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

    const userID = user?.result.googleId || user?.result._id;
    const hasLikedPost = likes.find((like) => like === userID);

    const date = new Date(post.date);

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;


    const handleLike = async () => {
        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userID));
        }
        else {
            setLikes([...likes, userID]);
        }
    }

    const Likes = () => {
        const likeColor = "#E91E63"; // red

        if (likes.length > 0) {
            return likes.find((like) => like === userID)
                ? (
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
            <ButtonBase className={classes.cardAction} onClick={openPost} >
                <CardMedia className={classes.media} image={post.selectedFile || 'https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png'} title={post.title} />
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
                <div className={classes.details} >
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
                        onClick={() => dispatch(deletePost(post._id))}
                        style={{ color: 'black', padding: '4px' }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}

            </CardActions>
        </Card>
    );
}

export default Post;