import {Button, Col, Form, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";
import * as Constants from './../constants.js';

class CurrentItems extends Component {
	render() {
		let {items, selectedItems, handleListBoxChange, newItemClick} = this.props;

		items = items.filter(item => item.ListID === Constants.List.Current);

		// Sort items by index
		items.sort((a, b) => (a.Index > b.Index) ? 1 : -1);

		return (
			<div>
				<Row>
					<Col style={{display: "flex", flexDirection: "row"}}>
						<h2>Current</h2>
						<Button className="ml-3 my-auto" onClick={newItemClick}>+</Button>
					</Col>
				</Row>
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

CurrentItems.propTypes = {items: PropTypes.any};

export default CurrentItems;
