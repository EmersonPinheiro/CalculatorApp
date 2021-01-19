import React, {FC, useCallback, useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';

const SIZE = 64;

interface NumPadPressabelProps {
  onPress: (digit?: any) => void;
  digit: string;
  size?: number;
  disableDigitForward?: boolean;
  expandHorizontally?: boolean;
  expandVertically?: boolean;
  backgroundColor?: string;
  fontColor?: string;
}

const NumPadPressable: FC<NumPadPressabelProps> = ({
  onPress,
  digit,
  size = SIZE,
  disableDigitForward = false,
  expandVertically,
  expandHorizontally,
  backgroundColor,
  fontColor,
}) => {
  const [pressing, setPressing] = useState<boolean>(false);

  const onPressInCallback = useCallback(() => {
    setPressing(true);
  }, []);

  const onPressOutCallback = useCallback(() => {
    setPressing(false);
    onPress(!disableDigitForward ? digit : undefined);
  }, [digit, disableDigitForward, onPress]);

  const {text} = styles;

  return (
    <View style={{margin: 8}}>
      <Neomorph
        inner={pressing}
        style={{
          shadowOpacity: 0.3,
          shadowRadius: 4,
          borderRadius: size / 2,
          backgroundColor: backgroundColor ?? '#DDDDDD',
          height: !expandVertically ? size : size * 2 + 16,
          width: !expandHorizontally ? size : size * 2 + 16,
        }}>
        <Pressable
          onPressIn={onPressInCallback}
          onPressOut={onPressOutCallback}
          style={{
            height: !expandVertically ? size : size * 2 + 16,
            width: !expandHorizontally ? size : size * 2 + 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[text, {color: fontColor ?? '#575760'}]}>{digit}</Text>
        </Pressable>
      </Neomorph>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoMono-Light',
    fontSize: 26,
  },
});

export default NumPadPressable;
