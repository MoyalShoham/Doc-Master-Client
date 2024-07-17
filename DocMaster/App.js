import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import ErrorBoundary from './components/error-boundary';

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </ErrorBoundary>
  );
}
