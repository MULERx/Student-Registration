import { NextFunction, Request, Response } from "express";
import Student from "../model/Students";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find().sort({ enrollmentDate: -1 });

    res.json({
      success: true,
      data: students.map((student) => ({
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        age: student.age,
        course: student.course,
        phone: student.phone,
        enrollmentDate: student.enrollmentDate.toISOString(),
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //TODO: for advance we can use express-validator or joi
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.age ||
      !req.body.course ||
      !req.body.phone
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      data: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        age: student.age,
        course: student.course,
        phone: student.phone,
        enrollmentDate: student.enrollmentDate.toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //TODO: for advance we can use express-validator or joi

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
