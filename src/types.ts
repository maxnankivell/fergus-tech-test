type Status = "scheduled" | "active" | "invoicing" | "to price" | "complete";

interface ContactDetails {
  email: string;
  phoneNumber: string;
}

export interface Job {
  id: number;
  status: Status;
  dateCreated: string;
  name: string;
  contactDetails: ContactDetails;
  notes: string[];
}
