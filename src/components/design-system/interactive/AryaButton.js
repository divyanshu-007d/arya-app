/**
 * ARYA Design System - Enhanced Button Component
 * Beautiful, accessible buttons with consistent styling
 */
import React from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AryaSpacing from '../core/AryaSpacing';
import AryaAnimations from '../core/AryaAnimations';

const AryaButton = ({
  children,
  variant = 'contained', // 'contained', 'outlined', 'text', 'gradient'
  size = 'medium', // 'small', 'medium', 'large'
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  gradient,
  style,
  labelStyle,
  contentStyle,
  onPress,
  animated = true,
  ...props
}) => {
  const theme = useTheme();
  const scaleValue = new Animated.Value(1);

  const getSizeProps = (sizeVariant) => {
    const sizeMap = {
      small: {
        contentStyle: {
          height: 36,
          paddingHorizontal: AryaSpacing.button.paddingSmall,
        },
        labelStyle: { fontSize: 14 },
      },
      medium: {
        contentStyle: {
          height: 44,
          paddingHorizontal: AryaSpacing.button.paddingHorizontal,
        },
        labelStyle: { fontSize: 16 },
      },
      large: {
        contentStyle: {
          height: 52,
          paddingHorizontal: AryaSpacing.button.paddingLarge,
        },
        labelStyle: { fontSize: 18 },
      },
    };

    return sizeMap[sizeVariant] || sizeMap.medium;
  };

  const sizeProps = getSizeProps(size);

  const buttonStyles = [
    styles.button,
    fullWidth && styles.fullWidth,
    style,
  ];

  const buttonContentStyles = [
    sizeProps.contentStyle,
    contentStyle,
  ];

  const buttonLabelStyles = [
    sizeProps.labelStyle,
    labelStyle,
  ];

  const animatePress = () => {
    if (!animated) return;

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.96,
        duration: AryaAnimations.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: AryaAnimations.duration.fast,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (event) => {
    animatePress();
    onPress && onPress(event);
  };

  if (variant === 'gradient' && gradient) {
    return (
      <TouchableWithoutFeedback onPress={handlePress} disabled={disabled || loading}>
        <Animated.View
          style={[
            buttonStyles,
            { transform: [{ scale: scaleValue }] },
            disabled && styles.disabled,
          ]}
        >
          <LinearGradient
            colors={gradient}
            style={[
              styles.gradientButton,
              buttonContentStyles,
              { borderRadius: theme.roundness },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <PaperButton
              mode="text"
              icon={icon}
              loading={loading}
              disabled={disabled}
              labelStyle={[
                buttonLabelStyles,
                { color: theme.colors.onPrimary },
              ]}
              contentStyle={styles.gradientButtonContent}
              style={styles.transparentButton}
              {...props}
            >
              {children}
            </PaperButton>
          </LinearGradient>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Animated.View
      style={[
        buttonStyles,
        { transform: animated ? [{ scale: scaleValue }] : [] },
      ]}
    >
      <PaperButton
        mode={variant}
        icon={icon}
        loading={loading}
        disabled={disabled}
        onPress={handlePress}
        style={[styles.paperButton, style]}
        contentStyle={buttonContentStyles}
        labelStyle={buttonLabelStyles}
        {...props}
      >
        {children}
      </PaperButton>
    </Animated.View>
  );
};

// Predefined button variants
AryaButton.Primary = (props) => <AryaButton variant="contained" {...props} />;
AryaButton.Secondary = (props) => <AryaButton variant="outlined" {...props} />;
AryaButton.Ghost = (props) => <AryaButton variant="text" {...props} />;
AryaButton.Gradient = (props) => <AryaButton variant="gradient" {...props} />;

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  paperButton: {
    borderRadius: 12,
  },
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientButtonContent: {
    height: '100%',
    margin: 0,
    padding: 0,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AryaButton;