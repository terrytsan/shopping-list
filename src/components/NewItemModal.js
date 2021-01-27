import {Button, Form, Modal} from "react-bootstrap";
import React, {Component} from "react";

class NewItemModal extends Component {

	constructor(props, context) {
		super(props, context);
		this.txtItmName = React.createRef();
	}

	render() {
		let {
			modalShow, modalClose, newItemName, handleNameChange, newItemHighPriority,
			handlePriorityChange, addItemClick, errors
		} = this.props;
		return (
			<Modal show={modalShow} onHide={modalClose} animation={false}
				   onShow={() => this.txtItmName.current.focus()}>
				<Modal.Header closeButton={true}>
					<Modal.Title>New Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Control type="text" ref={this.txtItmName} placeholder="Item Name" value={newItemName}
										  onChange={handleNameChange} isInvalid={!!errors.itemName}/>
							<Form.Control.Feedback type="invalid">{errors.itemName}</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Check label="High Priority" checked={newItemHighPriority}
										onChange={handlePriorityChange}/>
						</Form.Group>
						<Button type="submit" onClick={addItemClick}>Add</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default NewItemModal;
