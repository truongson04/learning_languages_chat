import { VideoIcon } from "lucide-react";

export default function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-5 right-20 z-10">
      <button
        className="btn btn-success btn-sm text-white"
        onClick={handleVideoCall}
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}
