export const STATS = {
  mealsRedistributed: 850432,
  co2Offset: 1240,
  waterSaved: 300000,
  activeNGOs: 1240,
  volunteers: 8500,
  donorPartners: 3200,
};

export const LIVE_DONATIONS = [
  { id: "D001", donor: "Taj Hotel, Mumbai", food: "Biryani & Breads", qty: "120 meals", time: "2 min ago", status: "Available", lat: 19.076, lng: 72.877 },
  { id: "D002", donor: "City Hospital, Delhi", food: "Fruits & Dairy", qty: "80 packets", time: "5 min ago", status: "Claimed", lat: 28.635, lng: 77.224 },
  { id: "D003", donor: "Green Event Hub", food: "Snacks & Juices", qty: "200 items", time: "12 min ago", status: "In Transit", lat: 12.971, lng: 77.594 },
  { id: "D004", donor: "Leela Palace, Bangalore", food: "Continental Dinner", qty: "150 meals", time: "18 min ago", status: "Available", lat: 17.385, lng: 78.486 },
  { id: "D005", donor: "Fortune Hotel, Hyderabad", food: "South Indian Thali", qty: "90 meals", time: "22 min ago", status: "Completed", lat: 13.082, lng: 80.270 },
  { id: "D006", donor: "Apollo Hospitals, Chennai", food: "Packaged Meals", qty: "60 units", time: "30 min ago", status: "Available", lat: 22.572, lng: 88.363 },
];

export const USERS = [
  { id: "U001", name: "Arjun Mehta", email: "arjun@tajhotels.com", role: "Donor", status: "Verified", donations: 47, joined: "Jan 2024" },
  { id: "U002", name: "Priya Singh", email: "priya@helpinghands.org", role: "NGO", status: "Verified", donations: 0, joined: "Feb 2024" },
  { id: "U003", name: "Karthik R", email: "karthik@volunteer.in", role: "Volunteer", status: "Active", donations: 0, joined: "Mar 2024" },
  { id: "U004", name: "Meena Sharma", email: "meena@cityhosp.in", role: "Donor", status: "Verified", donations: 23, joined: "Apr 2024" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "donation", message: "New donation available: 120 meals near you!", time: "2 min ago", read: false },
  { id: 2, type: "pickup", message: "Volunteer Karthik has accepted your pickup request", time: "15 min ago", read: false },
  { id: 3, type: "completed", message: "Donation D002 successfully delivered to Helping Hands NGO", time: "1 hr ago", read: true },
  { id: 4, type: "alert", message: "High surplus alert: 3 donors in your area!", time: "2 hrs ago", read: true },
];

export const ROLES = ["Donor", "NGO", "Volunteer"] as const;
export type Role = typeof ROLES[number];
