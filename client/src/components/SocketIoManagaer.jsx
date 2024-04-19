import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://localhost:5000");

export const charactersAtom = atom([]);

export const SocketIoManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }

    function onDisconnect() {
      console.log("Disconnected");
    }

    function onHello() {
      console.log("Hello");
    }

    function onCharacters(value) {
      setCharacters(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
    };
  }, []);
};
