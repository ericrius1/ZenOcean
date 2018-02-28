camera.position.set( 0, 0, -1 );
//camera.lookAt( new THREE.Vector3(0,0,0) );

var createGeometryTexture = function(geometry, size){
  var data = new Float32Array( size * size * 3 );
  var verticesLength = geometry.vertices.length;
  for (var i = 0; i < size * size; i ++) {
    if(verticesLength > i){
      data[ i * 3 ]     = geometry.vertices[i].x;
      data[ i * 3 + 1 ] = geometry.vertices[i].y;
      data[ i * 3 + 2 ] = geometry.vertices[i].z;
    } else {
      data[ i * 3 ] = data[ i * 3 + 1 ] = data[ i * 3 + 2 ] = 0.0;
    }
  }
  var dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBFormat, THREE.FloatType);
  dataTexture.needsUpdate = true;
  return dataTexture;
};

var size = 1024;
var horizontalPlane = {vertices: []};
for(var i = 0; i < size*size; i++){
  horizontalPlane.vertices.push({
    x: (((i%size)/size)-0.5)*1.2,
    y: -i/1000000,
    z: (((i/size)/size)-0.5)*.12
  });
};

var geometryTexturePlane = createGeometryTexture(horizontalPlane, size);

// Create the particles
var position = new THREE.Vector3(1,1,0);
var particleOptions = {
  textureSize: 1024,
  targetTexture: geometryTexturePlane,
  explodeRate: 0.01,
  pointSize: 1,
  //targetPosition: position,
  colorFunctionString: 'color = vec4(0.0, 0.0, 0.0, 1.0);'
};
var particles = new Particles(renderer, scene, particleOptions);

// Show a sphere to visualize the center of gravity
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.02, 10, 10),
  new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true})
);
sphere.position.set(position.x, position.y, position.z);
//scene.add(sphere);


// Update the particles for each frame
(function updateParticles() {
  particles.update();
  window.requestAnimationFrame(updateParticles);
})();



function get3DUnderTheMousePosition(event) {
  var vector = new THREE.Vector3();

  vector.set(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );

  vector.unproject( camera );

  var dir = vector.sub( camera.position ).normalize();

  var distance = - camera.position.z / dir.z;

  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
  return pos;
}

document.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove(event) {
  var mouse3DPosition = get3DUnderTheMousePosition(event);
  sphere.position.copy(mouse3DPosition); 
  particles.updateTargetPosition(mouse3DPosition);

}
