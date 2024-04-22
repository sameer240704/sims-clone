import { useAtom } from "jotai";
import { modelArrayAtom } from "../components/SocketIoManagaer";
import * as THREE from "three";

export const useGrid = () => {
  const [modelArray] = useAtom(modelArrayAtom);

  const vector3ToGrid = (vector3) => {
    return [
      Math.floor(vector3.x * modelArray.gridDivison),
      Math.floor(vector3.z * modelArray.gridDivison),
    ];
  };

  const gridToVector3 = (gridPosition, width = 1, height = 1) => {
    return new THREE.Vector3(
      width / modelArray.gridDivison / 2 +
        gridPosition[0] / modelArray.gridDivison,
      0,
      height / modelArray.gridDivison / 2 +
        gridPosition[1] / modelArray.gridDivison
    );
  };

  return {
    vector3ToGrid,
    gridToVector3,
  };
};
