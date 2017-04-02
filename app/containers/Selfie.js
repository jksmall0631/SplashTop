import { connect } from 'react-redux'
import { appendSelfie } from '../actions'
import Selfie from '../components/Selfie'

const mapStateToProps = (state) => {
  return {
    selfies: state.selfies,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

export default connect(mapStateToProps, null)(Selfie)
