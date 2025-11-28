import * as express from "express";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
