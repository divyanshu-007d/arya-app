/**
 * ARYA Design System - Enhanced Avatar Component
 * Beautiful avatar with consistent sizing and styling
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar as PaperAvatar, useTheme } from 'react-native-paper';

const AryaAvatar = ({
  source,
  size = 'medium', // 'small', 'medium', 'large', 'xlarge' or number
  variant = 'image', // 'image', 'text', 'icon'
  label, // For text avatars
  icon, // For icon avatars
  color,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getSizeValue = (sizeVariant) => {
    if (typeof sizeVariant === 'number') return sizeVariant;
    
    const sizeMap = {
      xsmall: 32,
      small: 40,
      medium: 56,
      large: 72,
      xlarge: 96,
    };
    
    return sizeMap[sizeVariant] || 56;
  };

  const sizeValue = getSizeValue(size);
  
  const avatarStyles = [
    styles.avatar,
    {
      backgroundColor: color || theme.colors.primary,
    },
    style,
  ];

  const renderAvatar = () => {
    switch (variant) {
      case 'text':
        return (
          <PaperAvatar.Text
            size={sizeValue}
            label={label}
            style={avatarStyles}
            {...props}
          />
        );
      case 'icon':
        return (
          <PaperAvatar.Icon
            size={sizeValue}
            icon={icon}
            style={avatarStyles}
            {...props}
          />
        );
      case 'image':
      default:
        return (
          <PaperAvatar.Image
            size={sizeValue}
            source={source}
            style={avatarStyles}
            {...props}
          />
        );
    }
  };

  return renderAvatar();
};

// Predefined size variants
AryaAvatar.Small = (props) => <AryaAvatar size="small" {...props} />;
AryaAvatar.Medium = (props) => <AryaAvatar size="medium" {...props} />;
AryaAvatar.Large = (props) => <AryaAvatar size="large" {...props} />;
AryaAvatar.XLarge = (props) => <AryaAvatar size="xlarge" {...props} />;

const styles = StyleSheet.create({
  avatar: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default AryaAvatar;