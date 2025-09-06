# Employee Onboarding Form 🚀

A **multi-step employee onboarding form** built with **React.js, Tailwind CSS, React Hook Form, Zod, and shadcn/ui**.  
(No TypeScript, No Next.js — pure React + Vite setup)

---

## ✨ Features

- **5-step form wizard**
  1. Personal Information  
  2. Job Details  
  3. Skills & Preferences  
  4. Emergency Contact  
  5. Review & Submit  

- **Validation** with **Zod** (via `react-hook-form`)  
- **Smart conditions**:
  - Full-time salary range: `$30,000 – $200,000`
  - Contract hourly rate: `$50 – $150`
  - HR/Finance start date **cannot be Friday or Saturday**
  - Under-21 requires **Guardian info**
  - Remote > 50% requires **Manager approval**
- **Dynamic fields**: Manager list + skills depend on department  
- **Auto-save state** in React memory (not localStorage)  
- **Unsaved changes warning** if user tries to close tab  
- **Progress stepper** with validation lock (can’t move forward until valid)  
- **Final review page** before submit  

---

## 🛠 Tech Stack

- [React.js](https://react.dev/) (Vite)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [React Hook Form](https://react-hook-form.com/)  
- [Zod](https://zod.dev/) for schema validation  
- [shadcn/ui](https://ui.shadcn.com/) (optional, minimal use)  

---

## 📂 Folder Structure

employee-onboarding-form/
│── public/
│ └── index.html
│
├── src/
│ ├── components/ # Stepper, FileUpload, Dropdown, etc.
│ ├── data/ # Mock managers + skills
│ ├── forms/ # Step1 → Step5 form components
│ ├── hooks/ # useFormData (autosave + unsaved warning)
│ ├── utils/ # Validation schemas & helpers
│ ├── App.jsx
│ └── main.jsx
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md


---

## ⚡️ Installation & Setup

1. Clone repo:
   ```bash
   git clone https://github.com/mustakin04/Employee-Onboarding.git
   cd my-project

## 📊 Mock Data

Managers: 14+ across Engineering, Marketing, Sales, HR, Finance (src/data/managers.js)

Skills: 8–10 per department (src/data/skills.js)

## ✅ Assumptions

Phone format: +1-123-456-7890 (validated via regex)

Weekend rule: Friday (5) and Saturday (6) treated as weekends (per task)

Profile Picture: Only JPG/PNG allowed, max size 2MB

Confirmation: User must check confirmation before final submit

## 🎯 Evaluation Criteria (from task)

Technical Implementation → React, React Hook Form, Zod

Business Logic & Conditions → Salary rules, remote approval, guardian requirement, weekend restrictions

User Experience → Stepper navigation, inline validations, unsaved change warning

Code Quality & Structure → Modular folders, reusable components, clean logic separation

## 🔮 Bonus Ideas (optional)

Track time spent per field (analytics)

Support keyboard navigation (Tab / Enter)

Use custom hooks for repeated logic

Implement optimistic UI for smooth updates

Add error boundaries for friendly crash handling

## 👨‍💻 Author

Mustakin Hasan
MERN Stack Developer | Frontend Engineer

GitHub: mustakin04

Email: mustakinhasan37@gmail.com

