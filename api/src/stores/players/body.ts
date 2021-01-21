import matter from 'matter-js';

import config from '../../config';

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

export const playerBodyCenter = matter.Vertices.centre(vertices);

export const getPlayerBody = (): matter.Body => {
  const body = matter.Bodies.fromVertices(
    playerBodyCenter.x,
    playerBodyCenter.y,
    [vertices],
  );

  body.friction = 0;
  body.frictionAir = 0;
  body.frictionStatic = 0;
  body.mass = config.objects.player.mass;

  return body;
};
