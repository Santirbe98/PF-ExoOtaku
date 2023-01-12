import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import Swal from "sweetalert2";

export default function BasicRating(average) {
  const UserValidate = useSelector((state) => state.chk_customer);
  const initial = average.props.rankeado[0];
  const handleDelete = average.handleDelete;
  const starts = average.props.rank.map((r) => r.rank);

  const [value, setValue] = React.useState(initial);

  const totalVotes = average.props.rankeado[1];

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        marginBottom: 10,
      }}
    >
      <Typography component="legend">
        Puntuacion &#40;{totalVotes}&#41;
      </Typography>
      <Rating name="read-only" value={value} precision={0.5} readOnly />
      <Typography component="legend"></Typography>

      <List
        sx={{
          width: "100%",
          maxWidth: 560,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {" "}
        {average.props.rank?.map((c, index) =>
          c.comment.length > 0 && c.deleted === false ? (
            <Box sx={{ display: "flex" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src="/broken-image.jpg" />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", lineHeight: 2 }}
                        component="legend"
                        variant="body2"
                        color="text.primary"
                      >
                        {c.createdAt.substring(0, 10)}
                      </Typography>
                      <Rating
                        name="read"
                        defaultValue={c.rank}
                        size="small"
                        readOnly
                      />
                      {` — ${c.comment}"`}
                    </React.Fragment>
                  }
                />{" "}
                <Divider variant="inset" component="li" />
              </ListItem>
              {UserValidate !== null &&
                Object.keys(UserValidate).length > 0 &&
                UserValidate.isadmin === true && (
                  <Box sx={{ padding: "1vw" }}>
                    <Button
                      value={index + 1}
                      onClick={(e) =>
                        Swal.fire({
                          title: "¿Seguro que quieres modificar el estado?",
                          showDenyButton: true,
                          showCancelButton: false,
                          confirmButtonText: "Si",
                          denyButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(e);
                            Swal.fire("Orden Borrada!", "", "success");
                          } else if (result.isDenied) {
                            return;
                          }
                        })
                      }
                      color="error"
                      variant="contained"
                      sx={{ width: "0", maxHeight: "2vw" }}
                    >
                      X
                    </Button>
                  </Box>
                )}
            </Box>
          ) : (
            <></>
          )
        )}
      </List>
    </Box>
  );
}
