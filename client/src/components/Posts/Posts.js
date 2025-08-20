import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import Loader from '../loader/Loader';


const Posts = ({ setCurrentId, openForm }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // Show loading spinner
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Loader />
      </div>
    );
  }

  // Show "no posts" message when there are no posts
  if (!posts.length) {
    return (
      <Paper style={{ padding: '20px', textAlign: 'center', margin: '20px 0' }}>
        <Typography variant="h6" color="textSecondary">
          No memories on this page yet. <br></br> Start creating some, try signing in again, or go back to previous pages.
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={4} lg={4}>
          <Post
            post={post}
            setCurrentId={(id) => {
              setCurrentId(id);
              openForm();
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;