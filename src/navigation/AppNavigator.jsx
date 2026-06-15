import React, { useState } from 'react';
import LoginScreen      from '../screens/LoginScreen';
import WorkOrderScreen  from '../screens/WorkOrderScreen';
import NavigationScreen from '../screens/NavigationScreen';
import SuccessScreen    from '../screens/SuccessScreen';

export default function AppNavigator() {
  const [screen, setScreen] = useState('Login');

  const navigation = {
    navigate: (name) => setScreen(name),
    replace:  (name) => setScreen(name),
    goBack:   () => setScreen('Login'),
  };

  if (screen === 'Login')      return <LoginScreen      navigation={navigation} />;
  if (screen === 'WorkOrder')  return <WorkOrderScreen  navigation={navigation} />;
  if (screen === 'Navigation') return <NavigationScreen navigation={navigation} />;
  if (screen === 'Success')    return <SuccessScreen    navigation={navigation} />;
}