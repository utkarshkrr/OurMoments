import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '10px',
    objectFit: 'cover',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '600px',
  },
  details: {
    display: 'flex',
    justifyContent: 'left',
    margin: '4px 0',
    flexWrap: 'wrap',
  },
  title:{
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  dateLocation: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    }
  },
  tagChip: {
    marginRight: '5px',
    padding: '0px 8px',
    borderRadius: '4px',
    color: '#332e18',
    backgroundColor: '#ffe7cfff',
    marginBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    }
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      order: 2,
      margin: '10px 0',
    },
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      order: 1,
    },
  },

  // Recommended posts section
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    gap: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: '15px',
    },
  },
  recommendedCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    width: '250px',
    height: '250px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
    '&:hover $recommendedImage': {
        filter: 'blur(0px) brightness(1)',
        transform: 'scale(1.03)',
    },
    '&:hover $recommendedContent': {
        opacity: 1,
        transform: 'translateY(0)',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
},

recommendedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.35s ease, filter 0.35s ease',
    filter: 'blur(1.2px) brightness(0.95)',
},

recommendedContent: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '12px 14px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.5), transparent)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
},



  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', minHeight: '80vh',
  },
  commentsOuterContainer: {
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
  commentsInnerContainer: { marginRight: '30px', },
  commentsPosted: {
    maxHeight: '200px', padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(0, 0, 0, 0.075)', overflowY: 'auto',
  },
  commentBox: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#a4a4a4ff",
      },
      "&:hover fieldset": {
        borderColor: "#704e2a",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8c6841",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#8c6841",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#704e2a",
    },
  },
  commentButton: {
    color: '#fff',
    backgroundColor: '#8c6841ff',
    "&:hover": {
      backgroundColor: "#704e2aff",
    },
  },
  cancelDeleteButton: {
    padding: '8px 16px',
    color: '#fff',
    backgroundColor: '#4a2f12ff',
    "&:hover": {
      backgroundColor: "#704e2aff",
    },
  },
  confirmDeleteButton: {
    padding: '8px 16px',
    border: "1px solid #d9162aff",
    color: "#d9162aff",
    "&:hover": {
      backgroundColor: "#d9162aff",
      color: "#fff",
    },
  },
  brownAlert: {
    backgroundColor: '#704e2aff',
    color: '#fff',
    '& .MuiAlert-icon': {
      color: 'white !important',
    },
  },
  buttonContainer: {
    margin: '10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      gap: '4px',
      flexWrap: 'nowrap',
    },
  },
  postActionButton: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize:'0.7rem'
    },
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  postStory: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'justify',
    },
  },
  commentSection: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
}));
