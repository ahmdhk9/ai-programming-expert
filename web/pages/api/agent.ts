// web/pages/api/agent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // جرّب إضافة مستند جديد في مجموعة "agents"
    const docRef = await addDoc(collection(db, "agents"), {
      message: "Hello from Firebase!",
      timestamp: new Date(),
    });

    // إذا نجح، رجّع رد JSON سريع
    res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    // إذا صار خطأ، رجّع رسالة واضحة بدل الانتظار
    console.error("Firebase error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
