const debounce = minIntervalMs => f => {
  let wait = false

  return (...args) => {
    if (wait) return

    wait = true
    setTimeout(() => {
      wait = false
    }, minIntervalMs)

    f(...args)
  }
}

export default debounce
