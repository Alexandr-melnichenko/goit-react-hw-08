import { NavLink } from "react-router-dom";
import s from "./AppBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const AppBar = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header className={s.header}>
      <h3>Phonebook</h3>
      {isLoggedIn && <div>{user.email}</div>}
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        {!isLoggedIn && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        {isLoggedIn && (
          <button onClick={() => dispatch(logout())}>Logout</button>
        )}
      </ul>
    </header>
  );
};

export default AppBar;
