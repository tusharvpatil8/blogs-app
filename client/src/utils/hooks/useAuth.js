import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { onSignInSuccess, onSignOutSuccess } from "../../store/auth/sessionSlice";
import { setUser, initialState } from "../../store/auth/userSlice";
import appConfig from "../../configs/app.config";
import useCryptograpy from "./useCryptograpy";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { encrypt, decrypt } = useCryptograpy();

  const { token, signedIn, expired } = useSelector(
    (state) => state.auth.session
  );

  const signIn = async (payload) => {
    try {
      const formData = {
        codeId: payload?.codeId,
      };

      const encryptedData = await encrypt(formData);
      const resp = await login({ encryptedData });
      if (resp?.success) {
        const decryptedData = await decrypt(resp.data);
        const token = decryptedData.token;
        const user = decryptedData.record;
        console.log("user", user);
        dispatch(onSignInSuccess(token));

        dispatch(
          setUser({
            authority: [""],
          })
        );

        navigate(appConfig.authenticatedEntryPath);
        return {
          success: true,
          message: "Access Granted",
        };
      } else {
        return {
          success: false,
          message: resp?.message ? resp.message : "",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: "failed",
        message: err?.response?.data?.error?.message || err.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    handleSignOut();
  };

  return {
    authenticated: token && signedIn && expired > new Date().getTime(),
    signIn,
    signOut,
  };
}

export default useAuth;
