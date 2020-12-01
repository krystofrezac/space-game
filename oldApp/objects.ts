import phaser from "phaser";

type ObjectItem = {
  type: "PLAYER";
  id: number;
  position: {
    x: number;
    y: number;
  };
  angle: number;
  image?: phaser.GameObjects.Image;
};

type Objects = ObjectItem[];

let objects: Objects = [];

export const setObjects = (newObjects: Objects): void => {
  objects = newObjects;
};

export const getObjects = (): Objects => {
  return objects;
};
