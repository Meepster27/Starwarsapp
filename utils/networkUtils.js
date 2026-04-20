// Simple network detection utility with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const checkNetworkStatus = async () => {
  try {
    // Try to fetch the SWAPI API directly since we know it works
    // This is more reliable than checking Google
    const response = await fetchWithTimeout('https://swapi.dev/api/films/?format=json', { method: 'GET' }, 8000);
    return response.ok;
  } catch (error) {
    console.error('Network check failed:', error);
    // If SWAPI check fails, try a simpler check
    try {
      const response = await fetchWithTimeout('https://httpbin.org/status/200', { method: 'GET' }, 5000);
      return response.ok;
    } catch (err) {
      console.error('Secondary network check also failed:', err);
      return false;
    }
  }
};

export const subscribeToNetworkStatus = (callback) => {
  // For web/Expo, we'll do periodic checks
  const checkInterval = setInterval(async () => {
    try {
      const response = await fetchWithTimeout('https://swapi.dev/api/films/?format=json', { method: 'GET' }, 8000);
      callback(response.ok);
    } catch (error) {
      console.error('Network check failed:', error);
      try {
        const response = await fetchWithTimeout('https://httpbin.org/status/200', { method: 'GET' }, 5000);
        callback(response.ok);
      } catch (err) {
        callback(false);
      }
    }
  }, 10000);

  return () => clearInterval(checkInterval);
};
