declare namespace Express {
  export interface Request {
    user?: {
      id: string;
    };
    client?: {
      id: string;
    };
  }
}
