import { spring } from 'svelte/motion'

function getPrefersReducedMotion() {
  const QUERY = '(prefers-reduced-motion: no-preference)'
  const mediaQueryList = window.matchMedia(QUERY)
  const prefersReducedMotion = !mediaQueryList.matches
  return prefersReducedMotion
}

export default function boop(node: any, params: any) {
  let { setter } = params
  let springyRotation = spring(
    { x: 0, y: 0, rotation: 0, scale: 1 },
    {
      stiffness: 0.1,
      damping: 0.15,
    }
  )
  let prefersReducedMotion = getPrefersReducedMotion()

  node.style = `display: inline-block`

  const unsubscribe = springyRotation.subscribe(({ x, y, rotation, scale }) => {
    node.style.transform =
      !prefersReducedMotion &&
      `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`
  })

  interface Update {
    isBooped: boolean
    x: number
    y: number
    rotation: number
    scale: number
    timing: number
  }

  return {
    update({
      isBooped,
      x = 0,
      y = 0,
      rotation = 0,
      scale = 1,
      timing,
    }: Update) {
      springyRotation.set(
        isBooped
          ? { x, y, rotation, scale }
          : { x: 0, y: 0, rotation: 0, scale: 1 }
      )

      if (isBooped) {
        window.setTimeout(() => setter(false), timing)
      }
    },
    destroy() {
      unsubscribe()
    },
  }
}
