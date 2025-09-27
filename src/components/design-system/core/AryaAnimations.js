/**
 * ARYA Design System - Animation Utilities
 * iOS-like smooth animations and transitions
 */

const AryaAnimations = {
  // Timing functions (iOS standard)
  easing: {
    easeInOut: [0.25, 0.1, 0.25, 1.0],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    linear: [0, 0, 1, 1],
    
    // iOS-specific curves
    standard: [0.4, 0.0, 0.2, 1.0],
    decelerate: [0.0, 0.0, 0.2, 1.0],
    accelerate: [0.4, 0.0, 1.0, 1.0],
    sharp: [0.4, 0.0, 0.6, 1.0],
  },

  // Duration constants
  duration: {
    instant: 0,
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 500,
    slowest: 800,
    
    // iOS standard durations
    quick: 200,
    medium: 300,
    long: 500,
  },

  // Spring configurations for React Native Animated
  spring: {
    gentle: {
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    },
    wobbly: {
      tension: 180,
      friction: 12,
      useNativeDriver: true,
    },
    stiff: {
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    },
    slow: {
      tension: 80,
      friction: 10,
      useNativeDriver: true,
    },
  },

  // Timing configurations
  timing: {
    quick: {
      duration: 200,
      useNativeDriver: true,
    },
    normal: {
      duration: 300,
      useNativeDriver: true,
    },
    slow: {
      duration: 500,
      useNativeDriver: true,
    },
  },

  // Common animation presets
  presets: {
    // Fade animations
    fadeIn: {
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 200,
    },
    fadeOut: {
      opacity: {
        from: 1,
        to: 0,
      },
      duration: 200,
    },

    // Scale animations
    scaleIn: {
      transform: [
        {
          scale: {
            from: 0.9,
            to: 1,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 200,
    },
    scaleOut: {
      transform: [
        {
          scale: {
            from: 1,
            to: 0.9,
          },
        },
      ],
      opacity: {
        from: 1,
        to: 0,
      },
      duration: 200,
    },

    // Slide animations
    slideInUp: {
      transform: [
        {
          translateY: {
            from: 50,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 300,
    },
    slideInDown: {
      transform: [
        {
          translateY: {
            from: -50,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 300,
    },
    slideInLeft: {
      transform: [
        {
          translateX: {
            from: -50,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 300,
    },
    slideInRight: {
      transform: [
        {
          translateX: {
            from: 50,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 300,
    },

    // Button press animation
    buttonPress: {
      transform: [
        {
          scale: {
            from: 1,
            to: 0.96,
          },
        },
      ],
      duration: 100,
    },

    // Modal animations
    modalPresent: {
      transform: [
        {
          scale: {
            from: 0.9,
            to: 1,
          },
        },
        {
          translateY: {
            from: 50,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 300,
    },

    // List item animations
    listItemEnter: {
      transform: [
        {
          translateX: {
            from: -20,
            to: 0,
          },
        },
      ],
      opacity: {
        from: 0,
        to: 1,
      },
      duration: 200,
    },
  },

  // Gesture animation values
  gestures: {
    swipeThreshold: 50,
    panResponderThreshold: 10,
    velocityThreshold: 0.3,
  },

  // Loading animation configurations
  loading: {
    rotation: {
      duration: 1000,
      loop: true,
    },
    pulse: {
      duration: 1500,
      loop: true,
      alternate: true,
    },
    bounce: {
      tension: 100,
      friction: 5,
      loop: true,
    },
  },
};

export default AryaAnimations;