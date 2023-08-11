export function debounce(fn: Function, t = 300) {
  let id: any
  return function (...args: any[]) {
    clearTimeout(id)
    //@ts-ignore
    const self = this
    id = setTimeout(() => {
      fn.apply(self, args)
    }, t)
  }
}
