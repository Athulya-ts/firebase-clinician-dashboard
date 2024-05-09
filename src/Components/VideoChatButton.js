import React from 'react';

const VideoChatButton = ({ onClick }) => {
  const handleClick = () =>{
    window.location.href = "/Video"
  }
  return (
    <button onClick={handleClick}>
      <i className="fa fa-video-camera" aria-hidden="true"></i> Video Chat
    </button>
  );
}

export default VideoChatButton;