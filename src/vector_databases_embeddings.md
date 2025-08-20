# 📌 Vector Databases & Embeddings
### 🔹 What are vectors?
- Vectors are arrays of numbers, usually in the range `-1 < n < 1`.  
- Example:  
  ```
  "ring" → [-0.0097, 0.4465]
  ```
- These vectors are also called **embeddings** because they “embed” the meaning of text (or images/audio) into a numeric space.

---

### 🔹 Creating embeddings
- Example sentence:  
  `"Who is the president of America in 2010?"`
- An embedding model (e.g., **gemini-embedding-001**, `text-embedding-3-small`) converts this text into a vector of 768–1536 dimensions.  
- Similar texts will produce **similar embeddings** (nearly same vectors).  
  ```
  "how are you" → [0.123, -0.985, 0.452, ...]
  "how it is"   → [0.124, -0.984, 0.451, ...]
  ```
  → These two vectors are close to each other in vector space.

---

### 🔹 Why store vectors?
- To perform **semantic search** and **retrieval**.  
- Example:  
  - You save embeddings inside a **vector database** (e.g., Pinecone, Weaviate, MongoDB Atlas Vector).  
  - When a new query comes in, you embed it, then find the **nearest vectors** in the database.  
  - This allows finding semantically related documents, not just exact keyword matches.

---

# 📌 NLP Pipeline Example

Sentence:  
**"The car is running on the highway at the speed 140km"**

1. **Tokenization**  
   - Breaks into meaningful tokens:  
     ```
     ["car", "run", "highway", "speed", "140km"]
     ```
   - Stopwords like *the, is, on, at* are ignored.

2. **Embedding**  
   - Each token converted to a vector:  
     ```
     "car"     → [0.12, -0.55, 0.89, ...]
     "run"     → [0.45,  0.21, -0.33, ...]
     "highway" → [0.78, -0.14,  0.02, ...]
     ```

3. **Model (Gemini 2.0 Flash / GPT / etc.)**  
   - Uses embeddings + **transformer attention** to understand relationships:  
     - `"car"` ↔ `"highway"`  
     - `"speed 140km"` ↔ `"running"`

4. **Response Generation**  
   - Based on context, model generates a response:  
     ```
     "The car is moving very fast on the highway."
     ```

---

# 📌 Cost & Tokens (STM vs LTM)

- Every word/token you send to an LLM = **cost**.  
- Example pricing (simplified):  
  - Input tokens (1M) → $0.10  
  - Output tokens (1M) → $0.40  

- If you keep sending the **entire conversation history (STM: Short-Term Memory)**, tokens pile up → higher costs.  

👉 Solution: **LTM (Long-Term Memory)**  
- Store older conversation embeddings in a **vector DB**.  
- Retrieve only the most relevant past chunks (e.g., last 7–20 messages).  
- Send only the useful context back to the LLM.  
- This reduces cost and keeps responses accurate.

---

✅ So the full flow is:  
**Text → Tokenization → Embeddings → Store in Vector DB (Pinecone/MongoDB) → Retrieve relevant chunks → Model reasoning → Response**
