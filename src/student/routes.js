const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.getAllStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.addStudent)
router.delete("/:id", controller.deleteStudent)
router.put("/:id", controller.updateStudent)

module.exports = router;