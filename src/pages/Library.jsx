import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function Library() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          issuedBooks: [
            { id: 1, title: "Introduction to Algorithms", author: "Thomas H. Cormen", issueDate: "2026-02-10", dueDate: "2026-03-10", status: "Active" },
            { id: 2, title: "Operating Systems Concepts", author: "Abraham Silberschatz", issueDate: "2026-01-28", dueDate: "2026-02-28", status: "Active" },
            { id: 3, title: "Database Systems", author: "Ramakrishnan & Gehrke", issueDate: "2026-02-12", dueDate: "2026-03-12", status: "Active" },
            { id: 4, title: "Computer Networks", author: "Andrew S. Tanenbaum", issueDate: "2026-02-18", dueDate: "2026-03-18", status: "Active" }
          ],
          totalBooks: 4,
          libraryMemberId: "LIB-2026-041",
          fineDue: 0,
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Library" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Library</h1>
        <p className="text-neutral-600 mt-2">Manage your borrowed books and library account</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Library Member ID</h3>
          <p className="text-xl font-bold text-neutral-900">{data?.libraryMemberId}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Active Books</h3>
          <p className="text-xl font-bold text-neutral-900">{data?.totalBooks}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Fine Due</h3>
          <p className="text-xl font-bold text-emerald-600">Rs. {data?.fineDue.toLocaleString()}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Issued Books</h2>
        <div className="space-y-4">
          {data?.issuedBooks.map((book) => (
            <div key={book.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="font-semibold text-neutral-900">{book.title}</h3>
              <p className="text-sm text-neutral-600 mt-1">by {book.author}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-neutral-600">Issue Date:</span> {book.issueDate}
                </div>
                <div>
                  <span className="text-neutral-600">Due Date:</span> {book.dueDate}
                </div>
              </div>
              <div className="mt-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {book.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
