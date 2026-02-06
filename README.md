# 🛡️ NIST Sentinel: Cybersecurity Framework (CSF) 2.0 Audit Engine

**NIST Sentinel** is a professional-grade orchestrator designed to simplify, visualize, and manage cybersecurity audits. Built specifically for the **NIST CSF 2.0**, it transforms complex compliance requirements into an intuitive, action-oriented workflow.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status: Live](https://img.shields.io/badge/Status-Live-emerald)
![Security: Air-Gapped-Ready](https://img.shields.io/badge/Security-100%25_Private-blue)

---

## 📖 What is the NIST CSF 2.0?
The **NIST Cybersecurity Framework (CSF) 2.0** is the gold standard for managing and reducing cybersecurity risk. Published by the *National Institute of Standards and Technology*, it provides a common language for organizations to understand, implement, and prioritize their security posture.

> **Official Resource:** [Explore the NIST CSF 2.0 Framework](https://www.nist.gov/cyberframework) 🌐

---

## 🎯 Why use NIST Sentinel? (The Value Proposition)

Audit processes are often buried in static spreadsheets and fragmented documentation. **NIST Sentinel** was created to bridge the gap between technical assessment and executive oversight.

* **For Auditors:** Move away from "Excel-hell" and manage controls through a visual Kanban system.
* **For IT Managers:** Real-time visibility into which controls are pending, in progress, or successfully assessed.
* **For Compliance Officers:** Ensure 100% data privacy. No data ever leaves your machine; everything stays local.

---

## 🚀 Key Features

### 📋 Interactive Audit Board
Manage the full lifecycle of a NIST subcategory with a simple drag-and-drop. From **Govern** and **Identify** to **Recover**, track every move visually.

### 💾 Total Data Sovereignty (Privacy First)
Built for high-security environments. Sentinel uses **Zero-Server Architecture**:
* **No Databases:** Uses your browser's secure `LocalStorage`.
* **No Cloud:** Ideal for "Air-Gapped" systems where internet access is restricted.
* **Portable Sessions:** Export your entire audit as a **JSON file** and resume it later or on another device.

### 🖨️ One-Click Executive Reporting
Generate clean, professional summaries of your audit findings. The tool is optimized for PDF export and physical printing, removing all UI clutter for a "presentation-ready" document.

---

## 🏗️ Technical Architecture (For Developers)
Under the hood, NIST Sentinel is a high-performance web application designed for reliability:

* **Logic Engine:** Vanilla JavaScript (ES6+). Zero bloat, maximum speed.
* **UI Framework:** Tailwind CSS for a responsive, atomic-design interface.
* **State Management:** Real-time synchronization between the DOM and the persistence layer using **JSON Serialization**.
* **Efficiency:** $O(1)$ event-delegation model for all board interactions via **SortableJS**.

---

## 📥 Deployment
No installation required. Just clone and run:
1. `git clone https://github.com/kaledsml/nist-sentinel.git`
2. Open `index.html` in your browser.
3. Start auditing. 🐯

---
**Crafted by [kaledsml](https://github.com/kaledsml)** 🐯
*Engineering secure solutions from the bit level up.*
