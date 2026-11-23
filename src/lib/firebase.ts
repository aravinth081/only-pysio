import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

// User's provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2BboJxL1wFVW_b35pxyKjgeLE--VixTA",
  authDomain: "aivora-a13e4.firebaseapp.com",
  projectId: "aivora-a13e4",
  storageBucket: "aivora-a13e4.firebasestorage.app",
  messagingSenderId: "624527403630",
  appId: "1:624527403630:web:b44316b99fcd29256ad47f",
  measurementId: "G-7JNDPXHHWG"
};

// Initialize Firebase (SSR safe singleton)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Data interfaces
export interface AppointmentData {
  id?: string;
  firestoreDocId?: string;
  fullName: string;
  phone: string;
  age?: string;
  gender?: string;
  condition: string;
  serviceMode: "Home Visit (Chennai)" | "Clinic Visit" | string;
  preferredDate: string;
  preferredTimeSlot: string;
  address?: string;
  medicalHistory?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt?: any;
}

export interface CallbackData {
  id?: string;
  firestoreDocId?: string;
  fullName: string;
  phone: string;
  preferredTime: "Immediately" | "Morning (9 AM - 12 PM)" | "Afternoon (12 PM - 4 PM)" | "Evening (4 PM - 8 PM)";
  primaryConcern: string;
  locationArea: string;
  status: "Pending" | "Contacted" | "Resolved";
  createdAt?: any;
}

// Generate sequential reference ID: OP001, OP002, OP003...
export function generateSequentialId(type: "booking" | "callback"): string {
  if (typeof window === "undefined") return "OP001";
  try {
    const key = type === "booking" ? "onlyphysio_seq_booking" : "onlyphysio_seq_callback";
    const storageKey = type === "booking" ? "onlyphysio_appointments" : "onlyphysio_callbacks";

    let maxNum = 0;
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.forEach((item: any) => {
      if (item && item.id) {
        const m = String(item.id).match(/^OP(\d+)$/i);
        if (m) {
          const n = parseInt(m[1], 10);
          if (n > maxNum) maxNum = n;
        }
      }
    });

    const storedCounter = parseInt(localStorage.getItem(key) || "0", 10);
    const nextNum = Math.max(maxNum, storedCounter) + 1;
    localStorage.setItem(key, nextNum.toString());

    return `OP${String(nextNum).padStart(3, "0")}`;
  } catch (e) {
    return "OP001";
  }
}

// Helper: Save Appointment to Firebase + localStorage fallback with sequential ID (Ultra-Fast)
export async function createAppointment(
  data: Omit<AppointmentData, "id" | "createdAt" | "status">,
  customId?: string
): Promise<{ success: boolean; id: string }> {
  const seqId = customId || generateSequentialId("booking");
  const newAppointment: AppointmentData = {
    ...data,
    id: seqId,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  // 1. Instant local persistence for zero-latency admin access and slip generation
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("onlyphysio_appointments") || "[]");
      const filtered = existing.filter((item: any) => item.id !== seqId);
      filtered.unshift({ ...newAppointment, id: seqId });
      localStorage.setItem("onlyphysio_appointments", JSON.stringify(filtered));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }

  // 2. Non-blocking Firestore cloud sync (capped at 400ms max so bill generates in <1s)
  const firestoreSync = addDoc(collection(db, "appointments"), {
    ...newAppointment,
    seqId,
    serverTime: serverTimestamp()
  }).catch((error) => {
    console.warn("Firestore background sync note:", error);
  });

  await Promise.race([
    firestoreSync,
    new Promise((resolve) => setTimeout(resolve, 350))
  ]);

  return { success: true, id: seqId };
}

// Helper: Save Callback Request to Firebase + localStorage fallback with sequential ID (Ultra-Fast)
export async function createCallbackRequest(
  data: Omit<CallbackData, "id" | "createdAt" | "status">,
  customId?: string
): Promise<{ success: boolean; id: string }> {
  const seqId = customId || generateSequentialId("callback");
  const newCallback: CallbackData = {
    ...data,
    id: seqId,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  // 1. Instant local persistence
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("onlyphysio_callbacks") || "[]");
      const filtered = existing.filter((item: any) => item.id !== seqId);
      filtered.unshift({ ...newCallback, id: seqId });
      localStorage.setItem("onlyphysio_callbacks", JSON.stringify(filtered));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }

  // 2. Non-blocking Firestore sync (capped at 400ms max)
  const firestoreSync = addDoc(collection(db, "callbacks"), {
    ...newCallback,
    seqId,
    serverTime: serverTimestamp()
  }).catch((error) => {
    console.warn("Firestore background sync note:", error);
  });

  await Promise.race([
    firestoreSync,
    new Promise((resolve) => setTimeout(resolve, 350))
  ]);

  return { success: true, id: seqId };
}

// Helper: Check if an appointment is sample / mock data
function isMockAppointment(item: AppointmentData): boolean {
  if (!item) return true;
  if (item.id && (item.id.startsWith("OP-CH-2026-") || item.id.startsWith("MOCK-"))) return true;
  const mockNames = [
    "r. venkataraman",
    "venkataraman",
    "priya senthil",
    "anand natarajan",
    "meenakshi sundaram",
    "gautham karthik",
    "deepa lakshmanan"
  ];
  return mockNames.includes(item.fullName?.trim().toLowerCase());
}

// Helper: Check if a callback is sample / mock data
function isMockCallback(item: CallbackData): boolean {
  if (!item) return true;
  if (item.id && (item.id.startsWith("CB-CH-00") || item.id.startsWith("MOCK-"))) return true;
  const mockNames = [
    "dr. k. raghavan",
    "k. raghavan",
    "sujatha raman",
    "arun kumar"
  ];
  return mockNames.includes(item.fullName?.trim().toLowerCase());
}

// Fetch all appointments (Firestore + Local Merge)
export async function fetchAppointments(): Promise<AppointmentData[]> {
  const list: AppointmentData[] = [];
  const seenIds = new Set<string>();

  try {
    const q = query(collection(db, "appointments"), orderBy("serverTime", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data() as any;
      const cleanId = data.seqId || data.id || d.id;
      const appt: AppointmentData = { ...data, id: cleanId, firestoreDocId: d.id };
      if (!isMockAppointment(appt)) {
        seenIds.add(cleanId);
        seenIds.add(d.id);
        list.push(appt);
      }
    });
  } catch (e) {
    try {
      const snap = await getDocs(collection(db, "appointments"));
      snap.forEach((d) => {
        const data = d.data() as any;
        const cleanId = data.seqId || data.id || d.id;
        const appt: AppointmentData = { ...data, id: cleanId, firestoreDocId: d.id };
        if (!isMockAppointment(appt)) {
          seenIds.add(cleanId);
          seenIds.add(d.id);
          list.push(appt);
        }
      });
    } catch (err) {
      console.warn("Could not fetch from Firestore, relying on local storage", err);
    }
  }

  // Merge with localStorage (strictly filter out any legacy mock data)
  if (typeof window !== "undefined") {
    try {
      const local = JSON.parse(localStorage.getItem("onlyphysio_appointments") || "[]");
      local.forEach((item: AppointmentData) => {
        if (item.id && !seenIds.has(item.id) && !isMockAppointment(item)) {
          list.push(item);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Filter out any mock records and sort newest first
  return list
    .filter((a) => !isMockAppointment(a))
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

// Fetch all callback requests
export async function fetchCallbackRequests(): Promise<CallbackData[]> {
  const list: CallbackData[] = [];
  const seenIds = new Set<string>();

  try {
    const q = query(collection(db, "callbacks"), orderBy("serverTime", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data() as any;
      const cleanId = data.seqId || data.id || d.id;
      const cb: CallbackData = { ...data, id: cleanId, firestoreDocId: d.id };
      if (!isMockCallback(cb)) {
        seenIds.add(cleanId);
        seenIds.add(d.id);
        list.push(cb);
      }
    });
  } catch (e) {
    try {
      const snap = await getDocs(collection(db, "callbacks"));
      snap.forEach((d) => {
        const data = d.data() as any;
        const cleanId = data.seqId || data.id || d.id;
        const cb: CallbackData = { ...data, id: cleanId, firestoreDocId: d.id };
        if (!isMockCallback(cb)) {
          seenIds.add(cleanId);
          seenIds.add(d.id);
          list.push(cb);
        }
      });
    } catch (err) {
      console.warn("Could not fetch from Firestore, relying on local storage", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const local = JSON.parse(localStorage.getItem("onlyphysio_callbacks") || "[]");
      local.forEach((item: CallbackData) => {
        if (item.id && !seenIds.has(item.id) && !isMockCallback(item)) {
          list.push(item);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return list
    .filter((c) => !isMockCallback(c))
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

// Update appointment status (Firestore + LocalStorage)
export async function updateAppointmentStatus(id: string, status: AppointmentData["status"], firestoreDocId?: string): Promise<boolean> {
  const targetDocId = firestoreDocId || id;
  try {
    if (!targetDocId.startsWith("local_")) {
      const docRef = doc(db, "appointments", targetDocId);
      await updateDoc(docRef, { status });
    }
  } catch (e) {
    console.warn("Firestore update status failed, updating local storage:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const existing: AppointmentData[] = JSON.parse(localStorage.getItem("onlyphysio_appointments") || "[]");
      const updated = existing.map((item) => (item.id === id || item.firestoreDocId === id ? { ...item, status } : item));
      localStorage.setItem("onlyphysio_appointments", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

// Update callback status
export async function updateCallbackStatus(id: string, status: CallbackData["status"], firestoreDocId?: string): Promise<boolean> {
  const targetDocId = firestoreDocId || id;
  try {
    if (!targetDocId.startsWith("local_")) {
      const docRef = doc(db, "callbacks", targetDocId);
      await updateDoc(docRef, { status });
    }
  } catch (e) {
    console.warn("Firestore callback status update failed:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const existing: CallbackData[] = JSON.parse(localStorage.getItem("onlyphysio_callbacks") || "[]");
      const updated = existing.map((item) => (item.id === id || item.firestoreDocId === id ? { ...item, status } : item));
      localStorage.setItem("onlyphysio_callbacks", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }
  return true;
}

// Delete appointment (Firestore + LocalStorage)
export async function deleteAppointment(id: string, firestoreDocId?: string): Promise<boolean> {
  const targetDocId = firestoreDocId || id;
  try {
    if (!targetDocId.startsWith("local_")) {
      const docRef = doc(db, "appointments", targetDocId);
      await deleteDoc(docRef);
    }
  } catch (e) {
    console.warn("Firestore appointment delete failed:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const existing: AppointmentData[] = JSON.parse(localStorage.getItem("onlyphysio_appointments") || "[]");
      const updated = existing.filter((item) => item.id !== id && item.firestoreDocId !== id);
      localStorage.setItem("onlyphysio_appointments", JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage delete appointment error:", e);
    }
  }
  return true;
}

// Delete callback request (Firestore + LocalStorage)
export async function deleteCallbackRequest(id: string, firestoreDocId?: string): Promise<boolean> {
  const targetDocId = firestoreDocId || id;
  try {
    if (!targetDocId.startsWith("local_")) {
      const docRef = doc(db, "callbacks", targetDocId);
      await deleteDoc(docRef);
    }
  } catch (e) {
    console.warn("Firestore callback delete failed:", e);
  }

  if (typeof window !== "undefined") {
    try {
      const existing: CallbackData[] = JSON.parse(localStorage.getItem("onlyphysio_callbacks") || "[]");
      const updated = existing.filter((item) => item.id !== id && item.firestoreDocId !== id);
      localStorage.setItem("onlyphysio_callbacks", JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage delete callback error:", e);
    }
  }
  return true;
}

// Purge all mock/sample test data completely from localStorage
export function purgeAllMockData() {
  if (typeof window === "undefined") return;
  try {
    const existingAppts = localStorage.getItem("onlyphysio_appointments");
    if (existingAppts) {
      const appts: AppointmentData[] = JSON.parse(existingAppts);
      const cleaned = appts.filter((a) => !isMockAppointment(a));
      localStorage.setItem("onlyphysio_appointments", JSON.stringify(cleaned));
    }

    const existingCallbacks = localStorage.getItem("onlyphysio_callbacks");
    if (existingCallbacks) {
      const cbs: CallbackData[] = JSON.parse(existingCallbacks);
      const cleanedCbs = cbs.filter((c) => !isMockCallback(c));
      localStorage.setItem("onlyphysio_callbacks", JSON.stringify(cleanedCbs));
    }
  } catch (e) {
    console.error("Purge mock data error:", e);
  }
}

// Helper: Clear all records in localStorage
export function clearAllAdminRecords() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("onlyphysio_appointments");
    localStorage.removeItem("onlyphysio_callbacks");
  } catch (e) {
    console.error("Clear records error:", e);
  }
}
