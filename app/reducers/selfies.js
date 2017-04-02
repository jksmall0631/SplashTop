const selfies = (state = [], action) => {
  switch (action.type) {
    case 'APPEND_SELFIE':
      return state.concat(action.data)
    default :
      return state
  }
}

export default selfies
