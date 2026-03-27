import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, ScrollView,StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { faculties } from '../data/faculties'; 

const questions = [
  { 
    id: 1, 
    question: "Do you enjoy working with numbers, data, or business strategy?", 
    options: [ { text: "Yes", value: "business" } ] 
  },
  { 
    id: 2, 
    question: "Do you enjoy designing, drawing, or creating visual content?", 
    options: [ { text: "Yes", value: "design"} ] 
  },
  { 
    id: 3, 
    question: "Are you interested in coding, computers or software?", 
    options: [ { text: "Yes", value: "technology" } ] 
  },
  { 
    id: 4, 
    question: "Do you enjoy speaking, writing, or communicating with people?", 
    options: [ { text: "Yes", value: "communication" } ] 
  },
  { 
    id: 5, 
    question: "Do you dream of planning events, tourism, or hospitality experiences?", 
    options: [ { text: "Yes", value: "tourism" } ] 
  },
  { 
    id: 6, 
    question: "Do you enjoy architecture, building, or spatial design?", 
    options: [ { text: "Yes", value: "architecture" } ] 
  }
];


const categoryToFaculty = {
  business: "FACULTY OF BUSINESS AND GLOBALIZATION",
  technology: "FACULTY OF INFORMATION AND COMMUNICATION TECHNOLOGY",
  communication: "FACULTY OF COMMUNICATION, MEDIA AND BROADCASTING",
  tourism: "FACULTY OF CREATIVITY IN TOURISM AND HOSPITALITY",
  design: "FACULTY OF DESIGN INNOVATION",
  architecture: "FACULTY OF ARCHITECTURE AND THE BUILT ENVIRONMENT",
};

export default function CareerQuiz({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (value) => {
    
    const newAnswers = value ? [...answers, value] : [...answers];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
     
      const counts = {};
      newAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);

      if (Object.keys(counts).length === 0) {
        
        navigation.navigate("ResultScreen", { faculties: [] });
        return;
      }

      
      const sortedCategories = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);

      
      const recommendedFaculties = sortedCategories.map(cat => faculties.find(f => f.name === categoryToFaculty[cat]));

      navigation.navigate("ResultScreen", { faculties: recommendedFaculties });
    }
  };

  const question = questions[currentQuestion];

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content"/>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Career Guide Quiz</Text>

          <View style={styles.card}>
            <Text style={styles.question}>{question.question}</Text>

            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}

            
            <TouchableOpacity
              style={[styles.optionButton, { backgroundColor: '#e74c3c' }]}
              onPress={() => handleAnswer(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${((currentQuestion + 1)/questions.length)*100}%`}]} />
          </View>

          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 180, flexGrow:1, justifyContent:'center' },
  header: { fontSize:28, fontWeight:'700', color:'#fff', textAlign:'center', marginBottom:30 },
  card: { backgroundColor:'rgba(255,255,255,0.98)', padding:25, borderRadius:16, marginBottom:20, shadowColor:'#000', shadowOpacity:0.15, shadowOffset:{width:0,height:4}, shadowRadius:6, elevation:5 },
  question: { fontSize:20, fontWeight:'700', marginBottom:20, color:'#2c3e50', textAlign:'center' },
  optionButton: { backgroundColor:'#1abc9c', paddingVertical:12, paddingHorizontal:100, borderRadius:12, marginBottom:15, alignItems:'center' },
  optionText: { color:'#fff', fontSize:16, fontWeight:'600' },
  progressBarContainer: { height:6, width:'100%', backgroundColor:'rgba(255,255,255,0.3)', borderRadius:3, marginBottom:8 },
  progressBar: { height:'100%', backgroundColor:'#1abc9c', borderRadius:3 },
  progressText: { textAlign:'center', color:'#ecf0f1', fontWeight:'500' }
});