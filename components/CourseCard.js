import React, { useState, useRef } from 'react';
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Modal 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function CourseCard({ course }) {
  const [rating, setRating] = useState(course.rating || 0);
  const [showVideo, setShowVideo] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate stars when rating changes
  const handleRate = () => {
    if (rating < 6) {
      setRating(rating + 1);
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.4, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true })
      ]).start();
    }
  };

  // Render 6 stars, highlight up to current rating
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

      {/* VIDEO BUTTON */}
      {course.video && (
        <TouchableOpacity style={styles.videoButton} onPress={() => setShowVideo(true)}>
          <FontAwesome name="play-circle" size={20} color="#fff" />
          <Text style={styles.videoText}>Watch Course Video</Text>
        </TouchableOpacity>
      )}

      {/* VIDEO MODAL */}
      <Modal visible={showVideo} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <WebView
            source={{ uri: course.video }}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowVideo(false)}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close Video</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Course Info */}
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

      {/* Rating */}
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

  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },

  videoText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },

  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
  },

  info: { marginBottom: 8 },

  name: { fontWeight: '700', fontSize: 16, color: '#fff', textAlign: 'center' },

  description: { fontSize: 13, color: '#ecf0f1', marginTop: 4 },

  extra: { fontSize: 12, color: '#bdc3c7', marginTop: 2 },

  careerChip: {
    backgroundColor: '#34495e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
  },

  careerText: { fontSize: 14, color: '#ecf0f1' },

  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  rateButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  rateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});