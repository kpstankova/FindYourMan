import { Request } from "express";
import { Service } from "../models/Service";

export interface PaymentRequest extends Request {
  services: [Service];
}
