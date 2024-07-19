import { vi } from "vitest";

export const supabaseMock = {
  auth: {
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { user: { id: 'e6f63a62-e7ff-4a36-a7dd-ae6e1fec5d26' } },
      error: null
    }),
    signUp: vi.fn().mockResolvedValue({
      data: { user: { id: 'new-user' } },
      error: null
    }),
    dropError: vi.fn().mockRejectedValue({
      data: null,
      error: 'API Error'
    }),
    getSession: vi.fn()
  }
};