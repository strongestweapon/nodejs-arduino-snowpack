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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );