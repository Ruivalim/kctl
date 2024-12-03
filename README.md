# 🚀 KCTL

**Version:** `0.3.0`  

**Welcome to `kctl`** – a lightweight, blazing-fast CLI tool that makes managing Kubernetes easier and more intuitive. Whether you're peeking into pod logs or planning to take your Kubernetes management to the next level, `kctl` has got you covered. This is just the beginning, and we're excited to grow with your Kubernetes needs!

---

## ✨ Features
- **🔥 Lightweight:** A compact binary under 100 MB for super-fast execution.
- **🔄 Namespace Awareness:** Defaults to your current Kubernetes namespace unless specified.
- **💡 Interactive Help:** Easily discover available actions for resources with intuitive help commands.
- **🌐 Cross-Platform:** Works seamlessly on Linux, macOS, and Windows (see disclaimer below).
- **🔍 Searchable Inputs:** Quickly find and interact with resources using fuzzy search for input values.

---

## ⚠️ Disclaimer
While a Windows binary is available for download, **it has not been tested**. Use it at your own risk. If you encounter issues, please report them via [GitHub Issues](https://github.com/Ruivalim/kctl/issues).

---

## 🛠️ Usage

```bash
kctl [options] [resource] [action]
```

### Options:
- `-h`, `--help` → Show help information.  
- `-n`, `--namespace` → Specify the Kubernetes namespace (defaults to your current context if omitted).  
- `--version` → Display current version.  
- `--update` → Update `kctl` to the latest version.

### Resources:
- **`pod`** 

---

### 💬 Resource-Specific Help

Want to know what actions are available for a resource? Just add `-h`!  

```bash
kctl pod -h
```

**Output:**  
```
Usage: kctl [options] pod [action]

Options:
    -h, --help: Show help
    -n, --namespace: Namespace to work on
    --version: Version output
    --update: Update kctl to the latest version

Actions:
    get
    logs
    describe
    delete
    edit
```

---

### 💡 Examples
1. **View Logs from a Pod in a Specific Namespace**
   ```bash
   kctl pod logs -n my-namespace
   ```
2. **View Logs in Your Current Namespace**
   ```bash
   kctl pod logs
   ```
3. **Discover Help**
   ```bash
   kctl --help
   ```
4. **Show Version**
   ```bash
   kctl --version
   ```
5. **Check Pod Actions**
   ```bash
   kctl pod -h
   ```

---

## 🚀 Installation

### Precompiled Binary  
1. Head over to the [Releases](https://github.com/Ruivalim/kctl/releases) page on GitHub.  
2. Download the binary that matches your platform:
   - `kctl-linux`
   - `kctl-mac`
   - `kctl-windows` (see [Disclaimer](#-disclaimer))  
3. Move the binary to a directory in your `PATH`. For example:
   ```bash
   mv kctl ~/.local/bin/kctl
   chmod +x ~/.local/bin/kctl
   ```

4. Add `~/.local/bin` to your `PATH` if not already included:
   ```bash
   export PATH=$PATH:~/.local/bin
   ```

5. You're ready to roll! Verify your installation:
   ```bash
   kctl --help
   ```

---

### Build from Source
Are you a dev ninja? 🥷 Build it yourself!  
1. Make sure you have [Bun](https://bun.sh/) installed.  
2. Clone the repo:  
   ```bash
   git clone https://github.com/Ruivalim/kctl.git
   cd kctl
   ```
3. Build the binary:  
   ```bash
   bun run build
   ```
4. Add the binary to your `PATH`:  
   ```bash
   mv ./kctl ~/.local/bin/kctl
   chmod +x ~/.local/bin/kctl
   ```

5. Done! 🎉 Verify:  
   ```bash
   kctl --help
   ```

---

## 🛣️ Roadmap

| **Resource**   | **Supported Actions**            | **Planned Actions**                |
|-----------------|----------------------------------|-------------------------------------|
| **`pod`**      | `get`, `logs`, `describe`, `delete`, `edit` | `scale`, `restart`, `port-forward` |
| **`deployment`** | _Not yet supported_            | `get`, `scale`, `rollout status`   |
| **`service`**   | _Not yet supported_             | `get`, `describe`, `delete`        |
| **`configmap`** | _Not yet supported_             | `get`, `edit`, `delete`            |
| **`namespace`** | _Not yet supported_             | `get`, `create`, `delete`          |

---

## ❤️ Contributing

Got a cool idea? Found a bug? Let’s build this together:  
1. Fork the repository.  
2. Create a feature or bugfix branch.  
3. Submit a pull request. 🎉  

---

## 📜 License
`kctl` is open-source software licensed under the [MIT License](./LICENSE).  

---

## **Author**

Created by **[Rui Valim](https://github.com/Ruivalim)**.
Feel free to reach out with suggestions, feedback, or just to say hi!