import React, { useState, useRef, useEffect } from "react";
import {
  Container, Grow, Grid, Paper, AppBar, TextField, Button, Fab, Dialog, Slide
} from '@material-ui/core';
import { Search as SearchIcon, Add as AddIcon } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef(null);

  //setting page title
  useEffect(() => {
    document.title = "Our Moments";
  }, []);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const handleCreateClick = () => {
    setCurrentId(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    }

    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchBar]);

  return (
    <Grow in>
      <Container maxWidth="xl" className={classes.mainContainerWrapper}>
        {/* Floating Search Button */}
        <Fab
          className={classes.searchFab}
          onClick={() => setShowSearchBar(true)}
        >
          <SearchIcon />
        </Fab>

        {/* Floating Create Button */}
        <Fab
          className={classes.createFab}
          onClick={handleCreateClick}
        >
          <AddIcon /><span className={classes.createFabText}>Create</span>
        </Fab>

        {/* Centered Form Dialog */}
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
          disableEnforceFocus={false}
          disableAutoFocus={false}
        >
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            closeForm={handleCloseForm}
          />
        </Dialog>

        {/* Search Bar */}
        <div ref={searchRef}>
          <AppBar
            className={`${classes.appBarSearch} ${!showSearchBar ? classes.appBarSearchHidden : ''} ${classes.root}`}
            position="static"
            color="inherit"
            elevation={0}
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search Memories"
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearch(e.target.value)}
              className={classes.searchInput}
              size="small"
            />
            <ChipInput
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
              className={classes.chipInput}
              size="small"
            />
            <Button
              onClick={searchPost}
              variant="contained"
              className={classes.searchButton}
              size="small"
            >
              <SearchIcon />
            </Button>
          </AppBar>
        </div>

        {/* Main Content */}
        <Grid className={classes.mainContainer} container justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Posts
              setCurrentId={setCurrentId}
              openForm={() => setOpenForm(true)}
            />
          </Grid>
        </Grid>

        {(!searchQuery && !tags.length) && (
          <Paper className={classes.pagination} elevation={6}>
            <Pagination page={page} />
          </Paper>
        )}
      </Container>
    </Grow>
  );
};

export default Home;
