import THREE from 'three';
import Viewer from './potree/Viewer';
import PLYLoader from './three/loaders/PLYLoader';
import getURLParams from './utils/getURLParams';

var loader, model, light, axes;

// Load URL parameters
var params = getURLParams();
var label = params.label === undefined ? 'glue' : params.label;
var frame = params.frame === undefined ? 0 : params.frame;
frame = 'frame-' + String('000000' + frame).slice(-6);

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
  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
  model = new THREE.Mesh(geometry, material);
  viewer.scene.add(model);

  configControls(viewer);
  viewer.controls.attach(model);

  // axes = new THREE.AxisHelper(5);
  // viewer.scene.add(axes);
});

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
viewer.scene.add( light );

light = new THREE.DirectionalLight( 0x002288 );
light.position.set( -1, -1, -1 );
viewer.scene.add( light );

light = new THREE.AmbientLight( 0x222222 );
viewer.scene.add( light );

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
        console.log(model)
        console.log(viewer.controls)
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