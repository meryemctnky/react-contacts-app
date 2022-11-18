import React, { useContext, useState } from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { ContactContext } from "../contexts/ContactContext";

const EditForm = ({ contact }) => {
    const {editContact} = useContext(ContactContext)
    const id = contact.id;

    const [name, setName] = useState(contact.name)
    const [phone, setPhone] = useState(contact.phone)
    const [email, setEmail] = useState(contact.email)
    const [company, setCompany] = useState(contact.company)

    const editedContact = {id, name, phone, email, company }

    const submitHandle = (e) => {
        e.preventDefault();
        editContact(id, editedContact)
    }

    

  return (
    <div className="add-contact">
        <Form className='d-grid gap-3' onSubmit={submitHandle} >
            <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Name' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Phone</Form.Label>
                <Form.Control type='text' name="phone" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Phone' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='name@example.com' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Company Name</Form.Label>
                <Form.Control type='text' name="company" value={company} onChange={(e)=> setCompany(e.target.value)} placeholder='Company' required />
            </FormGroup>
            <Button className='success-button' type="submit" block="true">Save</Button>
        </Form>
    </div>
  )
}

export default EditForm