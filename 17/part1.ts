import { loadInputWithOutSplit } from "../load-input";

function serialize(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function deSerialize(cube: string): [number, number, number] {
  const [x, y, z] = cube.split(",").map((c) => parseInt(c, 10));
  return [x, y, z];
}

function getNeighbours(
  x: number,
  y: number,
  z: number
): Array<[number, number, number]> {
  const cubes: Array<[number, number, number]> = [];
  for (const nx of [-1, 0, 1]) {
    for (const ny of [-1, 0, 1]) {
      for (const nz of [-1, 0, 1]) {
        const pos: [number, number, number] = [x + nx, y + ny, z + nz];
        if (serialize(x, y, z) !== serialize(pos[0], pos[1], pos[2])) {
          cubes.push(pos);
        }
      }
    }
  }
  return cubes;
}

const activeCubes = new Set<string>();

for (const [x, row] of loadInputWithOutSplit(17).split("\n").entries()) {
  for (const [y, c] of row.split("").entries()) {
    if (c === "#") {
      activeCubes.add(serialize(x, y, 0));
    }
  }
}

for (let cycle = 0; cycle < 6; cycle++) {
  const toRemove: Array<[number, number, number]> = [];
  const toAdd: Array<[number, number, number]> = [];
  for (const activeCube of activeCubes) {
    const [x, y, z] = deSerialize(activeCube);
    const neighbours = getNeighbours(x, y, z);
    const activeNeighbours = neighbours.filter((n) =>
      activeCubes.has(serialize(n[0], n[1], n[2]))
    );
    if ([2, 3].indexOf(activeNeighbours.length) === -1) {
      toRemove.push([x, y, z]);
    }

    for (const inActiveNeighbour of neighbours.filter(
      (n) => !activeCubes.has(serialize(n[0], n[1], n[2]))
    )) {
      if (
        getNeighbours(
          inActiveNeighbour[0],
          inActiveNeighbour[1],
          inActiveNeighbour[2]
        ).filter((nn) => activeCubes.has(serialize(nn[0], nn[1], nn[2])))
          .length === 3
      ) {
        toAdd.push([
          inActiveNeighbour[0],
          inActiveNeighbour[1],
          inActiveNeighbour[2],
        ]);
      }
    }
  }

  for (const n of toRemove) {
    activeCubes.delete(serialize(n[0], n[1], n[2]));
  }
  for (const n of toAdd) {
    activeCubes.add(serialize(n[0], n[1], n[2]));
  }
}

console.log(activeCubes.size);
