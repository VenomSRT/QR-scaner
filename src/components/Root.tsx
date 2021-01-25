import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Home} from './Home';
import {Scanner} from './Scanner';

export const Root = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={Home} initial />
        <Scene key="scanner" component={Scanner} />
      </Scene>
    </Router>
  );
};
