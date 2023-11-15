import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import AssignmentRoutes from "./assignments/routes.js";

const app = express();
app.use(cors());
app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);