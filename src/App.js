import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentItemsListBox from "./components/CurrentItemsListBox";
import PreviousItemsListBox from "./components/PreviousItemsListBox";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";
import dummyItems from "./dummyItems.json";
import * as Constants from './constants.js';

class App extends Component {
	state = {
		items: dummyItems.items,
		prevLstSelectedItems: [],
		currLstSelectedItems: []
	};

	handlePreviousLstOnChange = (event) => {
		let selected = Array.from(event.target.selectedOptions, sel => parseInt(sel.value));
		this.setState({prevLstSelectedItems: selected});
	};

	handleCurrentLstOnChange = (event) => {
		let selected = Array.from(event.target.selectedOptions, sel => parseInt(sel.value));
		this.setState({currLstSelectedItems: selected});
	};

	handleLeftArrowOnClick = () => {
		let updatedItems = JSON.parse(JSON.stringify(this.state.items));
		// Get the length of the receiving list
		let currLstLength = updatedItems.filter(item => item.ListID === Constants.List.Current).length;

		updatedItems.forEach(item => {
			if (this.state.prevLstSelectedItems.includes(item.ItemID)) {
				item.ListID = Constants.List.Current;
				// Update the index
				item.Index = currLstLength;
			}
		});

		this.setState({items: this.reAssignIndexes(Constants.List.Previous, updatedItems)});
		this.setState({prevLstSelectedItems: []});
	};

	handleRightArrowOnClick = () => {
		let updatedItems = JSON.parse(JSON.stringify(this.state.items));
		// Get the length of the receiving list
		let prevLstLength = updatedItems.filter(item => item.ListID === Constants.List.Previous).length;

		updatedItems.forEach(item => {
			if (this.state.currLstSelectedItems.includes(item.ItemID)) {
				item.ListID = Constants.List.Previous;
				// Update the index
				item.Index = prevLstLength;
			}
		});

		this.setState({items: this.reAssignIndexes(Constants.List.Current, updatedItems)});
		this.setState({currLstSelectedItems: []});
	};

	// Reassigns indexes to be sequential for a particular list.
	reAssignIndexes(listId, items) {
		let updatedItems = JSON.parse(JSON.stringify(items));
		let listItems = updatedItems.filter(item => item.ListID === listId);
		listItems.sort((a, b) => (a.Index > b.Index) ? 1 : -1);

		// Reassign indexes
		listItems = listItems.map((item, i) => {
			item.Index = i;
			return item;
		});

		updatedItems = updatedItems.map((item) => {
			if (item.ListID === listId) {
				let found = listItems.find(reassignedItem => reassignedItem.ItemID === item.ItemID);
				item.Index = found.Index;
				return item;
			} else {
				return item;
			}
		});

		return updatedItems;
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={5}>
						<CurrentItemsListBox items={this.state.items}
											 selectedItems={this.state.currLstSelectedItems}
											 handleListBoxChange={this.handleCurrentLstOnChange}/>
					</Col>
					<Col xs={2} style={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center"}}>
						<Row className="itemsListBtnRow" style={{}}>
							<Button className="itemsListBtn" onClick={this.handleLeftArrowOnClick}>˂</Button>
							<Button className="itemsListBtn" onClick={this.handleRightArrowOnClick}>˃</Button>
						</Row>
						<Row className="itemsListBtnRow" style={{marginTop: "auto"}}>
							<Button className="itemsListBtn">˄</Button>
							<Button className="itemsListBtn">˅</Button>
						</Row>
					</Col>
					<Col xs={5}>
						<PreviousItemsListBox items={this.state.items}
											  selectedItems={this.state.prevLstSelectedItems}
											  handleListBoxChange={this.handlePreviousLstOnChange}/>
					</Col>
				</Row>
				<Row style={{paddingTop: "15px"}}>
					<Col>
						<Button className="mr-2">Save List</Button>
						<Button className="mr-2">Clear List</Button>
						<Button>Load List</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
