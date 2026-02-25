import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function FeePayments() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          totalFees: 72000,
          paidAmount: 52000,
          pendingAmount: 20000,
          payments: [
            { id: 1, semester: "Fall 2025", amount: 28000, date: "2025-08-18", status: "Paid" },
            { id: 2, semester: "Fall 2025", amount: 12000, date: "2025-10-05", status: "Paid" },
            { id: 3, semester: "Spring 2026", amount: 12000, date: "2026-01-18", status: "Paid" },
            { id: 4, semester: "Spring 2026", amount: 8000, date: "2026-03-12", status: "Pending" },
            { id: 5, semester: "Spring 2026", amount: 12000, date: "2026-04-10", status: "Pending" }
          ],
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Fee Payments" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Fee Payments</h1>
        <p className="text-neutral-600 mt-2">View and manage your fee payment history</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Total Fees</h3>
          <p className="text-2xl font-bold text-neutral-900">Rs. {data?.totalFees.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Paid Amount</h3>
          <p className="text-2xl font-bold text-green-600">Rs. {data?.paidAmount.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 mb-2">Pending Amount</h3>
          <p className="text-2xl font-bold text-red-600">Rs. {data?.pendingAmount.toLocaleString()}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Semester</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Amount</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Date</th>
                <th className="px-6 py-3 text-left font-semibold text-neutral-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.payments.map((payment) => (
                <tr key={payment.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-3 text-neutral-900">{payment.semester}</td>
                  <td className="px-6 py-3 text-neutral-700">Rs. {payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-neutral-700">{payment.date}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === "Paid" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
