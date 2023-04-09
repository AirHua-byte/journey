<template>
  <div class="three">
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { noise3D } from 'simplex-noise';

/* eslint-disable */
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      sphereBg: null,
      nucleus: null,
      stars: null,
      controls: null,
      container: null,
      timeout_Debounce: null,
      noise: null,
      cameraSpeed: 0,
      blobScale: 3,
    };
  },
  created() {},
  mounted() {
    this.container = this.$refs.container;
    // eslint-disable-next-line no-undef
    this.noise = new SimplexNoise();
    window.addEventListener('resize', () => {
      clearTimeout(this.timeout_Debounce);
      this.timeout_Debounce = setTimeout(this.onWindowResize, 80);
    });
    this.init();
    setTimeout(() => {
      this.animate();
    });
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      this.camera.position.set(0, 0, 230);

      const directionalLight = new THREE.DirectionalLight('#fff', 2);
      directionalLight.position.set(0, 50, -20);
      this.scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight('#ffffff', 1);
      ambientLight.position.set(0, 20, 20);
      this.scene.add(ambientLight);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);

      // OrbitControl
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 4;
      this.controls.maxDistance = 350;
      this.controls.minDistance = 150;
      this.controls.enablePan = false;
      this.controls.enableZoom = false;

      const loader = new THREE.TextureLoader();
      const textureSphereBg = loader.load(
        'https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg'
      );
      const texturenucleus = loader.load(
        'https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg'
      );
      const textureStar = loader.load('https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png');
      const texture1 = loader.load('https://i.ibb.co/F8by6wW/p2-b3gnym.png');
      const texture2 = loader.load('https://i.ibb.co/yYS2yx5/p3-ttfn70.png');
      const texture4 = loader.load('https://i.ibb.co/yWfKkHh/p4-avirap.png');

      /*  Nucleus  */
      texturenucleus.anisotropy = 16;
      const icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
      const lambertMaterial = new THREE.MeshPhongMaterial({
        map: texturenucleus,
      });
      this.nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      this.scene.add(this.nucleus);

      /*    Sphere  Background   */
      textureSphereBg.anisotropy = 16;
      const geometrySphereBg = new THREE.SphereBufferGeometry(150, 40, 40);
      const materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
      });
      this.sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
      this.sphereBg.scale = 0.5;
      this.scene.add(this.sphereBg);

      /*    Moving Stars   */
      const starsGeometry = new THREE.Geometry();

      for (let i = 0; i < 50; i++) {
        const particleStar = randomPointSphere(150);

        particleStar.velocity = THREE.MathUtils.randInt(50, 200);

        particleStar.startX = particleStar.x;
        particleStar.startY = particleStar.y;
        particleStar.startZ = particleStar.z;

        starsGeometry.vertices.push(particleStar);
      }
      const starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: '#ffffff',
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: THREE.AdditiveBlending,
      });
      starsMaterial.depthWrite = false;
      this.stars = new THREE.Points(starsGeometry, starsMaterial);
      this.scene.add(this.stars);

      /*    Fixed Stars   */
      function createStars(texture, size, total) {
        const pointGeometry = new THREE.Geometry();
        const pointMaterial = new THREE.PointsMaterial({
          size,
          map: texture,
          blending: THREE.AdditiveBlending,
        });

        for (let i = 0; i < total; i++) {
          const radius = THREE.MathUtils.randInt(149, 70);
          const particles = randomPointSphere(radius);
          pointGeometry.vertices.push(particles);
        }
        return new THREE.Points(pointGeometry, pointMaterial);
      }
      this.scene.add(createStars(texture1, 15, 20));
      this.scene.add(createStars(texture2, 5, 5));
      this.scene.add(createStars(texture4, 7, 5));

      function randomPointSphere(radius) {
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
        const dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
        const dz = 0 + radius * Math.cos(phi);
        return new THREE.Vector3(dx, dy, dz);
      }
    },
    animate() {
      // Stars  Animation
      this.stars.geometry.vertices.forEach(function (v) {
        v.x += (0 - v.x) / v.velocity;
        v.y += (0 - v.y) / v.velocity;
        v.z += (0 - v.z) / v.velocity;

        v.velocity -= 0.3;

        if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
          v.x = v.startX;
          v.y = v.startY;
          v.z = v.startZ;
          v.velocity = THREE.MathUtils.randInt(50, 300);
        }
      });
      const nucleus = this.nucleus;
      const noise = this.noise;

      // Nucleus Animation
      nucleus.geometry.vertices.forEach(function (v) {
        const time = Date.now();
        v.normalize();
        const distance =
          nucleus.geometry.parameters.radius +
          noise.noise3D(
            v.x + time * 0.0005,
            v.y + time * 0.0003,
            v.z + time * 0.0008
          ) *
            3;
        v.multiplyScalar(distance);
      });
      this.nucleus.geometry.verticesNeedUpdate = true;
      this.nucleus.geometry.normalsNeedUpdate = true;
      this.nucleus.geometry.computeVertexNormals();
      this.nucleus.geometry.computeFaceNormals();
      this.nucleus.rotation.y += 0.002;

      // Sphere Beckground Animation
      this.sphereBg.rotation.x += 0.002;
      this.sphereBg.rotation.y += 0.002;
      this.sphereBg.rotation.z += 0.002;

      this.controls.update();
      this.stars.geometry.verticesNeedUpdate = true;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    onWindowResize() {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.three {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
  }
}
</style>
