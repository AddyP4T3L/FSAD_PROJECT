import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function AcademicRegistration() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    // Simulate API call with mock data
    setTimeout(() => {
      if (!cancelled) {
        setData({
          registeredCourses: [
            { id: 1, code: "CSE201", name: "Data Structures and Algorithms", credits: 4, status: "Active" },
            { id: 2, code: "CSE205", name: "Database Management Systems", credits: 3, status: "Active" },
            { id: 3, code: "CSE209", name: "Operating Systems", credits: 3, status: "Active" },
            { id: 4, code: "CSE221", name: "Software Engineering", credits: 3, status: "Active" },
            { id: 5, code: "HUM203", name: "Professional Communication", credits: 2, status: "Active" }
          ],
          totalCredits: 15,
          semester: "Spring 2026",
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Academic Registration" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Academic Registration</h1>
        <p className="text-neutral-600 mt-2">View and manage your course registrations</p>
      </header>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          {data?.semester} - Registered Courses
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Course Code</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Course Name</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Credits</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.registeredCourses.map((course) => (
                <tr key={course.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-3 text-neutral-900">{course.code}</td>
                  <td className="px-6 py-3 text-neutral-700">{course.name}</td>
                  <td className="px-6 py-3 text-neutral-700">{course.credits}</td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <p className="font-semibold text-neutral-900">Total Credits: {data?.totalCredits}</p>
        </div>
      </Card>
    </section>
  );
}
