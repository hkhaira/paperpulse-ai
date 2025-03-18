import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePaper } from '../contexts/PaperContext';
import ReactMarkdown from 'react-markdown';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Results = () => {
  const [tabValue, setTabValue] = useState(0);
  const { paper } = usePaper();
  const navigate = useNavigate();
  
  if (!paper.summary) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No results available
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
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Paper Analysis Results
      </Typography>
      
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="result tabs"
            variant="fullWidth"
          >
            <Tab label="Summary" id="tab-0" />
            <Tab label="Detailed Explanation" id="tab-1" />
            <Tab label="Reproduction Steps" id="tab-2" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            Concise Summary
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ReactMarkdown>
              {paper.summary}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Detailed Explanation
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ReactMarkdown>
              {paper.explanation}
            </ReactMarkdown>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Reproduction Instructions
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ReactMarkdown>
              {paper.reproduction}
            </ReactMarkdown>
          </Box>
        </TabPanel>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => navigate('/chat')}
          sx={{ mr: 2 }}
        >
          Ask Questions
        </Button>
        
        <Button 
          variant="outlined"
          color="primary"
          onClick={() => navigate('/upload')}
        >
          Process Another Paper
        </Button>
      </Box>
    </Container>
  );
};

export default Results;
