import { vi } from "vitest";

export const routerMock = {
   push: vi.fn()
}

export const useRouter = () => {
   return routerMock
}