import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: "0 0 30px 0",
    display: "flex",
    position: "fixed",
    top: "0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 50px",
    backgroundColor: "#fffff0ff",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "flex-end",
    width: "auto",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  purple: {
    color: '#fff',
    backgroundColor: "#602d06ff",
    marginRight: "10px",
  },
  image: {
    marginLeft: "20px",
    height: "100px",
    [theme.breakpoints.down('sm')]: {
      height: "60px",
    },
  },
  signIn: {
    backgroundColor: "#8a4108",
    "&:hover": {
      backgroundColor: "#602d06ff",
    },
  },
  // Reverted to original style
  logout: {
    border: "1px solid #d9162aff",
    color: "#d9162aff",
    "&:hover": {
      backgroundColor: "#d9162aff",
      color: "#fff",
    },
  },
  // NEW styles for the tooltip
  customTooltip: {
    backgroundColor: '#fefeebff',
    border: '1px solid #f7f798ff',
  },
  customArrow: {
    color: '#fefeebff',
  },
}));