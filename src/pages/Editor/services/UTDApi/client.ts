export const API_BASE_URL = "https://www.uptodateconnect.com/api/v1/site-builder";

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${import.meta.env.VITE_UTD_STATIC_BEARER_TOKEN}` };
}

// Shared GET helper: builds the auth header and raises a consistent error
// on non-2xx responses, so individual resource files only need to build
// the URL and shape the response.
export async function apiGet<T>(url: URL, errorContext: string): Promise<T> {
  const response = await fetch(url, { headers: authHeaders() });

  if (!response.ok) {
    throw new Error(
      `Failed to ${errorContext}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
