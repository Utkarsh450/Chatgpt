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

# Vector databases
These are the array of numbers in which numbers(vector) are n>-1 n<1
ring => [-0.009745646465, 0.4465676]

We can also use mongodb vector database in embeddings
vectors are also known as embeddings we use gemini-embedding-001 for the conversion of the tet in the vectors in the vector database
we will use pinecone
"who is the president of america in 2010" => gemini2 => "someone"
The vectors of generating response by the ai model are nearly same to the prompt you give
in this
how are you => [0.123456465,-0.985445463,0.452164743]
how it is => [0.1245464656, 0.9843543] // nearly same

// Earlier for each message given to ai the size increases because of which price increases too
like gemini is taking for given tokens for 1M messages for 0.10$, response tokens is 0.40$
see,
the car is running on the highway at the speed 140km => tokenization( that means it is convert into tokens in which only main words are included(car run hightway speed 140km) rest are ignored => embedding(conversion to the vectors) => gemini-2.0-flash) => then it gives the response
Sentence:

"The car is running on the highway at the speed 140km"

1. Tokenization

Breaking the text into meaningful tokens (words, subwords, or important entities).

In your simplified version:
["car", "run", "highway", "speed", "140km"]

Here, filler words like "the", "is", "on", "at", "the" are ignored because they don’t add much meaning.

2. Embedding

Each token is converted into a vector (numbers) that captures its semantic meaning.

Example (not real numbers, just for idea):

"car" → [0.12, -0.55, 0.89, ...]

"run" → [0.45, 0.21, -0.33, ...]

"highway" → [0.78, -0.14, 0.02, ...]

These vectors are usually 768-dim (for Gemini, OpenAI, etc. embeddings).

3. Model (e.g., Gemini 2.0 Flash)

The model takes the embeddings as input.

It uses attention mechanisms (Transformers) to understand relationships:

"car" ↔ "highway"

"speed 140km" ↔ "running"

This lets it understand the context.

4. Response Generation

Based on embeddings + context, the model generates a response.

Example:
Input: "The car is running on the highway at the speed 140km"
Response: "The car is moving very fast on the highway."

So in short:
Text → Tokenization → Embedding (vectors) → Model reasoning (Gemini) → Response

STM is very costly because in history a lot of data gets added in this which affects price a lot also think of the token
LLM uses so we normally used to
show the some of the last messages let it be 7 or 20 not the whole history, so that is the need of the LTM

in the LTM we only show that memory which is similar to the given input by the user withotu giving the complete history, also at the places where LTM is not needed it does not use the LTM just normally works

lets say
ring => [-0.6465456,0.4246546]
the are many which are for ring
finger, key, phone, bell, wedding the vectors of all very similar to the ring
Example: Word "Ring" in Different Contexts
Jewelry meaning

ring (jewelry) → [0.81, 0.22, 0.34]

finger → [0.79, 0.18, 0.31]

wedding → [0.83, 0.20, 0.29]

Sound meaning

ring (phone/bell) → [0.10, 0.92, 0.45]

phone → [0.12, 0.89, 0.47]

bell → [0.09, 0.95, 0.44]

Mixed/ambiguous

key (like “ring of keys”) → [0.50, 0.55, 0.33]

embeddings like gemini-embedding-001 or OpenAI’s text-embedding-3-large produce 768+ dimensional vectors
When you pass text like "ring" into an embedding model:

The model outputs a high-dimensional vector, e.g.:
"ring" → [0.034, -0.567, 0.221, ...]   # 768 numbers
Each number is not human-interpretable by itself.

But together, this vector encodes the semantic meaning of the word/sentence.
🔹 2. Why 768 dimensions?

High dimensions allow the model to capture many semantic features.

Each dimension can be thought of as representing a “latent feature” (not directly visible to us), such as:

Is it an object?

Is it related to sound?

Is it an action?

Is it used in human relationships?

⚠️ We cannot label dimensions 1–768 directly — they are abstract learned features.
🔹 3. Plotting embeddings in a graph

Since we cannot see 768D space, we use dimensionality reduction techniques like:

PCA (Principal Component Analysis): Finds the most important directions of variance.

t-SNE / UMAP: Better for visualizing clusters in 2D or 3D.
768D vector  →  3D vector (for visualization)
Imagine a 3D scatter plot:

One cluster (jewelry meaning): ring, finger, wedding.

Another cluster (sound meaning): ring, phone, bell.

Ambiguous words (like key) sit somewhere between clusters.

👉 This is why when you query "ring" without context, you get mixed neighbors.
🔹 5. Why not directly in 768D?

Humans can’t visualize 768D.

But mathematically, the distance between vectors (e.g., cosine similarity) is computed in 768D space.

Visualization is just a projection (simplified picture), but actual retrieval/search happens in the full vector space.
Vectors live in 768D.

Similar meanings are close together in that space.

We use PCA/t-SNE/UMAP to flatten into 2D/3D so we can “see” the clusters.

That’s why "ring" ends up close to "phone" and "wedding" depending on meaning.