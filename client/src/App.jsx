import { Canvas } from "@react-three/fiber";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { SocketIoManager } from "./components/SocketIoManagaer";

function App() {
  return (
    <>
      <SocketIoManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <LandingPage />
      </Canvas>
    </>
  );
}

export default App;
