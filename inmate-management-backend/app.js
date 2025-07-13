require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cellRoutes = require('./routes/cells');
const inmateRoutes = require('./routes/inmates');
const visitorRoutes = require('./routes/visitors');
const errorHandler = require('./middleware/errorHandler');
const dashboardRoutes = require('./routes/dashboard');


const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cells', cellRoutes);
app.use('/api/inmates', inmateRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
