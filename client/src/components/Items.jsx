import { useGLTF } from "@react-three/drei";
import React from "react";

const Items = ({ item }) => {
  const { name, gridPosition, size } = item;
  const { scene } = useGLTF(`models/Items/${name}.glb`);
  return <primitive object={scene} />;
};

export default Items;
