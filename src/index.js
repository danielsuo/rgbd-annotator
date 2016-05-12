import THREE from 'three';
import Viewer from './potree/Viewer';
import PLYLoader from './three/loaders/PLYLoader';
import ExtrinsicsLoader from './three/loaders/ExtrinsicsLoader';
import getURLParams from './utils/getURLParams';

var loader, model, light, axes, extrinsics;

var submit = document.getElementById('submit');
submit.onclick = function() {
  console.log('HERRO!');
};

// Load URL parameters
var params = getURLParams();
var label = params.label === undefined ? 'glue' : params.label;
var frame = params.frame === undefined ? 0 : params.frame;
frame = 'frame-' + String('000000' + frame).slice(-6);

var extrinsicsLoader = new ExtrinsicsLoader();

extrinsicsLoader.load('./test/data/' + frame + '.pose.txt', function(matrix) {
  // extrinsics = new THREE.Matrix4();
  // extrinsics.getInverse(matrix);
  extrinsics = matrix;
  console.log(extrinsics)
});

var viewer = new Viewer(document.getElementById("container"), 
  {
    path: './data/resources/pointclouds/' + frame + '/cloud.js',
    cameraPosition: null,     // other options: cameraPosition: [10,10,10],
    cameraTarget: null,     // other options: cameraTarget: [0,0,0],
    fov: 60,          // field of view in degrees,
    sizeType: "Adaptive", // other options: "Fixed", "Attenuated"
    quality: null,      // other options: "Circles", "Interpolation", "Splats"
    material: "RGB",    // other options: "Height", "Intensity", "Classification"
    pointLimit: 1,        // max number of points in millions
    pointSize: 1,       // 
    navigation: "Transform",    // other options: "Orbit", "Flight"
    useEDL: false,        
  }, {
  "onPointCloudLoaded": function(event) {}
  }
);

loader = new PLYLoader();

loader.load('./test/data/glue.ply', function(geometry) {
  // var position = new THREE.Vector3();
  // var lookAt = new THREE.Vector3();
  // var up = new THREE.Vector3();

  // position.copy(viewer.camera.position);
  // lookAt.copy(viewer.camera.getWorldDirection());
  // up.copy(viewer.camera.up);

  // var rotation = new THREE.Quaternion();
  // var position = new THREE.Vector3();

  // rotation.setFromRotationMatrix(extrinsics);
  // position.setFromMatrixPosition(extrinsics);
  // console.log(rotation, position);

  // viewer.camera.matrixWorldInverse.getInverse(extrinsics);
  // console.log(viewer.camera.matrixWorldInverse)
  // viewer.camera.updateMatrix();
  // viewer.camera.up.applyMatrix4(extrinsics);
  // lookAt.applyMatrix4(extrinsics);
  // viewer.camera.lookAt(lookAt);
  // viewer.camera.up = new THREE.Vector3(0, 0, 1);
  // viewer.camera.position.copy(new THREE.Vector3());
  // viewer.camera.quaternion.copy(new THREE.Quaternion());
  // viewer.camera.position.setFromMatrixPosition(extrinsics);
  // viewer.camera.quaternion.setFromRotationMatrix(extrinsics);

  // console.log(viewer.camera.position, viewer.camera.quaternion);
  
  

  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
  model = new THREE.Mesh(geometry, material);
  viewer.scene.add(model);

  configControls(viewer);
  viewer.controls.attach(model);

  axes = new THREE.AxisHelper(5);
  viewer.scene.add(axes);
});

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
viewer.scene.add( light );

light = new THREE.DirectionalLight( 0x002288 );
light.position.set( -1, -1, -1 );
viewer.scene.add( light );

light = new THREE.AmbientLight( 0x222222 );
viewer.scene.add( light );

var ICP = new THREE.Matrix4();

ICP.set(-0.30736157298088074,
        0.9514855742454529,
        -0.014286503195762634,
        0.040610045194625854,
        -0.9129675030708313,
        -0.29908642172813416,
        -0.27755674719810486,
        0.17960302531719208,
        -0.2683641314506531,
        -0.07226715236902237,
        0.9606029987335205,
        -0.009037109091877937,
        0,
        0,
        0,
        1);

function configControls(viewer) {
  window.addEventListener( 'keydown', function ( event ) {
    console.log(event.keyCode, 'pressed!');

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
      case 84: // T
        model.position.copy(viewer.controls.target);
        break;

      case 89: // Y
        model.position.setFromMatrixPosition(ICP);
        model.quaternion.setFromRotationMatrix(ICP);
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

      case 90: // Z
        console.log(model.matrix)
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

}