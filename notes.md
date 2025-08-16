// ejs
Two Types of rendering
1. Server Side Rendering.(	EJS, React (with Next.js), Vue (Nuxt.js), etc.)
1. Client Side Rendering.(React)
⚙️ SSR (Server-Side Rendering)
🧠 What is it?
The HTML is generated on the server and sent to the browser.

The browser displays a fully-rendered page immediately.

🚀 Flow:
User requests a page.

Server runs the React code (or any framework), generates the final HTML.

HTML is sent to the browser → Browser shows content immediately.

Then JavaScript hydrates the page (adds interactivity).

✅ Pros:
✅ Fast First Load (especially for slow networks or devices)

✅ Better SEO (since search engines get full HTML)

✅ Good for static content or blog/news sites

❌ Cons:
❌ More load on server

❌ Slight delay in interactivity until JS loads (hydration)

⚙️ CSR (Client-Side Rendering)
🧠 What is it?
The HTML is mostly empty or minimal when it first loads.

JavaScript runs in the browser to render the page.

🚀 Flow:
User requests a page.

Server sends a basic HTML + JS bundle.

Browser loads JS, React renders the UI on the client side.

✅ Pros:
✅ Fast navigation after initial load (SPA-like behavior)

✅ Offloads rendering work from the server

✅ More dynamic, good for apps like dashboards, Gmail, etc.

❌ Cons:
❌ Blank screen or loader on initial load (bad for UX)

❌ Not SEO-friendly out of the box

❌ Slower first contentful paint on weak devices

🧪 Example in React:
CSR:
Using Create React App (npx create-react-app) is CSR by default.

SSR:
Using Next.js with getServerSideProps() or default page rendering is SSR.

⚖️ When to Use What?
Use Case	SSR ✅	CSR ✅
SEO important (e.g., blog)	✅ Yes	❌ No
Interactive Web App (e.g., Gmail)	❌ No	✅ Yes
Fast first load	✅ Yes	   ❌ No
Lower server load	❌ No	 ✅ Yes

In scripts dev => npm run dev