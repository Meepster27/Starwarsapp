import NetInfo from '@react-native-community/netinfo';

export const checkNetworkStatus = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};

export const subscribeToNetworkStatus = (callback) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    const isConnected = state.isConnected && state.isInternetReachable;
    callback(isConnected);
  });
  return unsubscribe;
};
