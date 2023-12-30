export const logout = () => {
  localStorage.setItem('access_token', '');
  window.location.reload();
};
