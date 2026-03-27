import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CourseCard from './CourseCard';

export default function FacultyCard({ faculty }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      
     
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.title}>{faculty.name}</Text>
        <Text style={styles.toggle}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

     
    {open && (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingVertical: 10 }}
  >
    {faculty.courses.map((course) => (
      <CourseCard 
        key={course.id} 
        course={course} 
        navigation={navigation}
      />
    ))}
  </ScrollView>
)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
    



  },

  header: {
    backgroundColor: '#fffde7',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    alignContent:'center',
  },

  toggle: {
    color: '#000',
    fontSize: 16,
  },

  courses: {
    marginTop: 10,
  },
});