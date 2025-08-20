import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginTop: '120px',
  },
  appBarSearch: {
    position: 'fixed',
    top: 20,
    right: 0,
    left: 0,
    borderRadius: 12,
    margin: '0 auto 1rem',
    width: 'min-content',
    maxWidth: 800,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor:'#fffff0ff',
    border: '1px solid #ddd',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },

  appBarSearchHidden: {
    height: 0,
    opacity: 0,
    padding: 0,
    marginBottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },

  searchInput: {
    minWidth: '250px',
    '& .MuiOutlinedInput-root': {
      height: '50px',
      borderRadius: '8px',
      fontSize: '0.9rem',
    },
  },

  chipInput: {
    minWidth: '250px',
    '& .MuiOutlinedInput-root': {
      height: '50px',
      borderRadius: '8px',
      fontSize: '0.9rem',
    },
  },

  searchButton: {
    height: '50px',
    borderRadius: '8px',
    textTransform: 'none',
    padding: '0 16px',
    width: '100px',
    backgroundColor: '#D7B899',
    "&:hover": {
      backgroundColor: "#bc8e5dff",
    },
  },

  mainContainer: {
    minHeight: '75vh',
  },

  pagination: {
    borderRadius: 100,
    marginTop: '20px',
    padding: '6px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  searchFab: {
    position: 'fixed',
    bottom: 90,
    right: 30,
    backgroundColor: '#D7B899',
    zIndex: 1100,
    "&:hover": {
      backgroundColor: "#bc8e5dff",
    },
  },

  createFab: {
    position: 'fixed',
    bottom: 20,
    right: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'min-content',
    borderRadius: 100,
    padding: '20px 25px 20px 20px',
    zIndex: 1000,
    color: '#fff',
    backgroundColor: '#8c6841ff',
    "&:hover": {
      backgroundColor: "#704e2aff",
    },
  },

  createFabText: {
    fontSize: 18,
    marginLeft: 5,
  },

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '& fieldset': {
          borderColor: "#a4a4a4ff",
        },
        '&:hover fieldset': {
          borderColor: "#704e2a",
        },
        '&.Mui-focused fieldset': {
          borderColor: "#8c6841",
        },
      },
      '& .MuiInputLabel-root': {
        color: "#8c6841",
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: "#704e2a",
      },
    },
  },

  // Styles for smaller screens
  [theme.breakpoints.down('sm')]: {
    appBarSearch: {
      flexDirection: 'column', // Stack items vertically
      width: '90%',           // Use more screen width
    },
    searchInput: {
      width: '100%',
      minWidth: 'unset',      // Remove minimum width constraint
    },
    chipInput: {
      width: '100%',
      minWidth: 'unset',      // Remove minimum width constraint
    },
    searchButton: {
      width: '100%',          // Make button full-width
    },
  },
}));