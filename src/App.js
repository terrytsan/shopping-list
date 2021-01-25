import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentItemsListBox from "./components/CurrentItemsListBox";
import PreviousItemsListBox from "./components/PreviousItemsListBox";
import {Container, Row, Col, Button} from "react-bootstrap";

function App() {
	return (
		<Container>
			<Row>
				<Col xs={5}>
					<CurrentItemsListBox/>
				</Col>
				<Col xs={2} style={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center"}}>
					<Row className="itemsListBtnRow" style={{}}>
						<Button className="itemsListBtn">˂</Button>
						<Button className="itemsListBtn">˃</Button>
					</Row>
					<Row className="itemsListBtnRow" style={{marginTop: "auto"}}>
						<Button className="itemsListBtn">˄</Button>
						<Button className="itemsListBtn">˅</Button>
					</Row>
				</Col>
				<Col xs={5}>
					<PreviousItemsListBox/>
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

export default App;
