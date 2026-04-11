# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A simple Pomodoro timer web app - vanilla HTML, CSS, and JavaScript with no build system or dependencies.

## Running the App

Open `index.html` directly in a browser. No build step required.

## Architecture

- **index.html** - Single page with timer UI, work duration selector (5/15/25 min), start/pause and stop controls
- **script.js** - Timer logic using `setInterval` with Date-based drift correction. Handles work/break cycles (5-minute break after work period), pause/resume, and updates document title
- **style.css** - Minimal inline styling, centered layout

## Common Tasks

- Add a feature: Edit the relevant file and open index.html in a browser to test
- No linting, tests, or CI in this project