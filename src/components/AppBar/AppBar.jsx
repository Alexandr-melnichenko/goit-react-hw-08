import s from "./AppBar.module.css";
import { useSelector } from "react-redux";
import { selectUser, selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";

const AppBar = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <header className={s.header}>
      <h3>Phonebook</h3>
      {isLoggedIn && <div>{user.email}</div>}
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
