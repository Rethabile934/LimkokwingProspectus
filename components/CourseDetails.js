import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

export default function CourseCard({ course }) {
  const [rating, setRating] = useState(course.rating || 0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleRate = () => {
    if (rating < 6) {
      setRating(rating + 1);
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.4, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true })
      ]).start();
    }
  };

  const renderStars = () => {
    return [...Array(6)].map((_, idx) => (
      <Animated.View key={idx} style={{ transform: idx === rating - 1 ? [{ scale: scaleAnim }] : [] }}>
        <FontAwesome
          name={idx < rating ? 'star' : 'star-o'}
          size={20}
          color={idx < rating ? '#f1c40f' : '#dcdcdc'}
          style={{ marginRight: 2 }}
        />
      </Animated.View>
    ));
  };

  return (
    <View style={styles.card}>
      {course.image && <Image source={course.image} style={styles.image} />}

      <View style={styles.info}>
        <Text style={styles.name}>{course.name}</Text>
        <Text style={styles.description}>{course.description}</Text>

        {course.duration && <Text style={styles.extra}>Duration: {course.duration}</Text>}
        {course.intake && <Text style={styles.extra}>Intake: {course.intake.join(', ')}</Text>}

        {course.careerPaths && (
          <View style={{ marginTop: 6 }}>
            <Text style={styles.extra}>Career Paths:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {course.careerPaths.map((path, idx) => (
                <View key={idx} style={styles.careerChip}>
                  <Text style={styles.careerText}>{path}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {course.video && (
        <Video
          source={course.video}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}

      <View style={styles.ratingContainer}>
        <View style={{ flexDirection: 'row' }}>{renderStars()}</View>
        <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
          <Text style={styles.rateButtonText}>Give +1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    borderRadius: 12,
    backgroundColor: '#000',
    marginRight: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: { width: '100%', height: 140, borderRadius: 8, marginBottom: 8 },
  info: { marginBottom: 8 },
  name: { fontWeight: '700', fontSize: 16, color: '#2c3e50', textAlign: 'center' },
  description: { fontSize: 13, color: '#7f8c8d', marginTop: 4 },
  extra: { fontSize: 12, color: '#34495e', marginTop: 2 },
  careerChip: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
  },
  careerText: { fontSize: 18, color: '#2c3e50' },
  video: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  rateButton: { backgroundColor: '#27ae60', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  rateButtonText: { color: '#fff', fontWeight: 'bold' },
});