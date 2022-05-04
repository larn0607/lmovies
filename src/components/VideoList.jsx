import { useRef, useEffect } from 'react'

const VideoList = ({ videos }) => {
  return (
    <>
      {videos.map((video, index) => (
        <Video video={video} key={index} />
      ))}
    </>
  )
}

const Video = ({ video }) => {
  const iframeRef = useRef(null)
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  }, [])

  return (
    <div className="video">
      <div className="video__title">{video.name}</div>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        frameBorder="0"
        ref={iframeRef}
        width="100%"
        title="trailer"
      ></iframe>
    </div>
  )
}

export default VideoList
