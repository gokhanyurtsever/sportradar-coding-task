# Sports Event Calendar

Status: Completed

A simple sports event calendar built with React. Shows a monthly calendar, event details, and lets you add new events.

## Tech Stack
- React
- Vite
- React Router
- Bootstrap

## Setup
npm install
npm run dev

## What It Does
- Calendar View – Monthly grid with event markers
- Event Details – Teams, date, competition; past matches show score
- Add Events – Add new events at runtime (not persisted)
- Navigation – Top navbar between Calendar and Add Event
- Responsive – Mobile, tablet, desktop

## How It Works
Events come from a JSON file. The calendar groups them by month; you can switch months and open any event for details. New events added via the form appear immediately but won’t persist after refresh.

## Key Decisions
- React Router for simple navigation
- Bootstrap for fast, consistent styling
- Kept the UI minimal and functional
- For missing data (future fixtures), only show what’s available

## AI Usage
I used Perplexity to help with layout ideas and some code fixing, then reviewed and adjusted everything manually. More details in AI_Reflection.txt.

