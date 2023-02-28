import "./profilePage.css";
import { Fragment, useMemo, useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showIf } from "../utils/conditionalRendering";
import { checkEmailFormat } from "../../middleware/verification/userInfo";
import {
  updateUserEmail,
  updateUserPassword,
} from "../../middleware/firebase/FireStoreUtils";
import {
  checkPwLength,
  checkPwFirstChar,
  checkPwForNumbers,
  checkPwForSpecialChar,
  isValidPw,
} from "../../middleware/verification/userInfo";
const AccountCard = () => {
  const readOnly = true;
  const [isEdit, setIsEdit] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editEmailError, setEditEmailError] = useState(false);
  const [editPasswordError, setEditPasswordError] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwNotMatch, setPwNotMatch] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const { username, dateCreated, email } = useAuth();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleEmailCancel = () => {
    setPassword("");
    setShowPassword(false);
    setEditEmail(false);
    setIsEdit(false);
  };
  const handlePasswordCancel = () => {
    setPassword("");
    setShowPassword(false);
    setShowNewPassword(false);
    setEditPassword(false);
    setIsEdit(false);
  };
  const handleEmailVerify = (e) => {
    setNewEmail(e.target.value);
    setIsEmailValid(checkEmailFormat(newEmail));
  };
  const handleEmailUpdate = async () => {
    try {
      await updateUserEmail(password, newEmail);
      handleEmailCancel();
    } catch (error) {
      setEditEmailError(true);
    }
  };
  const handlePasswordUpdate = async () => {
    try {
      await updateUserPassword(password, newPassword);
      handlePasswordCancel();
    } catch (error) {
      setEditPasswordError(true);
    }
  };
  const handleFocus = () => {
    setFocus(true);
  };
  useMemo(() => {
    if (editPassword) {
      setPwNotMatch(newPassword !== confirmPassword);
    }
  }, [editPassword, newPassword, confirmPassword]);
  return (
    <Fragment>
      {showIf(
        !isEdit,
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography variant="h6" textAlign="left">
                Account info:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Box gap="1rem" display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setEditEmail(true);
                    setIsEdit(true);
                  }}
                >
                  Edit email
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setEditPassword(true);
                    setIsEdit(true);
                  }}
                >
                  Edit password
                </Button>
              </Box>
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Username"
                size="small"
                value={username}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Created Date"
                size="small"
                value={dateCreated}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                fullWidth
                variant="standard"
                label="Email"
                size="small"
                value={email}
              />
            </Grid>
          </Grid>
        </form>
      )}
      {showIf(
        editEmail,
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography variant="h6" textAlign="left">
                Edit your email:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEmailCancel()}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
            {showIf(
              editEmailError,
              <Grid xs={12} item>
                <Box display="flex" justifyContent="center">
                  <Typography color="red">
                    Invalid new email or password
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ readOnly: readOnly }}
                variant="standard"
                fullWidth
                name="currentEmail"
                label="Current Email"
                size="small"
                value={email}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                placeholder="Enter your password"
                error={editEmailError}
                name="password"
                label=" password"
                type={showPassword ? "text" : "password"}
                size="small"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ForwardToInboxIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                placeholder="Enter new email"
                error={(isEmailValid && newEmail.length > 0) || editEmailError}
                helperText={
                  isEmailValid && newEmail.length > 0 && "Invalid email format"
                }
                name="email"
                label="New Email"
                size="small"
                onChange={(e) => {
                  handleEmailVerify(e);
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            disabled={
              isEmailValid || !(password.length > 0 && newEmail.length > 0)
            }
            fullWidth
            onClick={() => {
              handleEmailUpdate();
            }}
          >
            Submit
          </Button>
        </form>
      )}
      {showIf(
        editPassword,
        <form id="contact-info-block">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <Typography variant="h6" textAlign="left">
                Update your password:
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlePasswordCancel()}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                error={editPasswordError}
                helperText={editPasswordError && "Wrong password"}
                name="password"
                label="Current Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                size="small"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={6} item />
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                name="newPassword"
                label="New password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                size="small"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                onFocus={() => {
                  handleFocus();
                }}
                name="confirmPassword"
                label="Confirm Password"
                type={showNewPassword ? "text" : "password"}
                error={pwNotMatch && focus}
                helperText={pwNotMatch && focus && "Password does not match"}
                placeholder="Enter confirm password"
                size="small"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box id="password-constrains">
                <Typography
                  color={checkPwLength(newPassword) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must be at least 8 characters.
                </Typography>
                <Typography
                  color={checkPwFirstChar(newPassword) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must start with a letter.
                </Typography>
                <Typography
                  color={checkPwForNumbers(newPassword) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must have a number.
                </Typography>
                <Typography
                  color={checkPwForSpecialChar(newPassword) ? "green" : "black"}
                  display="block"
                  textAlign="left"
                  variant="contained"
                >
                  Must have a special character (!, @, #, $, %, *, etc.).{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            disabled={
              password.length <= 0 || pwNotMatch || !isValidPw(newPassword)
            }
            onClick={() => {
              handlePasswordUpdate();
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default AccountCard;