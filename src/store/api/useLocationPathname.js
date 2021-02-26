import {useSelector} from 'react-redux'

import * as selectors from '../selectors'

const useLocationPathname = () => {
  const location = useSelector(selectors.getRouterLocation)

  if (!location) {
    return null
  } else if (location.pathname) {
    return location.pathname
  } else {
    return location.location?.pathname
  }
}

export default useLocationPathname
