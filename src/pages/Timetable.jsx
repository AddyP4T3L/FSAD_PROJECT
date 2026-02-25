import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function Timetable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          week: "Week of Feb 24 - Mar 2, 2026",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          timeSlots: [
            "07:30 - 09:30",
            "09:40 - 11:40",
            "11:50 - 13:50",
            "14:00 - 16:00"
          ],
          subjects: {
            CSE201: { title: "Data Structures and Algorithms", room: "CSE Lab 2" },
            CSE205: { title: "Database Management Systems", room: "Room 214" },
            CSE209: { title: "Operating Systems", room: "Room 302" },
            CSE213: { title: "Computer Networks", room: "Room 108" },
            CSE217: { title: "Machine Learning", room: "AI Lab" },
            CSE221: { title: "Software Engineering", room: "Room 210" },
            CSE223: { title: "Human-Computer Interaction", room: "Design Studio" },
            CSE225: { title: "Cloud Computing", room: "Room 215" }
          },
          schedule: {
            Monday: ["CSE221", "CSE201", "CSE205", "CSE209"],
            Tuesday: ["CSE213", "CSE205", "CSE223", "CSE217"],
            Wednesday: ["CSE201", "CSE225", "CSE209", "CSE221"],
            Thursday: ["CSE213", "CSE205", "CSE223", "CSE217"],
            Friday: ["CSE201", "CSE225", "CSE209", "CSE221"],
            Saturday: ["CSE217", "CSE213", "CSE205", "CSE223"]
          }
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Timetable" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Timetable</h1>
        <p className="text-neutral-600 mt-2">{data?.week}</p>
        <p className="text-sm text-neutral-500 mt-1">Each lecture is 2 hours with a 10 minute break between slots.</p>
      </header>

      <Card className="overflow-hidden" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-neutral-900">Time</th>
                {data?.days.map((day) => (
                  <th key={day} className="px-4 py-3 text-left font-semibold text-neutral-900">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.timeSlots.map((slot, slotIndex) => (
                <tr key={slot} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3 text-neutral-700 font-semibold whitespace-nowrap">
                    {slot}
                  </td>
                  {data?.days.map((day) => {
                    const code = data?.schedule?.[day]?.[slotIndex];
                    const subject = data?.subjects?.[code];
                    return (
                      <td key={`${day}-${slot}`} className="px-4 py-3">
                        <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2">
                          <p className="text-sm font-semibold text-neutral-900">{code}</p>
                          <p className="text-xs text-neutral-500 mt-1">{subject?.title}</p>
                          <p className="text-xs text-neutral-400 mt-1">{subject?.room}</p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
