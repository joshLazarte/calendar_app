import store from "../store";
import { logoutUser } from "../actions/authActions";

const autoLogOutIfNeeded = history => {
  if (JSON.parse(localStorage.user).expireTime < Date.now()) {
    store.dispatch(logoutUser(history));
  }
};

export default autoLogOutIfNeeded;
