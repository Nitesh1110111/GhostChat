import React, { useState } from 'react';
import { FaHeart, FaComment, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function PostCard({ post, anonymousId, onPostUpdate, onDelete }) {
  const [liked, setLiked] = useState(post.likes.includes(anonymousId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${post.id}/like`,
        {},
        { headers: { 'X-Anonymous-ID': anonymousId } }
      );
      setLiked(response.data.liked);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleLoadComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/posts/${post.id}/comments`,
        { headers: { 'X-Anonymous-ID': anonymousId } }
      );
      setComments(response.data.comments);
      setShowComments(true);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/posts/${post.id}/comments`,
        { text: newComment },
        { headers: { 'X-Anonymous-ID': anonymousId } }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      try {
        await axios.delete(
          `${API_URL}/api/posts/${post.id}`,
          { headers: { 'X-Anonymous-ID': anonymousId } }
        );
        onDelete(post.id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden card-shadow mb-6 text-white animate-slideUp">
      {/* Image */}
      <div className="relative w-full bg-black/20">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Caption */}
      <div className="p-4">
        {post.caption && (
          <p className="mb-3 text-sm leading-relaxed">{post.caption}</p>
        )}

        {/* Hashtags */}
        {post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.map((tag, idx) => (
              <span key={idx} className="text-ghost-300 text-sm hover:text-ghost-200 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="text-xs text-white/60 mb-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition duration-300 ${
              liked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
            }`}
          >
            <FaHeart className={liked ? 'fill-current' : ''} />
            <span className="text-sm">{likeCount}</span>
          </button>

          <button
            onClick={handleLoadComments}
            className="flex items-center gap-2 text-white/60 hover:text-ghost-300 transition duration-300"
          >
            <FaComment />
            <span className="text-sm">{post.comments.length}</span>
          </button>

          {post.author === anonymousId && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-white/60 hover:text-red-400 transition duration-300 ml-auto"
            >
              <FaTrash />
            </button>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <p className="text-white/80">{comment.text}</p>
                  <p className="text-white/40 text-xs mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-white/40 text-sm">No comments yet</p>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ghost-400"
              />
              <button
                type="submit"
                className="bg-ghost-500 hover:bg-ghost-600 px-4 py-2 rounded-full transition duration-300 font-semibold"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
