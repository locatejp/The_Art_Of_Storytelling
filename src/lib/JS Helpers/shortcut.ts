export const shortcut = (node: any, params: any) => {
  let handler: (e: any) => void
  const removeHandler = () => window.removeEventListener('keydown', handler),
    setHandler = () => {
      removeHandler()
      if (!params) return
      handler = (e) => {
        if (
          !!params.alt != e.altKey ||
          !!params.shift != e.shiftKey ||
          !!params.control != (e.ctrlKey || e.metaKey) ||
          params.code != e.code
        )
          return
        e.preventDefault()
        params.callback ? params.callback() : node.click()
      }
      window.addEventListener('keydown', handler)
    }
  setHandler()
  return {
    update: setHandler,
    destroy: removeHandler,
  }
}
