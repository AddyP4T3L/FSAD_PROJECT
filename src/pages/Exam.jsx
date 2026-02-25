import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { fetchExams } from "../api/mockApi";

export default function Exam() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchExams()
      .then((res) => {
        if (!cancelled) setData(res || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load exams");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section aria-label="Exam" className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-neutral-900">Exam Section</h1>
          <p className="text-neutral-500 mt-1">View exams and results</p>
        </header>
        <div className="grid gap-4" role="status" aria-live="polite">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} title="">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-lg bg-neutral-200 animate-pulse" aria-hidden />
                <div className="flex-1">
                  <div className="h-5 w-48 bg-neutral-200 rounded animate-pulse" aria-hidden />
                  <div className="h-4 w-32 mt-2 bg-neutral-100 rounded animate-pulse" aria-hidden />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-label="Exam">
        <header>
          <h1 className="text-2xl font-bold text-neutral-900">Exam Section</h1>
        </header>
        <div
          className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
          role="alert"
        >
          {error}
        </div>
      </section>
    );
  }

  const upcoming = data?.upcoming ?? [];
  const results = data?.results ?? [];

  const resultColumns = [
    { key: "course", label: "Course" },
    { key: "exam", label: "Exam" },
    { key: "score", label: "Score" },
    { key: "grade", label: "Grade" },
    { key: "published", label: "Published" },
  ];

  const resultTable = results.map((row) => ({
    ...row,
    score: `${row.score}/${row.total}`,
  }));

  return (
    <section aria-label="Exam" className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Exam Section</h1>
          <p className="text-neutral-500 mt-1">Upcoming exams and latest results</p>
        </div>
        <Button variant="primary">Exam Guidelines</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Upcoming Exams</h2>
            <span className="text-sm text-neutral-500">{upcoming.length} scheduled</span>
          </div>
          <div className="mt-4 space-y-3">
            {upcoming.map((exam) => (
              <div key={exam.id} className="rounded-lg border border-neutral-200 p-4 bg-neutral-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-neutral-900">{exam.course} • {exam.title}</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      {exam.date} • {exam.time} • {exam.room}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">{exam.type} • {exam.syllabus}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs rounded-full bg-teal-100 text-teal-700">
                    {exam.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-neutral-900">Recent Results</h2>
          <div className="mt-4">
            <Table
              columns={resultColumns}
              data={resultTable}
              isLoading={loading}
              emptyMessage="No results available"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
