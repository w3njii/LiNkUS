import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

const supabase = createClient(
  "https://xytvpdkxrzbiykufavpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dHZwZGt4cnpiaXlrdWZhdnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NzAzNDYsImV4cCI6MjA2NDI0NjM0Nn0.l0R2Xpm32XnrZSKTgBNG6yaD8a1F2jXPAD5c9a4hKzY"
);

const parseToDateTime = (raw: string) => {
  const dt = DateTime.fromFormat(raw, "EEEE, LLLL d 'at' h:mma ZZZ", { zone: "Asia/Singapore" });
  return dt.isValid ? dt.toISO() : null;
};

async function scrapeEvents() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://nus.campuslabs.com/engage/events", {
    // waitUntil: "networkidle2",
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await new Promise(res => setTimeout(res, 5000));

  for (let i = 0; i < 10; i++) {
  const loadMoreExists = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent?.includes("Load More"));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

    if (!loadMoreExists) break;

    // console.log(`Clicked Load More (${i + 1})`);
    await new Promise(res => setTimeout(res, 1500));
  }

  const rawEvents = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("h3"));

    return cards.map((titleEl) => {
      const anchor = titleEl.closest("a");
      const card = titleEl.closest("div.MuiPaper-root");
      const cardText = (card as HTMLElement)?.innerText || "";
      const title = titleEl.textContent?.trim() || "";
      const time = cardText.split("\n").find((line) => line.includes("AM") || line.includes("PM")) || "";
      const location = cardText.split("\n").find((line) => line != time && line != title && line.length > 5) || "";


      return {
        title,
        start_time_text: time.trim(),
        location: location.trim(),
        event_url: anchor ? new URL(anchor.getAttribute("href")!, "https://nus.campuslabs.com").href : "",
        image_url: (card?.querySelector("img") as HTMLImageElement)?.src || "",
      };
    })
  });

  console.log(`Scraped ${rawEvents.length} events`);
  // console.log(rawEvents);

  const events = rawEvents
    .map((e) => ({
      title: e.title,
      start_time: parseToDateTime(e.start_time_text),
      location: e.location,
      event_url: e.event_url,
      image_url: e.image_url,
    }))
    .filter((e) => e.title && e.start_time && e.location);

  console.log(`Parsed ${events.length} valid events`);

  const { data, error } = await supabase.from("events").upsert(events, { onConflict: 'title,start_time' });
  if (error) console.error("Supabase Insert Error:", error);
  else console.log("Inserted into Supabase:", data);

  await browser.close();
}

scrapeEvents().catch(console.error);