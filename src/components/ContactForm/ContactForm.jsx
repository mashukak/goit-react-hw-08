import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({ name: "", number: "" });
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { name: "", number: "" };

  
    if (!name.trim()) {
      newErrors.name = "Required";
    }

    
    if (!number.trim()) {
      newErrors.number = "Required";
    } else if (!/^\+?\d{7,15}$/.test(number)) {
      newErrors.number = "Not avaid Number"
    }

    if (newErrors.name || newErrors.number) {
      setErrors(newErrors);
      return;
    }

    const isDuplicate = contacts.some(
      (contact) => typeof contact.name === "string" && contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} вже є у списку!`);
      return;
    }

    dispatch(addContact({ name, number }));

    setName("");
    setNumber("");
    setErrors({ name: "", number: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </label>

      <label>
        Number:
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
        {errors.number && <p className={styles.error}>{errors.number}</p>}
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
