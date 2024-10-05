
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaReply, FaEllipsisV } from 'react-icons/fa'; 

export default function CommentSection({ videoId, userName }) { 
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null); 
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    
    fetchComments(videoId);
  }, [videoId]);

  const fetchComments = (videoId, pageToken = '') => {
    const apiKey = 'AIzaSyDVy38NDP9ppBRBDzn_D-Fa_aWGKmOdt_M'; 
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100&pageToken=${pageToken}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.items);
        setCommentCount(data.pageInfo.totalResults); 
        setNextPageToken(data.nextPageToken); 
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentData = {
      username: userName,
      text: newComment,
      videoId: videoId,
      createdAt: new Date().toISOString()
    };

    fetch('https://66e7e6bbb17821a9d9da704c.mockapi.io/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    })
      .then((response) => response.json())
      .then((data) => {
        const commentToAdd = {
          id: data.id, 
          snippet: {
            topLevelComment: {
              snippet: {
                authorDisplayName: userName,
                textDisplay: newComment,
                likeCount: 0,
                publishedAt: data.createdAt,
              },
            },
          },
        };

        setComments([commentToAdd, ...comments]);
        setNewComment('');
        setCommentCount(commentCount + 1);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  const getUserAvatar = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'A'; 
  };

  const renderCommentText = (text) => {
    const maxLength = 300; 
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="mt-6 text-white">
    
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <div className="text-lg font-bold">
          {commentCount.toLocaleString()} تعليقاً
        </div>
      </div>


      <div className="flex items-center mt-4 pb-4 border-b border-gray-800 flex-wrap">
        <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={handleAddComment}
            className="ml-4 bg-gray-900 text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            تعليق
          </button>
        </div>
        <input
          type="text"
          placeholder=" ... إضافة تعليق"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 ml-4 bg-transparent border-b border-gray-700 text-white text-right focus:outline-none w-full md:w-auto mt-2 md:mt-0 mr-2"
        />
        <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
          {getUserAvatar(userName)} 
        </div>
      </div>


      {comments.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">لا توجد تعليقات لعرضها</p>
      ) : (
        <>
          {(showAllComments ? comments : comments.slice(0, 2)).map((comment) => {
            const {
              authorDisplayName,
              authorProfileImageUrl,
              textDisplay,
              likeCount,
              publishedAt,
            } = comment.snippet.topLevelComment.snippet;

            return (
              <div
                key={comment.id}
                className="flex items-start p-4 bg-black text-white border-b border-gray-800 flex-wrap"
              >
             
                <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  {authorProfileImageUrl ? (
                    <img
                      src={authorProfileImageUrl}
                      alt={authorDisplayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    getUserAvatar(authorDisplayName)
                  )}
                </div>

                <div className="flex-1 text-right ml-2">
     
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300 text-sm font-semibold">{`@${authorDisplayName}`}</div>
                    <FaEllipsisV className="text-gray-400 cursor-pointer" />
                  </div>

                 
                  <p className="text-gray-400 text-sm mt-2 break-words">{renderCommentText(textDisplay)}</p>

    
                  <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
                    <div>{new Date(publishedAt).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} (تم التعديل)</div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 cursor-pointer">
                        <FaReply />
                        <span>رد</span>
                      </div>
                      <div className="flex items-center space-x-1 cursor-pointer">
                        <FaThumbsDown />
                        <span>لم يعجبني</span>
                      </div>
                      <div className="flex items-center space-x-1 cursor-pointer">
                        <FaThumbsUp />
                        <span>{likeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {!showAllComments && comments.length > 2 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllComments(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                إظهار المزيد من التعليقات
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
