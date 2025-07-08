import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(); // Connect to DB before starting server

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
