'use client';

import React from 'react';

import { Comment } from '@/actions/photo-get';

import { useUser } from '@/context/user-context';

import styles from './index.module.css';

import PhotoCommentsForm from '../PhotoCommentsForm';

type PhotoCommentsProps = {
	id: string;
	comments: Comment[];
	single?: boolean;
};

const PhotoComments = (props: PhotoCommentsProps) => {
	const { user } = useUser();
	const [comments, setComments] = React.useState(() => props.comments);
	const commentsSection = React.useRef<HTMLUListElement>(null);

	React.useEffect(() => {
		if (commentsSection.current) {
			commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
		}
	}, [comments]);

	return (
		<>
			<ul
				ref={commentsSection}
				className={`${styles.comments} ${props.single ? styles.single : ''}`}
			>
				{comments.map((comment) => (
					<li key={comment.comment_ID}>
						<strong>{comment.comment_author}: </strong>
						<span>{comment.comment_content}</span>
					</li>
				))}
			</ul>

			{user && (
				<PhotoCommentsForm
					id={props.id}
					setComments={setComments}
					single={props.single}
				/>
			)}
		</>
	);
};

export default PhotoComments;
