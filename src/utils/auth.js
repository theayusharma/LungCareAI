export function checkTokenValidity(token) {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decodes the JWT
    const expirationTime = decoded.exp * 1000; // Convert to ms
    return Date.now() < expirationTime; // Check if token is still valid
  } catch (error) {
    return false; // Invalid token
  }
}
