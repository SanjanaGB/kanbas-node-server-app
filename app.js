import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

const CONNECTION_STRING =  'mongodb+srv://sanjana051198:sanjana123@cluster0.jlzmdi8.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
                 credentials: true,
                 origin: process.env.FRONTEND_URL
             }));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));

app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);