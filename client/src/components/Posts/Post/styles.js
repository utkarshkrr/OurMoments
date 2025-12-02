import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: "350px",
    width: "100%",
    objectFit: "cover",
    transition: "transform 0.35s ease, filter 0.35s ease",
    filter: "blur(1.2px) brightness(0.95)", // slight blur by default
  },

  border: {
    border: "none", // make sure no solid border is ever applied
  },

  fullHeightCard: {
    height: "100%",
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
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // hover shadow only
    },
    "&:hover $media": {
      filter: "blur(0px) brightness(1)",
      transform: "scale(1.03)",
    },
    "&:hover $bottomOverlay": {
      maxHeight: "230px",
      paddingTop: "28px",
    },
    "&:hover $hoverContent": {
      opacity: 1,
      transform: "translateY(0)",
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


  grid: {
    display: "flex",
  },

  // Bottom overlay that holds title + hover content
  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "12px 16px 16px 16px",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)",
    color: "#fff",
    maxHeight: "72px", // only title visible initially
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    zIndex: 2,
    transition: "max-height 0.35s ease, padding-top 0.35s ease",
  },

  title: {
    padding: 0,
    fontWeight: 600,
  },

  hoverContent: {
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  },

  details: {
    display: "flex",
    justifyContent: "left",
    margin: "4px 0 2px 0",
    flexWrap: "wrap",
    gap: "6px",
    maxWidth: "100%",
  },

  tagChip: {
    marginRight: "5px",
    padding: "3px 7px",
    borderRadius: "6px",
    color: "#332e18",
    backgroundColor: "#fff1e3ff",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "170px",
    fontSize: "0.95rem", // slightly bigger
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },

  message: {
    marginTop: "4px",
    marginBottom: "4px",
    fontSize: "0.95rem", // slightly bigger subtitle/message
    color: "#f5f5f5",
  },

  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },

  cardAction: {
    display: "block",
    textAlign: "initial",
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
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      backgroundColor: "transparent",
    },
  },

  // Bright color for share icon (and can be used for comment container)
  iconCompactButton: {
    padding: "4px",
    color: "#FFB300", // brighter amber
    "&:hover": {
      backgroundColor: "transparent",
    },
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
    "&:hover": {
      backgroundColor: "#704e2aff",
    },
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
    "& .MuiAlert-icon": {
      color: "white !important",
    },
  },
}));
