const configuredBase = import.meta.env.VITE_API_BASE_URL || "/api";
export const API_BASE_URL = configuredBase.replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new Error("The blog service could not be reached. Check the API connection and try again.");
  }

  const payload = await response.json().catch(() => ({}));
  if (response.status === 401 && typeof window !== "undefined" && (path.startsWith("/blogs/admin") || path.startsWith("/auth/admin/me"))) {
    window.dispatchEvent(new Event("sg:admin-session-expired"));
  }
  if (!response.ok) {
    const error = new Error(payload.message || `Request failed (${response.status}).`);
    error.status = response.status;
    error.details = payload.errors || null;
    throw error;
  }
  return payload;
}

export const jsonBody = (value) => JSON.stringify(value);
