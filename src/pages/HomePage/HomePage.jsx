import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.textWraper}>
      <h1>Hello!</h1>
      <p>
        Welcome to the contacts app. Here you can store your contact database.
        You can also add, edit and delete your contacts. To get started, log in
        to your account or register.
      </p>
    </div>
  );
};

export default HomePage;
