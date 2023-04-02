import CustomLogo from "../../utils/assets/logo.png";
import CustomLogoDark from "../../utils/assets/logo-dark.png";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";

const Logo = () => {
  const { theme } = useThemeProvider();
  return theme === "dark" ? (
    <img src={CustomLogoDark} alt="Accountant's Friend" />
  ) : (
    <img src={CustomLogo} alt="Accountant's Friend" />
  );
};
export default Logo;
