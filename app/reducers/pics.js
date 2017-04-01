const pics = (state = [], action) => {
  switch (action.type) {
    case 'STORE_PICS':
      return action.data
    default:
      return state
  }
}

export default pics
