# KRONOS MASTER CALENDAR CONFIGURATION

**Base "King" Calendar:** `therichardsonteamtx@gmail.com`
**Timezone:** (GMT-05:00) Central Time - Chicago

**Public Embed Code (For KRONOS Corkboard Injection):**
`<iframe src="https://calendar.google.com/calendar/embed?src=therichardsonteamtx%40gmail.com&ctz=America%2FChicago" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>`

**Secret iCal (ICS) Endpoint (For API Syncing):**
`https://calendar.google.com/calendar/ical/therichardsonteamtx%40gmail.com/private-cd82747267ee70fa37cf67a708686f07/basic.ics`

## Architecture Strategy
1. The original `@gmail.com` calendar serves as the permanent Root / Base engine (The "King" Calendar).
2. All new Google Workspace domain emails (`phillip@`, `trt@`, `katelyn@`) sync downstream into this master engine.
3. Offshore Virtual Assistants (VAs) will connect to Follow Up Boss, and when an appointment is booked, FUB will inject it directly into this identical King Calendar, guaranteeing perfect, unified scheduling across the entire company.
