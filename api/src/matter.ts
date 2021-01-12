import matter from 'matter-js';

const engine = matter.Engine.create();
engine.world.gravity.y = 0;

export default engine;
