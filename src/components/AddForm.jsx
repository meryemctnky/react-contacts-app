import React, { useContext, useState } from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { ContactContext } from "../contexts/ContactContext";

const AddForm = () => {
    const {addContact} = useContext(ContactContext)
    const [newContact, setNewContact] = useState({name:"", phone:"", email:"", company:""})

    const {name, phone, email, company} = newContact;

    const changeHandle = (e) => {
        setNewContact({...newContact, [e.target.name]: e.target.value})
    }

    const submitHandle = (e) => {
        e.preventDefault();
        addContact(name, phone, email, company)

    }

  return (
    <div className="add-contact">
        <Form className='d-grid gap-3' onSubmit={submitHandle}>
            <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' name="name" value={name} onChange={changeHandle} placeholder='Name' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Phone</Form.Label>
                <Form.Control type='text' name="phone" value={phone} onChange={changeHandle} placeholder='Phone' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' name="email" value={email} onChange={changeHandle} placeholder='name@example.com' required />
            </FormGroup>
            <FormGroup>
                <Form.Label>Company Name</Form.Label>
                <Form.Control type='text' name="company" value={company} onChange={changeHandle} placeholder='Company' required />
            </FormGroup>
            <Button className="success-button" type="submit" block="true">Save</Button>
        </Form>
    </div>
  )
}

export default AddForm