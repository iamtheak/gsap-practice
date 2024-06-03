"use client"
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const radians = (degrees:number) => (degrees * Math.PI) / 180;

export default function Car({obj,id,className,scale = 2.5}:{obj:GLTF,id:string,className:string,scale?:number}) {
    let x = radians(90);

    return (
        <Canvas id={id} className={className}>

        <OrbitControls minZoom={10} maxZoom={50} enabled={true} />

        <PerspectiveCamera makeDefault position={[0, 1, 10]} />
            <mesh rotation={[0, 1, 0]}>
                <primitive object={obj.scene} scale={scale} />
                <meshStandardMaterial color="red" wireframe={true} />
                <ambientLight intensity={1.0} />
                <pointLight position={[10, 4, 5]} color="#fff" intensity={1000} />
                <pointLight position={[0, 10, 0]} color="purple" intensity={300} />
                <pointLight position={[-10, -19, 2]} color="#fff" intensity={2000} />
            </mesh>
            <mesh rotation={[-x, 0, 0]}>
                <planeGeometry args={[9, 9]} />
                <meshStandardMaterial color="white" />
            </mesh>

        </Canvas>
    );
}
