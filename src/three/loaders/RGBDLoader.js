import THREE from 'three';
import 'script!png-js/png';
import 'script!png-js/zlib'

var RGBDLoader = function(intrinsicMatrix, manager) {
  this.intrinsicMatrix = (intrinsicMatrix !== undefined) ? intrinsicMatrix : [[615.1951904296875, 0, 298.44268798828125], [0, 615.19525146484375, 247.51919555664062], [0, 0, 1]];
  this.fx = this.intrinsicMatrix[0][0];
  this.fy = this.intrinsicMatrix[1][1];
  this.x0 = this.intrinsicMatrix[0][2];
  this.y0 = this.intrinsicMatrix[1][2];

  this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

  this.propertyNameMapping = {};
};

RGBDLoader.prototype = {
  constructor: RGBDLoader,

  // Assumes the following naming scheme:
  // color: frame-000000.color.png
  // depth: frame-000000.depth.png
  // pose:  frame-000000.pose.txt
  load: function (frame, directory, onLoad, onProgress, onError) {
    var scope = this;
    var prefix = directory + '/frame-' + String('000000' + frame).slice(-6);
    var colorURL = prefix + '.color.png';
    var depthURL = prefix + '.depth.png';
    var poseURL = prefix + '.pose.txt';

    var canvas = document.getElementById('preview');

    PNG.load(depthURL, function(depthPNG) {
      scope.geometry = new THREE.Geometry();

      var depthPixels = depthPNG.decodePixels();
      var width = depthPNG.width;
      var height = depthPNG.height;

      // 1D array in row-major order
      for (var i = 0; i < depthPixels.length; i += 2) {
        var z = depthPixels[i] << 8 | depthPixels[i + 1];

        var vertexIndex = i / 2;

        // Row index
        var y = Math.floor(vertexIndex / width) + 1;

        // Column index
        var x = vertexIndex % width + 1;

        // Add new point from camera coordinates
        scope.geometry.vertices.push(
          new THREE.Vector3(
            (x - scope.x0) * z / scope.fx,
            (y - scope.y0) * z / scope.fy,
            z
            )
          );
      }

      PNG.load(colorURL, function(colorPNG) {
        var colorPixels = colorPNG.decodePixels();
        var colors = [];
        for (var i = 0; i < colorPixels.length; i += 3) {
          var r = colorPixels[i] / 255;
          var g = colorPixels[i + 1] / 255;
          var b = colorPixels[i + 2] / 255;

          colors.push(new THREE.Color(r, g, b));
        }

        scope.geometry.colors = colors;
        scope.material = new THREE.PointsMaterial({
          size: 10,
          transparent: true,
          opacity: 0.7,
          vertexColors: THREE.VertexColors
        });

        scope.points = new THREE.Points(scope.geometry, scope.material);

        console.log(scope)
        
        onLoad(scope.points);
      });
    });
  }

};

export default RGBDLoader;