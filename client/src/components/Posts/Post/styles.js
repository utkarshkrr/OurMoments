import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
   media: {
    // Set a fixed height for the container to ensure it's visible.
    // This allows both images and videos to have a predictable size.
    height: '250px',
    width: '100%',
    objectFit: 'cover', // This is key for both images and videos to fit correctly.
    // Remove background-related properties that can interfere with the video element.
    // These properties are specific to the CardMedia component's implementation.
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    backgroundColor:'#fffff8ff',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '10px',
    borderRadius: '10px',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'left',
    margin: '10px 20px',
    flexWrap: 'wrap',
    gap: '4px',
    maxWidth: '100%',
  },
  tagChip:{
    marginRight:'5px',
    padding:'2px 4px ',
    borderRadius:'4px',
    color:'#332e18',
    backgroundColor:'#fff1e3ff',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '150px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
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
});
