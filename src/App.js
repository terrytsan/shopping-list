import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentItems from "./components/CurrentItems";
import PreviousItems from "./components/PreviousItems";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";
import dummyItems from "./dummyItems.json";
import * as Constants from './constants.js';
import NewItemModal from "./components/NewItemModal";

class App extends Component {
	state = {
		items: dummyItems.items,
		prevLstSelectedItems: [],
		currLstSelectedItems: [],
		showNewItemModal: false,
		newItemName: "",
		newItemHighPriority: false
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

	showNewItemModal = () => this.setState({showNewItemModal: true});

	hideNewItemModal = () => this.setState({showNewItemModal: false});

	handleNewItemNameOnChange = (event) => this.setState({newItemName: event.target.value});

	handleNewItemPriorityOnChange = (event) => this.setState({newItemHighPriority: event.target.checked});

	handleAddItemOnClick = (event) => {
		event.preventDefault();
		let items = this.state.items;
		let currLstLength = items.filter(item => item.ListID === Constants.List.Current).length;

		let maxItemId = Math.max.apply(Math, items.map(i => i.ItemID));

		// Add new item to current list
		let newItem = {
			"ItemID": maxItemId + 1,
			"ItemName": this.state.newItemName,
			"ListID": Constants.List.Current,
			"HighPriority": this.state.newItemHighPriority,
			"Index": currLstLength
		};
		this.setState({items: this.state.items.concat(newItem)});

		// Cleanup
		this.setState({newItemName: ""});
		this.setState({newItemHighPriority: false});
		this.hideNewItemModal();
	};

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col xs={5}>
							<CurrentItems items={this.state.items}
										  selectedItems={this.state.currLstSelectedItems}
										  handleListBoxChange={this.handleCurrentLstOnChange}
										  newItemClick={this.showNewItemModal}/>
						</Col>
						<Col xs={2}
							 style={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center"}}>
							<Row className="itemsListBtnRow">
								<Button className="itemsListBtn" onClick={this.handleLeftArrowOnClick}>˂</Button>
								<Button className="itemsListBtn" onClick={this.handleRightArrowOnClick}>˃</Button>
							</Row>
							<Row className="itemsListBtnRow" style={{marginTop: "auto"}}>
								<Button className="itemsListBtn">˄</Button>
								<Button className="itemsListBtn">˅</Button>
							</Row>
						</Col>
						<Col xs={5}>
							<PreviousItems items={this.state.items}
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
				<NewItemModal modalShow={this.state.showNewItemModal}
							  modalClose={this.hideNewItemModal}
							  newItemName={this.state.newItemName}
							  handleNameChange={this.handleNewItemNameOnChange}
							  newItemHighPriority={this.state.newItemHighPriority}
							  handlePriorityChange={this.handleNewItemPriorityOnChange}
							  addItemClick={this.handleAddItemOnClick}/>
			</div>
		);
	}
}

export default App;
