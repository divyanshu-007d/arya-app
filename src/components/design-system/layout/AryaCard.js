/**
 * ARYA Design System - Enhanced Card Component
 * Beautiful, consistent cards with proper shadows and spacing
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card as PaperCard, Surface, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AryaSpacing from '../core/AryaSpacing';

const AryaCard = ({
  children,
  variant = 'elevated', // 'elevated', 'outlined', 'filled', 'gradient'
  elevation = 2,
  padding = 'medium',
  margin,
  borderRadius,
  gradient,
  style,
  contentStyle,
  onPress,
  disabled = false,
  ...props
}) => {
  const theme = useTheme();

  const getPaddingValue = (paddingProp) => {
    if (typeof paddingProp === 'number') return paddingProp;
    
    const paddingMap = {
      none: 0,
      small: AryaSpacing.card.padding - 4,
      medium: AryaSpacing.card.padding,
      large: AryaSpacing.card.paddingLarge,
    };
    
    return paddingMap[paddingProp] || AryaSpacing.card.padding;
  };

  const cardStyles = [
    styles.card,
    {
      borderRadius: borderRadius || theme.roundness,
      margin: margin || 0,
    },
    variant === 'outlined' && {
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    disabled && styles.disabled,
    style,
  ];

  const cardContentStyles = [
    styles.content,
    {
      padding: getPaddingValue(padding),
    },
    contentStyle,
  ];

  const renderCard = () => {
    if (variant === 'gradient' && gradient) {
      return (
        <Surface
          style={cardStyles}
          elevation={elevation}
          {...props}
        >
          <LinearGradient
            colors={gradient}
            style={[
              styles.gradientContainer,
              { borderRadius: borderRadius || theme.roundness }
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={cardContentStyles}>
              {children}
            </View>
          </LinearGradient>
        </Surface>
      );
    }

    return (
      <PaperCard
        style={cardStyles}
        elevation={variant === 'elevated' ? elevation : 0}
        mode={variant === 'outlined' ? 'outlined' : 'contained'}
        onPress={onPress}
        disabled={disabled}
        {...props}
      >
        <PaperCard.Content style={cardContentStyles}>
          {children}
        </PaperCard.Content>
      </PaperCard>
    );
  };

  return renderCard();
};

// Predefined card variants
AryaCard.Elevated = (props) => <AryaCard variant="elevated" {...props} />;
AryaCard.Outlined = (props) => <AryaCard variant="outlined" {...props} />;
AryaCard.Filled = (props) => <AryaCard variant="filled" {...props} />;
AryaCard.Gradient = (props) => <AryaCard variant="gradient" {...props} />;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  content: {
    // Default content styling
  },
  gradientContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AryaCard;