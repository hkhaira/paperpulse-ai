import React, { useState } from 'react';
import { Container, Typography, Button, Box, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { usePaper } from '../contexts/PaperContext';
import { getSummary, getExplanation, getReproduction } from '../services/api';

// This page demonstrates using a multi-step form with Stepper component
// Using React Navigation for programmatic navigation
// Integrating API calls and UI state
// Error handling and loading states

const steps = ['Upload Paper', 'Process Content', 'View Results'];

const Upload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { paper, updatePaper } = usePaper();
  const navigate = useNavigate();
  
  const handleUploadComplete = () => {
    setActiveStep(1);
  };
  
  const handleProcessPaper = async () => {
    if (!paper.text) {
      alert('Please upload a paper first');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, these would be API calls to your backend
      const summary = await getSummary(paper.text);
      const explanation = await getExplanation(paper.text);
      const reproduction = await getReproduction(paper.text);
      
      updatePaper({ summary, explanation, reproduction });
      setActiveStep(2);
    } catch (error) {
      console.error('Error processing paper:', error);
      alert('Failed to process paper. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const goToResults = () => {
    navigate('/results');
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Upload Research Paper
      </Typography>
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <FileUpload onUploadComplete={handleUploadComplete} />
        )}
        
        {activeStep === 1 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Paper uploaded successfully!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              File: {paper.file?.name}
            </Typography>
            
            <Button 
              variant="contained"
              color="primary"
              onClick={handleProcessPaper}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Process Paper'}
            </Button>
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Processing complete!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              Your paper has been analyzed successfully.
            </Typography>
            
            <Button 
              variant="contained"
              color="primary"
              onClick={goToResults}
              sx={{ mt: 2 }}
            >
              View Results
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Upload;
