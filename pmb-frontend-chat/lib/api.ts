import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"


export const getGuestId = (): string => {
  if (typeof window !== "undefined") {
    let guestId = sessionStorage.getItem("guest_id")
    if (!guestId) {
      guestId = uuidv4()
      sessionStorage.setItem("guest_id", guestId)
    }
    return guestId
  }
  return "server-side-guest" 
}

export const getUserToken = () => {
  return Cookies.get("user_token") || null
}

const getHeaders = (isUrlEncoded = false) => {
  const headers: HeadersInit = {}
  headers["Content-Type"] = isUrlEncoded ? "application/x-www-form-urlencoded" : "application/json";

  const guestId = getGuestId();
  if (guestId) {
    headers["X-Guest-ID"] = guestId;
  }

  const token = getUserToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers
}

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "An error occurred")
  }
  return data
}

export const authService = {
  login: async (credentials: { username: string; password: string }) => {
    const formData = new URLSearchParams()
    formData.append("username", credentials.username) 
    formData.append("password", credentials.password)

    const res = await fetch(`${BASE_URL}/auth/user/login`, {
      method: "POST",
      headers: getHeaders(true), 
      body: formData,
    })
    return handleResponse(res)
  },

  // Register Manual
  register: async (payload: { full_name: string; email: string; username: string; password: string; confirm_password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/user/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })
    return handleResponse(res)
  },

  googleLogin: async (token: string) => {
    const res = await fetch(`${BASE_URL}/auth/user/auth/google`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ token }),
    })
    return handleResponse(res)
  },

  logout: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("user_token", { path: "/" })
      Cookies.remove("user_name", { path: "/" })
      Cookies.remove("user_email", { path: "/" })
      Cookies.remove("user_avatar", { path: "/" })
      Cookies.remove("admin_token", { path: "/" })
      sessionStorage.removeItem("guest_id")
      window.location.href = "/"
    }
  }
}

export const chatService = {
  sendMessage: async (sessionId: string, message: string) => {
    const res = await fetch(`${BASE_URL}/chat/${sessionId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ message }),
    })
    return handleResponse(res)
  },

  getSessions: async () => {
    const res = await fetch(`${BASE_URL}/chat/sessions`, {
      method: "GET",
      headers: getHeaders(),
    })
    return handleResponse(res)
  },

  getHistory: async (sessionId: string) => {
    const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
      method: "GET",
      headers: getHeaders(),
    })
    return handleResponse(res)
  }
}