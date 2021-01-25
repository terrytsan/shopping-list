import {Form} from "react-bootstrap";

function CurrentItemsListBox() {
	return (
		<div>
			<h2>Current</h2>
			<Form.Control as="select" name="currentListBox" htmlSize={15} className="itemsListBox">
			</Form.Control>
		</div>
	);
}

export default CurrentItemsListBox;