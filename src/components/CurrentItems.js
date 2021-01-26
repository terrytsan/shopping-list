import {Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";
import * as Constants from './../constants.js';
import {Exclamation} from "react-bootstrap-icons";

class CurrentItems extends Component {
	render() {
		let {items, selectedItems, listItemClick, tglHighPriorityClick, newItemClick} = this.props;

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
				<div className="border">
					<ListGroup className="listGroupFixedHeight">
						{items.map((item, i) =>
							<ListGroupItem action key={i} id={item.ItemID}
										   className={`py-1 px-2 border-0 ` + (selectedItems.includes(item.ItemID) &&
											   `active`)} onClick={listItemClick}>
								<span id={item.ItemID} className={item.HighPriority ? `highPriority` : `stdPriority`}
									  onClick={(e) => tglHighPriorityClick(e, item.ItemID)}><Exclamation
									size={20}/></span>
								{item.ItemName}
							</ListGroupItem>
						)}
					</ListGroup>
				</div>
			</div>
		);
	}
}

CurrentItems.propTypes = {items: PropTypes.any};

export default CurrentItems;
