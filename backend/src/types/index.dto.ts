import { UserPayload } from "src/auth/types/user-payload.type";

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
