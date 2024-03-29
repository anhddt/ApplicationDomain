import { Fragment } from "react";
import { Box, ListItem, Typography } from "@mui/material";

/**
 * A recursive function that output the event object as string
 * @param {*} o the object in the event
 * @param {*} m margin
 * @returns
 */
const List = (o, m) => {
  return (
    <Fragment>
      {typeof o === "object" &&
        Object.keys(o).map((key, index) => (
          <Fragment key={`${key}-${index}`}>
            <Typography
              sx={{ ml: 2 + m }}
              variant="subtitle1"
            >{`${key}:`}</Typography>
            {List(o[key], 2 + m)}
          </Fragment>
        ))}
      {typeof o !== "object" && o.toString().length > 0 && (
        <ListItem sx={{ display: "list-item", py: 0 }}>
          <Typography
            sx={{ ml: 2 + m }}
            variant="subtitle1"
          >{`${o}`}</Typography>
        </ListItem>
      )}
    </Fragment>
  );
};
const EventDetail = ({ detail }) => {
  const Str = Object.keys(detail).map((key, index) => (
    <Fragment key={`${detail.eventDate}-${index}`}>
      {key === "eventDate" && (
        <Fragment>
          <Typography variant="subtitle1">{`${key}:`}</Typography>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <Typography sx={{ ml: 2 }} variant="subtitle1">{`${detail[
              key
            ].toDate()}`}</Typography>
          </ListItem>
        </Fragment>
      )}
      {key !== "eventDate" && (
        <Fragment>
          <Typography variant="subtitle1">{`${key}:`}</Typography>
          {List(detail[key], 0)}
        </Fragment>
      )}
    </Fragment>
  ));
  return (
    <Box sx={{ ml: "50px", width: "600px", overflow: "scroll" }}>{Str}</Box>
  );
};

export default EventDetail;
