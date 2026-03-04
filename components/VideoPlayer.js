import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer({ source }) {
  if (Platform.OS === 'web') {
    return (
      <video
        src={source}
        style={styles.video}
        controls
        loop
      />
    );
  }

  // mobile (iOS / Android)
  return (
    <Video
      source={source}
      style={styles.video}
      useNativeControls
      resizeMode="contain"
      isLooping
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: 'center',
  },
});