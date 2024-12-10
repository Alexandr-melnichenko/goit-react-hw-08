import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import stl from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { addContact } from "../../redux/contactsOps";

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

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  console.log("Contacts in contact form:", contacts);

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    const newContact = {
      ...values,
      id: nanoid(),
    };

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <div className={stl.formWraper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedBackSchema}
      >
        {({ setFieldValue }) => (
          <Form className={stl.forma}>
            <label className={stl.labelForma} htmlFor="name">
              Name
            </label>
            <Field
              className={stl.inputForma}
              type="text"
              name="name"
              onChange={(e) => {
                const value = e.target.value
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ");
                setFieldValue("name", value);
              }}
              placeholder="Name Surname"
            />
            <ErrorMessage
              className={stl.validationMessage}
              name="name"
              component="span"
            />
            <label className={stl.labelForma} htmlFor="number">
              Number
            </label>
            <Field name="number">
              {({ field }) => (
                <MaskedInput
                  {...field}
                  mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                  placeholder="111-11-11"
                  className={stl.inputForma}
                />
              )}
            </Field>
            <ErrorMessage
              className={stl.validationMessage}
              name="number"
              component="span"
            />
            <button className={stl.buttonForm} type="submit">
              Ad contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
