import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Navigation from './app/navigation';
import {useScreens} from 'react-native-screens';
useScreens();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
