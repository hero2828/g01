import './scss/index.scss'
import { OScene } from './model/abc'
import starUrl from '@/assets/star.png?url'

const scene = new OScene()
scene.background = new Color(0x040014)

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)
camera.position.set(100, 100, 100)
camera.lookAt(scene.position)

const sphereGeometry = new IcosahedronGeometry(20, 1)
const sphereMaterial = new MeshPhysicalMaterial({
  color: 0xFFFFFF * Math.random(),
  metalness: 1,
})
const sphere = new Mesh(sphereGeometry, sphereMaterial)

const RingInsideGeometry = new RingGeometry(37, 28, 30, 30)
function RingMaterial(opacity: number) {
  return new MeshPhongMaterial({
    color: 0xFFFFFF,
    emissive: 0x000000,
    specular: 0xFFFFFF,
    shininess: 100,
    flatShading: true,
    transparent: true,
    opacity,
  })
}
const ringInside = new Mesh(RingInsideGeometry, RingMaterial(0.9))
const RingOutsideGeometry = new RingGeometry(42, 38, 30, 30)
const ringOutside = new Mesh(RingOutsideGeometry, RingMaterial(0.65))
const ringGroup = new Group()
ringGroup.rotation.x = MathUtils.degToRad(90)
ringGroup.add(ringInside, ringOutside)
const planet = new Group()
planet.add(sphere, ringGroup)
planet.rotation.x = MathUtils.degToRad(-30)
planet.rotation.y = MathUtils.degToRad(-10)
scene.add(planet)

const geometry = new BufferGeometry()
const particleAmount = 2000
const vertices = [...Array(particleAmount * 3)].map(() => 2000 * Math.random() - 1000)
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
const particleTexture = new TextureLoader().load(starUrl)
const material = new PointsMaterial({ size: 5, sizeAttenuation: true, map: particleTexture, transparent: true, alphaTest: 0.5, color: 0xF3F3AF })
const particles = new Points(geometry, material)
scene.add(particles)

const ambientLight = new AmbientLight(0xFFFFFF)
const pointLight = new PointLight(0xFFFFFF, 1200, 0)
pointLight.position.set(0, 30, 0)
const spotLight = new SpotLight(0xFFFFFF, 3, 150, Math.PI / 15, 1, 1)
spotLight.position.set(50, 100, -80)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 10
spotLight.shadow.camera.far = 200
spotLight.shadow.focus = 1
scene.add(ambientLight, pointLight, spotLight)

const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('app')?.appendChild(renderer.domElement)
const control = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  planet.rotation.y += 0.005
  ringGroup.rotation.z += 0.01
  renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
