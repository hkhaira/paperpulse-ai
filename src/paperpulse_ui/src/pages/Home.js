import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import ChatIcon from '@mui/icons-material/Chat';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box 
        sx={{ 
          py: 8, 
          textAlign: 'center',
          backgroundColor: 'primary.light',
          color: 'white',
          borderRadius: 2,
          mb: 6
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          PaperPulse AI
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Transform complex research papers into actionable insights
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/upload')}
          sx={{ mt: 3 }}
        >
          Get Started
        </Button>
      </Box>
      
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        How It Works
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <SummarizeIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Concise Summary
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Get a digestible summary with practical insights from any research paper.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <DescriptionIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Detailed Explanations
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Understand complex research ideas with clear, detailed explanations.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <BuildIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Reproduction Steps
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Follow step-by-step instructions to reproduce the research locally.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <ChatIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Interactive Chat
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Ask follow-up questions and get clarifications through an AI chat interface.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
