import Phaser from "phaser";

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

export const setCursors = (
  newCursors: Phaser.Types.Input.Keyboard.CursorKeys
): void => {
  cursors = newCursors;
};
export const getCursors = (): any => cursors;
