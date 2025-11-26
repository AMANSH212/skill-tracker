// frontend/src/components/Notification.js
import './Notification.css';

export function Notification({ message, type = "info" }) {
  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;
  setTimeout(() => notif.remove(), 3000);
  return notif;
}
