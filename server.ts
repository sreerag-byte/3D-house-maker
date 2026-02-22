import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Jimp } from "jimp";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * Phase 2: Wall Detection Logic (Simplified for Node.js)
 */
async function detectWalls(imagePath: string) {
  const image = await Jimp.read(imagePath);
  const width = image.width;
  const height = image.height;
  
  // Find bounding box of non-white pixels
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let found = false;

  image.scan(0, 0, width, height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If not white (threshold)
    if (r < 240 || g < 240 || b < 240) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      found = true;
    }
  });

  // Default to a 10x10 square if nothing found
  if (!found) {
    minX = 100; minY = 100; maxX = 200; maxY = 200;
  }

  // Convert to meters (centered at 0,0)
  const scale = 0.05;
  const wMeters = (maxX - minX) * scale;
  const hMeters = (maxY - minY) * scale;
  
  const footprint = [
    { x: -wMeters / 2, y: -hMeters / 2 },
    { x: wMeters / 2, y: -hMeters / 2 },
    { x: wMeters / 2, y: hMeters / 2 },
    { x: -wMeters / 2, y: hMeters / 2 },
    { x: -wMeters / 2, y: -hMeters / 2 },
  ];

  return {
    footprint,
    scale,
    originalSize: { width, height },
    detectedBounds: { minX, minY, maxX, maxY }
  };
}

/**
 * Phase 3: Elevation Analysis
 */
async function analyzeElevation(imagePath: string) {
  // Mocking height extraction
  return {
    wallHeight: 3.0, // meters
    roofType: "gabled",
    roofPitch: 30, // degrees
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/upload", upload.fields([{ name: "plan", maxCount: 1 }, { name: "elevation", maxCount: 1 }]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (!files.plan || !files.elevation) {
        return res.status(400).json({ error: "Both plan and elevation images are required." });
      }

      const planFile = files.plan[0];
      const elevationFile = files.elevation[0];

      console.log("Processing Plan:", planFile.filename);
      const layout = await detectWalls(planFile.path);
      
      console.log("Processing Elevation:", elevationFile.filename);
      const specs = await analyzeElevation(elevationFile.path);

      res.json({
        message: "Images processed successfully",
        jobId: `job-${Date.now()}`,
        planUrl: `/uploads/${planFile.filename}`,
        elevationUrl: `/uploads/${elevationFile.filename}`,
        data: {
          layout,
          specs
        }
      });
    } catch (error) {
      console.error("Processing error:", error);
      res.status(500).json({ error: "Failed to process images" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
