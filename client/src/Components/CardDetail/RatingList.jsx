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

export default function BasicRating(average) {
  const initial = average.props.rankeado[0];
  const starts = average.props.rank.map((r) => r.rank);

  const [value, setValue] = React.useState(initial);
  const [valueStar, setValueStar] = React.useState(starts);

  const totalVotes = average.props.rankeado[1];
  console.log(average);
  console.log(value);
  console.log(starts);
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
          c.comment.length > 0 ? (
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
          ) : (
            <></>
          )
        )}
      </List>
    </Box>
  );
}
