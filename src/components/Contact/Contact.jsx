import style from "./Contact.module.css";
import { ImPhone } from "react-icons/im";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/modalSlice";
// import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(contact));
  };

  return (
    <div className={style.contactContainer}>
      <div className={style.params}>
        <p className={style.pContact}>
          <RiContactsFill className={style.iconMan} />
          {contact.name}
        </p>
        <p className={style.pContact}>
          <ImPhone className={style.iconPhone} />
          {contact.number}
        </p>
      </div>
      <button className={style.deleteButton} onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
