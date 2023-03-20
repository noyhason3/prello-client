import { httpService } from './http.service';

export const userService = {
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  login,
  logout,
  signup,
  //   increaseScore,
};

window.userService = userService;
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

function getUsers() {
  return httpService.get(`user`);
}

function getById(userId) {
  return httpService.get(`user/${userId}`);
}
function remove(userId) {
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null');
}





// BETTER ON AUTH.SERVICE SO CAN BE DELETED

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred);
  return _saveLocalUser(user);
}
async function logout() {
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user));
  return user;
}
