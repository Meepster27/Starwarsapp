// Simple network detection utility
export const checkNetworkStatus = async () => {
  try {
    // Try to fetch a simple resource to check connectivity
    const response = await fetch('https://www.google.com', { method: 'HEAD' });
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
      const response = await fetch('https://www.google.com', { method: 'HEAD' });
      const isConnected = response.ok || response.status === 200;
      callback(isConnected);
    } catch (error) {
      console.error('Network check failed:', error);
      callback(false);
    }
  }, 5000);

  return () => clearInterval(checkInterval);
};
