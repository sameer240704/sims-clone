/* eslint-disable react/no-unknown-property */
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useState } from "react";
import { HoodieCharacter } from "./HoodieCharacter";
import {
  charactersAtom,
  modelArrayAtom,
  socket,
  usersAtom,
} from "./SocketIoManagaer";
import { useAtom } from "jotai";
import Items from "./Items";
import { useThree } from "@react-three/fiber";

const LandingPage = () => {
  const [characters] = useAtom(charactersAtom);

  const [modelArray] = useAtom(modelArrayAtom);

  const [user] = useAtom(usersAtom);

  const [floor, setFloor] = useState(false);
  useCursor(floor);

  const scene = useThree((state) => state.scene);

  const moveCharacter = (event) => {
    const character = scene.getObjectByName(`character-${user}`);
    if (!character) return;

    socket.emit("move");
  };

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />
      {modelArray.items.map((item, id) => (
        <Items key={`${item.name}-${id}`} item={item} />
      ))}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(event) =>
          socket.emit("move", [event.point.x, 0, event.point.z])
        }
        onPointerEnter={() => setFloor(true)}
        onPointerLeave={() => setFloor(false)}
        position-x={modelArray.size[0] / 2}
        position-z={modelArray.size[1] / 2}
      >
        <planeGeometry args={modelArray.size} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character) => (
        <HoodieCharacter
          key={character.id}
          id={character.id}
          position={
            new THREE.Vector3(
              character.position[0] / modelArray.gridDivision +
                1 / modelArray.gridDivision / 2,
              0,
              character.position[1] / modelArray.gridDivision +
                1 / modelArray.gridDivision / 2
            )
          }
          hairColor={character.hairColor}
          hoodieColor={character.hoodieColor}
          shortsColor={character.shortsColor}
          shoeColor={character.shoeColor}
        />
      ))}
    </>
  );
};

export default LandingPage;
