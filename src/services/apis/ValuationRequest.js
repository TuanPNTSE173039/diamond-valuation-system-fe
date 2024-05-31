import { http } from "../config.js";

export const getValuationRequests = () => http.get("valuation-requests");
