import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


import { Video } from 'expo-av';


const facultyColors = {
  "FACULTY OF BUSINESS AND GLOBALIZATION": '#1abc9c',
  "FACULTY OF INFORMATION AND COMMUNICATION TECHNOLOGY": '#3498db',
  "FACULTY OF COMMUNICATION, MEDIA AND BROADCASTING": '#9b59b6',
  "FACULTY OF CREATIVITY IN TOURISM AND HOSPITALITY": '#e67e22',
  "FACULTY OF DESIGN INNOVATION": '#e74c3c',
  "FACULTY OF ARCHITECTURE AND THE BUILT ENVIRONMENT": '#f1c40f',
};

export default function ResultScreen({ route }) {
  const { faculties } = route.params;
  const [expandedCourseIds, setExpandedCourseIds] = useState([]);

  
  if (!faculties || faculties.length === 0) {
    return (
      <LinearGradient 
        colors={['#0f2027', '#203a43', '#2c5364']} 
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>No Recommended Faculty Found</Text>
          <Text style={styles.subHeader}>
            It seems your interests didn’t match any faculty.
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  
  const toggleExpand = (courseId) => {
    if (expandedCourseIds.includes(courseId)) {
      setExpandedCourseIds(expandedCourseIds.filter(id => id !== courseId));
    } else {
      setExpandedCourseIds([...expandedCourseIds, courseId]);
    }
  };

  return (
    <LinearGradient 
      colors={['#0f2027', '#203a43', '#2c5364']} 
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex:1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          
        
          <Text style={styles.header}>Recommended Faculties</Text>

          
          {faculties.map((faculty, idx) => {
            const color = facultyColors[faculty.name] || '#1abc9c';

            return (
              <View key={idx} style={styles.facultySection}>
                
                
                <Text style={[styles.facultyName, { color }]}>
                  {faculty.name}
                </Text>

                <Text style={styles.subHeader}>Recommended Courses:</Text>

              
                {faculty.courses.map(course => {
                  const expanded = expandedCourseIds.includes(course.id);

                  return (
                    <TouchableOpacity 
                      key={course.id} 
                      style={[
                        styles.courseCard, 
                        { borderColor: color, borderWidth: 2 }
                      ]} 
                      onPress={() => toggleExpand(course.id)}
                      activeOpacity={0.9}
                    >
                      
                      {course.image && (
                        <Image 
                          source={course.image} 
                          style={styles.courseImage} 
                        />
                      )}

                    
                      <Text style={styles.courseName}>{course.name}</Text>
                      <Text style={styles.courseDesc}>{course.description}</Text>
                      <Text style={styles.courseMeta}>
                        Duration: {course.duration} | Intake: {course.intake.join(', ')}
                      </Text>

                      
                      {expanded && (
                        <View style={styles.expandedSection}>
                          
                        
                          {course.video && (
                            <Video
                              source={
                                typeof course.video === 'string' 
                                  ? { uri: course.video }
                                  : course.video             
                              }
                              style={styles.video}
                              useNativeControls
                              resizeMode="contain"
                              isLooping
                            />
                          )}

                          
                          <Text style={styles.careerHeader}>
                            Possible Career Paths:
                          </Text>
                          {course.careerPaths.map((career, i) => (
                            <Text key={i} style={styles.careerItem}>
                              • {career}
                            </Text>
                          ))}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 120, 
    flexGrow:1, 
    alignItems: 'center'
  },

  header: { 
    fontSize:28, 
    fontWeight:'700', 
    color:'#fff', 
    marginBottom:20, 
    textAlign:'center' 
  },

  subHeader: { 
    fontSize:18, 
    fontWeight:'600', 
    color:'#ecf0f1', 
    marginBottom:15, 
    textAlign:'center' 
  },

  facultySection: { 
    width: '100%', 
    marginBottom:40, 
    alignItems: 'center'
  },

  facultyName: { 
    fontSize:22, 
    fontWeight:'700', 
    marginBottom:10, 
    textAlign:'center' 
  },

  courseCard: { 
    backgroundColor:'rgba(255,255,255,0.95)', 
    padding:20, 
    borderRadius:14, 
    marginBottom:20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4 
  },

  courseImage: { 
    width: '80%', 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 12, 
    alignSelf:'center' 
  },

  courseName: { 
    fontSize:18, 
    fontWeight:'700', 
    color:'#2c3e50', 
    marginBottom:6, 
    textAlign:'center' 
  },

  courseDesc: { 
    fontSize:16, 
    color:'#34495e', 
    textAlign:'center',
    marginBottom:6 
  },

  courseMeta: {
    fontSize:14,
    color:'#7f8c8d',
    textAlign:'center',
    marginBottom:6
  },

  expandedSection: { 
    marginTop:12, 
    width:'100%', 
    alignItems: 'center',
    flexShrink: 0 
  },

  video: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    alignContent: 'center'
  },

  careerHeader: {
    fontWeight: '700',
    fontSize:16,
    color:'#2c3e50',
    marginBottom:6,
    textAlign:'center'
  },

  careerItem: {
    fontSize:14,
    color:'#34495e',
    textAlign:'center',
    marginBottom:2
  }
});