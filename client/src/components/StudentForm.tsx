import React from "react";
import { StudentFormData } from "../types/student";
import { CheckCircle, UserPlus, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import Input from "./Input";

export default function StudentForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: StudentFormData) => {
      return api.post(`/students`, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-list"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentData: StudentFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      age: parseInt(formData.get("age") as string),
      course: formData.get("course") as string,
      phone: formData.get("phone") as string,
    };
    await mutation.mutateAsync(studentData, {
      onSuccess: () => {
        e.currentTarget?.reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto py-10">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <Input
            type="text"
            props={{ name: "firstName", id: "firstName", required: true }}
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <Input
            type="text"
            props={{ name: "course", id: "course", required: true }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <Input
          type="email"
          props={{ name: "email", id: "email", required: true }}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>

          <Input
            type="number"
            props={{
              name: "age",
              id: "age",
              min: "16",
              max: "99",
              required: true,
            }}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <Input
            type="tel"
            props={{
              name: "phone",
              id: "phone",
              required: true,
              pattern: "[0-9]{10}",
            }}
          />
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
          name="course"
          id="course"
          required
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
