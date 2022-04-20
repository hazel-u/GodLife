import React from "react";

interface CommentProp {
  comment: {
    author: string;
    content: string;
  };
}

const Comment = (props: CommentProp) => {
  return (
    <div>
      <p>{props.comment.author}</p>
      <p>{props.comment.content}</p>
    </div>
  );
};

export default Comment;
