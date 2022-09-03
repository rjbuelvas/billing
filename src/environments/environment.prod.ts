export const environment = {
  production: true,
  baseUrl: 'https://planetalab.xyz',
  // eslint-disable-next-line max-len
  token: (localStorage.getItem('token') ?  localStorage.getItem('token') : 'null')
};
