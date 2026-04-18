import React, { useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const AnimatedButton = ({ onPress, children, style }) => {
  const borderRadiusValue = useSharedValue(8);
  const opacityValue = useSharedValue(1);
  const scaleValue = useSharedValue(1);
  const backgroundColorValue = useSharedValue(0); // 0 = normal, 1 = red

  const handlePressIn = () => {
    borderRadiusValue.value = withSpring(25);
    opacityValue.value = withSpring(0.7);
    scaleValue.value = withSpring(0.95);
  };

  const handleLongPress = () => {
    backgroundColorValue.value = withSpring(1);
    scaleValue.value = withSpring(0.85);
  };

  const handlePressOut = () => {
    borderRadiusValue.value = withSpring(8);
    opacityValue.value = withSpring(1);
    scaleValue.value = withSpring(1);
    backgroundColorValue.value = withSpring(0);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = backgroundColorValue.value === 1 ? '#ff6b6b' : '#ffd700';
    return {
      borderRadius: borderRadiusValue.value,
      opacity: opacityValue.value,
      transform: [{ scale: scaleValue.value }],
      backgroundColor,
    };
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.button, animatedStyle, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedButton;
