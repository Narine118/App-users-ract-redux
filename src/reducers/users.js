export default function users(state = [], action) {
    switch (action.type) {
      case "ADD_USER":
        return [
            ...state,
            action.payload
        ];
        
      case "DELETE_USER":
      const newState=  state.filter(item=>   item.id !== action.payload);
      return newState;

      case "EDIT_USER":
      for (var i = 0; i < state.length; i++) {
        if (state[i].id == action.payload.id) {
          state.splice(i, 1);
        }
          }
        state.push(action.payload);
      return state;

      case "REVERSE_USER":
  console.log(action.payload);
       return     [
         ...action.payload.reverse()
       ]; 
       
      default:
        return state
    }
  }

  
