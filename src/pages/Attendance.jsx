import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function Attendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          courses: [
            { id: 1, code: "CSE201", name: "Data Structures and Algorithms", percentage: 92, status: "Excellent" },
            { id: 2, code: "CSE205", name: "Database Management Systems", percentage: 86, status: "Good" },
            { id: 3, code: "CSE209", name: "Operating Systems", percentage: 89, status: "Good" },
            { id: 4, code: "CSE221", name: "Software Engineering", percentage: 94, status: "Excellent" },
            { id: 5, code: "HUM203", name: "Professional Communication", percentage: 97, status: "Excellent" }
          ],
          overallPercentage: 91.6,
          lastUpdated: "2026-02-26",
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Attendance" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Attendance</h1>
        <p className="text-neutral-600 mt-2">Monitor your class attendance across all courses</p>
      </header>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Overall Attendance</h2>
        <div className="inline-block bg-blue-100 text-blue-900 px-6 py-3 rounded-lg font-bold text-2xl">
          {data?.overallPercentage.toFixed(2)}%
        </div>
        <p className="text-sm text-neutral-500 mt-3">Last updated: {data?.lastUpdated}</p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Attendance by Course</h2>
        <div className="space-y-4">
          {data?.courses.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="font-semibold text-neutral-900">{course.code} - {course.name}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-neutral-900">{course.percentage}%</div>
                <div className="text-sm text-neutral-600">{course.status}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
