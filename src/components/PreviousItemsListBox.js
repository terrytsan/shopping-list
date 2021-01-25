import {Form} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";

class PreviousItemsListBox extends Component {
	render() {
		let {items} = this.props;

		items = items.filter(item => item.ListID === 2);

		// Sort items by index
		items.sort((a, b) => (a.Index > b.Index) ? 1 : -1);

		return (
			<div>
				<h2>Previous</h2>
				<Form.Control as="select" name="previousListBox" htmlSize={15} className="itemsListBox">
					{items.map((item, i) =>
						<option key={i} value={item.ItemID}>
							{item.ItemName}
						</option>
					)}
				</Form.Control>
			</div>
		);
	}
}

PreviousItemsListBox.propTypes = {items: PropTypes.any};

export default PreviousItemsListBox;
