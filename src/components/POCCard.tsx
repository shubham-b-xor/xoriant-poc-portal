import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { POC } from '../types';

interface POCCardProps {
  poc: POC;
  onClick?: () => void;
}

const POCCard: React.FC<POCCardProps> = ({ poc, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 1,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
        {poc.logoUrl && (
          <CardMedia
            component="img"
            height="140"
            image={poc.logoUrl}
            alt={`${poc.name} logo`}
            sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f9f9f9' }}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {poc.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {poc.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default POCCard;
