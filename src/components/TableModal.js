import { render } from '@testing-library/react';
import React, { useState } from 'react'
import { Form, FormGroup, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

const TableModal = ({person, toggle, onSave}) => {

    const [activePerson, setActivePerson] = useState(person);
    const [toggle, setToggle] = useState(toggle);
    const [onSave, setOnSave] = useState(onSave)

    // const { toggle, onSave } = this.props;

    handleChange = (e) => {
        let { name, value } = e.target;

        const activePerson = { ...setActivePerson, [name]: value};

        setActivePerson({activePerson});
    };

    return(
        <Modal className='modalContainer' isOpen={true} toggle={toggle}>
            <ModalHeader 
                className='header' 
                toggle={toggle}
            >
                Edit {activePerson.Name}'s Information
            </ModalHeader>
            <ModalBody className='body'>
                <Form>
                    <FormGroup>
                        <Label for='person-name'>Name</Label>
                        <input 
                            id='person-name'
                            type='text' 
                            name='Name' 
                            value={activePerson.Name} 
                            onChange={this.handleChange} 
                            placeholder='Enter full name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='person-address'>Address</Label>
                        <input 
                            id='person-address'
                            type='text' 
                            name='Name' 
                            value={activePerson.Address} 
                            onChange={this.handleChange} 
                            placeholder='Enter address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='person-zipcode'>Zip Code</Label>
                        <input 
                            id='person-zipcode'
                            type='text' 
                            name='Name' 
                            value={activePerson.['Zip Code']} 
                            onChange={this.handleChange} 
                            placeholder='Enter zip code'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='person-email'>Email</Label>
                        <input 
                            id='person-email'
                            type='text' 
                            name='Name' 
                            value={activePerson.Email} 
                            onChange={this.handleChange} 
                            placeholder='Enter email'
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <button
                    color="success"
                    onClick={() => onSave(activePerson)}
                >
                    Save information
                </button>
            </ModalFooter>
        </Modal>
    )
}