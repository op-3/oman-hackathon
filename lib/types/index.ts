export interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationLink: string;
  location: string;
  organizer: string;
  imageUrl: string;
  status: "upcoming" | "ongoing" | "completed";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: "admin";
}

export interface FirebaseError {
  code: string;
  message: string;
}
