# 🛡️ NIST Sentinel: Cybersecurity Framework (CSF) 2.0 Compliance Tool

**NIST Sentinel** is a professional-grade orchestrator designed to simplify, visualize, and manage cybersecurity audits. Built specifically for the **NIST CSF 2.0**, it transforms complex compliance requirements into an intuitive, action-oriented workflow.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status: Live](https://img.shields.io/badge/Status-Live-emerald)
![JS: ES6+](https://img.shields.io/badge/JS-ES6%2B-yellow?logo=javascript&logoColor=black)
![CSS: Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white)
![NIST Framework](https://img.shields.io/badge/Framework-NIST_CSF_2.0-blue)
![Focus: IT Audit](https://img.shields.io/badge/Focus-IT_Audit-orange)

---

---

## 📖 What is the NIST CSF 2.0?
The **NIST Cybersecurity Framework (CSF) 2.0** is the global gold standard for managing and reducing cybersecurity risk. Developed by the *National Institute of Standards and Technology*, it provides a common language and systematic methodology for organizations to understand, implement, and prioritize their security posture.

> **Official Resource:** [Explore the NIST CSF 2.0 Framework Official Site](https://www.nist.gov/cyberframework) 🌐

---

## 🎯 The Value Proposition: Why NIST Sentinel?

Audit processes are often hindered by static spreadsheets and fragmented documentation. **NIST Sentinel** bridges the gap between technical assessment and executive oversight by providing a dynamic environment for compliance management.

* **For Auditors:** Transition from "Excel-based audits" to a visual Kanban system that tracks control maturity in real-time.
* **For IT Managers:** Gain immediate visibility into which controls are pending, in progress, or successfully assessed.
* **For Compliance Officers:** Ensure total data sovereignty. Since the tool is serverless, sensitive audit data never leaves the local environment.

---

## 🚀 Key Features

### 📋 Interactive Audit Board
Manage the full lifecycle of a NIST subcategory with a simple drag-and-drop interface. Track your progress across all core functions: **Govern, Identify, Protect, Detect, Respond, and Recover**.

### 💾 Privacy by Design (Air-Gapped Ready)
Built for high-security environments, Sentinel uses a **Zero-Server Architecture**:
* **No Databases:** Leverages the browser's secure `LocalStorage`.
* **No Cloud Dependency:** Ideal for secure or restricted environments where internet access is limited.
* **Portable Sessions:** Export your entire audit as a **JSON file** to resume it later on any device.

### 🖨️ Professional Reporting
Generate clean, audit-ready summaries. The tool features a specialized print layer that removes UI clutter, producing "presentation-ready" PDF documents for stakeholders.

---

## 🏗️ Technical Architecture (For Developers)
Under the hood, NIST Sentinel is a high-performance web application designed for reliability and speed:

* **Core Logic:** Vanilla JavaScript (ES6+). Zero framework bloat for maximum execution speed.
* **UI Framework:** Tailwind CSS for a responsive, utility-first atomic design.
* **State Management:** High-fidelity synchronization between the DOM and the persistence layer via **JSON Serialization**.
* **Optimization:** Uses an event-delegation model for all board interactions, ensuring smooth performance even on low-resource hardware.

---

## 📥 Getting Started
No installation or complex configuration required:
1.  Clone this repository: `git clone https://github.com/KaledSML/nist-sentinel.git`
2.  Open `index.html` in any modern web browser.
3.  Begin your audit. 🐯

---
**Crafted by [kaledsml](https://github.com/kaledsml)** 🐯
*Engineering secure solutions from the bit level up.*
