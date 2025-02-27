import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact, addContact, updateContact } from "../../redux/contacts/operations";
import { selectContacts, selectFilter, setFilter } from "../../redux/contacts/slice";
import toast, { Toaster } from "react-hot-toast";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter) || "";

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteContact(deleteId)).unwrap();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact!");
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await dispatch(updateContact(editContact)).unwrap();
      toast.success("Contact updated successfully!");
    } catch (error) {
      toast.error("Failed to update contact!");
    }
    setShowEditModal(false);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (!name || !number) return;

    try {
      await dispatch(addContact({ name, number })).unwrap();
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error("Failed to add contact!");
    }

    form.reset();
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <div className={styles.contactsContainer}>
      <Toaster position="top-right" />
      <h1 className={styles.title}>Contacts</h1>

      <form onSubmit={handleAddContact} className={styles.addContactForm}>
        <TextField label="Name" name="name" variant="outlined" fullWidth required />
        <TextField label="Phone Number" name="number" variant="outlined" fullWidth required />
        <Button type="submit" variant="contained" color="primary">Add Contact</Button>
      </form>

      <TextField
        label="Search by name or number..."
        variant="outlined"
        fullWidth
        value={filter}
        onChange={handleFilterChange}
        className={styles.searchInput}
      />

      {filteredContacts.length > 0 ? (
        <ul className={styles.contactsList}>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <span className={styles.name}>{contact.name}</span>
              <span className={styles.number}>{contact.number}</span>
              <Button variant="contained" color="secondary" onClick={() => handleEdit(contact)}>Edit</Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(contact.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noContacts}>No contacts found.</p>
      )}

      {/* Діалогове вікно редагування */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editContact?.name || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="number"
            value={editContact?.number || ""}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Діалогове вікно видалення */}
      <Dialog
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null); // Видаляємо ID після закриття
        }}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button
            onClick={confirmDelete}
            color="error"
            autoFocus // Переміщуємо фокус на цю кнопку
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactsPage;
