import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StatusIcon = ({ current, good, warning }) => {
  const status = () => {
    let s = "";
    if (current >= good) s = "good";
    else if (current < good && current >= warning) s = "warning";
    else s = "error";
    return s;
  };
  const Icon = () => {
    const s = status();
    switch (s) {
      case "good":
        return <CheckCircleIcon color="success" />;
      case "warning":
        return <WarningIcon color="warning" />;
      case "error":
        return <ErrorIcon color="error" />;
      default:
        return <></>;
    }
  };
  return <Icon />;
};

export default StatusIcon;
