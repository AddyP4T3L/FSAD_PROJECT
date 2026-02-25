import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    institutionName: "CampusCore University",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    notifications: true,
    emailDigest: "weekly",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSaved(true);
  };

  return (
    <section aria-label="Settings" className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-500 mt-1">Configure your organization preferences</p>
      </header>

      {saved && (
        <div
          className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700"
          role="status"
          aria-live="polite"
        >
          Settings saved successfully.
        </div>
      )}

      <Card title="General">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Institution Name"
            value={form.institutionName}
            onChange={(e) => handleChange("institutionName", e.target.value)}
          />
          <Select
            label="Timezone"
            value={form.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
            options={[
              { value: "Asia/Kolkata", label: "Asia/Kolkata" },
              { value: "America/New_York", label: "America/New York" },
              { value: "Europe/London", label: "Europe/London" },
              { value: "Asia/Dubai", label: "Asia/Dubai" },
            ]}
          />
          <Select
            label="Date Format"
            value={form.dateFormat}
            onChange={(e) => handleChange("dateFormat", e.target.value)}
            options={[
              { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
              { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
              { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
            ]}
          />
        </div>
        <div className="mt-6">
          <Button variant="primary" onClick={handleSave} loading={loading}>
            Save Changes
          </Button>
        </div>
      </Card>

      <Card title="Notifications">
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.notifications}
              onChange={(e) => handleChange("notifications", e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-neutral-700">Enable email notifications</span>
          </label>
          <Select
            label="Email digest frequency"
            value={form.emailDigest}
            onChange={(e) => handleChange("emailDigest", e.target.value)}
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "off", label: "Off" },
            ]}
          />
        </div>
      </Card>
    </section>
  );
}
