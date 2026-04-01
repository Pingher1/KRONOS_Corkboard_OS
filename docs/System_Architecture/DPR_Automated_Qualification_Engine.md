# KRONOS SYSTEM ARCHITECTURE
## DPR (Down Payment Resource) Automated Qualification Engine

### 1. The Core Objective
Convert the static Down Payment Resource (DPR) search tool into an **automated KRONOS background engine** that automatically cross-references newly ingested real estate leads (from Follow Up Boss or SitexPro) against state and local assistance programs. 

Once eligibility is confirmed, KRONOS will autonomously trigger multi-channel marketing campaigns (Email, SMS, Direct Mail, Phone Dispatch) informing the client that they qualify for "Free Government Assistance" or "Down Payment Grants," drastically increasing conversion intent for the Richardson Team.

---

### 2. The Data Extraction Pipeline (The API/Scraper)

Since Workforce Resource (DPR) requires an active HAR login and may not have an open public API for high-volume bulk extraction, the system will operate via **Authenticated Headless Browsing (Puppeteer/Playwright)** or via an internal **Data Bridge**:

**A. Trigger Event:**
1. A new lead enters the KRONOS Pipeline (e.g., via Zillow, a Facebook Ad, or a direct upload).
2. KRONOS isolates the lead's target ZIP code, income bracket (if known), and desired property logic.

**B. The Qualification Engine (The Scrape/API Call):**
1. KRONOS activates an invisible backend terminal pointing to: `workforce-resource.com/dpr/pmt/HAR/PHILLIP_RICHARDSON`
2. The bot injects the target property data or zip code into the search fields.
3. The engine parses the returned DOM (Document Object Model) to see if a specific program (e.g., Texas State Affordable Housing Corporation - TSAHC, or local Houston grants) lights up as **"ELIGIBLE"**.

---

### 3. The Automated Outreach Dispatch (The Funnel)

If the KRONOS engine reads a "TRUE" flag for DPR Eligibility on a client's profile, it automatically tags the lead in Follow Up Boss with the tag: `[DPR_ELIGIBLE_GRANTS]`.

Once tagged, KRONOS triggers the **Multi-Channel Dispatch Protocol**:

*   **Email Engine:** Automatically fires a heavily branded HTML email from The Richardson Team: *"Subject: You are eligible for Down Payment Assistance in [CITY/ZIP]. Read your enclosed report."*
*   **Physical Mail (Direct Mail):** Sends payload to a third-party print API (like PostGrid or Lob) to print and physically mail a customized postcard summarizing their grant eligibility.
*   **Phone Call Dispatch:** Drops the lead into the Phantom Dialer queue for the offshore Virtual Assistants. The VA's script dynamically updates on their KRONOS Tactical Playground to say: *"Hi [NAME], I'm calling from The Richardson Team because our system just flagged your profile for a state down payment grant..."*

---

### 4. Implementation Phasing

**Phase 1: Proof of Concept (Current State)**
- The manual DPR page is linked directly into the KRONOS Offshore VA Dock (`VA_Portal.jsx`).
- Human Operators manually run searches for high-priority leads.

**Phase 2: Data Bridge Development**
- Python-based headless extraction (Playwright) built on a Digital Ocean Droplet to securely proxy through HAR and run backend DPR queries.
- Connect this Droplet to our `trm-0X` endpoints.

**Phase 3: The Automated CRM Sync**
- Connect the Droplet's "Eligible/Not Eligible" binary output to the Follow Up Boss (FUB) API using Zapier or custom Webhooks.
- Finalize the Email & Direct Mail templates within the Marketing Engine.
