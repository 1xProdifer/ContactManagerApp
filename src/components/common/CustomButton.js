import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '../../styles/globalStyles';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style = {},
  textStyle = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.border,
  },
});

export default CustomButton;
