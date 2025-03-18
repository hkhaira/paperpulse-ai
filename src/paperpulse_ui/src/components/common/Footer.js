import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} PaperPulse AI
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link color="inherit" href="https://github.com/hkhaira/paperpulse-ai">
          GitHub
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;