// // // server.js (backend)
// // import express from 'express';
// // import mysql from 'mysql2/promise';
// // import cors from 'cors';
// // import { createServer } from 'http';  // Correct import for 'http'
// // import { Server  } from 'socket.io';  // Correct import for 'socket.io'

// // const app = express();
// // const server = createServer(app);  // Create HTTP server
// // const io = new Server(server, {
// //   cors: {
// //     origin: 'https://localhost:5173', // Allow frontend origin
// //     methods: ['GET', 'POST'],
// //   },
// // });// Initialize socket.io with the server


// // app.use(cors());
// // app.use(express.json());

// // let db;
// // io.on('connection', (socket) => {
// //   console.log('A user connected');
  
// //   // You can now listen for custom events from this specific socket
// //   socket.on('custom-event', (data) => {
// //     console.log('Received custom event data:', data);
    
// //     // Send a message back to the client
// //     socket.emit('server-message', 'Hello from server!');
// //   });

// //   // Handle disconnection
// //   socket.on('disconnect', () => {
// //     console.log('A user disconnected');
// //   });
// // });


// // import dotenv from 'dotenv';
// // dotenv.config();


 
// // // Connect to MySQL
// // async function connectDB() {
// //   try {
// //     db = await mysql.createConnection({
// //       host: process.env.DB_HOST,
// //       user: process.env.DB_USER,
// //       password: process.env.DB_PASSWORD,
// //       database: process.env.DB_NAME
// //     });
// //     console.log("✅ Connected to MySQL Database");
// //   } catch (error) {
// //     console.error("❌ Database connection failed:", error);
// //     process.exit(1);
// //   }
// // }

// // connectDB();

// // // Define API routes
// // app.get("/api/vessels", async (req, res) => {
// //   try {
// //     const [rows] = await db.execute("SELECT * FROM api_vesseldetails");
// //     res.json(rows);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch vessels" });
// //   }
// // });

// // app.get("/api/vessel-data/:vesselName", async (req, res) => {
// //   const vesselName = req.params.vesselName;

// //   const query = `
// //     SELECT 'Moisture' AS parameter, COALESCE(arb, 'N/A') AS value FROM api_tabledata
// //     JOIN api_vesselinfo vessel ON api_tabledata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'Moisture'
// //     UNION ALL
// //     SELECT 'Ash_PA' AS parameter, COALESCE(arb, 'N/A') AS value FROM api_tabledata
// //     JOIN api_vesselinfo vessel ON api_tabledata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'Ash_PA'
// //     UNION ALL
// //     SELECT 'VM' AS parameter, COALESCE(arb, 'N/A') AS value FROM api_tabledata
// //     JOIN api_vesselinfo vessel ON api_tabledata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'VM'
// //     UNION ALL
// //     SELECT 'Sulphur' AS parameter, COALESCE(arb, 'N/A') AS value FROM api_ultimatedata
// //     JOIN api_vesselinfo vessel ON api_ultimatedata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'Sulphur'
// //     UNION ALL
// //     SELECT 'GCV' AS parameter, COALESCE(vessel.gcv, 'N/A') AS value FROM api_vesselinfo vessel
// //     WHERE TRIM(vessel.vessel_name) = ?
// //     UNION ALL
// //     SELECT 'HGI' AS parameter, COALESCE(vessel.hgi, 'N/A') AS value FROM api_vesselinfo vessel
// //     WHERE TRIM(vessel.vessel_name) = ?
// //     UNION ALL
// //     SELECT 'FC' AS parameter, COALESCE(arb, 'N/A') AS value FROM api_tabledata
// //     JOIN api_vesselinfo vessel ON api_tabledata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'FC'
// //     UNION ALL
// //     SELECT 'FC/VM Ratio' AS parameter, COALESCE(fc_vm_arb, 'N/A') AS value FROM api_tabledata
// //     JOIN api_vesselinfo vessel ON api_tabledata.vessel_id = vessel.id
// //     WHERE TRIM(vessel.vessel_name) = ? AND parameter = 'FC'
// //   `;

// //   try {
// //     const [rows] = await db.execute(query, Array(8).fill(vesselName)); // Using parameterized query
// //     res.json(rows);
// //   } catch (error) {
// //     console.error(`Error fetching coal data for ${vesselName}:`, error);
// //     res.status(500).json({ error: "Failed to fetch coal data" });
// //   }
// // });

// // app.get('/api/vessel-data/:vessel_name', (req, res) => {
// //   const vesselName = req.params.vessel_name;
// //   const data = vesselData.filter(item => item.vessel_name === vesselName);

// //   if (data.length > 0) {
// //     res.json(data);
// //   } else {
// //     res.status(404).json({ error: 'Vessel not found or no data available.' });
// //   }
// // });




// // io.on("connection", (socket) => {
// //   console.log("New client connected");

// //   // Emit the initial data when a new client connects
// //   socket.emit("initialData", constraintsData);

// //   // Listen for updates from the client (this would be triggered when data changes)
// //   socket.on("updateConstraints", (updatedData) => {
// //     console.log("Data updated: ", updatedData);
// //     constraintsData = updatedData;  // Update the constraints data on the server

// //     // Broadcast the updated data to all connected clients
// //     io.emit("updateConstraints", updatedData);
// //   });

// //   // Handle client disconnection
// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //   });
// // });

// // app.get('/', (req, res) => {
// //   res.send('Hello, World!');
// // }); 

// // const PORT = 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });





// // server.js
// import express from 'express';
// import mysql from 'mysql2/promise';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// dotenv.config();

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'https://localhost:5173', // frontend port
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors());
// app.use(express.json());

// let db;

// // Connect to MySQL
// const connectDB = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: process.env.DB_PORT,
//     });
//     console.log("✅ MySQL connected successfully");
//     return connection;
//   } catch (error) {
//     console.error("❌ Database connection failed:", error);
//   }
// };
// connectDB();

// // Constraints data (make it mutable)
// let  constraintsData = [
//   { id: 1, parameter: "C", type: "Hard", basis: "ARB", UB: 100.0, LB: 40.0 },
//   { id: 2, parameter: "H", type: "Hard", basis: "ARB", UB: 100.0, LB: 3.0 },
//   { id: 3, parameter: "N", type: "Hard", basis: "ARB", UB: 2.5, LB: 0.0 },
//   { id: 4, parameter: "O", type: "Hard", basis: "ARB", UB: 40.0, LB: 0.0 },
//   { id: 5, parameter: "HGI", type: "Hard", basis: "ARB", UB: 80.0, LB: 45.0 },
//   { id: 6, parameter: "IDT", type: "Hard", basis: "ARB", UB: 100000000000.0, LB: 1100.0 },
//   { id: 7, parameter: "TM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
//   { id: 8, parameter: "IM", type: "Hard", basis: "ARB", UB: 45.0, LB: 0.0 },
//   { id: 9, parameter: "Ash", type: "Hard", basis: "ARB", UB: 25.0, LB: 0.0 },
//   { id: 10, parameter: "VM", type: "Hard", basis: "ARB", UB: 45.0, LB: 18.0 },
//   { id: 11, parameter: "FC", type: "Hard", basis: "ARB", UB: 58.2, LB: 4.25 },
//   { id: 12, parameter: "GCV", type: "Hard", basis: "ARB", UB: 6615.0, LB: 4150.0 },
//   { id: 13, parameter: "Sulphur", type: "Hard", basis: "ARB", UB: 1.0, LB: 0.0 },
//   { id: 14, parameter: "SiO2", type: "Hard", basis: "ARB", UB: 70.0, LB: 0.0 },
//   { id: 15, parameter: "Base-acid ratio", type: "Hard", basis: "ARB", UB: 0.7, LB: 0.4 },
//   { id: 16, parameter: "Slagging Factor", type: "Hard", basis: "ARB", UB: 2.0, LB: 0.0 },
//   { id: 17, parameter: "Slagging Index", type: "Hard", basis: "ARB", UB: 10000000000.0, LB: 1125.0 },
//   { id: 18, parameter: "SO3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 19, parameter: "Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 20, parameter: "Fe2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 21, parameter: "CaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 22, parameter: "MgO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 23, parameter: "K2O", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 24, parameter: "TiO2", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 25, parameter: "P2O5", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 26, parameter: "HDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 27, parameter: "SDT", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 28, parameter: "Ash Fusion", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 29, parameter: "T2O5 Temperature", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 30, parameter: "Iron Calcium Ratio", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 31, parameter: "Iron Plus Calcium", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 32, parameter: "Silica Per", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 33, parameter: "Base", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 34, parameter: "Acid", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 35, parameter: "M Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 36, parameter: "C Mineral", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 37, parameter: "SiO2 Plus Al2O3", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 38, parameter: "Net Calorific VAlue", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 39, parameter: "Mn3O4", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 40, parameter: "BaO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 41, parameter: "ZnO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 42, parameter: "SrO", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 43, parameter: "Mercury", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 44, parameter: "Arsenic", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 45, parameter: "Fluorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 46, parameter: "Phosphorus", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 47, parameter: "Chlorine", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 48, parameter: "Boron", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 49, parameter: "Total Reactives", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 50, parameter: "Total Inerts", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 51, parameter: "Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 52, parameter: "Semi Vitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 53, parameter: "Oxivitrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 54, parameter: "Liptinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 55, parameter: "Macrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 56, parameter: "Micrinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 57, parameter: "Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 58, parameter: "Semi Fusinite", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 59, parameter: "Mineral Matter", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
//   { id: 60, parameter: "Mean Maximum Reflectance", type: "Hard", basis: "ARB", UB: 100.0, LB: 0.0 },
// ]

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Send initial constraints data
//   socket.emit("initialData", constraintsData);

//   socket.on("updateConstraints", (updatedData) => {
//     console.log("Data updated:", updatedData);
//     constraintsData = updatedData;
//     io.emit("updateConstraints", updatedData);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // Sample API endpoint
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// await connectDB();

// // Utility: fetch all constraints from database
// async function fetchConstraints() {
//   const [rows] = await db.execute(
//     'SELECT id, parameter, type, basis, UB, LB FROM coal_constraints ORDER BY id'
//   );
//   return rows;
// }

// // Utility: save updated constraints back to database
// async function saveConstraints(constraintsArray) {
//   const stmt = 'UPDATE coal_constraints SET UB = ?, LB = ?, type = ? WHERE id = ?';
//   const promises = constraintsArray.map(item =>
//     db.execute(stmt, [item.UB, item.LB, item.type, item.id])
//   );
//   await Promise.all(promises);
// }

// io.on('connection', async (socket) => {
//   console.log('🚀 Client connected via Socket.IO');

//   // Send the persisted constraints on new connection
//   const initial = await fetchConstraints();
//   socket.emit('initialData', initial);

//   // Handle updates from any client
//   socket.on('updateConstraints', async (updatedData) => {
//     console.log('🔄 Received update:', updatedData);
//     // Persist changes
//     await saveConstraints(updatedData);
//     // Broadcast to all clients
//     io.emit('updateConstraints', updatedData);
//   });

//   socket.on('disconnect', () => {
//     console.log('👋 Client disconnected');
//   });
// });


import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Environment variables
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
  PORT = 5000,
} = process.env;

let db;

// Connect to MySQL
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    });
    console.log('✅ Connected to MySQL Database');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
}
await connectDB();

// API route: fetch all vessels
app.get('/api/vessels', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM api_vesseldetails');
    res.json(rows);
  } catch (err) {
    console.error('Failed to fetch vessels:', err);
    res.status(500).json({ error: 'Failed to fetch vessels' });
  }
});

// API route: fetch vessel data by name
app.get('/api/vessel-data/:vesselName', async (req, res) => {
  const vesselName = req.params.vesselName.trim();
  const query = `
    SELECT 'Moisture' AS parameter, COALESCE(arb, 'N/A') AS value
      FROM api_tabledata
      JOIN api_vesselinfo v ON api_tabledata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'Moisture'
    UNION ALL
    SELECT 'Ash_PA', COALESCE(arb, 'N/A')
      FROM api_tabledata
      JOIN api_vesselinfo v ON api_tabledata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'Ash_PA'
    UNION ALL
    SELECT 'VM', COALESCE(arb, 'N/A')
      FROM api_tabledata
      JOIN api_vesselinfo v ON api_tabledata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'VM'
    UNION ALL
    SELECT 'Sulphur', COALESCE(arb, 'N/A')
      FROM api_ultimatedata
      JOIN api_vesselinfo v ON api_ultimatedata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'Sulphur'
    UNION ALL
    SELECT 'GCV', COALESCE(v.gcv, 'N/A')
      FROM api_vesselinfo v
     WHERE TRIM(v.vessel_name) = ?
    UNION ALL
    SELECT 'HGI', COALESCE(v.hgi, 'N/A')
      FROM api_vesselinfo v
     WHERE TRIM(v.vessel_name) = ?
    UNION ALL
    SELECT 'FC', COALESCE(arb, 'N/A')
      FROM api_tabledata
      JOIN api_vesselinfo v ON api_tabledata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'FC'
    UNION ALL
    SELECT 'FC/VM Ratio', COALESCE(fc_vm_arb, 'N/A')
      FROM api_tabledata
      JOIN api_vesselinfo v ON api_tabledata.vessel_id = v.id
     WHERE TRIM(v.vessel_name) = ? AND parameter = 'FC'
  `;
  try {
    const params = Array(8).fill(vesselName);
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    console.error(`Error fetching vessel data for ${vesselName}:`, err);
    res.status(500).json({ error: 'Failed to fetch vessel data' });
  }
});

// Utility: fetch all constraints
async function fetchConstraints() {
  const [rows] = await db.execute(
    'SELECT id, parameter, type, basis, UB, LB FROM coal_constraints ORDER BY id'
  );
  return rows;
}


// Utility: persist updated constraints
async function saveConstraints(constraintsArray) {
  const stmt = 'UPDATE coal_constraints SET UB = ?, LB = ?, type = ? WHERE id = ?';

  for (const item of constraintsArray) {
    try {
      const [result] = await db.execute(stmt, [item.UB, item.LB, item.type, item.id]);

      // if (result.affectedRows > 0) {
      //   console.log(`✅ Row updated for ID ${item.id}`);
      // } else {
      //   console.warn(`⚠️ No row updated for ID ${item.id}. Check if it exists or values are same.`);
      // }
    } catch (err) {
      console.error(`❌ Error updating ID ${item.id}:`, err);
    }
  }
}


// Socket.IO for real-time constraints updates
io.on('connection', async socket => {
  console.log('🟢 New client connected');

  // Send current constraints
  try {
    const initial = await fetchConstraints();
    socket.emit('initialData', initial);
  } catch (err) {
    console.error('Failed to fetch initial constraints:', err);
  }

  // Handle updates from clients
  socket.on('updateConstraints', async updatedData => {
    console.log('➡️  updateConstraints received:', updatedData);
    try {
      await saveConstraints(updatedData);
      // console.log('✅ Constraints saved to DB');
    } catch (err) {
      console.error('❌ Failed saving constraints:', err);
    }
    io.emit('updateConstraints', updatedData);
  });

  socket.on('disconnect', () => console.log('🔴 Client disconnected'));
});

// Health check
app.get('/', (req, res) => res.send('Hello, World!'));



// Example of DELETE route in Express.js
// Example route for deleting a row from a section
app.delete('/api/delete-row/', (req, res) => {
  const { sectionTitle, rowIndex } = req.body;

  // Find the section by title
  const section = sections.find(s => s.title === sectionTitle);
  if (section) {
    // Remove the row from the section
    section.rows.splice(rowIndex, 1);

    // Optionally, persist the change in a database if needed

    res.status(200).send({ message: "Row deleted successfully" });
  } else {
    res.status(404).send({ message: "Section not found" });
  }
});




// Start server
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

