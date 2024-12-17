import { useDispatch, useSelector } from "react-redux";
import { editingContact } from "../../redux/contacts/operations";
// import { closeModal } from "../../redux/modal/modalSlice";
import styles from "./EditForm.module.css";
// import { selectModalState } from "../../redux/modal/selectors";
import toast from "react-hot-toast";
import { selectEditState } from "../../redux/edit/selectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { nanoid } from "nanoid";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { closeEditModal } from "../../redux/edit/slice";
// import { useState } from "react";

const FeedBackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .transform((value) => {
      return value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    })
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in format 111-11-11")
    .required("Required"),
});

const EditForm = () => {
  const { editIsOpen, editContact } = useSelector(selectEditState);
  const dispatch = useDispatch();
  const notify = () => toast("Сontact successfully edited!");
  //   const [name, setName] = useState(editContact.name || "");
  //   const [number, setNumber] = useState(editContact.number || "");

  const initialValues = {
    name: editContact.name,
    number: editContact.number,
  };

  if (!editIsOpen) return null;

  const handleEditContact = async (values) => {
    try {
      //   const updatedContact = {
      //     id: editContact.id,
      //     name: editContact.name,
      //     number: editContact.number,
      //   };

      const updatedContact = {
        id: editContact.id,
        name: values.name,
        number: values.number,
      };

      await dispatch(editingContact(updatedContact)).unwrap();
      dispatch(closeEditModal());
      notify();
    } catch (error) {
      console.error("Помилка при редактуванні контакту:", error);
    }
  };

  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.formWraper}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleEditContact}
              validationSchema={FeedBackSchema}
            >
              {({ setFieldValue }) => (
                <Form className={styles.forma}>
                  <label className={styles.labelForma} htmlFor="name">
                    Name
                  </label>
                  <Field
                    className={styles.inputForma}
                    type="text"
                    name="name"
                    onChange={(e) => {
                      const value = e.target.value
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ");
                      setFieldValue("name", value);
                    }}
                    placeholder={editContact.name}
                  />
                  <ErrorMessage
                    className={styles.validationMessage}
                    name="name"
                    component="span"
                  />
                  <label className={styles.labelForma} htmlFor="number">
                    Number
                  </label>
                  <Field name="number">
                    {({ field }) => (
                      <MaskedInput
                        {...field}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                        ]}
                        placeholder={editContact.number}
                        className={styles.inputForma}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    className={styles.validationMessage}
                    name="number"
                    component="span"
                  />
                  <div className={styles.buttons}>
                    <button className={styles.buttonForm} type="submit">
                      Edit contact
                    </button>
                    <button onClick={() => dispatch(closeEditModal())}>
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
