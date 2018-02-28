varying vec2 vUv;
uniform sampler2D velTex;
uniform sampler2D posTex;
uniform sampler2D targetTex;
uniform vec3 targetPosition;
uniform float gravityFactor;
uniform int useTargetTexture;

void main() {
  vec3 inVelocity = texture2D(velTex, vUv).rgb;
  vec3 inPosition = texture2D(posTex, vUv).rgb;
  vec3 attractorPos = targetPosition;
  vec3 returnPos;
  vec3 outVelocity;
  returnPos = texture2D(targetTex, vUv).rgb;


  float attractorDistance =  distance(attractorPos, inPosition);
  vec3 attractorDir = normalize(inPosition - attractorPos);

  vec3 attractorForce = ((1. - step(0.1, attractorDistance)) * attractorDir * attractorDistance);
  attractorForce.y = abs(attractorForce.y * 5.);

  float returnDistance = distance(returnPos, inPosition);
  vec3 returnDir= normalize(returnPos - inPosition);
  vec3 returnForce = returnDir * 100. *  pow(returnDistance, 2.);

  vec3 finalForce = attractorForce + returnForce;


   outVelocity =  finalForce * gravityFactor *  0.01;

  gl_FragColor = vec4( outVelocity, 1.0 );
}
