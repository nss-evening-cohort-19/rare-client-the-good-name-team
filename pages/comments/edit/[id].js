import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentsCard from '../../../components/comments/CommentCard';
import { getComments } from '../../../managers/comments';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getComments(id).then(setEditItem);
  }, [id]);
  return (<CommentsCard obj={editItem} />);
}
