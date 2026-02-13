import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: "350px",
    width: "100%",
    objectFit: "cover",
    transition: "transform 0.35s ease, filter 0.35s ease",
    filter: "blur(1.2px) brightness(0.95)",
  },

  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    backgroundColor: "#000",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    },
    "&:hover $media": {
      filter: "blur(0px) brightness(1)",
      transform: "scale(1.03)",
    },
  },

  overlay: {
    position: "absolute",
    top: "16px",
    left: "16px",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    padding: "10px",
    borderRadius: "10px",
    zIndex: 2,
  },

  overlay2: {
    position: "absolute",
    top: "16px",
    right: "16px",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: "100px",
    zIndex: 2,
  },

  editIconButton: {
    padding: "4px",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.45)",
    },
  },

  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "12px 16px 16px 16px",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)",
    color: "#fff",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  title: {
    padding: 0,
    fontWeight: 600,
  },

  details: {
    display: "flex",
    justifyContent: "left",
    margin: "4px 0 2px 0",
    flexWrap: "wrap",
    gap: "6px",
    maxWidth: "100%",
  },

  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px",
  },

  leftActions: {
    display: "flex",
    alignItems: "center",
  },

  compactButton: {
    minWidth: "auto",
    padding: "4px 4px",
    "&:hover": { backgroundColor: "transparent" },
    "&:focus": { backgroundColor: "transparent" },
  },

  iconCompactButton: {
    padding: "4px",
    color: "#FFB300",
    "&:hover": { backgroundColor: "transparent" },
  },

  iconDeleteButton: {
    padding: "4px",
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.25)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.45)",
    },
  },

  cancelDeleteButton: {
    padding: "8px 16px",
    color: "#fff",
    backgroundColor: "#4a2f12ff",
    "&:hover": { backgroundColor: "#704e2aff" },
  },

  confirmDeleteButton: {
    padding: "8px 16px",
    border: "1px solid #d9162aff",
    color: "#d9162aff",
    "&:hover": {
      backgroundColor: "#d9162aff",
      color: "#fff",
    },
  },

  brownAlert: {
    backgroundColor: "#704e2aff",
    color: "#fff",
    "& .MuiAlert-icon": { color: "white !important" },
  },
}));