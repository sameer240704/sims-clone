/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { modelArrayAtom } from "./SocketIoManagaer";
import { SkeletonUtils } from "three-stdlib";

const Items = ({ item }) => {
  const { name, gridPosition, size, rotation } = item;

  const [modelArray] = useAtom(modelArrayAtom);

  const { scene } = useGLTF(`models/Items/${name}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  return (
    <primitive
      object={clone}
      position={[
        size[0] / modelArray.gridDivision / 2 +
          gridPosition[0] / modelArray.gridDivision,
        0,
        size[1] / modelArray.gridDivision / 2 +
          gridPosition[1] / modelArray.gridDivision,
      ]}
      rotation-y={[((rotation || 0) * Math.PI) / 2]}
    />
  );
};

export default Items;
