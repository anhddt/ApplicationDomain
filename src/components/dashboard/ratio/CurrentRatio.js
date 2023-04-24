import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentRatio } from "../../../middleware/firebase/FireStoreUtils";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import StatusIcon from "./StatusIcon";

const CurrentRatio = () => {
  const [currentRatio, setCurrentRatio] = useState();
  const { theme } = useThemeProvider();
  useEffect(() => {
    (async () => {
      const ratio = await getCurrentRatio();
      setCurrentRatio(ratio);
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        backgroundColor: theme === "dark" ? "rgb(20, 19, 19)" : "#EEEFEF",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Current Ratio
      </Typography>
      <Box sx={{ gap: "10px", display: "flex", alignItems: "center" }}>
        <StatusIcon current={currentRatio} good={2} warning={1.5} />
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {`${currentRatio}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentRatio;
