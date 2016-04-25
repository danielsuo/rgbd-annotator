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
import Stats from 'stats.js';

import Detector from './three/utils/Detector';
import TransformControls from './three/controls/TransformControls';
import TrackballControls from './three/controls/TrackballControls';
import PLYLoader from './three/loaders/PLYLoader';
import ArcBallHelper from './three/helpers/ArcBallHelper';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, controls, scene, renderer, light;

var model;

var cross;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
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
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  stats = new Stats();
  container.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );

  render();

}

function resetControls(mode) {

  if (mode === 'camera') {
    controls = new TrackballControls( camera );

    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.keys = [ 65, 83, 68 ];

  } else if (mode === 'object') {
    controls = new TransformControls(camera, renderer.domElement);
    scene.add(controls);

    window.addEventListener( 'keydown', function ( event ) {

      switch ( event.keyCode ) {

        case 81: // Q
          controls.setSpace( controls.space === "local" ? "world" : "local" );
          break;

        case 17: // Ctrl
          controls.setTranslationSnap( 100 );
          controls.setRotationSnap( THREE.Math.degToRad( 15 ) );
          break;

        case 87: // W
          controls.setMode( "translate" );
          break;

        case 69: // E
          controls.setMode( "rotate" );
          break;

        case 82: // R
          controls.setMode( "scale" );
          break;

        case 187:
        case 107: // +, =, num+
          controls.setSize( controls.size + 0.1 );
          break;

        case 189:
        case 109: // -, _, num-
          controls.setSize( Math.max( controls.size - 0.1, 0.1 ) );
          break;

      }

    });

    window.addEventListener( 'keyup', function ( event ) {

      switch ( event.keyCode ) {

        case 17: // Ctrl
          controls.setTranslationSnap( null );
          controls.setRotationSnap( null );
          break;

      }

    });
  }
  
  controls.rotateSpeed = 5.0;
  controls.panSpeed = 0.8;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.addEventListener( 'change', render );
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

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