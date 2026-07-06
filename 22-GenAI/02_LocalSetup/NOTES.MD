## Starting & stopping Ollama

On macOS/Windows the **desktop app runs the server in the background** (look for the menu-bar /
tray icon), so it's usually already listening on `:11434`. On Linux, or to run it manually:

### Install ollama here:

```bash
https://ollama.com/download
```

```bash
ollama --version          # version
```

```bash
ollama serve              # start the server   (Ctrl+C to stop it)
```

To free memory **without** quitting the server, unload a model:

```bash
ollama ps                 # see which models are loaded in memory
ollama stop llama3.1:8b   # unload it (RAM freed; the model stays downloaded)
```

## Commands

```bash
ollama --version              # is it installed?
ollama list                   # (alias: ollama ls) your downloaded models
ollama pull llama3.1:8b       # download only (no chat)
ollama run llama3.1:8b        # download if needed, then open a chat
ollama ps                     # models currently loaded in memory
ollama stop llama3.1:8b       # unload a running model (free RAM)
ollama show llama3.1:8b       # info: params, quantization, context length…
ollama cp llama3.1:8b my-llm  # duplicate a model (e.g. before customizing)
ollama rm llama3.1:8b         # delete a model from disk
```

Inside the chat prompt (`>>>`):

- just type your message and hit enter
- `/bye` → exit the chat
- `/?` → list the in-chat commands
- wrap text in `"""` … `"""` for a multi-line message

## 💡 Model not showing up in the desktop app?

Sometimes a model won't appear in the app's model picker, even a cloud model after signing in.
The fix is usually to **pull it first from the CLI**, then refresh/restart the app:

```bash
# local model — download it, then it shows up in the UI
ollama pull gpt-oss:20b

# cloud model — sign in first, then pull it too if the UI doesn't list it
ollama pull gpt-oss:120b-cloud

# confirm what you have
ollama list
```

Checklist if a model is still missing:

- **Signed in?** — cloud models (🌐, e.g. `:120b-cloud`) only appear when you're signed in to your Ollama account.
- **Pulled?** — the UI only lists models you've downloaded. Run `ollama pull <model>` first.
- **App restarted?** — fully quit and reopen the app so the picker refreshes.
- **Version up to date?** — cloud models are a newer feature; update Ollama from [ollama.com/download](https://ollama.com/download) if you don't see them.

> 🧠 Rule of thumb: `:20b` = local (runs on your hardware), `:120b-cloud` = Ollama runs it for you (needs sign-in).

**Native Ollama endpoints** (`/api/*`):

| Method & path          | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `GET  /api/tags`       | list your local models (same as `ollama list`) |
| `GET  /api/ps`         | list running (loaded) models                   |
| `POST /api/generate`   | single-prompt completion                       |
| `POST /api/chat`       | chat with a `messages` array                   |
| `POST /api/show`       | model details                                  |
| `POST /api/pull`       | download a model                               |
| `POST /api/embeddings` | create embeddings                              |
| `DELETE /api/delete`   | remove a model                                 |
| `GET  /api/version`    | server version                                 |
