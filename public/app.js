import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyARVvj8YJbG7mHcZ0SCJeQvo0NMr5cZSBo",
  authDomain: "database-eb5b8.firebaseapp.com",
  projectId: "database-eb5b8",
  storageBucket: "database-eb5b8.firebasestorage.app",
  messagingSenderId: "610043096017",
  appId: "1:610043096017:web:091eebc79381360e6f8ef0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wordsRef = collection(db, "wordcloud_words");

const form = document.querySelector("#word-form");
const input = document.querySelector("#word-input");
const submitButton = document.querySelector("#submit-button");
const message = document.querySelector("#form-message");
const charCount = document.querySelector("#char-count");
const cloud = document.querySelector("#word-cloud");
const emptyState = document.querySelector("#empty-state");
const responseCount = document.querySelector("#response-count");
const connection = document.querySelector("#connection");

const colors = ["#d8ff6d", "#65e7d5", "#ff8f70", "#78a9ff", "#c39bff", "#f5f7f4"];
let latestWords = [];
let renderFrame;

function normalizeWord(value) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("zh-Hant-TW");
}

function hash(text) {
  let value = 0;
  for (let index = 0; index < text.length; index += 1) {
    value = ((value << 5) - value + text.charCodeAt(index)) | 0;
  }
  return Math.abs(value);
}

function overlaps(candidate, placed, gap = 7) {
  return placed.some((item) => !(
    candidate.right + gap < item.left ||
    candidate.left - gap > item.right ||
    candidate.bottom + gap < item.top ||
    candidate.top - gap > item.bottom
  ));
}

function renderCloud(entries) {
  cloud.querySelectorAll(".cloud-word").forEach((node) => node.remove());
  emptyState.hidden = entries.length > 0;
  if (!entries.length) return;

  const width = cloud.clientWidth;
  const height = cloud.clientHeight;
  const maxCount = Math.max(...entries.map((entry) => entry.count));
  const minDimension = Math.min(width, height);
  const placed = [];

  entries.slice(0, 45).forEach((entry, index) => {
    const node = document.createElement("span");
    node.className = "cloud-word";
    node.textContent = entry.label;
    node.style.color = colors[hash(entry.key) % colors.length];
    const scale = maxCount === 1 ? 0.46 : 0.28 + (entry.count / maxCount) * 0.72;
    const fontSize = Math.max(18, Math.min(minDimension * 0.15, 18 + scale * minDimension * 0.1));
    node.style.fontSize = `${fontSize}px`;
    node.style.animationDelay = `${Math.min(index * 25, 350)}ms`;
    cloud.appendChild(node);

    const rect = node.getBoundingClientRect();
    const nodeWidth = rect.width;
    const nodeHeight = rect.height;
    const seed = hash(entry.key);
    let found = false;

    for (let step = 0; step < 700; step += 1) {
      const angle = step * 0.48 + (seed % 17);
      const radius = 2.15 * Math.sqrt(step);
      const centerX = width / 2 + Math.cos(angle) * radius * (width / Math.max(height, 1));
      const centerY = height / 2 + Math.sin(angle) * radius;
      const left = centerX - nodeWidth / 2;
      const top = centerY - nodeHeight / 2;
      const candidate = { left, top, right: left + nodeWidth, bottom: top + nodeHeight };

      if (left >= 10 && top >= 10 && candidate.right <= width - 10 && candidate.bottom <= height - 10 && !overlaps(candidate, placed)) {
        node.style.left = `${left}px`;
        node.style.top = `${top}px`;
        placed.push(candidate);
        found = true;
        break;
      }
    }

    if (!found) node.remove();
  });
}

function aggregateWords(documents) {
  const totals = new Map();
  documents.forEach((item) => {
    const raw = typeof item.word === "string" ? item.word.trim() : "";
    if (!raw) return;
    const key = typeof item.normalized === "string" ? item.normalized : normalizeWord(raw);
    const current = totals.get(key) || { key, label: raw, count: 0 };
    current.count += 1;
    totals.set(key, current);
  });
  return [...totals.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "zh-Hant-TW"));
}

const liveQuery = query(wordsRef, orderBy("createdAt", "desc"), limit(300));
onSnapshot(liveQuery, (snapshot) => {
  latestWords = aggregateWords(snapshot.docs.map((item) => item.data()));
  responseCount.textContent = snapshot.size.toLocaleString("zh-TW");
  connection.className = "connection online";
  connection.querySelector("span:last-child").textContent = "已即時連線";
  cancelAnimationFrame(renderFrame);
  renderFrame = requestAnimationFrame(() => renderCloud(latestWords));
}, (error) => {
  console.error(error);
  connection.className = "connection error";
  connection.querySelector("span:last-child").textContent = "連線失敗";
  message.textContent = "目前無法讀取文字雲，請稍後再試。";
  message.className = "form-message error";
});

input.addEventListener("input", () => {
  charCount.textContent = [...input.value].length;
  message.textContent = "";
  message.className = "form-message";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const word = input.value.trim().replace(/\s+/g, " ");
  const length = [...word].length;

  if (!word || length > 20) {
    message.textContent = "請輸入 1–20 個字的關鍵字。";
    message.className = "form-message error";
    return;
  }

  submitButton.disabled = true;
  message.textContent = "正在送出…";
  message.className = "form-message";

  try {
    await addDoc(wordsRef, {
      word,
      normalized: normalizeWord(word),
      createdAt: serverTimestamp(),
    });
    form.reset();
    charCount.textContent = "0";
    message.textContent = `已收到「${word}」！`;
    input.focus();
  } catch (error) {
    console.error(error);
    message.textContent = "送出失敗，請檢查網路後再試。";
    message.className = "form-message error";
  } finally {
    submitButton.disabled = false;
  }
});

window.addEventListener("resize", () => {
  clearTimeout(window.__cloudResizeTimer);
  window.__cloudResizeTimer = setTimeout(() => renderCloud(latestWords), 140);
});
