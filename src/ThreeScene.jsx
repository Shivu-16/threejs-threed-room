import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 30, 90);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    // Objects
    const addObject = (geometry, position) => {
      const objectMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const object = new THREE.Mesh(geometry, objectMaterial);
      object.position.set(position.x, position.y, position.z);
      scene.add(object);
    };

    // Commonly placed objects
    const objects = [
      { geometry: new THREE.BoxGeometry(2, 1, 2), position: { x: -15, y: 0.5, z: -10 } }, // Chair
      { geometry: new THREE.BoxGeometry(10, 1, 6), position: { x: 0, y: 0.5, z: -20 } }, // Table
      { geometry: new THREE.BoxGeometry(15, 1, 20), position: { x: 20, y: 0.5, z: 0 } }, // Bed
      { geometry: new THREE.BoxGeometry(1, 8, 1), position: { x: -20, y: 4, z: 10 } }, // Lamp
      { geometry: new THREE.BoxGeometry(5, 10, 1), position: { x: 25, y: 5, z: 20 } }, // Bookshelf
    ];

    objects.forEach((obj) => addObject(obj.geometry, obj.position));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;
