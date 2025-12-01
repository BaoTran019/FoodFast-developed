// drones-api.js
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

/**
 * Lấy drone theo orderId
 * @param {string} orderId
 * @returns {Promise<Array>} Mảng drone có {id, lat, lng, orderId}
 */
export async function fetchDroneByOrderId(orderId) {
  try {
    const dronesRef = collection(db, "drones");

    // query drones có orderId = orderId
    const q = query(dronesRef, where("orderId", "==", orderId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Không tìm thấy drone cho orderId:", orderId);
      return [];
    }

    const drones = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Drone tìm được:", drones);
    return drones;

  } catch (err) {
    console.error("Lỗi khi lấy drone:", err);
    return [];
  }
}

/**
 * Hoàn thành chuyến bay của drone
 * @param {string} droneId
 * @returns {Promise<void>}
 */
export async function completeDroneFlight(droneId) {
  try {
    console.log(droneId)
    const droneRef = doc(db, "drones", droneId);
    await updateDoc(droneRef, {
      lat: 10.7832,
      lng: 106.70625,
      orderId: "",
      status: "idle"
    });
    console.log(`Drone ${droneId} đã hoàn thành chuyến bay và trở về trạng thái idle.`);
  } catch (err) {
    console.error("Lỗi khi hoàn thành chuyến bay của drone:", err);
  }
}
