# 🛡️ NIST Sentinel: Technical Documentation & Audit Engine

**NIST Sentinel** is a specialized compliance framework orchestrator designed for the **NIST Cybersecurity Framework (CSF) 2.0**. This documentation covers the architectural design, data lifecycle, and operational procedures of the tool.

## 📐 System Architecture & Logic Flow

The application is built on a **Modular Client-Side Architecture**. It bypasses the need for backend infrastructures by treating the browser as a secure, sandboxed execution environment.

### 1. Data Lifecycle Management (DLM)
The data flow mirrors a state machine, ensuring integrity from input to export:
* **Ingestion:** Controls are loaded from a structured JSON object containing NIST CSF 2.0 subcategories.
* **State Persistence:** Current progress is mapped to `localStorage` using a unique namespace to avoid collisions.
* **Serialization:** When exporting, the engine runs a deep-clone routine to transform the active DOM state into a portable `.json` file.

### 2. The Kanban Execution Engine
The tool implements an $O(1)$ event-driven model for task transitions:
* **Logic:** Uses **SortableJS** to manage drag-and-drop events without re-rendering the entire list, preserving CPU cycles (crucial for lower-end hardware, a principle borrowed from **Arduino/Embedded systems** optimization).
* **Validation:** Every movement updates a "Control Status" flag in the underlying data object, ensuring the summary report is always synchronized with the visual board.

## 🛠️ Detailed Technical Specifications

| Component | Technology | Implementation Detail |
| :--- | :--- | :--- |
| **Interface** | Tailwind CSS | Utility-first JIT engine for ultra-fast UI rendering. |
| **Logic Layer** | Vanilla JS (ES6) | Zero-dependency core logic for audit control management. |
| **Persistence** | Web Storage API | 5MB local quota management for session history. |
| **Icons & Brand** | Manifest.json | PWA-ready configuration with custom 512x512 branding. |

## 📑 Audit Methodology (How to use)

### Phase 1: Preparation
- Load the NIST Sentinel environment.
- Review the **Backlog** which contains the full suite of NIST CSF 2.0 controls (Identify, Protect, Detect, Respond, Recover, Govern).

### Phase 2: Assessment
- Move subcategories to **In Progress** as you verify evidence.
- Use the **Checklist Modal** to mark specific requirements as "Met" or "Not Met".
- Transition completed items to **Assessed** for final review.

### Phase 3: Reporting & Portability
- **Exporting:** Generate a timestamped JSON backup of the audit state.
- **Printing:** The tool uses a `@media print` CSS layer to strip UI elements (buttons, nav) and produce a clean, professional audit document.

## 🐯 Engineering Philosophy: The Hardware Connection
This documentation reflects a "Bit-to-Audit" philosophy. Having won technical competitions with **Arduino proposals**, I apply the same rigor to software:
* **Zero Latency:** No API calls means the tool is functional in air-gapped or high-security environments.
* **Resource Efficiency:** Minimal memory footprint through optimized DOM manipulation.

## 📜 License & Compliance
Distributed under the **MIT License**. This tool is a support instrument; final audit accountability remains with the human practitioner.

---
**Lead Developer:** [kaledsml](https://github.com/kaledsml) 🐯
*Cybersecurity Engineering | Intermediate Developer | Arduino Enthusiast*
