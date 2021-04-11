import {helloWorld} from './hello-world.js'
import io from "./_snowpack/pkg/socket.io-client.js"
import * as THREE from './_snowpack/pkg/three.js';
import { GLTFLoader } from './_snowpack/pkg/three/examples/jsm/loaders/GLTFLoader.js';

const socket = io()
let rotation = 0.0

helloWorld()

socket.on("rotation", function (data) {
  if (data) {
    rotation = data;
  } else {
    console.log("error!");
  }
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();
const loader = new GLTFLoader();

let model

loader.load( 'models/Duck.gltf', function ( gltf ) {

    model = gltf.scene
    model.position.y = -0.5
	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
//scene.add(mesh)


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
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
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
     //mesh.rotation.y = rotation
     if (model) model.rotation.y = rotation * 10
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()