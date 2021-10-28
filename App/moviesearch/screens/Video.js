import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const default_video = require('../assets/video/demo.mp4');

const Video = ({onClose}) => {
  return (
    <VideoPlayer
      onBack={() => onClose()}
      onEnd={() => onClose()}
      fullscreenOrientation="all"
      source={default_video}
    />
  );
};

export default Video;
