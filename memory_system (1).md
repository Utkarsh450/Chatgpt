# Memory System in AI Chat (STM, LTM & Metadata)

## 🔹 Two Types of Memory

### 1. STM (Short Term Memory)

-   Comes from the **last 20 chat messages** (MongoDB).
-   Local to the **current chat**.
-   Keeps recent flow of conversation.

``` js
const chatHistory = await messageModel
  .find({ chat: messagePayload.chat })
  .sort({ createdAt: -1 })
  .limit(20)
  .lean();

const stm = chatHistory.map((item) => ({
  role: item.role,
  parts: [{ text: item.content }],
}));
```

👉 Ensures AI remembers the recent chat flow.

------------------------------------------------------------------------

### 2. LTM (Long Term Memory)

-   Comes from the **vector database** (via `queryMemory`).
-   You generate **embeddings** of each message and store them with
    `createMemory`.
-   When a new message arrives → generate its vector → query similar
    past messages.

``` js
const memory = await queryMemory({
  queryVector: vectors,
  limit: 3,
  metadata: {},
});
```

-   Wrap retrieved memories into **ltm**:

``` js
const ltm = [
  {
    role: "user",
    parts: [
      {
        text: `
          these are some previous messages from the chat, use them to generate a response
          ${memory.map((item) => item.metadata.text).join("\n")}
        `,
      },
    ],
  },
];
```

👉 Helps AI recall **older conversations** beyond recent messages.

------------------------------------------------------------------------

## 🔹 Combining STM + LTM

``` js
const response = await aiService.main([...ltm, ...stm]);
```

AI sees: 1. **LTM** = old, relevant memories from vector DB.\
2. **STM** = recent 20 chat messages.

This makes AI **context-aware in two layers**: - STM = "working memory"\
- LTM = "episodic memory"

------------------------------------------------------------------------

## 🔹 What is Metadata?

Metadata = extra info stored with each vector (like `chatId`, `userId`,
`text`, `timestamp`).

Example when storing:

``` js
await createMemory({
  vectors,
  messageId: message._id,
  metadata: {
    chat: messagePayload.chat,
    user: socket.user._id,
    text: messagePayload.content,
  },
});
```

------------------------------------------------------------------------

### ✅ Why Metadata is Useful

1.  **Filtering** → only fetch memories from the same chat/user.\
2.  **Reconstruction** → use `text` to rebuild past messages.\
3.  **Traceability** → know where/when/who said it.\
4.  **Future-proofing** → tags, importance, topics for smarter recall.

------------------------------------------------------------------------

## 🔹 Example: Metadata Filtering in Query

Without filtering:

``` js
const memory = await queryMemory({
  queryVector: vectors,
  limit: 3,
  metadata: {},
});
```

With filtering (same chat + same user only):

``` js
const memory = await queryMemory({
  queryVector: vectors,
  limit: 3,
  metadata: {
    chat: messagePayload.chat,
    user: socket.user._id,
  },
});
```

------------------------------------------------------------------------

### 🔹 Example Metadata Entry

``` json
{
  "chat": "chat123",
  "user": "user456",
  "text": "I love cricket",
  "timestamp": "2025-08-21T10:00:00Z"
}
```

When recalled:

``` js
memory.map(item => item.metadata.text).join("\n")
```

👉 Returns the **actual past sentences**.

------------------------------------------------------------------------

## ✅ Summary

-   **STM** → recent short-term memory (20 messages).\
-   **LTM** → long-term memory from vector DB.\
-   **Metadata** → adds context (chat, user, text, etc.) for filtering &
    organization.\
-   Together → AI can stay consistent, recall old facts, and handle long
    conversations intelligently.
