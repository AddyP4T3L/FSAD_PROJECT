import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function CGPA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          cgpa: 3.68,
          totalCredits: 132,
          completedCredits: 102,
          semesters: [
            { semester: "Fall 2023", gpa: 3.6, credits: 18 },
            { semester: "Spring 2024", gpa: 3.7, credits: 18 },
            { semester: "Fall 2024", gpa: 3.74, credits: 18 },
            { semester: "Spring 2025", gpa: 3.65, credits: 18 },
            { semester: "Fall 2025", gpa: 3.71, credits: 18 },
            { semester: "Spring 2026", gpa: 3.68, credits: 12 }
          ],
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const cgpa = data?.cgpa ?? 0;
  const totalCredits = data?.totalCredits ?? 0;
  const completedCredits = data?.completedCredits ?? 0;
  const semesters = data?.semesters ?? [];

  return (
    <section aria-label="CGPA" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">CGPA</h1>
        <p className="text-neutral-600 mt-2">View your cumulative grade point average</p>
      </header>

      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-neutral-600 mb-4">Cumulative GPA</h2>
          <div className="text-5xl font-bold text-indigo-600 mb-6">{cgpa.toFixed(2)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Completed Credits</p>
              <p className="text-2xl font-bold text-neutral-900">{completedCredits}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-neutral-900">{totalCredits}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Semester-wise GPA</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Semester</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">GPA</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Credits</th>
              </tr>
            </thead>
            <tbody>
              {semesters.map((sem) => (
                <tr key={sem.semester} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-3 text-neutral-900">{sem.semester}</td>
                  <td className="px-6 py-3 text-neutral-700 font-semibold">{sem.gpa.toFixed(2)}</td>
                  <td className="px-6 py-3 text-neutral-700">{sem.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
