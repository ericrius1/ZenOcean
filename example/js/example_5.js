camera.position.set( -6, 2, 10 );
camera.lookAt( new THREE.Vector3(0,0,0) );

// Create the particles
var position = new THREE.Vector3(1,1,0);
var particleOptions = {
  textureSize: 128,
  gravityFactor: 0.05,
  explodeRate: 0.01,
  pointSize: 1.2,
  targetPosition: position,
  colorFunctionString: 'color = vec4(0.0, 1.0-dist, 1.0-dist, 1.0);'
};
var particles = new Particles(renderer, scene, particleOptions);



// Show a sphere to visualize the center of gravity
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 10, 10),
  new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true})
);
sphere.position.set(position.x, position.y, position.z);
scene.add(sphere);

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
