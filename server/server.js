import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

// io.listen(process.env.PORT || 3000);
io.listen(5000);

const characters = [];

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(3));
  const hexColor = Array.from(randomBytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return `#${hexColor}`;
};

io.on("connection", (socket) => {
  console.log("User Connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    hairColor: generateRandomHexColor(),
    hoodieColor: generateRandomHexColor(),
    shortsColor: generateRandomHexColor(),
    shoeColor: generateRandomHexColor(),
  });

  socket.emit("hello");

  io.emit("characters", characters);

  socket.on("move", (position) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    character.position = position;
    io.emit("characters", characters);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );

    io.emit("characters", characters);
  });
});
