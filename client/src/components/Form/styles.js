import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),

      // apply outline + label styles to all inputs
      '& .MuiOutlinedInput-root': {
        borderRadius: 15,
        '& fieldset': {
          borderColor: "#a4a4a4ff",   // default outline
        },
        '&:hover fieldset': {
          borderColor: "#704e2a",     // hover outline
        },
        '&.Mui-focused fieldset': {
          borderColor: "#8c6841",     // focus outline
        },
      },
      '& .MuiInputLabel-root': {
        color: "#8c6841",             // default label
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: "#704e2a",             // focus label
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input:{},
  fileInput: {
    width: '97%',
    margin: '20px 0 30px 0',
    padding: theme.spacing(2),
    borderRadius: 15,
    border: '2px dashed #ccc',
    backgroundColor: '#fafafa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    '&:hover': {
      borderColor: '#8c6841',
      backgroundColor: '#f0f0f0',
    },
  },
  formButtonContainer: {
    width:'98%',
    gap:10,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around'
  },
  buttonSubmit: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#8c6841ff',
    "&:hover": {
      backgroundColor: "#704e2aff",
    },
  },
}));
