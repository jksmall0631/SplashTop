import React from 'react'
import { connect } from 'react-redux'
import { storePics } from '../actions'
import Home from '../components/Home'

const mapDispatchToProps = (dispatch) => {
  return {
    storePics: (pics) => {
      dispatch(storePics(pics))
    }
  }
}

export default connect(null, mapDispatchToProps)(Home)
