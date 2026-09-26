/**
 * kinematic3d.js - dependency-free 3D renderer for the LSEAT kinematics viewer.
 *
 * Genuine 3D mathematics painted on a Canvas 2D surface. No WebGL, no
 * three.js, no CDN, no npm dependency of any kind.
 *
 * Systems implemented here:
 *   1. 4x4 row-major affine matrices (identity, multiply, TRS pose, look-at).
 *   2. Point / vector transforms and a 3-vector cross product.
 *   3. Convex polyhedra built as explicit vertex + face-index lists
 *      (boxes, optionally tapered towards the top face).
 *   4. Perspective projection with a focal length derived from the canvas width.
 *   5. Back-face culling from the world-space normal against the eye vector.
 *   6. Painter's algorithm: per-face centroid depth, back-to-front sort.
 *   7. 3-tone Lambert flat shading against a fixed world light direction.
 *   8. Turntable orbit camera with clamped pitch, clamped dolly, inertia.
 *   9. On-demand render loop: rAF only while dirty, tweening or spinning.
 *
 * Loaded exclusively through a dynamic import() from KinematicViewer3D.astro,
 * so it ships as its own chunk and never enters the initial page-load bundle.
 */

const DEG = Math.PI / 180;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/* ------------------------------------------------------------------ maths */

/** Row-major 4x4 identity. */
const identity = () => new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

/** Row-major 4x4 product: multiply(a, b) applies b first, then a. */
const multiply = (a, b) => {
  const o = new Float64Array(16);
  for (let r = 0; r < 4; r += 1) {
    const i = r * 4;
    for (let c = 0; c < 4; c += 1) {
      o[i + c] = a[i] * b[c] + a[i + 1] * b[4 + c] + a[i + 2] * b[8 + c] + a[i + 3] * b[12 + c];
    }
  }
  return o;
};

/** T * Rz * Rx - a translation composed with a roll and a pitch. */
const pose = (tx, ty, tz, rz, rx) => {
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return new Float64Array([
    cz, -sz * cx, sz * sx, tx,
    sz, cz * cx, -cz * sx, ty,
    0, sx, cx, tz,
    0, 0, 0, 1,
  ]);
};

/** Transform a point by a row-major 4x4 (w = 1, so the last row is ignored). */
const apply = (m, p) => [
  m[0] * p[0] + m[1] * p[1] + m[2] * p[2] + m[3],
  m[4] * p[0] + m[5] * p[1] + m[6] * p[2] + m[7],
  m[8] * p[0] + m[9] * p[1] + m[10] * p[2] + m[11],
];

const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

const normalise = (v) => {
  const n = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / n, v[1] / n, v[2] / n];
};

/** Right-handed look-at view matrix; the camera looks down -z in camera space. */
const lookAt = (eye, target) => {
  const back = normalise([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  let right = [back[2], 0, -back[0]];
  const rlen = Math.hypot(right[0], right[1], right[2]);
  right = rlen < 1e-6 ? [1, 0, 0] : [right[0] / rlen, right[1] / rlen, right[2] / rlen];
  const up = cross(back, right);
  return new Float64Array([
    right[0], right[1], right[2], -(right[0] * eye[0] + right[1] * eye[1] + right[2] * eye[2]),
    up[0], up[1], up[2], -(up[0] * eye[0] + up[1] * eye[1] + up[2] * eye[2]),
    back[0], back[1], back[2], -(back[0] * eye[0] + back[1] * eye[1] + back[2] * eye[2]),
    0, 0, 0, 1,
  ]);
};
/* --------------------------------------------------------------- geometry */

/** Outward-facing quad winding for a box indexed 0..7 (see box()). */
const FACES = [
  [4, 5, 6, 7],
  [1, 0, 3, 2],
  [5, 1, 2, 6],
  [0, 4, 7, 3],
  [3, 7, 6, 2],
  [0, 1, 5, 4],
];

/** Axis-aligned convex box, optionally tapered towards its +y face. */
const box = (w, h, d, taperX, taperZ) => {
  const x = w / 2;
  const y = h / 2;
  const z = d / 2;
  const v = [
    [-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z],
    [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z],
  ];
  const tx = taperX === undefined ? 1 : taperX;
  const tz = taperZ === undefined ? 1 : taperZ;
  for (let i = 0; i < 8; i += 1) {
    if (v[i][1] > 0) {
      v[i][0] *= tx;
      v[i][2] *= tz;
    }
  }
  return v;
};

/* ---------------------------------------------------------------- palette */

const BASE = {
  rail: '#33455a',
  frame: '#4d6d86',
  shell: '#1f2d3d',
  cushion: '#39597b',
  passenger: '#4a5a70',
  metal: '#5b6c7e',
  screen: '#0284c7',
};

const ramp = (hex, factors, lifts) => factors.map((k, i) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift) => Math.min(255, Math.round(((n >> shift) & 255) * k + lifts[i]));
  return 'rgb(' + ch(16) + ',' + ch(8) + ',' + ch(0) + ')';
});

/** Three pre-shaded tones per material: shadow, mid, lit. */
const TONE = {
  rail: ramp(BASE.rail, [0.44, 0.74, 1], [4, 10, 18]),
  frame: ramp(BASE.frame, [0.44, 0.74, 1], [4, 10, 18]),
  shell: ramp(BASE.shell, [0.44, 0.74, 1], [3, 8, 15]),
  cushion: ramp(BASE.cushion, [0.44, 0.74, 1], [4, 10, 18]),
  passenger: ramp(BASE.passenger, [0.44, 0.74, 1], [4, 10, 18]),
  metal: ramp(BASE.metal, [0.44, 0.74, 1], [5, 12, 22]),
  screen: ramp(BASE.screen, [0.42, 0.66, 0.92], [5, 10, 18]),
  screenLit: ramp(BASE.screen, [0.7, 1.1, 1.5], [10, 22, 36]),
};

/** Fixed world-space key light: upper, front and starboard. */
const LIGHT = normalise([0.42, 0.86, 0.34]);

/* ------------------------------------------------------------------ scene */

const HINGE = [0, 0.44, 0];
const MM = 0.0024;
const COUPLE = 0.16;
const REAR_ENVELOPE = -0.6;
const TARGET = [0.28, 0.58, 0];
const SWEEP_TIP = [-0.05, 0.57, 0];

const HOME = { yaw: 0.95, pitch: 0.22, dist: 3.0 };
const VIEWS = {
  perspective: HOME,
  front: { yaw: Math.PI / 2, pitch: 0.1, dist: 3.1 },
  side: { yaw: 0.04, pitch: 0.1, dist: 3.1 },
};
const PITCH_MIN = -10 * DEG;
const PITCH_MAX = 55 * DEG;
const DIST_MIN = 1.9;
const DIST_MAX = 5.2;
const TWEEN_MS = 600;
const CAM_MS = 320;

/**
 * Assemble the twin-frame economy seat for one kinematic state.
 * 20 convex solids, all placed by an affine matrix derived from the state.
 * @param {number} angleDeg backrest recline in degrees
 * @param {number} travelMm seat pan travel in millimetres, forward
 */
const buildScene = (angleDeg, travelMm) => {
  const dx = travelMm * MM;
  const lean = angleDeg * DEG;
  const pivot = pose(HINGE[0] + dx, HINGE[1], HINGE[2], 0, 0);
  const pan = multiply(pivot, pose(0, 0, 0, -lean * COUPLE, 0));
  const upper = multiply(pivot, pose(0, 0, 0, lean, 0));

  const parts = [];
  const add = (verts, tone, m, lit) => {
    parts.push({ verts, tone, m, lit: !!lit });
  };

  // floor rail, front composite frame, rear composite frame, return cam
  add(box(0.7, 0.05, 0.58, 0.9, 0.96), 'rail', pose(0.05, 0.025, 0, 0, 0));
  add(box(0.07, 0.4, 0.44, 0.9, 0.96), 'frame', pose(0.36, 0.23, 0, -0.34, 0));
  add(box(0.07, 0.42, 0.42, 0.9, 0.96), 'frame', pose(-0.18, 0.23, 0, -0.6, 0));
  add(box(0.42, 0.035, 0.12, 0.9, 1), 'metal', multiply(pivot, pose(0.12, -0.09, 0, -0.5, 0)));

  // seat pan
  add(box(0.54, 0.06, 0.5, 0.94, 0.98), 'shell', multiply(pan, pose(0.27, 0.02, 0, 0, 0)));
  add(box(0.5, 0.1, 0.46, 0.95, 0.96), 'cushion', multiply(pan, pose(0.27, 0.1, 0, 0, 0)));

  // backrest and headrest
  add(box(0.1, 0.56, 0.5, 0.86, 0.98), 'shell', multiply(upper, pose(0, 0.29, 0, 0, 0)));
  add(box(0.05, 0.5, 0.42, 0.9, 0.96), 'cushion', multiply(upper, pose(0.075, 0.3, 0, 0, 0)));
  add(box(0.15, 0.2, 0.34, 0.84, 0.74), 'cushion', multiply(upper, pose(0.01, 0.64, 0, 0, 0)));

  // armrests, both sides
  for (let s = -1; s <= 1; s += 2) {
    add(box(0.42, 0.06, 0.09, 0.9, 1), 'shell', multiply(pan, pose(0.1, 0.25, 0.28 * s, 0, 0)));
    add(box(0.07, 0.22, 0.07), 'metal', multiply(pan, pose(0.28, 0.14, 0.28 * s, 0, 0)));
  }

  // seat-back IFE screen on its pedestal
  add(box(0.05, 0.6, 0.05), 'rail', pose(0.9, 0.32, 0.05, 0, 0));
  add(box(0.05, 0.32, 0.44, 0.9, 0.96), 'shell', pose(0.92, 0.74, 0.05, 0, 0));
  add(box(0.03, 0.28, 0.4), 'screen', pose(0.884, 0.74, 0.05, 0, 0), true);

  // passenger silhouette: torso, head, thighs, shins, feet
  add(box(0.24, 0.48, 0.34, 0.78, 0.86), 'passenger', multiply(upper, pose(0.22, 0.34, 0, 0, 0)));
  add(box(0.19, 0.22, 0.2, 0.88, 0.82), 'passenger', multiply(upper, pose(0.24, 0.66, 0, 0, 0)));
  add(box(0.42, 0.16, 0.32, 0.9, 0.92), 'passenger', multiply(pan, pose(0.34, 0.21, 0, 0, 0)));
  add(box(0.15, 0.52, 0.16, 0.92, 0.94), 'passenger', multiply(pan, pose(0.55, -0.06, 0, 0.1, 0)));
  add(box(0.26, 0.07, 0.15, 0.8, 0.9), 'passenger', multiply(pan, pose(0.68, -0.385, 0, 0.1, 0)));

  return { parts, upper };
};

/* ------------------------------------------------------------------ ease */

/** Cubic-bezier(0.16, 1, 0.3, 1) solved by Newton-Raphson, as in the 2D simulator. */
const easeOut = (() => {
  const ax = 1 - 3 * 0.3 + 3 * 0.16;
  const bx = 3 * 0.3 - 6 * 0.16;
  const cx = 3 * 0.16;
  const ay = 1 - 3 * 1 + 3 * 1;
  const by = 3 * 1 - 6 * 1;
  const cy = 3 * 1;
  const curve = (t, a, b, c) => ((a * t + b) * t + c) * t;
  const slope = (t, a, b, c) => 3 * a * t * t + 2 * b * t + c;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const d = slope(t, ax, bx, cx);
      if (d === 0) break;
      t -= (curve(t, ax, bx, cx) - x) / d;
    }
    return curve(clamp(t, 0, 1), ay, by, cy);
  };
})();
/* --------------------------------------------------------------- renderer */

/**
 * Build a live viewer bound to a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<{id: string, angle: number, travel: number}>} states
 * @param {{ reduced?: boolean }} [options]
 * @returns {object|null} the viewer handle, or null if the canvas cannot render
 */
export function createViewer3D(canvas, states, options) {
  const settings = options || {};
  let reduced = !!settings.reduced;
  const ctx = canvas.getContext('2d');
  if (!ctx || !states || !states.length) return null;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let focal = 1;
  let backdrop = null;
  let upperRef = identity();

  let index = 0;
  let angle = states[0].angle;
  let travel = states[0].travel;

  let yaw = HOME.yaw;
  let pitch = HOME.pitch;
  let dist = HOME.dist;

  let raf = 0;
  let dirty = true;
  let tween = null;
  let spin = null;
  let camTween = null;
  let alive = true;

  /* ----------------------------------------------------------- viewport */

  const measure = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w < 2 || h < 2) return false;
    width = w;
    height = h;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const pw = Math.round(w * dpr);
    const ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    focal = Math.min(w, h * 1.5) * 1.06;
    backdrop = ctx.createLinearGradient(0, 0, 0, h);
    backdrop.addColorStop(0, '#0f172a');
    backdrop.addColorStop(1, '#0b192c');
    return true;
  };

  const eyePosition = () => {
    const cp = Math.cos(pitch);
    return [
      TARGET[0] + dist * Math.sin(yaw) * cp,
      TARGET[1] + dist * Math.sin(pitch),
      TARGET[2] + dist * Math.cos(yaw) * cp,
    ];
  };

  const view = () => lookAt(eyePosition(), TARGET);

  /** Perspective projection: divide by depth, focal length from the canvas width. */
  const project = (p) => {
    const depth = -p[2];
    if (depth < 0.06) return null;
    return [width / 2 + (p[0] * focal) / depth, height / 2 - (p[1] * focal) / depth, depth];
  };

  /* --------------------------------------------------------------- paint */

  const paintFloor = (v) => {
    const ring = [];
    for (let i = 0; i < 32; i += 1) {
      const t = (i / 32) * Math.PI * 2;
      const q = project(apply(v, [
        TARGET[0] + Math.cos(t) * 0.7,
        0.001,
        TARGET[2] + Math.sin(t) * 0.7,
      ]));
      if (!q) return;
      ring.push(q);
    }
    ctx.beginPath();
    ctx.moveTo(ring[0][0], ring[0][1]);
    for (let i = 1; i < ring.length; i += 1) ctx.lineTo(ring[i][0], ring[i][1]);
    ctx.closePath();
    ctx.fillStyle = 'rgba(2, 132, 199, 0.07)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 210, 254, 0.16)';
    ctx.stroke();
  };

  const paintSweep = (v) => {
    const tip = apply(upperRef, SWEEP_TIP);
    const floorP = project(apply(v, [REAR_ENVELOPE, 0.02, 0]));
    const topP = project(apply(v, [REAR_ENVELOPE, tip[1] + 0.5, 0]));
    const envP = project(apply(v, [REAR_ENVELOPE, tip[1], 0]));
    const sweptP = project(apply(v, [tip[0], tip[1], 0]));
    if (!floorP || !topP || !envP || !sweptP) return;

    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 210, 254, 0.4)';
    ctx.beginPath();
    ctx.moveTo(floorP[0], floorP[1]);
    ctx.lineTo(topP[0], topP[1]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(0, 210, 254, 0.8)';
    ctx.beginPath();
    ctx.moveTo(envP[0], envP[1] - 8);
    ctx.lineTo(envP[0], envP[1] + 8);
    ctx.moveTo(sweptP[0], sweptP[1] - 8);
    ctx.lineTo(sweptP[0], sweptP[1] + 8);
    ctx.moveTo(envP[0], envP[1]);
    ctx.lineTo(sweptP[0], sweptP[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sweptP[0], sweptP[1], 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00d2fe';
    ctx.fill();

    ctx.font = '600 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(0, 210, 254, 0.8)';
    ctx.fillText('REAR PITCH ENVELOPE', envP[0] - 8, envP[1] - 12);
    ctx.fillStyle = 'rgba(0, 210, 254, 0.6)';
    ctx.fillText('CLEARANCE HELD', (envP[0] + sweptP[0]) / 2, envP[1] + 22);
    ctx.textAlign = 'left';
  };

  const draw = () => {
    const v = view();
    const eye = eyePosition();
    const scene = buildScene(angle, travel);
    upperRef = scene.upper;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = backdrop || '#0b192c';
    ctx.fillRect(0, 0, width, height);
    ctx.lineJoin = 'round';

    paintFloor(v);

    const lit = states[index].id === 'ife';
    const queue = [];

    for (let p = 0; p < scene.parts.length; p += 1) {
      const part = scene.parts[p];
      const tones = part.lit && lit ? TONE.screenLit : TONE[part.tone];
      const world = part.verts.map((vtx) => apply(part.m, vtx));
      const eye3 = world.map((vtx) => apply(v, vtx));

      for (let f = 0; f < FACES.length; f += 1) {
        const quad = FACES[f];
        const a = world[quad[0]];
        const b = world[quad[1]];
        const c = world[quad[2]];

        const n = normalise(cross(
          [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
          [c[0] - a[0], c[1] - a[1], c[2] - a[2]],
        ));

        if (n[0] * (eye[0] - a[0]) + n[1] * (eye[1] - a[1]) + n[2] * (eye[2] - a[2]) <= 0) continue;

        const lambert = n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2];
        const level = 0.25 + 0.75 * (lambert > 0 ? lambert : 0);
        const tone = level > 0.72 ? 2 : level > 0.46 ? 1 : 0;

        const pts = [];
        let depth = 0;
        let ok = true;
        for (let q = 0; q < quad.length; q += 1) {
          const s = project(eye3[quad[q]]);
          if (!s) {
            ok = false;
            break;
          }
          pts.push(s);
          depth += s[2];
        }
        if (!ok) continue;

        queue.push({ pts, depth: depth / quad.length, color: tones[tone] });
      }
    }

    queue.sort((x, y) => y.depth - x.depth);

    ctx.lineWidth = 0.75;
    for (let q = 0; q < queue.length; q += 1) {
      const face = queue[q];
      const pts = face.pts;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length; k += 1) ctx.lineTo(pts[k][0], pts[k][1]);
      ctx.closePath();
      ctx.fillStyle = face.color;
      ctx.fill();
      ctx.strokeStyle = face.color;
      ctx.stroke();
    }

    if (states[index].id === 'sleep') paintSweep(v);
  };

  /* ---------------------------------------------------------------- loop */

  const wake = () => {
    if (!alive) return;
    dirty = true;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const tick = (now) => {
    raf = 0;
    let live = false;

    if (tween) {
      const progress = Math.min(1, (now - tween.start) / TWEEN_MS);
      const e = easeOut(progress);
      angle = tween.fromAngle + (tween.toAngle - tween.fromAngle) * e;
      travel = tween.fromTravel + (tween.toTravel - tween.fromTravel) * e;
      if (progress < 1) live = true;
      else tween = null;
    }

    if (camTween) {
      const progress = Math.min(1, (now - camTween.start) / CAM_MS);
      const e = easeOut(progress);
      yaw = camTween.fromYaw + (camTween.toYaw - camTween.fromYaw) * e;
      pitch = camTween.fromPitch + (camTween.toPitch - camTween.fromPitch) * e;
      dist = camTween.fromDist + (camTween.toDist - camTween.fromDist) * e;
      if (progress < 1) live = true;
      else camTween = null;
    }

    if (spin) {
      yaw += spin.yaw;
      pitch = clamp(pitch + spin.pitch, PITCH_MIN, PITCH_MAX);
      spin.yaw *= 0.9;
      spin.pitch *= 0.9;
      if (Math.abs(spin.yaw) < 0.0004 && Math.abs(spin.pitch) < 0.0004) spin = null;
      else live = true;
    }

    if (live || dirty) {
      dirty = false;
      draw();
    }
    if (live) raf = requestAnimationFrame(tick);
  };

  /* -------------------------------------------------------------- camera */

  const flyTo = (to) => {
    spin = null;
    if (reduced) {
      yaw = to.yaw;
      pitch = to.pitch;
      dist = to.dist;
      wake();
      return;
    }
    camTween = {
      start: performance.now(),
      fromYaw: yaw,
      fromPitch: pitch,
      fromDist: dist,
      toYaw: to.yaw,
      toPitch: clamp(to.pitch, PITCH_MIN, PITCH_MAX),
      toDist: clamp(to.dist, DIST_MIN, DIST_MAX),
    };
    wake();
  };

  const viewer = {
    setState(next, animate) {
      if (next === index || next < 0 || next >= states.length) return;
      const from = states[index];
      const to = states[next];
      index = next;
      tween = null;
      if (animate === false || reduced) {
        angle = to.angle;
        travel = to.travel;
        wake();
        return;
      }
      tween = {
        start: performance.now(),
        fromAngle: from.angle,
        fromTravel: from.travel,
        toAngle: to.angle,
        toTravel: to.travel,
      };
      wake();
    },
    setReduced(next) {
      const value = !!next;
      if (value === reduced) return;
      reduced = value;
      if (reduced) {
        if (tween) {
          angle = tween.toAngle;
          travel = tween.toTravel;
          tween = null;
        }
        if (camTween) {
          yaw = camTween.toYaw;
          pitch = camTween.toPitch;
          dist = camTween.toDist;
          camTween = null;
        }
        spin = null;
      }
      wake();
    },
    setView(name) {
      if (VIEWS[name]) flyTo(VIEWS[name]);
    },
    reset() {
      flyTo(HOME);
    },
    zoom(factor) {
      camTween = null;
      dist = clamp(dist * factor, DIST_MIN, DIST_MAX);
      wake();
    },
    nudge(dYaw, dPitch) {
      camTween = null;
      yaw += dYaw;
      pitch = clamp(pitch + dPitch, PITCH_MIN, PITCH_MAX);
      wake();
    },
    refresh() {
      if (measure()) wake();
    },
  };

  /* --------------------------------------------------------------- input */

  const pointers = new Map();
  let pinchBase = 0;

  canvas.addEventListener('pointerdown', (event) => {
    if (!alive) return;
    canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    spin = null;
    pinchBase = 0;
  });

  canvas.addEventListener('pointermove', (event) => {
    const prev = pointers.get(event.pointerId);
    if (!prev) return;
    const dx = event.clientX - prev.x;
    const dy = event.clientY - prev.y;
    prev.x = event.clientX;
    prev.y = event.clientY;

    if (pointers.size >= 2) {
      const pts = Array.from(pointers.values());
      const gap = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchBase > 0) {
        dist = clamp(dist * (pinchBase / Math.max(1, gap)), DIST_MIN, DIST_MAX);
        wake();
      }
      pinchBase = gap;
      return;
    }

    yaw += dx * 0.008;
    pitch = clamp(pitch + dy * 0.006, PITCH_MIN, PITCH_MAX);
    if (!reduced) spin = { yaw: dx * 0.008 * 0.7, pitch: dy * 0.006 * 0.7 };
    wake();
  });

  const release = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchBase = 0;
    if (pointers.size === 0) spin = null;
  };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  canvas.addEventListener('wheel', (event) => {
    if (!alive) return;
    event.preventDefault();
    camTween = null;
    dist = clamp(dist * Math.exp(event.deltaY * 0.0012), DIST_MIN, DIST_MAX);
    wake();
  }, { passive: false });

  canvas.addEventListener('dblclick', () => viewer.reset());

  canvas.addEventListener('keydown', (event) => {
    if (!alive || event.altKey || event.ctrlKey || event.metaKey) return;
    let handled = true;
    switch (event.key) {
      case 'ArrowLeft': yaw -= 0.1; break;
      case 'ArrowRight': yaw += 0.1; break;
      case 'ArrowUp': pitch = clamp(pitch + 0.07, PITCH_MIN, PITCH_MAX); break;
      case 'ArrowDown': pitch = clamp(pitch - 0.07, PITCH_MIN, PITCH_MAX); break;
      case '+':
      case '=': dist = clamp(dist * 0.9, DIST_MIN, DIST_MAX); break;
      case '-':
      case '_': dist = clamp(dist * 1.1, DIST_MIN, DIST_MAX); break;
      case '0':
      case 'Home': viewer.reset(); return;
      default: handled = false;
    }
    if (handled) {
      event.preventDefault();
      camTween = null;
      spin = null;
      wake();
    }
  });

  const onResize = () => {
    if (measure()) wake();
  };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  let observer = null;
  if (typeof ResizeObserver === 'function') {
    observer = new ResizeObserver(onResize);
    observer.observe(canvas);
  }

  if (!measure()) return null;
  draw();

  viewer.destroy = () => {
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
    if (observer) observer.disconnect();
    pointers.clear();
  };

  return viewer;
}