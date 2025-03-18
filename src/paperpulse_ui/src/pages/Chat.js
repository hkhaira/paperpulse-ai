import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, List, ListItem, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { usePaper } from '../contexts/PaperContext';
import { sendChatMessage } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// This component demonstrate more advanced React patterns such as:
// Refs for DOM manipulation (scrolling to bottom of chat)
// Complex state management with useEffect hooks
// Conditional rendering based on application state
// Form handling with controlled components
// Integration with Markdown rendering for formatted text

const Chat = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { paper, updatePaper } = usePaper();
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  
  // Initialize chat history if empty
  useEffect(() => {
    if (!paper.chatHistory || paper.chatHistory.length === 0) {
      updatePaper({
        chatHistory: [
          {
            type: 'system',
            content: "Hello! I'm your research assistant. Ask me any questions about the paper you've uploaded."
          }
        ]
      });
    }
  }, [paper.chatHistory, updatePaper]);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [paper.chatHistory]);
  
  if (!paper.summary) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No paper data available
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please upload and process a paper first.
        </Typography>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => navigate('/upload')}
          sx={{ mt: 2 }}
        >
          Go to Upload
        </Button>
      </Container>
    );
  }
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newChatHistory = [
      ...paper.chatHistory,
      { type: 'user', content: message }
    ];
    
    updatePaper({ chatHistory: newChatHistory });
    setMessage('');
    setLoading(true);
    
    try {
      // Create context from paper data
      const context = `${paper.summary}\n\n${paper.explanation}\n\n${paper.reproduction}`;
      
      // Get AI response
      const response = await sendChatMessage(message, context);
      
      // Add AI response to chat
      updatePaper({
        chatHistory: [...newChatHistory, { type: 'ai', content: response }]
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      updatePaper({
        chatHistory: [
          ...newChatHistory,
          { type: 'system', content: 'Sorry, there was an error processing your message.' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Chat with Your Paper
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          height: '60vh', 
          display: 'flex', 
          flexDirection: 'column',
          mb: 3
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            flexGrow: 1, 
            overflow: 'auto',
            bgcolor: '#f5f5f5'
          }}
        >
          <List>
            {paper.chatHistory.map((msg, index) => (
              <React.Fragment key={index}>
                <ListItem 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    p: 1
                  }}
                >
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      maxWidth: '80%',
                      bgcolor: msg.type === 'user' ? 'primary.light' : 'white',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2
                    }}
                  >
                    {msg.type === 'user' ? (
                      <Typography>{msg.content}</Typography>
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </Paper>
                </ListItem>
                {index < paper.chatHistory.length - 1 && <Divider variant="fullWidth" component="li" />}
              </React.Fragment>
            ))}
            <div ref={chatEndRef} />
          </List>
        </Box>
        
        <Box 
          sx={{ 
            p: 2, 
            borderTop: '1px solid #e0e0e0',
            display: 'flex'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            size="small"
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={loading || !message.trim()}
          >
            Send
          </Button>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="outlined"
          color="primary"
          onClick={() => navigate('/results')}
        >
          Back to Results
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
