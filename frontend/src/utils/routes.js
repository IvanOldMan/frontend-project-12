const API_ROUTE = 'api/v1';

const path = {
  api: {
    base: () => API_ROUTE,
    channels: () => `${API_ROUTE}/channels`,
    messages: () => `${API_ROUTE}/messages`,
    login: () => '/login',
    signup: () => '/signup',
  },
  pages: {
    root: () => '/',
    login: () => '/login',
    signup: () => '/signup',
    other: () => '*',
  },
};

export default path;
