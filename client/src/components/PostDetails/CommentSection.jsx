import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    {comments.length > 0 && (
                        <>
                            <Typography gutterBottom variant="h5">Comments</Typography>
                            <div className={classes.commentsPosted}>
                                {comments.map((c, i) => (
                                    <Typography key={i} gutterBottom variant="subtitle1">
                                        <strong>{c.split(': ')[0]}</strong>
                                        <br />
                                        &nbsp; {c.split(':')[1]}
                                    </Typography>
                                ))}
                                <div ref={commentsRef} />
                            </div>
                        </>
                    )}
                </div>
                {user?.result?.name && (
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Write a comment"
                            multiline
                            className={classes.commentBox}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button className={classes.commentButton} style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;