import React, { Component } from 'react'
import { connect } from 'react-redux'
import { storePics } from '../actions'
import UnSplash from '../components/UnSplash'

const mapStateToProps = (state) => {
  return {
    pics: state.StorePics.pics,
  }
}

export default connect(mapStateToProps, null)(UnSplash)
