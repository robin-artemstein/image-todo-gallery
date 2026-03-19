# React image to-do gallery application

A image to-do gallery which allow user to add a list and upload image from local computer to replace the original image.

- React
- Vite
- React Icons
- TailwindCSS
- Bun

---

# Push to GitHub repository

git init
git add .
git commit -m "The Nth commit on date."
git remote rm origin
git branch -M main
git remote add origin git@github.com:robin-artemstein/image-todo-gallery.git
git push -u -f origin main

# Installation

Install Bun first

https://bun.sh

Then install dependencies:

```bash
bun install
bun dev
```

# Project Structure

image-gallery-app/
|
├── public/
|   ├──gallery.png           <-- Place your default image here
├── src/
│   ├── components/          (Optional: for further scaling)
│   ├── App.tsx              <-- Main logic and UI
│   ├── index.css            <-- Tailwind directives go here
│   └── main.tsx
├── tailwind.config.js
├── package.json
└── ... (other config files)
