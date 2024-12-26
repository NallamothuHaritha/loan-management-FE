export interface LoanResponse {
  isApproved: string; // "Approved" or "Rejected"
  responseMessages: string; // Always present as per backend
}
