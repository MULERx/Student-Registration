import express from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = express.Router();

router.route("/students").get(getStudents).post(createStudent);

router.route("/students/:id").delete(deleteStudent);

export default router;
