import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import pics from './pics'
import selfies from './selfies'

const rootReducer = combineReducers({
  pics,
  selfies,
  routing,
})

export default rootReducer
