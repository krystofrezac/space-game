import matter from 'matter-js';

const vertices = [
  { x: 26, y: 512 - 176 },
  { x: 190, y: 512 - 184 },
  { x: 308, y: 512 - 185 },
  { x: 473, y: 512 - 175 },
  { x: 454, y: 512 - 263 },
  { x: 318, y: 512 - 308 },
  { x: 268, y: 512 - 329 },
  { x: 285, y: 512 - 419 },
  { x: 244, y: 512 - 480 },
  { x: 207, y: 512 - 418 },
  { x: 222, y: 512 - 326 },
  { x: 182, y: 512 - 308 },
  { x: 45, y: 512 - 263 },
];

export const getPlayerBodyCenter = (): matter.Vector => {
  const center = matter.Vertices.centre(vertices);

  // TODO isn't this redundant?
  return matter.Vector.create(center.x, center.y);
};

export const getPlayerBody = (): matter.Body => {
  const center = getPlayerBodyCenter();

  return matter.Bodies.fromVertices(center.x, center.y, [vertices]);
};
