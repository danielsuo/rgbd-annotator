// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container'));

import THREE from 'three';
import Viewer from './potree/Viewer';

import PLYLoader from './three/loaders/PLYLoader';
import TransformControls from './three/controls/TransformControls';

var sceneProperties = {
  path: './data/resources/pointclouds/frame-000000/cloud.js',
  cameraPosition: null,     // other options: cameraPosition: [10,10,10],
  cameraTarget: null,     // other options: cameraTarget: [0,0,0],
  fov: 60,          // field of view in degrees,
  sizeType: "Adaptive", // other options: "Fixed", "Attenuated"
  quality: null,      // other options: "Circles", "Interpolation", "Splats"
  material: "RGB",    // other options: "Height", "Intensity", "Classification"
  pointLimit: 1,        // max number of points in millions
  pointSize: 1,       // 
  navigation: "Orbit",    // other options: "Orbit", "Flight"
  useEDL: false,        
};

var onPointCloudLoaded = function(event){
  // do stuff here that should be executed once the point cloud has been loaded.
  // event.pointcloud returns the point cloud object
  
};

var viewer = new Viewer(document.getElementById("container"), sceneProperties, {
  "onPointCloudLoaded": onPointCloudLoaded
});

var loader = new PLYLoader();
var model;
// resetControls(viewer, 'object');

loader.load('./test/data/glue.ply', function(geometry) {
  // var texture = new THREE.TextureLoader().load('./img/checkerboard.jpg');
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(4, 4);
  // var material = new THREE.MeshBasicMaterial({
  //   map: texture,
  //   // emissive: new THREE.Color(1, 1, 1),
  //   // transparent: true,
  //   // opacity: 1.0
  // });
  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

  model = new THREE.Mesh(geometry, material);
  // var ball = new ArcBallHelper(geometry);
  // model.add(ball);
  viewer.scene.add(model);

  // if (!test) {
  //   resetControls('object');
  configControls(viewer);
  viewer.controls.attach(model);
  // }
  
  // viewer.renderer.render();
  // console.log(viewer.controls);
});

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
viewer.scene.add( light );

light = new THREE.DirectionalLight( 0x002288 );
light.position.set( -1, -1, -1 );
viewer.scene.add( light );

light = new THREE.AmbientLight( 0x222222 );
viewer.scene.add( light );

function configControls(viewer) {

  // if (mode === 'camera') {
  //   viewer.controls = new TrackballControls( viewer.camera );
  // } else if (mode === 'object') {
  //   viewer.controls = new TransformControls(viewer.camera, viewer.renderer.domElement);
  // viewer.scene.add(viewer.controls);

  window.addEventListener( 'keydown', function ( event ) {

    switch ( event.keyCode ) {

      case 81: // Q
        viewer.controls.setSpace( viewer.controls.space === "local" ? "world" : "local" );
        break;

      case 17: // Ctrl
        viewer.controls.setTranslationSnap( 100 );
        viewer.controls.setRotationSnap( THREE.Math.degToRad( 15 ) );
        break;

      case 87: // W
        viewer.controls.setMode( "translate" );
        break;

      case 69: // E
        viewer.controls.setMode( "rotate" );
        break;

      case 82: // R
        viewer.controls.setMode( "scale" );
        break;

      case 65: // 
        viewer.controls.reset();
        break;

      case 187:
      case 107: // +, =, num+
        viewer.controls.setSize( viewer.controls.size + 0.1 );
        break;

      case 189:
      case 109: // -, _, num-
        viewer.controls.setSize( Math.max( viewer.controls.size - 0.1, 0.1 ) );
        break;

    }

  });

  window.addEventListener( 'keyup', function ( event ) {

    switch ( event.keyCode ) {

      case 17: // Ctrl
        viewer.controls.setTranslationSnap( null );
        viewer.controls.setRotationSnap( null );
        break;

    }

  });
  viewer.controls.rotateSpeed = 5.0;
  viewer.controls.rotateSpeed = 5.0;
  viewer.controls.panSpeed = 0.8;

  viewer.controls.staticMoving = true;
  viewer.controls.dynamicDampingFactor = 0.3;
  viewer.controls.addEventListener( 'change', viewer.render );
}
/*
function onWindowResize() {

  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( container.offsetWidth, container.offsetHeight );

  controls.handleResize();

  render();

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();

}

function render() {

  renderer.render( scene, camera );
  stats.update();

}

*/

/*
import Detector from './three/utils/Detector';
import TrackballControls from './three/controls/TrackballControls';

import RGBDLoader from './three/loaders/RGBDLoader';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container = document.getElementById( 'container' );
var stats;

var camera, controls, scene, renderer, light;

var model;

var cross;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 60, container.offsetWidth / container.offsetHeight, 0.01, 1000 );
  camera.position.x = 0.5;
  camera.position.y = 0.5;
  camera.position.z = 0.5;

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.up.set(0, 0, 1);

  var test = true;
  test = false;

  if (test) resetControls('camera');

  // world

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  var loader = new PLYLoader();

  loader.load('./test/data/glue.ply', function(geometry) {
  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

    model = new THREE.Mesh(geometry, material);
    // var ball = new ArcBallHelper(geometry);
    // model.add(ball);
    scene.add(model);

    if (!test) {
      resetControls('object');
      controls.attach(model);
    }
    
    render();
  });

  var axisHelper = new THREE.AxisHelper( 5 );
  scene.add( axisHelper );

  // lights

  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( scene.fog.color );
  renderer.setSize( container.offsetWidth, container.offsetHeight );

  container.appendChild( renderer.domElement );

  stats = new Stats();
  container.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );

  render();

  var rgbd = new RGBDLoader();
  rgbd.load(0, 'test/data', function(points) {
    console.log(points);
    // scene.add(points);
  });
}
*/