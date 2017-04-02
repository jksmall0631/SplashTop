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
    appendSelfie: (img, createdAt) => {
      dispatch(appendSelfie(img, createdAt))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
