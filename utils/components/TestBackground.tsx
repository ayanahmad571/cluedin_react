import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const TestBackground = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [stars, setStars] = useState([]);
  const animations = useRef([]);

  useEffect(() => {
    // Initialize stars
    const initialStars = Array.from({ length: 50 }, () => ({
      x: new Animated.Value(Math.random() * screenWidth),
      y: new Animated.Value(Math.random() * screenHeight),
    }));
    setStars(initialStars);

    // Update stars every 5 seconds
    const intervalId = setInterval(() => {
      updateStars();
    }, 3100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    animateStars();
  }, [stars]);

  const updateStars = () => {
    setStars((prevStars) => {
      const randomIndex = Math.floor(Math.random() * prevStars.length);
      const updatedStars = prevStars.map((star, index) => {
        if (index === randomIndex) {
          return {
            x: new Animated.Value(Math.random() * screenWidth),
            y: new Animated.Value(Math.random() * screenHeight),
          };
        }
        return star;
      });
      return updatedStars;
    });
  };

  const animateStars = () => {
    animations.current = stars.map((star) => {
      return Animated.timing(star.x, {
        toValue: Math.random() * screenWidth,
        duration: 3000,
        useNativeDriver: true,
      });
    });

    Animated.parallel(animations.current).start();
  };

  return (
    <View style={styles.container}>
      {stars.map((star, index) => (
        <Animated.View
          key={index}
          style={[
            styles.star,
            {
              transform: [
                { translateX: star.x },
                { translateY: star.y },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'white',
  },
});

export default TestBackground;
