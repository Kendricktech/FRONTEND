const API_BASE_URL = 'http://localhost:8000/api';

// =====================
// Token Management
// =====================
function getToken(name) {
  return localStorage.getItem(name);
}

function setToken(name, value) {
  localStorage.setItem(name, value);
}

function removeTokens() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}

function decodeJWT(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

// =====================
// Authentication Core
// =====================
export function isAuthenticated() {
  const access = getToken('access');
  return access && !isTokenExpired(access);
}

export function logout() {
  removeTokens();
  window.location.href = '/login';
}

export async function refreshAccessToken() {
  const refresh = getToken('refresh');
  if (!refresh) throw new Error('No refresh token available');

  const res = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) throw new Error('Token refresh failed');

  const data = await res.json();
  setToken('access', data.access);
  return data.access;
}

export async function authenticatedFetch(url, options = {}, retry = true) {
  let access = getToken('access');

  if (!access || isTokenExpired(access)) {
    try {
      access = await refreshAccessToken();
    } catch (err) {
      logout();
      throw err;
    }
  }

  const authOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${access}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, authOptions);

  if (response.status === 401 && retry) {
    try {
      const newAccess = await refreshAccessToken();
      return authenticatedFetch(url, options, false);
    } catch (err) {
      logout();
      throw err;
    }
  }

  return response;
}
