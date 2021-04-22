import amplitude from 'amplitude-js'

describe('Amplitude tests', () => {
  it('Has a client initialized', () => {
    console.log(amplitude.getInstance())
  })
})
