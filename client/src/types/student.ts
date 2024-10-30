export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
  phone: string;
  enrollmentDate: string;
}

export type StudentFormData = Omit<Student, "id" | "enrollmentDate">;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
