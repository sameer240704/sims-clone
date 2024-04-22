/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { SocketIoManager } from "./components/SocketIoManagaer";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<Loader />}>
        <SocketIoManager />
        <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <LandingPage />
        </Canvas>
      </Suspense>
      <Toaster position="top-center" richColors expand={false} />
    </div>
  );
}

export default App;
