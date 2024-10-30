import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, UserPlus, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import Input from "./Input";

// Define Zod schema for form validation
const studentSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Max 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Max 50 characters"),
  email: z.string().email("Invalid email"),
  age: z
    .string()
    .min(1, "Age is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), "Age must be a number")
    .refine((val) => val >= 16 && val <= 99, "Age must be between 16 and 99"),
  course: z.string().min(1, "Please select a course"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

// Type derived from schema
type StudentFormData = z.infer<typeof studentSchema>;

export default function StudentForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: StudentFormData) => api.post(`/students`, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["student-list"] }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl mx-auto py-10"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <Input type="text" props={{ ...register("firstName") }} />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <Input type="text" props={{ ...register("lastName") }} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input type="email" props={{ ...register("email") }} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <Input type="number" props={{ ...register("age") }} />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <Input type="tel" props={{ ...register("phone") }} />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="course"
          className="block text-sm font-medium text-gray-700"
        >
          Course
        </label>
        <select
          {...register("course")}
          className="mt-1 text-lg px-3 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Data Science">Data Science</option>
          <option value="Web Development">Web Development</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
        {errors.course && (
          <p className="text-red-500 text-sm">{errors.course.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <UserPlus size={20} />
        {mutation.isPending ? "Registering..." : "Register Student"}
      </button>

      {mutation.isSuccess && (
        <div className="text-center py-6">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Student registered
          </h3>
        </div>
      )}

      {mutation.isError && (
        <div className="text-center py-6">
          <XCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            {mutation?.error?.response?.data?.error ??
              "Something went wrong, try again."}
          </h3>
        </div>
      )}
    </form>
  );
}
