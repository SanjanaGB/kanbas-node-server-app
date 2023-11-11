import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
    });
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((course) => course._id === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.json(course);
    });
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses
            .filter((c) => c._id !== id);
        res.sendStatus(204);
    });
    app.post("/api/courses", (req, res) => {
        const newCourse = {
            ...req.body,
            _id: new Date().getTime().toString(),
        };
        Database.courses.push(newCourse);
        res.send(newCourse);
    });
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.courses.findIndex((course) => course._id === id);
        if (index === -1) {
            res.status(404).send("Course not found");
            return;
        }
        Database.courses[index] = {
            ...req.body,
        };
        res.send(Database.courses[index]);
    });
}
export default CourseRoutes;