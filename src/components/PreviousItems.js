import {ListGroup, ListGroupItem} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";
import * as Constants from './../constants.js';

class PreviousItems extends Component {
	render() {
		let {items, selectedItems, listItemClick} = this.props;

		items = items.filter(item => item.ListID === Constants.List.Previous);

		// Sort items by index
		items.sort((a, b) => (a.Index > b.Index) ? 1 : -1);

		return (
			<div>
				<h2>Previous</h2>
				<div className="border">
					<ListGroup className="listGroupFixedHeight">
						{items.map((item, i) =>
							<ListGroupItem action key={i} id={item.ItemID}
										   className={`py-1 px-2 border-0 ` + (selectedItems.includes(item.ItemID) ?
											   `active` : ``)} onClick={listItemClick}>{item.ItemName}</ListGroupItem>
						)}
					</ListGroup>
				</div>
			</div>
		);
	}
}

PreviousItems.propTypes = {items: PropTypes.any};

export default PreviousItems;
