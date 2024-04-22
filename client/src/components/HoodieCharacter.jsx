/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\Hoodie Character.glb -o .\src\components\HoodieCharacter.jsx -r public 
*/

import React, { useRef, useState, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAtom } from "jotai";
import { usersAtom } from "./SocketIoManagaer";
import { useGrid } from "../hooks/useGrid";

const movementSpeed = 0.02;

export function HoodieCharacter({
  hairColor = "black",
  hoodieColor = "red",
  shortsColor = "black",
  shoeColor = "green",
  id,
  ...props
}) {
  const position = useMemo(() => props.position, []);

  const [user] = useAtom(usersAtom);
  const [path, setPath] = useState();

  const { gridToVector3 } = useGrid();

  useEffect(() => {
    const path = [];
    props.path?.forEach((gridPosition) => {
      path.push(gridToVector3(gridPosition));
    });
    setPath(path);
  }, [props.path]);

  const group = useRef();

  const { scene, materials, animations } = useGLTF(
    "/models/Hoodie Character.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone); // useGraph created two flat object collections for nodes and materials so that two objects can be shown in the scene

  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("CharacterArmature|Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation, actions]);

  useFrame((state) => {
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(movementSpeed);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("CharacterArmature|Run");
    } else if (path?.length) {
      path.shift();
    } else {
      setAnimation("CharacterArmature|Idle");
    }
    if (id === user) {
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position);
    }
  });

  return (
    <group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      name={`character-${id}`}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Casual_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Feet_1"
              geometry={nodes.Casual_Feet_1.geometry}
              material={materials.White}
              skeleton={nodes.Casual_Feet_1.skeleton}
            />
            <skinnedMesh
              name="Casual_Feet_2"
              geometry={nodes.Casual_Feet_2.geometry}
              material={materials.Purple}
              skeleton={nodes.Casual_Feet_2.skeleton}
            >
              <meshStandardMaterial color={shoeColor} />
            </skinnedMesh>
          </group>
          <group name="Casual_Legs" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Legs_1"
              geometry={nodes.Casual_Legs_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Legs_1.skeleton}
            />
            <skinnedMesh
              name="Casual_Legs_2"
              geometry={nodes.Casual_Legs_2.geometry}
              material={materials.LightBlue}
              skeleton={nodes.Casual_Legs_2.skeleton}
            >
              <meshStandardMaterial color={shortsColor} />
            </skinnedMesh>
          </group>
          <group name="Casual_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Head_1"
              geometry={nodes.Casual_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Head_1.skeleton}
            />
            <skinnedMesh
              name="Casual_Head_2"
              geometry={nodes.Casual_Head_2.geometry}
              material={materials.Eyebrows}
              skeleton={nodes.Casual_Head_2.skeleton}
            />
            <skinnedMesh
              name="Casual_Head_3"
              geometry={nodes.Casual_Head_3.geometry}
              material={materials.Eye}
              skeleton={nodes.Casual_Head_3.skeleton}
            />
            <skinnedMesh
              name="Casual_Head_4"
              geometry={nodes.Casual_Head_4.geometry}
              material={materials.Hair}
              skeleton={nodes.Casual_Head_4.skeleton}
            >
              <meshStandardMaterial color={hairColor} />
            </skinnedMesh>
          </group>
          <group
            name="Casual_Body"
            position={[0, 0.007, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="Casual_Body_1"
              geometry={nodes.Casual_Body_1.geometry}
              material={materials.Purple}
              skeleton={nodes.Casual_Body_1.skeleton}
            >
              <meshStandardMaterial color={hoodieColor} />
            </skinnedMesh>
            <skinnedMesh
              name="Casual_Body_2"
              geometry={nodes.Casual_Body_2.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Body_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Hoodie Character.glb");
