@AGENTS.md



1. MVP Roadmap
Step 1: Project Structure & Planning

Define all required pages and components.
Plan folder structure for scalability and maintainability.
Step 2: UI/UX Design

Use a modern, clean, and professional design (dark blue/gold theme as per logo).
Plan for mobile responsiveness and smooth animations.
Step 3: Core Pages

Home (Landing Page)
Services
Portfolio/Our Work
Why Choose Us
Testimonials
Contact Us (with Lead Form)    Step 4: Core Components

Navbar (with logo)
Hero Section (headline, subheadline, CTAs)
Problem Section
Solution Section
Services Cards
Portfolio Gallery (with reels, posters, screenshots)
Why Choose Us (feature highlights)
Testimonials Carousel
Process Steps
Lead Form (Name, Phone, Property Type, Submit)
Footer (with contact details & social links)
3D/Animated Section (for wow effect, e.g., 3D house model or animated background)   Step 5: Animations & Effects

Use Framer Motion or GSAP for transitions/animations.
Integrate a simple 3D model (e.g., using react-three-fiber or 3D Canva embed).
Add hover effects, smooth page transitions, and animated CTAs.
Step 6: Mobile Optimization

Ensure all components are responsive.
Test on multiple devices.
Step 7: Content Integration

Add all provided content, CTAs, and contact details.
Use the provided logo in the navbar and relevant sections.
2. Folder & Component Structure
3. Tech Stack & Libraries
Next.js (with App Router)
TypeScript
Tailwind CSS (for fast, modern UI)
Framer Motion (for animations)
react-three-fiber (for 3D models)
react-icons (for icons)
Formik/Yup (for form validation)
Canva/3D embed (for 3D Canva section)
4. Next Steps
Confirm structure and design direction (above).
Start with Navbar, Hero, and Footer (with logo and basic layout).
Add each section as a separate component (Problem, Solution, Services, etc.).
Integrate animations and 3D section.
Fill in real content and contact details.
Test responsiveness and polish UI/UX.
Would you like to start with the folder/component scaffolding and the Navbar + Hero section (with logo and headline), or do you want to see a sample of a specific section first? Let me know your priority, and I’ll begin implementation step-by-step as you requested!   /app
  /components
    Navbar.tsx
    Hero.tsx
    ProblemSection.tsx
    SolutionSection.tsx
    Services.tsx
    Portfolio.tsx
    WhyChooseUs.tsx
    Testimonials.tsx
    Process.tsx
    LeadForm.tsx
    Footer.tsx
    ThreeDSection.tsx
  /pages
    index.tsx           // Home/Landing
    services.tsx
    portfolio.tsx
    why-choose-us.tsx
    testimonials.tsx
    contact.tsx
  /public
    /images
      zelvix-logo.png
      // other assets
    /3d
      // 3D models or canva embeds     3. Tech Stack & Libraries
Next.js (with App Router)
TypeScript
Tailwind CSS (for fast, modern UI)
Framer Motion (for animations)
react-three-fiber (for 3D models)
react-icons (for icons)
Formik/Yup (for form validation)
Canva/3D embed (for 3D Canva section)4. Next Steps
Confirm structure and design direction (above).
Start with Navbar, Hero, and Footer (with logo and basic layout).
Add each section as a separate component (Problem, Solution, Services, etc.).
Integrate animations and 3D section.
Fill in real content and contact details.
Test responsiveness and polish UI/UX.   yeh  complete mvp hay project kii okiee isk follow krty hwa start kroo 

GPT-4.1 • 0x