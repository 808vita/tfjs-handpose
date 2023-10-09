import { useEffect, useRef, useState } from "react";
import {
  createDetector,
  SupportedModels,
} from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import { drawHands ,drawFaces} from "@/utils/new-utils";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";

tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm`
);
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as faceMesh from '@mediapipe/face_mesh';


import * as fp from "fingerpose";

import createLandmarks from "fingerpose-ext";
import { bestMatch } from "@/custom-fingerpose/bestMatch";
import okGesture from "@/custom-fingerpose/okGesture";
import thumbsDown from "@/custom-fingerpose/thumbsDownGesture";

async function setupVideo() {
  const video = document.getElementById("video");
  const stream = await window.navigator.mediaDevices.getUserMedia({
    video: true,
  });

  video.srcObject = stream;
  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve();
    };
  });
  video.play();

  video.width = video.videoWidth;
  video.height = video.videoHeight;

  return video;
}

async function setupDetector() {
  const model = SupportedModels.MediaPipeHands;
  const detector = await createDetector(model, {
    runtime: "mediapipe",
    maxHands: 2,
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
  });

  return detector;
}

async function setupFaceDetector() {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detector = await faceLandmarksDetection.createDetector(model, {
      runtime: 'mediapipe',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
      maxFaces: 2,
      refineLandmarks: true
  });

  return detector;
}


async function setupCanvas(video) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.width;
  canvas.height = video.height;

  return ctx;
}

export default function Shop() {
  const detectorRef = useRef();
  const detectorFaceRef = useRef();
  const videoRef = useRef();
  const [ctx, setCtx] = useState();
  const contours = faceLandmarksDetection.util.getKeypointIndexByContour(faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh);

  useEffect(() => {
    async function initialize() {
      videoRef.current = await setupVideo();
      const ctx = await setupCanvas(videoRef.current);
      detectorRef.current = await setupDetector();
      detectorFaceRef.current = await setupFaceDetector();

      setCtx(ctx);
    }

    initialize();
  }, []);

  useAnimationFrame(async (delta) => {
    const hands = await detectorRef.current.estimateHands(video, {
      flipHorizontal: false,
    });
    const faces = await detectorFaceRef.current.estimateFaces(videoRef.current);
    
    ctx.clearRect(
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );

    console.log(hands);

    if (hands.length > 0) {
      console.log(hands?.length);
      const GE = new fp.GestureEstimator([
        // fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
        okGesture,
        thumbsDown,
      ]);
    

      let landmarks = createLandmarks(hands[0]);

      const gesture = await GE.estimate(landmarks, 7);

      console.log(gesture);
      if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        console.log(gesture.gestures);
        console.log(bestMatch(gesture.gestures));

      }
      //
    }

    drawHands(hands, ctx);
    drawFaces(faces, ctx, contours);
  }, !!(detectorRef.current && detectorFaceRef.current && videoRef.current && ctx));

  return (
    <div>
      <main>
        <canvas
          style={{
            transform: "scaleX(-1)",
            zIndex: 1,
            borderRadius: "1rem",
            boxShadow: "0 3px 10px rgb(0 0 0)",
            maxWidth: "85vw",
          }}
          id="canvas"
        ></canvas>
        <video
          style={{
            visibility: "hidden",
            transform: "scaleX(-1)",
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
          }}
          id="video"
          playsInline
        ></video>
      </main>
    </div>
  );
}
