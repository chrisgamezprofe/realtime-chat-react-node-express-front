import { useState } from "react";
import "./App.css";

import io from "socket.io-client";
import Chat from "./Chat";
import {
  Card,
  Button,
  Form,
  Icon,
  Container,
  Divider,
} from "semantic-ui-react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <Container>
      {!showChat ? (
        <Card fluid>
          <Card.Content header="Unirme al chat" />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Chris..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Sala:</label>
                <input
                  type="text"
                  placeholder="ID Sala:"
                  onChange={(e) => setRoom(e.target.value)}
                />
              </Form.Field>
              <Button onClick={joinRoom}>Unirme</Button>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />4 Friends
          </Card.Content>
        </Card>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Container>
  );
}

export default App;
