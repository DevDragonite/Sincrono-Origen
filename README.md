# Síncrono Origen - Getting Started

This project uses **ES Modules** for Three.js, which means it **must be served via a local web server** to avoid CORS errors (file:// protocol check).

## How to Run

1.  **VS Code / Cursor**:
    - Install the **Live Server** extension.
    - Right-click `index.html` and select **"Open with Live Server"**.

2.  **Python**:
    - Open a terminal in this directory.
    - Run: `python -m http.server`
    - Go to `http://localhost:8000`

3.  **Node.js**:
    - Run `npx serve .`

## Project Structure

- `index.html`: Main entry point.
- `style.css`: All styles (Obsidian theme).
- `main.js`: Main application logic.
- `js/`:
    - `scene.js`: Three.js scene setup.
    - `coffeeBean.js`: Procedural 3D bean model.
    - `particles.js`: Steam particle system.
