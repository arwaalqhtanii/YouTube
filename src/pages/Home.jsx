
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa';
import CommentSection from './CommentSection'; 
import AdComponent from './AdComponent'; 

export default function Home({ searchTerm }) { 
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = 'AIzaSyBpEOSnwjPiDRqLoNQDfx9Q5jMd1ZifGlQ';
    const apiUrl = searchTerm
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=10&type=video&key=${apiKey}`
      : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=SA&maxResults=10&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const videoItems = searchTerm ? data.items.map(item => ({ ...item, id: item.id.videoId })) : data.items;
        setVideos(videoItems);
        setSelectedVideo(videoItems[0]);
      })
      .catch(() => {
        setError('Failed to load videos. Please try again later.');
      });
  }, [searchTerm]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {error && <p className="text-red-500">{error}</p>}

      <div className="container mx-auto flex">

        <div className="flex-1 grid grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="cursor-pointer"
              onClick={() => handleVideoSelect(video)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="text-white text-sm mt-2">{video.snippet.title}</h4>
              <p className="text-gray-400 text-xs">{video.snippet.channelTitle}</p>
            </div>
          ))}
        </div>

    
        <div className="w-1/3 ml-4">
          <AdComponent />
        </div>
      </div>
    </div>
  );
}
