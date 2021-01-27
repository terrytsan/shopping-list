import {Button, Form, Modal} from "react-bootstrap";
import React, {Component} from "react";

class EditItemModal extends Component {

	constructor(props, context) {
		super(props, context);
		this.txtItmName = React.createRef();
	}

	render() {
		let {
			modalShow, modalClose, editItemName, handleNameChange, editItemClick, errors
		} = this.props;
		return (
			<Modal show={modalShow} onHide={modalClose} animation={false}
				   onShow={() => this.txtItmName.current.focus()}>
				<Modal.Header closeButton={true}>
					<Modal.Title>Edit Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Control type="text" ref={this.txtItmName} placeholder="Item Name" value={editItemName}
										  onChange={handleNameChange} isInvalid={!!errors.itemName}/>
							<Form.Control.Feedback type="invalid">{errors.itemName}</Form.Control.Feedback>
						</Form.Group>
						<Button type="submit" onClick={editItemClick}>Edit</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default EditItemModal;
