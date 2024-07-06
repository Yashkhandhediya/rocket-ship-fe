export const logout = () => {
  sessionStorage.setItem('access_token', '');
  window.location.reload();
};
