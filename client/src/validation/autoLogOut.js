import store from "../store";
import { logoutUser } from "../actions/authActions";

const autoLogOutIfNeeded = () => {
  if (JSON.parse(localStorage.user).expireTime < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
};

export default autoLogOutIfNeeded;
