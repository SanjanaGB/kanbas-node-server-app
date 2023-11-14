import Database from "../Database/index.js";
function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.json(assignments);
    });
    app.get("/api/courses/:id/assignments", (req, res) => {
        const { id } = req.params;
        const assignments = Database.assignments.filter((assignment) => assignment.course === id);
        res.json(assignments);
    });
    app.get("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignment = Database.assignments.find((assignment) => assignment._id === id);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.json(assignment);
    });
    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.assignments.findIndex((assignment) => assignment._id === id);
        if (index === -1) {
            res.status(404).send("Module not found");
            return;
        }
        Database.assignments.splice(index, 1);
        res.json(204);
    });

    app.put("/api/courses/:cid/assignments/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.assignments.findIndex((assignment) => assignment._id === id);
        if (index === -1) {
            const newAssignment = {
                ...req.body,
                course: req.params.cid,
            };

            Database.assignments.unshift(newAssignment);
        } else {
            Database.assignments[index] = {
                ...Database.assignments[index],
                ...req.body,
            };
        }
        res.json(200);
    });
}
export default AssignmentRoutes;