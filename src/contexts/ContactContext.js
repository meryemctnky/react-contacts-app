import React, { createContext, useEffect, useState }from 'react'
import uuid from 'react-uuid';
import { getContactsService } from "../services/contacts"

export const ContactContext = createContext();

const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true);
    const [contactsLength, setContactsLength] = useState(0)

    const getContactList = async () => {
        setLoading(true);
        const response = await getContactsService();
        setContacts(response.data);
        setLoading(false);
      }
      
      useEffect(()=>{
        getContactList();
      },[])

    const sortedContacts = contacts.sort((a,b) => a.name.localeCompare(b.name))

    const addContact = (name, phone, email, company) => {
        setContacts([...contacts, {id:uuid(), name, phone, email, company}])
    }

    const removeContact = (id) => {
        const newContacts = contacts.filter((contact) => contact.id !== id)
        setContacts(newContacts)
    }

    const editContact = (id, editedContact) => {
        setContacts(contacts.map((contact) => contact.id === id ? editedContact : contact ))
    }

    useEffect(() => {
        setContactsLength(() => contacts.length)
    }, [contacts])

    return (
        <ContactContext.Provider value={{sortedContacts, addContact, removeContact, editContact, contactsLength, loading}}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactProvider
 
