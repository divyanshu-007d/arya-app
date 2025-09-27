/**
 * ARYA Design System - Screen Container Component
 * Provides consistent screen layout with safe areas and proper spacing
 */
import React from 'react';
import { StyleSheet, StatusBar , View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import AryaSpacing from '../core/AryaSpacing';

const AryaScreen = ({ 
  children, 
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor = 'transparent',
  backgroundColor,
  padding = true,
  safeArea = true,
  translucent = true,
  style,
  ...props 
}) => {
  const theme = useTheme();
  
  const screenStyles = [
    styles.container,
    {
      backgroundColor: backgroundColor || theme.colors.background,
      paddingHorizontal: padding ? AryaSpacing.screen.paddingHorizontal : 0,
      paddingVertical: padding ? AryaSpacing.screen.paddingVertical : 0,
    },
    style,
  ];

  const ScreenWrapper = safeArea ? SafeAreaView : React.Fragment;
  const wrapperProps = safeArea ? { style: styles.safeArea } : {};

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={translucent}
      />
      <ScreenWrapper {...wrapperProps} {...props}>
        <View style={screenStyles}>
          {children}
        </View>
      </ScreenWrapper>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default AryaScreen;