export function debounce(fn: Function, t = 300) {
  let id: any
  return function (...args: any[]) {
    clearTimeout(id)
    const self = this
    id = setTimeout(() => {
      fn.apply(self, args)
    }, t)
  }
}
