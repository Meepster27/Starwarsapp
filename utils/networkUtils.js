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
    // Try to fetch from SWAPI API first
    const response = await fetchWithTimeout('https://swapi.dev/api/films/?format=json', { method: 'GET' }, 8000);
    return response.ok;
  } catch (error) {
    console.warn('Primary network check failed, trying fallback...');
    
    // Fallback: try a simple endpoint with no CORS issues
    try {
      const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' }, 5000);
      return response.ok;
    } catch (err) {
      console.error('Network check failed:', err);
      // If both fail, assume we're online (don't block the app)
      // This is better UX - let user try and fail gracefully rather than blocking preemptively
      return true;
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
      try {
        const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', { method: 'GET' }, 5000);
        callback(response.ok);
      } catch (err) {
        // Assume online by default
        callback(true);
      }
    }
  }, 15000);

  return () => clearInterval(checkInterval);
};
