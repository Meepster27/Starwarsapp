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
    // Try to fetch a simple resource to check connectivity
    const response = await fetchWithTimeout('https://www.google.com', { method: 'HEAD' }, 5000);
    return response.ok || response.status === 200;
  } catch (error) {
    console.error('Network check failed:', error);
    return false;
  }
};

export const subscribeToNetworkStatus = (callback) => {
  // For web/Expo, we'll do periodic checks
  const checkInterval = setInterval(async () => {
    try {
      const response = await fetchWithTimeout('https://www.google.com', { method: 'HEAD' }, 5000);
      const isConnected = response.ok || response.status === 200;
      callback(isConnected);
    } catch (error) {
      console.error('Network check failed:', error);
      callback(false);
    }
  }, 5000);

  return () => clearInterval(checkInterval);
};
