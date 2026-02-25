import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    setTimeout(() => {
      if (!cancelled) {
        setData({
          name: "Ayaan Siddiqui",
          email: "ayaan.siddiqui@campus.edu",
          studentId: "STU-2023-118",
          rollNumber: "CSE-23-118",
          phone: "+91-98765-43210",
          dateOfBirth: "2004-11-02",
          gender: "Male",
          address: "14 Lake View Road, Hyderabad, India",
          program: "B.Tech in Computer Science and Engineering",
          department: "Computer Science",
          semester: "6th",
          enrollmentStatus: "Active",
          joiningDate: "2023-08-14",
        });
        setLoading(false);
      }
    }, 500);

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <section aria-label="Profile" className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
        <p className="text-neutral-600 mt-2">View and manage your personal information</p>
      </header>

      <Card className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
            {data?.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">{data?.name}</h2>
            <p className="text-neutral-600 mt-1">{data?.email}</p>
            <p className="text-sm text-neutral-500 mt-2">{data?.program}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-4">Academic Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 uppercase">Student ID</p>
              <p className="font-semibold text-neutral-900">{data?.studentId}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Roll Number</p>
              <p className="font-semibold text-neutral-900">{data?.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Department</p>
              <p className="font-semibold text-neutral-900">{data?.department}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Semester</p>
              <p className="font-semibold text-neutral-900">{data?.semester}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 uppercase">Date of Birth</p>
              <p className="font-semibold text-neutral-900">{data?.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Gender</p>
              <p className="font-semibold text-neutral-900">{data?.gender}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Phone</p>
              <p className="font-semibold text-neutral-900">{data?.phone}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Joining Date</p>
              <p className="font-semibold text-neutral-900">{data?.joiningDate}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-neutral-600 uppercase tracking-wide mb-4">Contact Address</h3>
        <p className="text-neutral-900">{data?.address}</p>
      </Card>

      <Card className="p-6 border-2 border-green-200 bg-green-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-semibold text-neutral-900">Enrollment Status</p>
            <p className="text-green-700">{data?.enrollmentStatus}</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
