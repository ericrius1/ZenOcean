uniform sampler2D posTex;

uniform float pointSize;
uniform vec3 targetPosition;

varying float dist;
varying vec2 vUv;


float rand(float x){
  return fract(sin(x)*100000.);
}

void main() {
  vec3 pos = texture2D(posTex, position.xy).rgb;
  dist = distance(targetPosition, pos);
  gl_PointSize = pointSize + rand(position.x) * 2.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
