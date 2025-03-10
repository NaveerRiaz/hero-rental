import React, { useEffect, useRef } from "react";

const YouTubeLoop = ({ videoId, startTime, endTime }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Wait for YouTube API to load
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          start: startTime,
          end: endTime,
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          mute: 1,
          showinfo: 0
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              checkTime();
            }
          },
        },
      });
    };

    function checkTime() {
      if (playerRef.current) {
        const interval = setInterval(() => {
          const currentTime = playerRef.current.getCurrentTime();
          if (currentTime >= endTime) {
            playerRef.current.seekTo(startTime);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [videoId, startTime, endTime]);

  return <div className="w-full absolute top-0 h-full object-fill -z-10" id="youtube-player" />;
};

export default YouTubeLoop;
