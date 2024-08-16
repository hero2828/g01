import { DoubleSide, NearestFilter, PlaneGeometry, RepeatWrapping } from 'three'
import './scss/index.scss'

const base = 'https://threejs.org/manual/examples'

const renderer = new WebGLRenderer({ antialias: true })
document.body.appendChild(renderer.domElement)
const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000)
camera.position.set(0, 10, 20)

renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('app')?.appendChild(renderer.domElement)
const control = new OrbitControls(camera, renderer.domElement)
control.target.set(0, 5, 0)
control.update()

const scene = new Scene()
scene.background = new Color('black')

const planeSize = 40
const loader = new TextureLoader()
const texture = loader.load(`${base}/resources/models/windmill/windmill_001_base_COL.jpg`)
texture.colorSpace = SRGBColorSpace
texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.magFilter = NearestFilter
const repeats = planeSize / 2
texture.repeat.set(repeats, repeats)

const planeGeo = new PlaneGeometry(planeSize, planeSize)
const planeMat = new MeshPhongMaterial({
  map: texture,
  side: DoubleSide,
})
const mesh = new Mesh(planeGeo, planeMat)
mesh.rotation.x = Math.PI * -0.5
scene.add(mesh)

const objLoader = new OBJLoader()
objLoader.load(`${base}/resources/models/windmill/windmill.obj`, (root) => {
  scene.add(root)
})
const color = 0xFFFFFF
const intensity = 2.5
const light = new DirectionalLight(color, intensity)
light.position.set(0, 10, 0)
light.target.position.set(-5, 0, 0)
scene.add(light)
scene.add(light.target)

function render() {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
