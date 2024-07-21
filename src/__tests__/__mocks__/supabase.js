import { vi } from "vitest";

export const supabaseMock = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn().mockResolvedValue({
      data: { user: { id: 'new-user' } },
      error: null
    }),
    dropError: vi.fn().mockRejectedValue({
      data: null,
      error: 'API Error'
    }),
    getUser: vi.fn(),
    getSession: vi.fn(),
    onAuthStateChange: vi.fn().mockResolvedValue({
      data: {subscription: 'subscription'}
    })
  }
};