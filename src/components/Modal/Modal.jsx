import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { closeModal } from "../../redux/modal/modalSlice";
import styles from "./Modal.module.css";
import { selectModalState } from "../../redux/modal/selectors";
import toast from "react-hot-toast";

const Modal = () => {
  const { isOpen, contact } = useSelector(selectModalState);
  const dispatch = useDispatch();
  const notify = () => toast("Сontact successfully deleted!");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      dispatch(closeModal());
      notify();
    } catch (error) {
      console.error("Помилка при видаленні контакту:", error);
    }
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.text}>Сonfirmation</h2>
          <p className={styles.text}>You are about to delete a contact:</p>
          <p className={styles.text}>
            {contact.name} / {contact.number}
          </p>
          <p className={styles.text}>Are You shure?</p>
          <div className={styles.buttons}>
            <button onClick={handleConfirm}>Delete</button>
            <button onClick={() => dispatch(closeModal())}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;