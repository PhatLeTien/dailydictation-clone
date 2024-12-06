import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Comments = () => {
  const comments = [
    {
      id: 1,
      username: 'Phát Lê Tiến',
      avatar: 'P',
      text: 'This article is so helpful! Thank you for sharing.',
      timestamp: '2024-12-06 09:00',
    },
    {
      id: 2,
      username: 'GameLover99',
      avatar: 'G',
      text: 'I love the tips you provided for Valorant!',
      timestamp: '2024-12-05 15:30',
    },
    {
      id: 3,
      username: 'ProGamer',
      avatar: 'P',
      text: 'Great content! Looking forward to more guides.',
      timestamp: '2024-12-04 20:10',
    },
  ];

  return (
    <Card sx={{ maxWidth: 1000, margin: 'auto', mt: 4, p: 2 }}>
      <CardHeader
        title="Comments"
        subheader={`${comments.length} comments`}
        sx={{ borderBottom: '1px solid #eee' }}
      />
      <CardContent>
        {/* Comment List */}
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {comment.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.username}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {comment.text}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {comment.timestamp}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>

        {comments.length === 0 && (
          <Typography align="center" color="textSecondary">
            No comments available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Comments;
