import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

/* ── Knight silhouette (side profile, facing right) ── */
function buildKnightShape(): THREE.Shape {
  const s = new THREE.Shape()
  // Base / pedestal
  s.moveTo(-3.2, 0)
  s.lineTo(3.2, 0)
  s.lineTo(3.2, 0.9)
  s.lineTo(2.6, 0.9)
  // Right body
  s.bezierCurveTo(2.2, 1.1, 1.6, 2.0, 1.3, 3.0)
  s.bezierCurveTo(1.0, 3.8, 1.7, 4.5, 2.3, 5.3)
  // Chest / neck thrust forward
  s.bezierCurveTo(2.9, 6.1, 3.3, 6.8, 3.0, 7.4)
  // Muzzle
  s.bezierCurveTo(2.7, 8.0, 1.7, 8.2, 0.9, 7.9)
  // Under chin curving up-left toward ear
  s.bezierCurveTo(0.0, 7.6, -0.3, 8.3, -0.4, 9.0)
  // Top of head / ear
  s.bezierCurveTo(-0.6, 9.8, -1.8, 10.1, -2.3, 9.5)
  // Mane down left
  s.bezierCurveTo(-2.8, 8.8, -2.3, 7.6, -2.1, 6.8)
  s.bezierCurveTo(-1.9, 6.0, -2.5, 5.1, -2.6, 4.0)
  s.bezierCurveTo(-2.7, 3.0, -3.1, 2.0, -2.9, 0.9)
  s.lineTo(-3.2, 0.9)
  s.lineTo(-3.2, 0)
  return s
}

/* ── Split geometry into N glass fragments ── */
interface Frag {
  mesh: THREE.Mesh
  dir: THREE.Vector3
  rotV: THREE.Euler
}

function buildFragments(geo: THREE.BufferGeometry, mat: THREE.MeshPhysicalMaterial, n = 22): Frag[] {
  const pos = geo.attributes.position
  const totalTris = pos.count / 3
  const trisPerFrag = Math.ceil(totalTris / n)
  const frags: Frag[] = []

  for (let i = 0; i < n; i++) {
    const start = i * trisPerFrag
    const end = Math.min(start + trisPerFrag, totalTris)
    const tc = end - start
    if (tc <= 0) continue

    const verts = new Float32Array(tc * 9)
    const centroid = new THREE.Vector3()

    for (let t = 0; t < tc; t++) {
      for (let v = 0; v < 3; v++) {
        const idx = (start + t) * 3 + v
        const x = pos.getX(idx), y = pos.getY(idx), z = pos.getZ(idx)
        verts[t * 9 + v * 3] = x
        verts[t * 9 + v * 3 + 1] = y
        verts[t * 9 + v * 3 + 2] = z
        centroid.x += x; centroid.y += y; centroid.z += z
      }
    }
    centroid.divideScalar(tc * 3)

    const fg = new THREE.BufferGeometry()
    fg.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    fg.computeVertexNormals()

    const fm = mat.clone() as THREE.MeshPhysicalMaterial
    fm.transparent = true
    fm.opacity = 1

    const dir = centroid.clone()
    if (dir.length() < 0.01) dir.set(Math.random() - .5, Math.random() - .5, Math.random() - .5)
    dir.normalize()

    frags.push({
      mesh: new THREE.Mesh(fg, fm),
      dir,
      rotV: new THREE.Euler(
        (Math.random() - .5) * .12,
        (Math.random() - .5) * .12,
        (Math.random() - .5) * .08,
      ),
    })
  }
  return frags
}

/* ── Component ── */
export default function ChessKnight3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    el.appendChild(renderer.domElement)

    /* Scene + Camera */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 200)
    camera.position.set(0, 5, 26)
    camera.lookAt(0, 5, 0)

    /* Environment — needed for glass transmission */
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 4)
    sun.position.set(6, 18, 12)
    scene.add(sun)
    const orange = new THREE.PointLight(0xfc4612, 8, 50)
    orange.position.set(-7, 10, 10)
    scene.add(orange)
    const rim = new THREE.PointLight(0x6699ff, 4, 50)
    rim.position.set(8, 2, -6)
    scene.add(rim)

    /* Knight mesh */
    const shape = buildKnightShape()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 2.8,
      bevelEnabled: true,
      bevelThickness: 0.18,
      bevelSize: 0.18,
      bevelSegments: 5,
    })
    geo.center()

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.03,
      transmission: 0.96,
      thickness: 4.0,
      ior: 1.58,
      transparent: true,
      side: THREE.DoubleSide,
      envMapIntensity: 2,
    })

    const knight = new THREE.Mesh(geo, mat)
    scene.add(knight)

    /* Fragments */
    const frags = buildFragments(geo, mat)
    frags.forEach(f => { scene.add(f.mesh); f.mesh.visible = false })

    /* Scroll progress */
    let progress = 0
    const section = el.closest('section') as HTMLElement | null
    const onScroll = () => {
      if (!section) return
      const rect = section.getBoundingClientRect()
      progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (section.offsetHeight + window.innerHeight)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    /* Animation loop */
    const EXPLODE_AT = 0.65
    let raf: number

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = Date.now() * 0.001

      if (progress < EXPLODE_AT) {
        const p = progress / EXPLODE_AT
        knight.visible = true
        frags.forEach(f => { f.mesh.visible = false })
        knight.rotation.y = p * Math.PI * 2.5
        knight.rotation.x = Math.sin(p * Math.PI) * 0.3
        // Idle gentle sway when near top
        if (progress < 0.05) knight.rotation.y += Math.sin(t * 0.7) * 0.004
      } else {
        const p = Math.min(1, (progress - EXPLODE_AT) / (1 - EXPLODE_AT))
        knight.visible = false
        frags.forEach(f => {
          f.mesh.visible = true
          f.mesh.position.copy(f.dir).multiplyScalar(p * 14)
          f.mesh.rotation.x += f.rotV.x
          f.mesh.rotation.y += f.rotV.y
          f.mesh.rotation.z += f.rotV.z
          ;(f.mesh.material as THREE.MeshPhysicalMaterial).opacity = Math.max(0, 1 - p * 1.5)
        })
      }

      renderer.render(scene, camera)
    }
    tick()

    /* Resize */
    const onResize = () => {
      const W2 = el.clientWidth, H2 = el.clientHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
