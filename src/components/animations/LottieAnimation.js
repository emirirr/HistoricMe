import React, { useRef, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const LottieAnimation = ({
  source,
  autoPlay = true,
  loop = true,
  speed = 1,
  style,
  onAnimationFinish,
  onAnimationLoop,
  resizeMode = 'contain',
  ...props
}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current && autoPlay) {
      animationRef.current.play();
    }
  }, [autoPlay]);

  const handleAnimationFinish = () => {
    if (onAnimationFinish) {
      onAnimationFinish();
    }
  };

  const handleAnimationLoop = () => {
    if (onAnimationLoop) {
      onAnimationLoop();
    }
  };

  return (
    <View style={[{ width: '100%', height: '100%' }, style]}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        resizeMode={resizeMode}
        onAnimationFinish={handleAnimationFinish}
        onAnimationLoop={handleAnimationLoop}
        {...props}
      />
    </View>
  );
};

export default LottieAnimation;
