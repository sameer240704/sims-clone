import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
import { toast } from "sonner";

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
      toast.success("Welcome User!");
    }

    function onDisconnect() {
      console.log("Disconnected");
    }

    function onHello(value) {
      setModelArray(value.modelArray);
      setUsers(value.id);
      setCharacters(value);
    }

    function onCharacters(value) {
      setCharacters(value);
    }

    function onPlayerMove(value) {
      console.log("Player Moves");
      setCharacters((prev) => {
        return prev.map((character) => {
          if (character.id === value.id) {
            return value;
          }
          return character;
        });
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);
    socket.on("playerMove", onPlayerMove);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
      socket.off("playerMove", onPlayerMove);
    };
  }, []);
};
