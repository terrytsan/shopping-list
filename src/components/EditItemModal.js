import {Button, Form, Modal} from "react-bootstrap";

function EditItemModal({
						   modalShow, modalClose, editItemName, handleNameChange, editItemClick, errors
					   }) {
	return (
		<Modal show={modalShow} onHide={modalClose} animation={false}>
			<Modal.Header closeButton={true}>
				<Modal.Title>Edit Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control type="text" placeholder="Item Name" value={editItemName}
									  onChange={handleNameChange} isInvalid={!!errors.itemName}/>
						<Form.Control.Feedback type="invalid">{errors.itemName}</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit" onClick={editItemClick}>Edit</Button>
				</Form>
			</Modal.Body>
		</Modal>

	);
}

export default EditItemModal;
