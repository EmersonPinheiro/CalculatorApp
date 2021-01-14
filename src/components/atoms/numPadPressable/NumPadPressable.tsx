import React, {FC, useCallback} from 'react';
import {Text, Pressable, View} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {MathOperator} from '../../../types/MathOperator';

const SIZE = 64;

interface NumPadPressabelProps {
  onPress: (digit?: any) => void;
  digit: string;
  size?: number;
  disableDigitFoward?: boolean;
}

const NumPadPressable: FC<NumPadPressabelProps> = ({
  onPress,
  digit,
  size = SIZE,
  disableDigitFoward = false,
}) => {
  const onPressCallback = useCallback(() => {
    onPress(!disableDigitFoward ? digit : undefined);
  }, [digit, disableDigitFoward, onPress]);

  return (
    <View style={{margin: 8}}>
      <Neomorph
        style={{
          shadowRadius: 3,
          borderRadius: size / 2,
          backgroundColor: '#DDDDDD',
          width: size,
          height: size,
        }}>
        <Pressable
          onPress={onPressCallback}
          android_ripple={{
            borderless: false,
            radius: size / 2,
          }}
          style={{
            height: size,
            width: size,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{digit}</Text>
        </Pressable>
      </Neomorph>

      {/* <Neomorph
        style={{
          shadowRadius: 10,
          borderRadius: 200 / 2,
          backgroundColor: '#DDDDDD',
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Neomorph
          inner
          style={{
            shadowRadius: 10,
            borderRadius: 120 / 2,
            backgroundColor: '#20bf55',
            width: 120,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Neomorph
            style={{
              shadowRadius: 10,
              borderRadius: 40 / 2,
              backgroundColor: '#c6d2ed',
              width: 40,
              height: 40,
            }}
          />
        </Neomorph>
      </Neomorph> */}
    </View>
  );
};

export default NumPadPressable;
