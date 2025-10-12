import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId, closeForm }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '', fileType: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Updated validation: check if selectedFile exists for new posts
        if (!currentId && !postData.selectedFile) {
            alert("An image or video is required to create a post!");
            return;
        }
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        }
        clear();
        closeForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In first.
                </Typography>
            </Paper>
        );
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '', fileType: '' });
    };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h4" style={{textAlign:"center"}}>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" required fullWidth value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: "100%" }}>
                    <TextField
                        name="date"
                        required
                        variant="outlined"
                        label="Date"
                        type="date"
                        value={postData.date ? new Date(postData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                        onChange={(e) => setPostData({ ...postData, date: e.target.value })}
                        style={{ flex: 1 }}
                    />

                    <TextField
                        name="location"
                        required
                        variant="outlined"
                        label="Location"
                        value={postData.location || ""}
                        onChange={(e) => setPostData({ ...postData, location: e.target.value })}
                        style={{ flex: 2 }}
                    />
                </div>


                <TextField name="message" variant="outlined" label="Story" required fullWidth multiline minRows={4} value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <label style={{ width: '100%', cursor: 'pointer', textAlign: 'center' }}>
                        <FileBase
                            required={!currentId}
                            type="file"
                            multiple={false}
                            onDone={({ base64, type }) => setPostData({ ...postData, selectedFile: base64, fileType: type })}
                            style={{ display: 'none' }}
                        />
                        <div style={{ padding: '10px',fontFamily: 'Roboto, sans-serif', display: 'inline-block', }}>
                            {postData.selectedFile ? 'Change File' : 'Add Image or Video'}
                        </div>
                    </label>
                </div>
                <div className={classes.formButtonContainer}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                        Submit
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default Form;