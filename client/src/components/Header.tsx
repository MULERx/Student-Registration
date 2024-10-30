import { UserPlus, Users } from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
}: {
  activeTab: "register" | "list";
  setActiveTab: (tab: "register" | "list") => void;
}) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Registration
          </h1>
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === "register"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <UserPlus size={20} />
              Register
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users size={20} />
              Students
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
