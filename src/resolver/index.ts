import type { Resolver } from 'unplugin-auto-import/types'
import * as THREE from 'three'
import * as Addons from 'three/examples/jsm/Addons.js'

const key1 = Object.keys(THREE)
const key2 = Object.keys(Addons)
export const useThree: Resolver = (name: string) => {
  if (key1.includes(name)) {
    return { name, from: 'three' }
  }
  if (key2.includes(name)) {
    return { name, from: 'three/examples/jsm/Addons.js' }
  }
  return null
}
