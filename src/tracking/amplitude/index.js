import amplitude from 'amplitude-js'

amplitude.getInstance().init(process.env.AMPLITUDE_API_KEY) // initializes default instance of Amplitude client
