import THREE from 'three';

var ArcBallHelper = function(geometry) {
  THREE.Object3D.call( this );

  this.type = 'ArcBallHelper';

  var x_min = Number.MAX_VALUE;
  var y_min = Number.MAX_VALUE;
  var z_min = Number.MAX_VALUE;
  var x_max = -Number.MAX_VALUE;
  var y_max = -Number.MAX_VALUE;
  var z_max = -Number.MAX_VALUE;
  
  for (var i = 0; i < geometry.vertices.length; i++) {
    var vertex = geometry.vertices[i];

    if (vertex.x > x_max) x_max = vertex.x;
    else if (vertex.x < x_min) x_min = vertex.x;

    if (vertex.y > y_max) y_max = vertex.y;
    else if (vertex.y < y_min) y_min = vertex.y;

    if (vertex.z > z_max) z_max = vertex.z;
    else if (vertex.z < z_min) z_min = vertex.z;
  }

  var radius = Math.max(x_max - x_min, y_max - y_min, z_max - z_min) / 2;

  var x_geo = new THREE.CircleGeometry(radius, 64);
  var x_mat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  var x_arc = new THREE.Line(x_geo, x_mat);
  x_arc.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);


  var y_geo = new THREE.CircleGeometry(radius, 64);
  var y_mat = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
  var y_arc = new THREE.Line(y_geo, y_mat);
  y_arc.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  
  var z_geo = new THREE.CircleGeometry(radius, 64);
  var z_mat = new THREE.LineBasicMaterial( {color: 0x0000ff} );
  var z_arc = new THREE.Line(z_geo, z_mat);

  this.add(x_arc);
  this.add(y_arc);
  this.add(z_arc);
};

ArcBallHelper.prototype = Object.create( THREE.Object3D.prototype );
ArcBallHelper.prototype.constructor = ArcBallHelper;

export default ArcBallHelper;