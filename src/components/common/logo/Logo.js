import { ReactComponent as CustomLogo } from "../../utils/assets/logo.svg";
import { ReactComponent as CustomLogoDark } from "../../utils/assets/logo-dark.svg";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";

const Logo = () => {
  const { theme } = useThemeProvider();
  return theme === "dark"? <CustomLogoDark/> : <CustomLogo />;
};
export default Logo;
