# Pricing Profile Client

This is the React + Vite frontend for the Pricing Profile feature that allows users to create Pricing Profiles with a set of filtered products and apply dynamic pricing adjustments to those products.

## 🚀 Features

- Search the product by name or SKU code
- Filter products by category, sub-category, segment, brand
- Create pricing profiles with fixed or percentage-based adjustments

## 🔧 Features TO-DO list
- Add logic to switch between "One Product - Multiple Products - All Products" (now it's doing nothing)
- UI for update / delete created Pricing Profiles
- UI to select and view profile from the saved profiles
- UI to add / update / delete a Product
- Refresh table logic
- Table pagination

## ⚙️ Tech Stack

- React + TypeScript
- Vite (build tool)
- Cypress (E2E testing)
- TailwindCSS (basic utility-first styling)
<br>

## 📓 Design Decisions & Tradeoffs
### Filter Logic
Filters (category, sub-category, segment) are dynamically generated from the product list.
> **Tradeoff:** Fast and local, but ideally would come from the backend for decoupling and data consistency.

### Product Adjustments Table and Product List Rendering
The table displays filtered products and supports large datasets without pagination. The same for the list of products.
> **Tradeoff:** Simpler to implement and reason about, but:
> - Causes performance degradation if the product list grows
> - Increases DOM size unnecessarily
> - Reduces accessibility (screen readers + keyboard navigation)
>
> **Improvement:** Implement pagination and use semantic HTML table elements with ARIA roles for accessibility.

### Controlled Forms
React forms are implemented using controlled components for all inputs.
> **Tradeoff:** Offers better validation control and predictable state handling, but:
> - Increases boilerplate code
> - Requires careful state management for nested inputs
>
> **Improvement:** Introduce form libraries like React Hook Form or Zod for schema validation and cleaner input handling.
<br>

## 💡 If I Had More Time
- Add validation (e.g., using Zod)
- Create form component, table component (split the page into reusable components)
- Add real-time profile preview before applying
- Better UX around error handling
- Add more e2e tests and unit tests for form and state logic 





