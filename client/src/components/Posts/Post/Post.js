import React, { useState } from "react";
import {
    Card,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const userID = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes?.find((like) => like === userID);

    const date = new Date(post.date);
    const day = date.getDate();
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    const isVideo = (url) => {
        return url && url.includes("/video/upload/");
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userID));
        } else {
            setLikes([...likes, userID]);
        }
    };

    const handleOpenDialog = (e) => {
        e.stopPropagation();
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deletePost(post._id));
        setOpenDialog(false);
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const postUrl = `${window.location.origin}/posts/${post._id}`;
        try {
            await navigator.clipboard.writeText(postUrl);
            setSnackbarOpen(true);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const Likes = () => {
        const likeColor = "#E91E63";
        return (
            <>
                {hasLikedPost ? (
                    <FavoriteIcon fontSize="small" style={{ color: likeColor }} />
                ) : (
                    <FavoriteBorderIcon fontSize="small" style={{ color: likeColor }} />
                )}
                {likes?.length > 0 && (
                    <span style={{ color: likeColor, marginLeft: "4px" }}>
                        {likes.length}
                    </span>
                )}
            </>
        );
    };

    const Comments = () => {
        const commentColor = "#FFB74D"; // brighter comment color
        return (
            <div
                style={{ display: "flex", alignItems: "center", color: commentColor }}
            >
                <ChatBubbleOutlineIcon fontSize="small" />
                {post.comments.length > 0 && (
                    <span style={{ marginLeft: "4px" }}>{post.comments.length}</span>
                )}
            </div>
        );
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    const handleCommentClick = (e) => {
        e.stopPropagation();
        history.push(`/posts/${post._id}`, { scrollToComments: true });
    };

    const isCreator =
        user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator;

    return (
        <>
            <Card className={classes.card} raised elevation={4} onClick={openPost}>
                {/* Media */}
                {isVideo(post.selectedFile) ? (
                    <video
                        className={classes.media}
                        src={post.selectedFile}
                        muted
                        playsInline
                        controls={false}
                    />
                ) : (
                    <img
                        className={classes.media}
                        src={
                            post.selectedFile ||
                            "https://res.cloudinary.com/dzenc4jcg/image/upload/v1755523829/imageNotFound_cxnpkh.png"
                        }
                        alt={post.title}
                    />
                )}

                {/* Top-left overlay: author, date, location */}
                <div className={classes.overlay}>
                    <Typography variant="body1" style={{fontWeight:"700"}}>{post.name}</Typography>
                    <Typography
                        variant="body2"
                        style={{ margin: "2px 0", display: "flex", alignItems: "center" }}
                    >
                        <CalendarTodayIcon style={{ fontSize: "0.8rem" }} />
                        &nbsp;{formattedDate}
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <LocationOnIcon style={{ fontSize: "0.8rem" }} />
                        &nbsp;{post.location}
                    </Typography>
                </div>

                {/* Top-right overlay: edit */}
                {isCreator && (
                    <div className={classes.overlay2} name="edit">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                            className={classes.editIconButton}
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>

                    </div>
                )}

                {/* Bottom overlay: title always, rest on hover */}
                <div className={classes.bottomOverlay}>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        gutterBottom
                        style={{ margin: 0 }}
                    >
                        {post.title.length > 35
                                ? `${post.title.substring(0, 35)}...`
                                : post.title}
                    </Typography>

                    <div className={classes.hoverContent}>
                        <div className={classes.details}>
                            {post.tags.map((tag, index) => (
                                <span key={index} className={classes.tagChip}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <Typography
                            variant="body2"
                            component="p"
                            className={classes.message}
                        >
                            {post.message.length > 55
                                ? `${post.message.substring(0, 55)}...`
                                : post.message}
                        </Typography>

                        <div className={classes.actionRow}>
                            {/* Left side: like, comment, share */}
                            <div className={classes.leftActions}>
                                <Button
                                    size="small"
                                    color="primary"
                                    disabled={!user?.result}
                                    onClick={handleLike}
                                    className={classes.compactButton}
                                >
                                    <Likes />
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleCommentClick}
                                    className={classes.compactButton}
                                >
                                    <Comments />
                                </Button>
                                <IconButton
                                    size="small"
                                    onClick={handleShare}
                                    className={classes.iconCompactButton}
                                >
                                    <ShareIcon fontSize="small" style={{ transform: "scale(0.9)" }} />
                                </IconButton>
                            </div>

                            {/* Right side: delete */}
                            {isCreator && (
                                <IconButton
                                    size="small"
                                    onClick={handleOpenDialog}
                                    className={classes.iconDeleteButton}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>

                {/* Delete confirmation dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="confirm-delete-title"
                    aria-describedby="confirm-delete-description"
                >
                    <DialogTitle id="confirm-delete-title">{"Confirm Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-delete-description">
                            Are you sure you want to delete this post? This action cannot be
                            undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <Button
                            onClick={handleConfirmDelete}
                            className={classes.confirmDeleteButton}
                            autoFocus
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleCloseDialog}
                            className={classes.cancelDeleteButton}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>

            {/* Snackbar OUTSIDE the card so it always sticks to viewport bottom */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                disablePortal={false}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    classes={{ root: classes.brownAlert }}
                >
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );

};

export default Post;
