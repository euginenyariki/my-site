# Northstar IT

A modern, single-page site for an IT consultancy — services, an instant KES estimate calculator and an enquiry form. Built as a replacement for an old folder of disconnected static pages.

## Features

- **Responsive landing page** with services, proof points and a terminal-style status panel
- **Instant estimate** — service, urgency and team size feed a transparent KES calculation
- **Enquiry form** — captured locally with the generated estimate attached
- **Dark mode** and accessible, dependency-free markup
- **No backend, no keys, no tracking** — safe to open straight from disk

## Run it

```bash
# open index.html directly, or
python3 -m http.server 8000  # then visit http://localhost:8000
```

## Note on the demo

This is a front-end showcase. Enquiries are saved to `localStorage` under `northstar:enquiries` rather than emailed to a server — wire it to a real endpoint (with validation and rate limiting) before using it for live leads.

## Stack

HTML5, modern CSS and vanilla JavaScript.

## License

MIT — see [LICENSE](LICENSE).
