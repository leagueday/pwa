import React from 'react'

import { Provider } from './store'

const App = () => {
  return (
    <Provider>
      <div>
        🚧
        <div style={{fontFamily: '"Alata", sans-serif'}}>
          Almost before we knew it, we had left the ground.
        </div>
        <div style={{fontFamily: '"Aleo", serif'}}>
          Almost before we knew it, we had left the ground.
        </div>
      </div>
    </Provider>
  )
}

export default App
