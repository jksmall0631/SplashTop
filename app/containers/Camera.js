import { connect } from 'react-redux'
import { appendSelfie } from '../actions'
import Camera from '../components/Camera'

const mapStateToProps = (state) => {
  return {
    selfies: state.selfies,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    appendSelfie: (createdAt, selfie) => {
      dispatch(appendSelfie(createdAt, selfie))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
