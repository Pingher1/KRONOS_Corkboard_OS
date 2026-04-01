# KRONOS SYSTEM ARCHITECTURE
## Down Payment Resource (DPR) - UI & Brand Asset Replication Guide

To successfully wrap and deploy **Down Payment Resource®** as an internal KRONOS App while maintaining visual parity and explicit legal compliance, we must rigidly adhere to their established UI framework and Registered Trademark formatting.

---

### 1. Mandatory Legal & Trademark Footprints
When embedding or framing DPR in the KRONOS OS, the following legal strings must be present on the terminal footer to ensure compliance with Workforce Resource LLC:

*   **Primary Naming Convention:** Always use the registered trademark symbol on the first instance of the name: `Down Payment Resource®`
*   **Secondary Naming:** `Down Payment Connect`
*   **Footer Attribution:** `Powered by Down Payment Resource®`
*   **Absolute Legal Copyright Block:** 
    `© 2008-2026 Workforce Resource LLC. DOWN PAYMENT RESOURCE® is a registered trademark of Workforce Resource LLC.`

---

### 2. The Visual Identity & Logo Map
**The Master Logo:**
The proprietary logo consists of a **Dark Blue House** outline, coupled with a **Lime Green Chevron/Arrow** extending vertically from the left roofline. This must be vectorized or sourced cleanly for the KRONOS App Dock.

**Social / External Monitoring:**
Their official updates, program additions, and educational resources stream from their official X pipeline:
*Twitter/X Handle:* `@dwnpmtresource` (https://x.com/dwnpmtresource)
*Note:* We can embed this Twitter feed widget directly into the KRONOS DPR App so operators see live program updates natively.

---

### 3. The Functional UI Button Grid (Color Matrix)
To replicate their exact user interface for the internal App portal, we will map their operational buttons to exact Tailwind CSS color variables. 

Their dashboard utilizes a 4-color grid layout:

**A. The Green Action Block (Primary Conversion)**
*Tailwind Map:* `bg-green-600 hover:bg-green-700 text-white`
*   **Down Payment Connect**
*   **Marketing Resources**

**B. The Dark Blue Matrix (System/Site Tools)**
*Tailwind Map:* `bg-blue-700 hover:bg-blue-800 text-white`
*   **DPR on Your IDX Site**
*   **DPR Pricing Tool**
*   **Search Programs by Name**

**C. The Orange Matrix (Client Operations)**
*Tailwind Map:* `bg-orange-500 hover:bg-orange-600 text-white`
*   **Client Search**
*   **Manage Client Accounts**
*   **View Saved Searches**

**D. The Light Blue Matrix (Education & Output)**
*Tailwind Map:* `bg-sky-400 hover:bg-sky-500 text-white`
*   **DPR Blog**
*   **DPR Reports**
*   **DPR Education**

---

### 4. Integration Blueprint
When constructing the `DPR_Terminal.jsx` component inside KRONOS, it will feature:
1. The **Top Header** displaying the exact logo and `Welcome Phillip Richardson | Log Out`.
2. The **Left Module** housing the exact 4-color Grid layout listed above for fast programmatic access.
3. The **Center Iframe/Terminal** targeting `https://www.workforce-resource.com/dpr/pmt/HAR/PHILLIP_RICHARDSON` to physically execute the Client Eligibility Data bridges without leaving KRONOS.
4. The **Right Module** running an embedded script of the `@dwnpmtresource` X/Twitter feed.
5. The **Footer** locked with the mandatory Trademark strings.
