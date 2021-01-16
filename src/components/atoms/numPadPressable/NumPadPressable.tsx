import React, {FC, useCallback, useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {MathOperator} from '../../../types/MathOperator';

const SIZE = 64;

interface NumPadPressabelProps {
  onPress: (digit?: any) => void;
  digit: string;
  size?: number;
  disableDigitFoward?: boolean;
  expandHorizontally?: boolean;
  expandVertically?: boolean;
  darkShadowColor?: string;
  lightShadowColor?: string;
}

const NumPadPressable: FC<NumPadPressabelProps> = ({
  onPress,
  digit,
  size = SIZE,
  disableDigitFoward = false,
  expandVertically,
  expandHorizontally,
}) => {
  const [pressing, setPressing] = useState<boolean>(false);

  const onPressInCallback = useCallback(() => {
    setPressing(true);
  }, []);

  const onPressOutCallback = useCallback(() => {
    setPressing(false);
    onPress(!disableDigitFoward ? digit : undefined);
  }, [digit, disableDigitFoward, onPress]);

  const {text} = styles;

  return (
    <View style={{margin: 8}}>
      <Neomorph
        inner={pressing}
        style={{
          shadowOpacity: 0.3,
          shadowRadius: 3,
          borderRadius: size / 2,
          backgroundColor: '#DDDDDD',
          height: !expandVertically ? size : size * 2 + 16,
          width: !expandHorizontally ? size : size * 2 + 16,
        }}>
        <Pressable
          onPressIn={onPressInCallback}
          onPressOut={onPressOutCallback}
          // android_ripple={{
          //   borderless: false,
          //   radius: size / 2,
          // }}
          style={{
            height: !expandVertically ? size : size * 2 + 16,
            width: !expandHorizontally ? size : size * 2 + 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={text}>{digit}</Text>
        </Pressable>
      </Neomorph>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoMono-ExtraLight',
    color: '#575760',
    fontSize: 24,
  },
});

export default NumPadPressable;
