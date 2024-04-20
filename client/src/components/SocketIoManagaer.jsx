import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://localhost:5000");

export const charactersAtom = atom([]);
export const modelArrayAtom = atom(null);
export const usersAtom = atom(null);

export const SocketIoManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);

  const [_modelArray, setModelArray] = useAtom(modelArrayAtom);

  const [_users, setUsers] = useAtom(usersAtom);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
    }

    function onDisconnect() {
      console.log("Disconnected");
    }

    function onHello(value) {
      setModelArray(value.modelArray);
      setUsers(value.id);
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
