import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

// io.listen(process.env.PORT || 3000);
io.listen(5000);

const characters = [];

const items = {
  bookshelf: {
    name: "BookShelf",
    size: [1, 1],
  },
  couch: {
    name: "Couch",
    size: [3, 2],
  },
  dining: {
    name: "DiningTable",
    size: [3, 3],
  },
  chair: {
    name: "OfficeChair",
    size: [1, 1],
  },
  table: {
    name: "StudyTable",
    size: [2, 2],
  },
};

const modelArray = {
  size: [10, 10],
  gridDivision: 2,
  items: [{ ...items.chair, gridPosition: [0, 0] }],
};

const generateRandomPosition = () => {
  return [
    Math.random() * modelArray.size[0],
    0,
    Math.random() * modelArray.size[1],
  ];
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

  socket.emit("hello", { modelArray, characters, id: socket.id, items });

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
