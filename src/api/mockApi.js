/**
 * Mock API - simulates async fetching with loading/error states.
 * In production, replace with real API calls.
 */

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export async function fetchUsers() {
  await delay();
  const { default: data } = await import("../mock/users.json");
  return data;
}

export async function fetchReports() {
  await delay();
  const { default: data } = await import("../mock/reports.json");
  return data;
}

export async function fetchCourses() {
  await delay();
  const { default: data } = await import("../mock/courses.json");
  return data;
}

export async function fetchExams() {
  await delay();
  const { default: data } = await import("../mock/exams.json");
  return data;
}

export async function fetchDashboard() {
  await delay();
  const { default: data } = await import("../mock/dashboard.json");
  return data;
}
