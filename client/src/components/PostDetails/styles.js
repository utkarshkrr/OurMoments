import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
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
    tagChip: {
        marginRight: '5px',
        padding: '0px 8px',
        borderRadius: '4px',
        color: '#332e18',
        backgroundColor: '#fff1e3ff',
        marginBottom: '5px'
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
        },
    },
    imageSection: {
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            order: 1,
        },
    },
    recommendedPosts: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        gap: '20px',
        marginTop: '20px', [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    recommendedCard: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fffff8ff',
        cursor: 'pointer',
        width: '250px',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    recommendedImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    recommendedContent: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
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
        gap: '20px',
    },
    tagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
    },
}));