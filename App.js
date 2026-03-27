import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { SafeAreaView } from 'react-native-safe-area-context';

import { faculties } from './data/faculties';
import CareerQuiz from './components/CareerQuiz';
import CourseDetails from './components/CourseDetails';
import ResultScreen from './components/ResultScreen';
import FacultyCard from './components/FacultyCard';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <ScrollView contentContainerStyle={styles.container}>
       
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
              LIMKOKWING UNIVERSITY OF CREATIVE TECHNOLOGY
            </Text>
            <Text style={styles.subHeader}>
              Digital Prospectus
            </Text>
          </View>

          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => navigation.navigate('CareerQuiz')}
          >
            <Text style={styles.quizButtonText}>
              Take Career Guide Quiz
            </Text>
          </TouchableOpacity>

          {faculties.map((faculty) => (
            <FacultyCard 
              key={faculty.id} 
              faculty={faculty} 
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0f2027' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CareerQuiz" component={CareerQuiz} options={{ title: 'Career Quiz' }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Recommended Courses' }} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  header: { fontSize: 30, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  subHeader: { fontSize: 16, color: '#d0d7de', marginTop: 4 },
  quizButton: {
    backgroundColor: '#fffde7',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  quizButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
  facultyCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  facultyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#2c3e50' }
});