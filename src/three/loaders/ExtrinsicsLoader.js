import THREE from 'three';

var ExtrinsicsLoader = function(manager) {
  this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
  this.propertyNameMapping = {};
};

ExtrinsicsLoader.prototype = {
  constructor: ExtrinsicsLoader,

  load: function(url, onLoad) {
    var scope = this;

    var loader = new THREE.XHRLoader(this.manager);
    loader.setResponseType('text');
    loader.load(url, function(text) {
      onLoad(scope.text2matrix(text));
    });
  },

  text2matrix: function(text) {
    var result = new THREE.Matrix4();

    var data = text.split('\n').map(function(row) {
        return row.split(' ').map(function(el) {
          return parseFloat(el);
        });
      });
    result.set(data[0][0], data[0][1], data[0][2], data[0][3],
               data[1][0], data[1][1], data[1][2], data[1][3],
               data[2][0], data[2][1], data[2][2], data[2][3],
               data[3][0], data[3][1], data[3][2], data[3][3]);

    return result;
  }
};

export default ExtrinsicsLoader;