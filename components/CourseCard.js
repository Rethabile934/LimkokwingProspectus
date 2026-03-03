import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

export default function CourseCard({ course }) {
  const [rating, setRating] = useState(course.rating || 0);

  const handleRate = () => {
    if (rating < 6) setRating(rating + 1);
  };

  return (
    <View style={styles.card}>
      {course.image && <Image source={course.image} style={styles.image} />}

      <View style={styles.info}>
        <Text style={styles.name}>{course.name}</Text>
        <Text style={styles.description}>{course.description}</Text>

        {course.duration && <Text style={styles.extra}>Duration: {course.duration}</Text>}
        {course.intake && <Text style={styles.extra}>Intake: {course.intake.join(", ")}</Text>}

        {course.careerPaths && (
          <View style={{ marginTop: 4 }}>
            <Text style={styles.extra}>Career Paths:</Text>
            {course.careerPaths.map((path, idx) => (
              <Text key={idx} style={styles.careerPath}>• {path}</Text>
            ))}
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
        <Text style={styles.ratingText}>Rating: {rating}/6</Text>
        <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
          <Text style={styles.rateButtonText}>Give +1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    borderRadius: 12,
    backgroundColor: '#bdc3c7',
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
  description: { fontSize: 13, color: '#2c3e50', marginTop: 4 },
  extra: { fontSize: 12, color: '#34495e', marginTop: 2 },
  careerPath: { fontSize: 12, color: '#2c3eso', marginLeft: 8 },
  video: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingText: { fontWeight: '600', color: '#34495e' },
  rateButton: { backgroundColor: '#27ae60', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  rateButtonText: { color: '#fff', fontWeight: 'bold' },
});