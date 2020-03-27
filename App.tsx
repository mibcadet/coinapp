import * as React from 'react';
import { View } from 'react-native';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hello world!</Text>
          </View>
      </ApplicationProvider>
    </>
  );
}
