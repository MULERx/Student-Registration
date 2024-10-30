import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState<"register" | "list">("register");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === "register" ? <StudentForm /> : <StudentList />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
