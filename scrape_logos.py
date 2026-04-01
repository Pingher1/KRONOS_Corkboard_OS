import os
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

vendor_domains = [
    "zillow.com", "realtor.com", "homes.com", "har.com", "corelogic.com",
    "homedepot.com", "starbucks.com", "chase.com", "bankofamerica.com",
    "docusign.com", "followupboss.com", "walmart.com", "netflix.com", "disney.com",
    "macys.com", "target.com"
]

target_dir = "/Users/philliprichardson/Desktop/Phillips_Projects/KRONOS_Corkboard_OS/public/vendor_assets"
os.makedirs(target_dir, exist_ok=True)

print("INITIATING KRONOS VENDOR ASSET BATCH SCRAPE...")

for domain in vendor_domains:
    url = f"https://logo.clearbit.com/{domain}"
    file_path = os.path.join(target_dir, f"{domain.split('.')[0]}_logo.png")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            with open(file_path, "wb") as f:
                f.write(resp.read())
        print(f"[SUCCESS] Scraped vector logo for: {domain}")
    except Exception as e:
        print(f"[WARNING] Skipping {domain}: {e}")

print("BATCH COMPLETE. ASSETS LOADED INTO LOCALHOST PUBLIC DIRECTORY.")
