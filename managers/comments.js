export const getCommentsId = (id) => fetch(`http://localhost:8088/comments/${id}`)
  .then((res) => res.json());

export const getCommentByPostId = (id) => fetch(`http://localhost:8088/comments?post_id/${id}`)
  .then((res) => res.json());

export const getComments = () => fetch('http://localhost:8088/comments')
  .then((res) => res.json());

export const addComment = (comment) => fetch('http://localhost:8088/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(comment),
});

export const updateComment = (comment) => fetch(`http://localhost:8088/comments/${comment.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(comment),
});

export const deleteComment = (commentId) => fetch(`http://localhost:8088/comments/${commentId}`, {
  method: 'DELETE',
});
