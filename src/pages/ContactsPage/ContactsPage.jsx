import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import s from "./ContactsPage.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import Modal from "../../components/Modal/Modal";
import { selectModalState } from "../../redux/modal/selectors";
import { Toaster } from "react-hot-toast";
import EditForm from "../../components/EditForm/EditForm";
import { selectEditState } from "../../redux/contacts/selectors";

const ContactsPage = () => {
  const { isOpen, contact } = useSelector(selectModalState);
  const { editIsOpen, editContact } = useSelector(selectEditState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={s.wrap}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {editIsOpen && <EditForm editContact={editContact} />}
      {isOpen && <Modal contact={contact} />}
      <Toaster />
    </div>
  );
};

export default ContactsPage;
