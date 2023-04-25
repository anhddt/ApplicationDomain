import { Box } from "@mui/material";

/**
 * A component in case of path error.
 * When the user types in a path that is not exist,
 * redirect to this page.
 * @returns Page not found message
 */
const NotFoundPage = () => {
  return <Box>Sorry! Page not found.</Box>;
};

export default NotFoundPage;
