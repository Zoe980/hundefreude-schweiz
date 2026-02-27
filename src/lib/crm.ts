/**
 * CRM Lead Payload – prepared for future webhook integration.
 */
export interface CrmLeadPayload {
  email: string;
  opt_in: true;
  quiz_answers: Record<string, string>;
  recommended_breed: string;
  timestamp: string;
  page_url: string;
}

/**
 * STUB – TODO: CRM webhook integration.
 * Currently only logs the payload. Replace with actual API call when backend is ready.
 */
export async function sendLeadToCRM(payload: CrmLeadPayload): Promise<void> {
  // TODO: CRM webhook integration
  console.log("[CRM Stub] Lead captured:", payload);
}
