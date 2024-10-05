
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare } from 'react-icons/fa'; 
import CommentSection from './CommentSection'; 
import AdComponent from './AdComponent'; 

export default function MainPage({ searchTerm }) { 
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null); 
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const apiKey = 'AIzaSyDVy38NDP9ppBRBDzn_D-Fa_aWGKmOdt_M'; 

    const apiUrl = searchTerm 
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=10&type=video&regionCode=SA&key=${apiKey}` 
      : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=SA&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        return response.json();
      })
      .then((data) => {
        const videoItems = searchTerm ? data.items.map(item => ({ ...item, id: item.id.videoId })) : data.items;
        setVideos(videoItems);
        setSelectedVideo(videoItems[0]);

        if (videoItems[0]) {
          fetchChannelInfo(videoItems[0].snippet.channelId, apiKey); 
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load videos. Please try again later.');
      });
  }, [searchTerm]);

  const fetchChannelInfo = (channelId, apiKey) => {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    
    fetch(channelUrl)
      .then((response) => response.json())
      .then((data) => {
        setChannelInfo(data.items[0]);
      })
      .catch((error) => {
        console.error("Error fetching channel data", error);
      });
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setShowFullDescription(false);
    fetchChannelInfo(video.snippet.channelId, 'AIzaSyDVy38NDP9ppBRBDzn_D-Fa_aWGKmOdt_M'); 
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="flex flex-col p-4 bg-black text-white min-h-screen">
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col lg:flex-row-reverse">
    
        <div className="w-full lg:w-2/3 p-4">
          {selectedVideo && (
            <div className="mb-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  title={selectedVideo.snippet.title}
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <h2 className="text-2xl font-bold mt-4">{selectedVideo.snippet.title}</h2>
              <p className="text-gray-400">
                {showFullDescription
                  ? selectedVideo.snippet.description
                  : `${selectedVideo.snippet.description.slice(0, 100)}...`}
              </p>
              <button onClick={toggleDescription} className="text-blue-500 mt-2">
                {showFullDescription ? 'عرض أقل' : 'عرض المزيد'}
              </button>

              {channelInfo && (
                <div className="flex items-center  mt-4 space-x-4">
                  <img src={channelInfo.snippet.thumbnails.default.url} alt={channelInfo.snippet.title} className="w-12 h-12 rounded-full" />
                  <div className="text-gray-300">
                    <h4 className="text-lg font-bold">{channelInfo.snippet.title}</h4>
                    <p className="text-gray-400">{parseInt(channelInfo.statistics.subscriberCount).toLocaleString()} مشترك</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end items-center space-x-4 mt-4 text-gray-400">
                <button className="flex items-center space-x-2">
                  <FaThumbsUp className="text-white" />
                  <span>108 ألف</span>
                </button>
                <button className="flex items-center space-x-2">
                  <FaThumbsDown className="text-white" />
                  <span>لم يعجبني</span>
                </button>
                <button className="flex items-center space-x-2">
                  <FaShare className="text-white" />
                  <span>مشاركة</span>
                </button>
              </div>

              <div className="flex justify-end items-center space-x-4 mt-4 text-gray-400">
                <button className="bg-white text-black px-4 py-2 rounded-full">اشترك</button>
                <button className="bg-white text-black px-4 py-2 rounded-full">الانضمام</button>
              </div>

  
              <CommentSection videoId={selectedVideo.id} />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3 p-4">
 
          <div className="mb-4">
            <AdComponent />
          </div>

          <h3 className="text-lg font-bold mb-2 text-right">Related Videos</h3>
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.id} className="cursor-pointer flex space-x-2 items-start" onClick={() => handleVideoSelect(video)}>
                <div className="flex-1 text-right">
                  <h4 className="text-sm font-bold text-white leading-tight">{video.snippet.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{video.snippet.channelTitle}</p>
                  <p className="text-xs text-gray-400">{Math.floor(Math.random() * 1000)} ألف مشاهدة</p>
                  <p className="text-xs text-gray-400">قبل {Math.floor(Math.random() * 5)} أيام</p>
                </div>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-40 h-24 object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
