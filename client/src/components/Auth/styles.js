import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
    borderRadius:'30px',
    backgroundColor:'#fefeebff'
  },
  root: {
    '& .MuiTextField-root': {

      // Apply outline + label overrides globally inside Auth form
      '& .MuiOutlinedInput-root': {
        borderRadius: 12,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#602d06ff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#8a4108',
    "&:hover": {
      backgroundColor: "#602d06ff",
    },
  },
}));