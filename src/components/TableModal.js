import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";


class TableModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            activePerson: this.props.activePerson
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activePerson = {...this.state.activePerson, [name]: value};
        this.setState({activePerson});
    };
    
    render() {
        const { toggle, onSave } = this.props;

        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Edit Information
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='person-name'>Name</Label>
                            <Input 
                                id='person-name'
                                type='text' 
                                name='Name' 
                                value={this.state.activePerson.Name} 
                                onChange={this.handleChange} 
                                placeholder='Enter full name'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='person-address'>Address</Label>
                            <Input 
                                id='person-address'
                                type='text' 
                                name='Address' 
                                value={this.state.activePerson.Address} 
                                onChange={this.handleChange} 
                                placeholder='Enter address'
                            />
                        </FormGroup>
                        <FormGroup>
                            <label for='person-zipcode'>Zip Code</label>
                            <Input 
                                id='person-zipcode'
                                type='text' 
                                name='ZipCode' 
                                value={this.state.activePerson.ZipCode} 
                                onChange={this.handleChange} 
                                placeholder='Enter zip code'
                            />
                        </FormGroup>
                        <FormGroup>
                            <label for='person-email'>Email</label>
                            <Input 
                                id='person-email'
                                type='text' 
                                name='Email' 
                                value={this.state.activePerson.Email} 
                                onChange={this.handleChange} 
                                placeholder='Enter email'
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="btn btn-success"
                        onClick={() => onSave(this.state.activePerson)}
                    >
                        Save information
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
    
}

export default TableModal;