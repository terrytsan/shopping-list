import {Form} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";
import * as Constants from './../constants.js';

class CurrentItemsListBox extends Component {
	render() {
		let {items, selectedItems, handleListBoxChange} = this.props;

		items = items.filter(item => item.ListID === Constants.List.Current);

		// Sort items by index
		items.sort((a, b) => (a.Index > b.Index) ? 1 : -1);

		return (
			<div>
				<h2>Current</h2>
				<Form.Control as="select" name="currentListBox" htmlSize={15} className="itemsListBox" multiple={true}
							  value={selectedItems} onChange={handleListBoxChange}>
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

CurrentItemsListBox.propTypes = {items: PropTypes.any};

export default CurrentItemsListBox;
