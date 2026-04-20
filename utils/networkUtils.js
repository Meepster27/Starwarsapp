import * as Network from 'expo-network';

export const checkNetworkStatus = async () => {
  try {
    const ipAddress = await Network.getIpAddressAsync();
    console.log('IP Address:', ipAddress);
    // If we can get an IP, we assume we have network connectivity
    return ipAddress !== '0.0.0.0' && ipAddress !== null && ipAddress !== '';
  } catch (error) {
    console.error('Error checking network status:', error);
    // If there's an error, assume we're offline
    return false;
  }
};

export const subscribeToNetworkStatus = (callback) => {
  // For expo-network, we'll do periodic checks since it doesn't have a real-time listener
  const checkInterval = setInterval(async () => {
    try {
      const ipAddress = await Network.getIpAddressAsync();
      const isConnected = ipAddress !== '0.0.0.0' && ipAddress !== null && ipAddress !== '';
      callback(isConnected);
    } catch (error) {
      console.error('Error checking network status:', error);
      callback(false);
    }
  }, 5000); // Check every 5 seconds

  return () => clearInterval(checkInterval);
};
