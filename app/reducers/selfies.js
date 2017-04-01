const selfies = (state = { data: [] }, action) => {
  switch (action.type) {
    case 'APPEND_SELFIE':
      return action.data
    default:
      return state
  }
}

export default selfies
