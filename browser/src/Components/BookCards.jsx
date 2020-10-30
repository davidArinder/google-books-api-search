import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: "400px",
    display: "flex",
  },
  media: {
    height: "370px",
    width: "255px",
  },
  button: {
    textAlign: "center",
  },
});

export default function BookCards(props) {
  const classes = useStyles();

  const {
    thumbnail,
    title,
    subtitle,
    author,
    link,
    publishedDate,
    pageCount,
    description,
    publisher,
    categories,
  } = props;
  return (
    <Card className={classes.root}>
      <CardActions>
        <CardContent>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={thumbnail}
              title={title}
            />
          </CardActionArea>

          <Typography variant="h6">{title}</Typography>
          {subtitle == null ? null : (
            <Typography variant="subtitle2">
              <Box fontStyle="italic">{subtitle}</Box>
            </Typography>
          )}
          <Typography gutterBottom variant="subtitle1">
            {author}
          </Typography>
          <Typography gutterBottom variant="body2">
            {description}
          </Typography>
          <Typography gutterBottom>
            <Box fontStyle="italic" fontSize={12}>
              Publisher: {publisher}
            </Box>
          </Typography>
          <Typography gutterBottom>
            <Box fontStyle="italic" fontSize={12}>
              Published: {publishedDate}
            </Box>
          </Typography>
          <Typography gutterBottom>
            <Box fontStyle="italic" fontSize={12}>
              Page Count: {pageCount}
            </Box>
          </Typography>
          <Typography gutterBottom>
            <Box fontStyle="italic" fontSize={12}>
              Categories: {categories}
            </Box>
          </Typography>
          <div className={classes.button}>
            <Button size="small" color="primary" href={link}>
              Learn More
            </Button>
          </div>
        </CardContent>
      </CardActions>
    </Card>
  );
}
