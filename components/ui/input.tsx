import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '~/lib/utils';

export const Input = React.forwardRef<TextInput, TextInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'border border-input rounded-md px-4 py-3 text-base text-foreground bg-background focus:border-primary focus:ring-2 focus:ring-primary',
          className
        )}
        placeholderTextColor="#888"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input'; 