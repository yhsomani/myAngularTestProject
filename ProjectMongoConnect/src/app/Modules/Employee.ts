export interface Employee {
  _id: string;
  name: string;
  email: string;
  designation: string;
  phoneNumber: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
