import React, {FC} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';

interface DisplayProps {
  calcDisplay: string;
  currentNumberDigits: string;
}

const Display: FC<DisplayProps> = ({calcDisplay, currentNumberDigits}) => {
  return (
    <View style={{flex: 1, margin: 16}}>
      <NeomorphFlex
        style={{
          flex: 1,
          shadowRadius: 3,
          padding: 16,
          backgroundColor: '#DDDDDD',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Neomorph
          inner
          style={{
            height: 110,
            width: 300,
            // flex: 1,
            // margin: 16,
            shadowRadius: 3,
            backgroundColor: '#DDDDDD',
            borderRadius: 10,
          }}>
          {/* <Text
            style={{
              flex: 1,
              textAlign: 'right',
              textAlignVertical: 'center',
              fontSize: 16,
              paddingHorizontal: 16,
            }}>
            {calcDisplay}
          </Text> */}

          <Text
            style={{
              flex: 3,
              textAlign: 'right',
              textAlignVertical: 'center',
              fontSize: 32,
              paddingHorizontal: 16,
            }}>
            {calcDisplay}
          </Text>
        </Neomorph>
      </NeomorphFlex>
    </View>
  );
};

export default Display;
