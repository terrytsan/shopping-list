import {Button, Form, Modal} from "react-bootstrap";

function EditItemModal({
						   modalShow, modalClose, editItemName, handleNameChange, editItemClick
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
									  onChange={handleNameChange}/>
					</Form.Group>
					<Button type="submit" onClick={editItemClick}>Edit</Button>
				</Form>
			</Modal.Body>
		</Modal>

	);
}

export default EditItemModal;
