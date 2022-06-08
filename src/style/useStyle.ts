const styles = new Map()

export function addStyle(name:string, rules:string) {
  if (styles.get(name)) {
    return
  }
  const style = document.createElement('style')
  style.innerHTML = rules
  style.setAttribute('type', 'text/css')
  style.setAttribute('id', `GiphyFeedViewer-${name}`)
  document.head.appendChild(style)
  styles.set(name, style)
}

export function useStyle(name:string, rules:string) {
  addStyle(name, rules)
}

if (typeof module !== 'undefined' && module.hot) {
  module.hot.dispose(() => {
    styles.forEach(style => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    })
    styles.clear()
  })
}
