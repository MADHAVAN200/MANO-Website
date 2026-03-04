import asyncio
import os
from playwright.async_api import async_playwright

# All pages to scrape — update YOUR_DOMAIN with your actual domain or localhost
BASE_URL = "http://localhost:5173/pcpl"  # change to your live domain when deployed

PAGES = [
    ("",              "landing_page"),
    ("/about-us",     "about_us"),
    ("/services",     "services_overview"),
    ("/services/project-management",  "service_project_management"),
    ("/services/cost-consultancy",    "service_cost_consultancy"),
    ("/services/ehs-audit",           "service_ehs_auditing"),
    ("/services/qa-audit",            "service_qa_qc_auditing"),
    ("/services/qs-billing-audit",    "service_qs_billing"),
    ("/services/project-execution",   "service_project_execution"),
    ("/services/project-planning",    "service_project_planning"),
    ("/services/contract-management", "service_contract_management"),
    ("/services/epc",                 "service_epc"),
    ("/projects",     "projects"),
    ("/careers",      "careers"),
]

OUTPUT_DIR = "knowledge_base/pages"

async def scrape_page(page, url, label):
    print(f"  Scraping: {label}  ->  {url}")
    await page.goto(url, wait_until="networkidle", timeout=30000)
    # Scroll to trigger lazy-loaded content
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    await page.wait_for_timeout(1500)
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(500)

    # Extract block by block based on the layout children to separate sections
    page_blocks = await page.evaluate("""() => {
        // 1. Remove navigation and footer to remove noise across pages
        document.querySelectorAll('script, style, noscript, nav, footer').forEach(el => el.remove());

        let results = [];
        let sectionNum = 1;

        // 2. Try to find the main container (usually the parent of <section> tags)
        let sections = document.querySelectorAll('section');
        let mainContainer = null;
        
        if (sections.length > 0) {
            mainContainer = sections[0].parentElement;
        } else {
            // Fallback
            mainContainer = document.querySelector('#root') || document.body;
        }

        // 3. Iterate over direct children of this main container to isolate different sections (Hero, Info, Testimonials etc)
        if (mainContainer) {
            Array.from(mainContainer.children).forEach(child => {
                let text = child.innerText;
                if (text) {
                    text = text.trim();
                    if (text.length > 15) {
                        results.push(`============================================================\\n[ SECTION ${sectionNum} ]\\n============================================================\\n` + text);
                        sectionNum++;
                    }
                }
            });
        }
        return results;
    }""")

    output_text = f"PAGE: {label.upper().replace('_',' ')}\nURL: {url}\n\n"
    
    for block in page_blocks:
        # Clean up whitespace but preserve paragraph breaks
        lines = [ln.strip() for ln in block.splitlines()]
        clean_lines = []
        for ln in lines:
            if ln:
                clean_lines.append(ln)
            elif len(clean_lines) > 0 and clean_lines[-1] != "":
                clean_lines.append("") # preserve single empty line between paragraphs
                
        output_text += "\n".join(clean_lines) + "\n\n"
    
    file_path = os.path.join(OUTPUT_DIR, f"{label}.txt")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(output_text.strip() + "\n")

    print(f"  [SUCCESS] Saved: {file_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        for path, label in PAGES:
            url = BASE_URL + path
            try:
                await scrape_page(page, url, label)
            except Exception as e:
                print(f"  [ERROR]  Failed {label}: {e}")

        await browser.close()

    print(f"\n[SUCCESS] Done! All grouped pages extracted to: {OUTPUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
