import { useAtom } from "jotai";
import { modelArrayAtom } from "../components/SocketIoManagaer";
import * as THREE from "three";

export const useGrid = () => {
  const [modelArray] = useAtom(modelArrayAtom);

  const vector3ToGrid = (vector3) => {
    return [
      Math.floor(vector3.x * modelArray.gridDivision),
      Math.floor(vector3.z * modelArray.gridDivision),
    ];
  };

  const gridToVector3 = (gridPosition, width = 1, height = 1) => {
    return new THREE.Vector3(
      width / modelArray.gridDivision / 2 +
        gridPosition[0] / modelArray.gridDivision,
      0,
      height / modelArray.gridDivision / 2 +
        gridPosition[1] / modelArray.gridDivision
    );
  };

  return {
    vector3ToGrid,
    gridToVector3,
  };
};
