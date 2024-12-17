import style from "./Contact.module.css";
import { ImPhone } from "react-icons/im";
import { RiContactsFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/modalSlice";
import { CiEdit } from "react-icons/ci";
import { openEditModal } from "../../redux/edit/slice";
import { MdOutlineDeleteForever } from "react-icons/md";
// import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(contact));
  };

  const editHandleClick = () => {
    dispatch(openEditModal(contact));
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
      <div className={style.buttonsContainer}>
        <button className={style.deleteButton} onClick={editHandleClick}>
          <CiEdit />
        </button>

        <button className={style.deleteButton} onClick={handleClick}>
          <MdOutlineDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default Contact;
