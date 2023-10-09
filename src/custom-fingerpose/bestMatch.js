const bestMatch = (gestures) => {
  if (gestures.length > 0) {
    const confidence = gestures.map((g) => g.score);
    const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
    return gestures[maxConfidence];
  } else {
    return null;
  }
};

export { bestMatch };
