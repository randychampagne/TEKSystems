import React, { Component } from "react";
import { findIndex } from "lodash";
import logo from "./logo.svg";
import RoomRequestForm from "./RoomRequestForm";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = { rooms: [], activeRooms: new Set(), requestedRooms: {} };
    this.toggleRoomActivation = this.toggleRoomActivation.bind(this);
    this.updateRequestedRooms = this.updateRequestedRooms.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // Note:
    // - this is a stub for backend data fetch
    // - can make Ajax call to a ReST backend here
    // - can alternatively compose this component with Apollo HOC to fetch from GraphQL backend then map props
    const rooms = require("./room.data.json");
    const activeRooms = new Set();
    if (rooms.length > 0) {
      activeRooms.add(rooms[0].name);
    }
    const requestedRooms = {
      ...rooms.reduce(
        (_rooms, room) => ({
          ..._rooms,
          [room.name]: {
            adult: 0,
            child: 0
          }
        }),
        {}
      )
    };
    this.setState({ rooms, activeRooms, requestedRooms });
  }

  toggleRoomActivation = ({ event }) => {
    const { name, checked: isActive } = event.target;
    const { rooms } = this.state;
    const index = findIndex(rooms, { name });
    const activeRooms = new Set();
    if (isActive) {
      activeRooms.add(name);
    }
    rooms.slice(0, index).map(room => activeRooms.add(room.name));
    this.setState({
      activeRooms
    });
  };

  updateRequestedRooms = ({ name, data }) => {
    const { requestedRooms } = this.state;
    this.setState({
      requestedRooms: {
        ...requestedRooms,
        [name]: { ...requestedRooms[name], ...data }
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const rooms = Array.from(this.state.activeRooms).reduceRight(
      (_rooms, room) => ({
        ..._rooms,
        [room]: this.state.requestedRooms[room]
      }),
      {}
    );
    console.log("Submitted!", rooms);
    alert(`Submitted!\n\n${JSON.stringify(rooms)}`);
  };

  render() {
    const { rooms, activeRooms, requestedRooms } = this.state;
    // Note:
    // - I chose to only render component if there's room data
    // - This behavior can easily be changed i.e. to render an empy/disabled state
    if (!rooms || !activeRooms) {
      return null;
    }
    return (
      <section className="App">
        <header className="App-header" role="banner">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hilton Assessment 2</h1>
        </header>
        <main className="room-request-form__container" role="main">
          <RoomRequestForm
            rooms={rooms}
            activeRooms={activeRooms}
            requestedRooms={requestedRooms}
            toggleRoomActivation={this.toggleRoomActivation}
            updateRequestedRooms={this.updateRequestedRooms}
            handleFormSubmit={this.handleFormSubmit}
          />
        </main>
      </section>
    );
  }
}

export default App;
