
export function addUser(user) {
    return {
      type: "ADD_USER",
      payload:user
    }
  }

export  function deleteUser(id) {
      return {
      type: "DELETE_USER",
      payload:id
    }
  }
  
export  function editUser(user) {
  return {
  type: "EDIT_USER",
  payload:user
}
}

export  function userReverse(users) {
  return {
  type: "REVERSE_USER",
  payload:users
}
}