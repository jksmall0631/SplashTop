const StorePics = (state = [], action) => {
  switch(action.type){
    case 'STORE_PICS':
      return action;
    default:
      return state;
  }
}

export default StorePics;
