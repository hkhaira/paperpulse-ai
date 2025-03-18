import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { usePaper } from '../contexts/PaperContext';
import { processPdf } from '../services/pdfService';

// useState hook manages local component state
// Event handling in React with onChange
// Conditional rendering based on component state
// Using props to pass functions between components (onUploadComplete)
// Using the context (usePaper) to share data across components

const FileUpload = ({ onUploadComplete }) => {
  const { updatePaper } = usePaper();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return;
    }
    
    setFileName(file.name);
    setError('');
    setLoading(true);
    
    try {
      // In a real app, this would make an API call to your backend
      const text = await processPdf(file);
      updatePaper({ file, text });
      if (onUploadComplete) onUploadComplete(file);
    } catch (err) {
      setError('Failed to process PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="h5" gutterBottom>
        Upload Research Paper
      </Typography>
      
      <Box 
        sx={{ 
          border: '2px dashed #ccc', 
          borderRadius: 2, 
          p: 3, 
          width: '100%', 
          textAlign: 'center',
          mb: 3,
          backgroundColor: '#f8f8f8',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: '#f0f7ff'
          }
        }}
      >
        <input
          type="file"
          accept=".pdf"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button 
            component="span" 
            variant="contained" 
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Select PDF
          </Button>
        </label>
        
        {fileName && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected: {fileName}
          </Typography>
        )}
        
        {loading && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      
      {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
      
      <Typography variant="body2" color="textSecondary">
        Upload a PDF research paper to generate summaries, explanations, and reproduction instructions.
      </Typography>
    </Paper>
  );
};

export default FileUpload;