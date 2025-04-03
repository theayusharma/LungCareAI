export function checkTokenValidity(token) {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    const expirationTime = decoded.exp * 1000; 
    return Date.now() < expirationTime; 
  } catch (error) {
    return false; 
  }
}
