import {helloWorld} from './hello-world.js'
import confetti from 'canvas-confetti'
import io from "socket.io-client"
import * as THREE from 'three';

const socket = io()

helloWorld()

confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
 })({ particleCount: 200, spread: 200 })
 

socket.on("currentcolor", function (data) {
    if (data) {
      let redVal = Math.floor(map_range(parseInt(data),0,1023,0,255))
      document.body.style.backgroundColor =  `rgb(${redVal},0,0)`
      console.log("background color to: "+ redVal +", 0, 0");
    } else {
      console.log("error!");
    }
})

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    console.log('double click')
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl')
})

renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
 const tick = () =>
 {
    //console.log('tick')
     // Update objects
     mesh.rotation.y += 0.01
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()