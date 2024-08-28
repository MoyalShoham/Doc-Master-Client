import {Button, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function GoogleSignIn({promptAsync}) {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <Ionicons name="logo-firebase" size={100} color="#FFA611" />
      <Text style={{fontSize: 32, fontWeight: 'bold', color: '#FFA611'}}>
        Sign In With {' '}
        <Text style={{color: '#4285F4'}}>
          G<Text style={{color: '#Ea4336'}}>
            o<Text style={{color: '#FBBC04'}}>
              o<Text style={{color: '#4285F4'}}>
                g<Text style={{color: '#34A853'}}>
                  l<Text style={{color: '#Ea4336'}}>
                    e
                    </Text>
                  </Text>
                </Text>
              </Text>
            </Text>
          </Text>
        </Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>And Firebase</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => promptAsync()}
        >
          <AntDesign name="google" size={30} color="white" />
          <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>
            Sign In With Google
          </Text>
        </TouchableOpacity> 
    </SafeAreaView>
  )
  
};