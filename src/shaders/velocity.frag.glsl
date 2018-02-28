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


  vec3 attractorForce= attractorPos - inPosition;
  vec3 returnForce = returnPos - inPosition;

  vec3 finalForce = attractorForce + returnForce;


   outVelocity = inVelocity + finalForce * 0.001;

  gl_FragColor = vec4( outVelocity, 1.0 );
}
