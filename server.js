const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api', apiRoutes);

// Fallback to index.html for single-page dashboard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Bangalore Business Scraper & Outreach Platform Ready`);
  console.log(`📡 Dashboard running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
