import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getQuickRatio } from "../../../middleware/firebase/FireStoreUtils";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import StatusIcon from "./StatusIcon";
/**
 * A straight forward component that collects information and present the Quick ratio
 */
const QuickRatio = () => {
  const [quickRatio, setQuickRatio] = useState();
  const { theme } = useThemeProvider();
  useEffect(() => {
    (async () => {
      const ratio = await getQuickRatio();
      setQuickRatio(ratio);
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
        Quick Ratio
      </Typography>
      <Box sx={{ gap: "10px", display: "flex", alignItems: "center" }}>
        <StatusIcon current={quickRatio} good={1} warning={0.5} />
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {`${quickRatio}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default QuickRatio;
