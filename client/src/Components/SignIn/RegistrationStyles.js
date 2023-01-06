import { red } from "@material-ui/core/colors";

const orange = "#F2A74B";
const textLight = "#000000";
const textDark = "#FFFFFF";
const borderLight = "rgba(232,207,43, .993)";

export const register = theme => ({

  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    display: "block",
    with:"500px",
    maxwidth: "700px",
    [theme.breakpoints.up(400 + theme.spacing(2))]: {
      width: "700px",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  
  paper: {
    position: "relative",
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    with:"500px",
    maxwith:"700px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(131,130,128,1) 90%)",
    boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
    }
  },

  avatar: {
    marginTop: 20,
    position: "relative",
    background: "rgba(255,255,255,0.85)",
    width: "100px",
    height: "100px",
    boxShadow: "0px 0px 12px rgba(131,153,167,0.99)"
  },

  icon: {
    width: "80px",
    height: "80px",
    color: "rgba(131,153,167,0.79)"
  },

  form: {
    margin: theme.spacing(4)
  },

  labels: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    fontSize: "10px",
    lineHeight: "5px",
    fontFamily: "PT Mono, monospace",
    fontWeight: 500,
    opacity: 0.45,
    //color: `${textDark} !important`
    color: textDark
  },

  inputs: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: textDark,
    fontSize: "16px",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    borderRadius: "8px",
    border: "1.4px solid",
    boxShadow: "1px 2px 20px rgba(1,1,1,1.29457423) ",
    borderColor: borderLight,

    "&:hover": {
      background: "rgba(241,216,73,0.36457423) "
    }
  },

  selects: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily: "Cutive Mono, monospace",
    color: textDark,
    fontSize: "14px",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    borderRadius: "8px",
    border: "1.4px solid",
    boxShadow: "1px 2px 20px rgba(1,1,1,1.29457423) ",
    borderColor: borderLight,

    "&:hover": {
      background: "rgba(241,216,73,0.36457423) "
    }
  },

  button: {
    color: textDark,
    background: "rgba(0,0,0,.85)",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: theme.spacing(6),
    padding: `${theme.spacing(1.6)}px`,
    border: "none",
    borderRadius: "8px",
    letterSpacing: "3px",

    "&::before, &::after": {
      position: "absolute",
      content: '""',
      boxSizing: "border-box",
      borderRadius: "8px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1
    },
    "&::before": {
      borderBottom: "2px solid rgba(255,255,255,.60)",
      borderTop: "2px solid rgba(255,255,255,.60)",
      transform: "scale(0,1)"
    },
    "&::after": {
      borderLeft: "3px solid rgba(255,255,255,.60)",
      borderRight: "3px solid rgba(255,255,255,.60)",
      transform: "scale(1,0)"
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s"
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s"
    },
    "&::first-letter": {
      color: orange
    },
    "&:hover": {
      background: "rgba(232,207,43,0.8)",
      color: textLight
    }
  },
  error: {
    border: `1.2px solid ${red[900]}`,
    background: "rgba(131,130,128,0.29457423)",
    color: red[900],
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(3)
  },

});
