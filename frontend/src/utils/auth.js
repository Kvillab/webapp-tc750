import { getData, saveData } from './storage';

export const login = (username, password) => {
  const users = getData('users') || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    localStorage.setItem('tcu-admin-auth', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('tcu-admin-auth');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('tcu-admin-auth');
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('tcu-admin-auth');
  return userData ? JSON.parse(userData) : null;
};

export const changePassword = (newPassword) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const users = getData('users') || [];
  const updatedUsers = users.map(u => 
    u.id === user.id ? { ...u, password: newPassword } : u
  );
  
  saveData('users', updatedUsers);
  
  // Actualizar usuario en sesión
  const updatedUser = { ...user, password: newPassword };
  localStorage.setItem('tcu-admin-auth', JSON.stringify(updatedUser));
  
  return true;
};
