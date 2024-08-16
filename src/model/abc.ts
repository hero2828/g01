import { ArrowHelper, GridHelper, Vector3 } from 'three'

export function addGrid(size: number = 10) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        const grid = new GridHelper(size)
        this?.add(grid)
      }
    }
  }
}

export function addArrowHelper(x: number = 0, y: number = 1, z: number = 1) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        const arrowHelper = new ArrowHelper(new Vector3(x, y, z), new Vector3(0, 0, 0), 100, 0xFF5C00)
        this.add(arrowHelper)
      }
    }
  }
}

export function addAxesHelper(len: number = 1) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        const axesHelper = new AxesHelper(len)
        this.add(axesHelper)
      }
    }
  }
}

@addGrid(100)
@addAxesHelper(100)
export class OScene extends Scene {
  constructor() {
    super()
  }
}
