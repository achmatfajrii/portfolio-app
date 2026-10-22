/* eslint-disable react/no-unknown-property */
// components/react-bits/Lanyard.tsx
'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { Canvas, extend, useFrame, useThree, type ThreeElement } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import type { RapierRigidBody, RigidBodyProps } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { useInView } from '@/hooks/use-in-view';
import './Lanyard.css';

const CARD_GLB = '/assets/lanyard/card.glb';
const LANYARD_TEXTURE = '/assets/lanyard/lanyard.webp';

// Modul ini baru dievaluasi saat chunk Lanyard di-load (setelah idle),
// jadi preload di sini tidak menambah beban initial load.
useGLTF.preload(CARD_GLB);
useTexture.preload(LANYARD_TEXTURE);

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

type Vec3 = [number, number, number];
type RigidBodyWithLerp = RapierRigidBody & { lerped?: THREE.Vector3 };
type CardMaterial = THREE.MeshStandardMaterial & { map: THREE.Texture };

const SEGMENT_PROPS: RigidBodyProps = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 4,
  linearDamping: 4,
};

interface LanyardProps {
  position?: Vec3;
  gravity?: Vec3;
  fov?: number;
  transparent?: boolean;
  lanyardImage?: string | null;
  lanyardWidth?: number;
  lookAt?: Vec3;
  /** Render hanya saat physics masih bergerak (hemat CPU/GPU saat kartu diam). */
  idleSleep?: boolean;
  /** Dipanggil sekali, setelah beberapa frame pertama ter-render. */
  onReady?: () => void;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  lanyardImage?: string | null;
  lanyardWidth?: number;
  idleSleep?: boolean;
}

export default function Lanyard({
  lookAt = [0, 0, 0],
  position = [2, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardImage = null,
  lanyardWidth = 1,
  idleSleep = true,
  onReady,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const { ref, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div ref={ref} className="lanyard-wrapper">
      <Canvas
        frameloop={!inView ? 'never' : idleSleep ? 'demand' : 'always'}
        camera={{ position, fov }}
        dpr={isMobile ? [0.75, 1] : [1, 1.5]}
        gl={{ alpha: transparent, antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            idleSleep={idleSleep}
          />
        </Physics>
        <Environment blur={0.75} resolution={isMobile ? 128 : 256}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
        <FrameSignals active={inView} onReady={onReady} />
      </Canvas>
    </div>
  );
}

/**
 * - Membangunkan render loop saat canvas kembali terlihat (mode 'demand').
 * - Memanggil onReady sekali setelah 3 frame pertama.
 */
function FrameSignals({ active, onReady }: { active: boolean; onReady?: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const frames = useRef(0);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  useFrame(() => {
    if (frames.current < 3 && ++frames.current === 3) onReady?.();
  });

  return null;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  lanyardImage = null,
  lanyardWidth = 1,
  idleSleep = true,
}: BandProps) {
  const band = useRef<THREE.Mesh>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const bodies = useMemo(() => [card, j1, j2, j3], []);

  // vektor scratch: dibuat sekali, bukan setiap render
  const [tmp] = useState(() => ({
    vec: new THREE.Vector3(),
    ang: new THREE.Vector3(),
    rot: new THREE.Vector3(),
    dir: new THREE.Vector3(),
  }));

  const { nodes, materials } = useGLTF(CARD_GLB);
  const bandTexture = useTexture(lanyardImage || LANYARD_TEXTURE);
  const cardMap = (materials.base as CardMaterial).map;

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = 'chordal';
    return c;
  });
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useLayoutEffect(() => {
    bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;
    bandTexture.needsUpdate = true;
  }, [bandTexture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.4]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.4]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.4]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const { vec, ang, rot, dir } = tmp;
    // setelah loop tidur, delta pertama bisa sangat besar → batasi agar tidak "meloncat"
    const dt = Math.min(delta, 0.05);

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      const follow = (ref: RefObject<RapierRigidBody>) => {
        const body = ref.current as RigidBodyWithLerp;
        if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, body.lerped.distanceTo(body.translation())));
        body.lerped.lerp(
          body.translation(),
          Math.min(1, dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed))),
        );
      };
      follow(j1);
      follow(j2);

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as RigidBodyWithLerp).lerped!);
      curve.points[2].copy((j1.current as RigidBodyWithLerp).lerped!);
      curve.points[3].copy(fixed.current.translation());
      (band.current.geometry as InstanceType<typeof MeshLineGeometry>).setPoints(
        curve.getPoints(isMobile ? 16 : 32),
      );
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }

    // mode 'demand': minta frame berikutnya hanya jika masih ada yang bergerak
    if (idleSleep) {
      const awake = Boolean(dragged) || bodies.some((b) => !b.current || !b.current.isSleeping());
      if (awake) state.invalidate();
    }
  });

  return (
    <>
      <group position={[-8, 6.2, 0]} scale={1.5}>
        <RigidBody ref={fixed} {...SEGMENT_PROPS} type="fixed" />

        <RigidBody position={[0.7, 0, 0]} ref={j1} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.4, 0, 0]} ref={j2} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[2.1, 0, 0]} ref={j3} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2.8, 0, 0]}
          ref={card}
          {...SEGMENT_PROPS}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.7, -0.04]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(tmp.vec.copy(card.current!.translation())));
            }}
          >
            <mesh geometry={(nodes.card as THREE.Mesh).geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={4}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={(nodes.clip as THREE.Mesh).geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={(nodes.clamp as THREE.Mesh).geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
