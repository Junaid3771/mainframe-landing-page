import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export type SceneOptions = {
  shape: string
  finish: string
  spread: number
  playing: boolean
  motion: boolean
}
export function mountScene(canvas: HTMLCanvasElement, initial: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.5
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
  camera.position.set(0, 0, 8.5)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const environment = pmrem.fromScene(room, 0.04)
  scene.environment = environment.texture
  room.dispose()
  pmrem.dispose()
  scene.add(new THREE.HemisphereLight(0xffffff, 0x530018, 2))
  const key = new THREE.DirectionalLight(0xffffff, 5)
  key.position.set(3, 4, 5)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xff2140, 7)
  rim.position.set(-5, 1, -2)
  scene.add(rim)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xb90625,
    metalness: 0.85,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  })
  const silver = new THREE.MeshPhysicalMaterial({
    color: 0xe6dce1,
    metalness: 1,
    roughness: 0.15,
  })
  const forms = [
    new THREE.TorusKnotGeometry(1.08, 0.36, 160, 24, 2, 3),
    new THREE.TorusGeometry(1.3, 0.4, 32, 96),
    new THREE.IcosahedronGeometry(1.55, 1),
  ]
  const group = new THREE.Group()
  const core = new THREE.Mesh(forms[0], material)
  const satelliteGeometry = new THREE.SphereGeometry(0.15, 20, 12)
  const satellites = new THREE.InstancedMesh(satelliteGeometry, silver, 24)
  satellites.frustumCulled = false
  group.add(core, satellites)
  scene.add(group)
  const dummy = new THREE.Object3D()
  let options = initial
  let yaw = -0.35,
    pitch = 0.2,
    targetYaw = -0.35,
    targetPitch = 0.2,
    time = 0,
    last = 0
  let frame = 0,
    visible = false,
    disposed = false,
    dragging = false,
    px = 0,
    py = 0
  const draw = (stamp = performance.now()) => {
    frame = 0
    if (disposed || !visible || document.hidden) return
    const dt = Math.min((stamp - (last || stamp)) / 1000, 0.035)
    last = stamp
    const running = options.motion && options.playing
    if (running) time += dt
    if (running && !dragging) targetYaw += dt * 0.12
    yaw += (targetYaw - yaw) * (options.motion ? 0.12 : 1)
    pitch += (targetPitch - pitch) * (options.motion ? 0.12 : 1)
    group.rotation.set(pitch, yaw, 0.1)
    core.position.y = running ? Math.sin(time * 0.75) * 0.08 : 0
    const radius = 2.05 + (options.spread / 100) * 1.05
    for (let i = 0; i < 24; i++) {
      const theta = (i / 24) * Math.PI * 2
      dummy.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * 0.74,
        Math.sin(theta * 3 + time * 0.3) * 0.45,
      )
      dummy.scale.setScalar(i % 3 === 0 ? 1.2 : 0.55)
      dummy.updateMatrix()
      satellites.setMatrixAt(i, dummy.matrix)
    }
    satellites.instanceMatrix.needsUpdate = true
    core.scale.setScalar(1 - (options.spread / 100) * 0.16)
    renderer.render(scene, camera)
    if (
      running ||
      Math.abs(targetYaw - yaw) > 0.001 ||
      Math.abs(targetPitch - pitch) > 0.001
    )
      frame = requestAnimationFrame(draw)
  }
  const wake = () => {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(draw)
  }
  const resize = () => {
    const w = canvas.clientWidth,
      h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.position.z = w < 500 ? 11 : 8.5
    camera.updateProjectionMatrix()
    wake()
  }
  const down = (e: PointerEvent) => {
    dragging = true
    px = e.clientX
    py = e.clientY
    canvas.setPointerCapture(e.pointerId)
  }
  const move = (e: PointerEvent) => {
    if (!dragging) return
    targetYaw += (e.clientX - px) * 0.008
    targetPitch = Math.max(
      -1.2,
      Math.min(1.2, targetPitch + (e.clientY - py) * 0.005),
    )
    px = e.clientX
    py = e.clientY
    wake()
  }
  const up = () => {
    dragging = false
  }
  const visibility = () => {
    last = 0
    if (document.hidden) {
      cancelAnimationFrame(frame)
      frame = 0
    } else wake()
  }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', move)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', up)
  document.addEventListener('visibilitychange', visibility)
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      last = 0
      if (visible) wake()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    },
    { rootMargin: '80px' },
  )
  io.observe(canvas)
  const update = (next: SceneOptions) => {
    options = next
    core.geometry =
      forms[next.shape === 'Loop' ? 1 : next.shape === 'Facet' ? 2 : 0]
    material.color.set(
      next.finish === 'Chrome'
        ? 0xe6dce1
        : next.finish === 'Obsidian'
          ? 0x19151b
          : 0xb90625,
    )
    material.roughness = next.finish === 'Obsidian' ? 0.3 : 0.19
    last = 0
    wake()
  }
  update(initial)
  resize()
  return {
    update,
    turn: (amount: number) => {
      targetYaw += amount
      wake()
    },
    reset: () => {
      targetYaw = -0.35
      targetPitch = 0.2
      time = 0
      wake()
    },
    dispose: () => {
      disposed = true
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      forms.forEach((g) => g.dispose())
      satelliteGeometry.dispose()
      material.dispose()
      silver.dispose()
      satellites.dispose()
      environment.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
