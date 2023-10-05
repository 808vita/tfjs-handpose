
import dynamic from 'next/dynamic';

const FaceLandmarksDetection = dynamic(() => import("@/components/FaceDetection"), {
    ssr: false
})

export default function FaceLandmarkDetection() {
    return (
        <div >
            <main>
          

                {/* <FaceMeshComponent></FaceMeshComponent> */}
                <FaceLandmarksDetection></FaceLandmarksDetection>
            </main>
        </div>
    )
}