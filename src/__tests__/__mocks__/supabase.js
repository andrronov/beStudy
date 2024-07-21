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
    getUser: vi.fn().mockResolvedValue({
      data: { user: {user_metadata: { username: 'Test'}}}
    }),
    getSession: vi.fn().mockResolvedValue({
      data: { session: { session: 'session' } } // Обратите внимание на структуру данных
    }),
    // onAuthStateChange: vi.fn().mockImplementation((callback) => {
    //   // Вызываем callback с мокированным значением
    //   const mockSession = { user: { user_metadata: { username: 'Test' } } };
    //   callback(null, mockSession); // Вызываем callback с null для ошибки и мок-сессией
    //   return { subscription: 'mock-subscription' }; // Возвращаем объект подписки
    // })
    // getSession: vi.fn().mockResolvedValue({
    //   session: {session: 'session'}
    // }),
    onAuthStateChange: vi.fn().mockResolvedValue({
      data: {subscription: 'subscription'}
    })
  }
};