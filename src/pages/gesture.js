import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

import { drawHand } from "@/utils/utilis";
import * as fp from "fingerpose";
import victory from "../images/victory.png";
import thumbs_up from "../images/thumbs_up.png";

export default function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 950);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      if (hand.length > 0) {
        console.log(hand?.length);
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          // console.log(gesture.gestures[maxConfidence].name);
          console.log(emoji);
          // setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji);
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      requestAnimationFrame(() => drawHand(hand, ctx));

      // drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className={`flex justify-center content-center`}>
      <Webcam
        ref={webcamRef}
        className="flex justify-center content-center"
        style={{
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute flex justify-center content-center"
        style={{
          zindex: 2,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}
