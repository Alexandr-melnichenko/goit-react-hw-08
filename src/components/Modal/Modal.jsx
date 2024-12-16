import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { closeModal } from "../../redux/modal/modalSlice";
import styles from "./Modal.module.css";
import { selectModalState } from "../../redux/modal/selectors";

const Modal = () => {
  const message = `You are about to delete a contact ${contact.name}`;
  const dispatch = useDispatch();
  const { isOpen, contact } = useSelector(selectModalState);

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(deleteContact(contact.id));
    dispatch(closeModal());
  };

  return (
    <div>
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2>Сonfirmation</h2>
          <p>{message}</p>
          <p>Are You shure?</p>
          <div style={styles.buttons}>
            <button onClick={handleConfirm}>Delete</button>
            <button onClick={() => dispatch(closeModal())}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
