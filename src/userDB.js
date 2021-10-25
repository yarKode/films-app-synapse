let userDB = [];

export function addUser(newUserObj) {
  if (userDB.some((obj) => obj.email === newUserObj.email)) {
    throw new Error("User with current Email already exists");
  } else {
    userDB = [...userDB, newUserObj];
    localStorage.setItem("userDB", JSON.stringify(userDB));
    return newUserObj;
  }
}

export function loginUSer(userObj) {
  userDB = JSON.parse(localStorage.getItem("userDB"));

  console.log(userDB);
  const user = userDB.find((obj) => obj.email === userObj.email);

  if (user) {
    if (user.password === userObj.password) {
      return user;
    }
    throw new Error("Password is incorrect");
  }

  throw new Error("No such user found");
}
