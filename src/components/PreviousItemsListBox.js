import {Form} from "react-bootstrap";

function PreviousItemsListBox() {
	return (
		<div>
			<h2>Previous</h2>
			<Form.Control as="select" name="previousListBox" htmlSize={15} className="itemsListBox">
			</Form.Control>
		</div>
	);
}

export default PreviousItemsListBox;