Codeflix CRM - Lead Generation Dashboard
Codeflix CRM is a modern lead generation and management dashboard built with Next.js, Tailwind CSS, and Redux Toolkit. It leverages the powerful features of React 18, Next.js App Router, and TypeScript (optional) to help businesses manage leads, track progress, and streamline communication through a clean and user-friendly admin panel.

⚙️ Features
💼 Lead Creation, Editing, and Deletion

📈 Visual Reports (Lead Status Overview, Pipeline, Agent Performance)

💬 Comment System for Leads

🧑‍💼 Agent-wise Lead Assignment

📊 Dynamic Charts (using ApexCharts)

🌐 API Integration (Node.js/Express backend)

🧠 Redux Toolkit for state management

🎨 Fully responsive and styled with Tailwind CSS

🔐 Basic auth setup-ready (optional)

🚀 Tech Stack
Frontend: Next.js 13+, Tailwind CSS, React 18

State Management: Redux Toolkit

Charts: ApexCharts

Backend: REST API (Node.js/Express)

Database: MongoDB (recommended)

Optional: TypeScript, JWT Auth, Figma design

📦 Installation
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/DevenderneoG/codeflix-frontend

# 2. Move into the project
cd codeflix-crm

# 3. Install dependencies
npm install
# or
yarn install

# 4. Run the development server
npm run dev
# or
yarn dev
Make sure your backend server is running and .env.local contains the correct API base URLs.

📁 Project Structure
bash
Copy
Edit
.
├── app/
│   ├── leads/           # Lead listing, add/edit pages
│   ├── reports/         # Dashboard charts
│   └── components/      # Reusable UI components
├── app/store/           # Redux Toolkit slices
├── public/              # Static assets
└── tailwind.config.js   # Tailwind config
📊 Dashboard Preview
Key dashboard visualizations include:

🟢 Closed vs Pipeline Leads

📊 Status Distribution

👤 Leads per Agent

🛠 Development Notes
All data is managed through Redux Toolkit with async thunks.

UI is built using utility-first Tailwind CSS classes.

Backend must expose endpoints like:

GET /leads

POST /leads

DELETE /leads/:id

GET /report/last-week

etc.

📜 License
This project is built on top of TailAdmin's free template, but all Codeflix customizations are open-source and MIT licensed. You can use, modify, or redistribute freely.

💡 Inspiration
Codeflix CRM aims to simplify lead tracking for small teams and agencies by providing a clean and effective interface powered by Next.js.

Let me know if you'd like:

A CONTRIBUTING.md or .env.example file

Deployment instructions (e.g., Vercel or Netlify)

Integration notes for your backend repo

Happy coding!