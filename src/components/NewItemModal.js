import {Button, Form, Modal} from "react-bootstrap";

function NewItemModal({
						  modalShow, modalClose, newItemName, handleNameChange, newItemHighPriority,
						  handlePriorityChange, addItemClick
					  }) {
	return (
		<Modal show={modalShow} onHide={modalClose} animation={false}>
			<Modal.Header closeButton={true}>
				<Modal.Title>New Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Control type="text" placeholder="Item Name" value={newItemName}
									  onChange={handleNameChange}/>
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

export default NewItemModal;
