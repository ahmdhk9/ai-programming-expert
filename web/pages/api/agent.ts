import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase"; // تأكد من المسار الصحيح
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const docRef = await addDoc(collection(db, "agents"), {
      message: "Hello from Firebase!",
      timestamp: new Date(),
    });
    res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error("Firebase error:", error);
    res.status(500).json({ success: false, error: error.message || error });
  }
}
