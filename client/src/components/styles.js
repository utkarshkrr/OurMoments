import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  ul: {
    justifyContent: "space-around",
    "& .MuiPaginationItem-root": {
      color: "#704e2a", // text color (coffee brown)
      borderColor: "#a4a4a4ff", // outline color
      "&:hover": {
        backgroundColor: "#f5f5dc", // beige hover
      },
      "&.Mui-selected": {
        backgroundColor: "#8c6841", // darker brown when active
        color: "#fff",
        borderColor: "#8c6841",
        "&:hover": {
          backgroundColor: "#704e2a", // darker on hover
        },
      },
    },
  },
}));
