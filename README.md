# 🚀 KCTL

**Version:** `0.1.0`  

**Welcome to `kctl`** – a lightweight, blazing-fast CLI tool that makes managing Kubernetes easier and more intuitive. Whether you're peeking into pod logs or planning to take your Kubernetes management to the next level, `kctl` has got you covered. This is just the beginning, and we're excited to grow with your Kubernetes needs!

---

## ✨ Features
- **🔥 Lightweight:** A compact binary under 100 MB for super-fast execution.
- **🔄 Namespace Awareness:** Defaults to your current Kubernetes namespace unless specified.
- **💡 Interactive Help:** Easily discover available actions for resources with intuitive help commands.
- **🌐 Cross-Platform:** Works seamlessly on Linux, macOS, and Windows.

---

## 🛠️ Usage

```bash
kctl [options] [resource] [action]
```

### Options:
- `-h`, `--help` → Show help information.  
- `-n`, `--namespace` → Specify the Kubernetes namespace (defaults to your current context if omitted).  
- `--version` → Display verbose output about the tool.

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
    --version: Verbose output

Actions:
    logs
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
   - `kctl-windows`  
3. Move the binary to a directory in your `PATH`. For example:
   ```bash
   mv kctl /usr/local/bin/kctl
   chmod +x /usr/local/bin/kctl
   ```

4. You're ready to roll! Verify your installation:
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
   mv ./kctl /usr/local/bin/kctl
   chmod +x /usr/local/bin/kctl
   ```

5. Done! 🎉 Verify:  
   ```bash
   kctl --help
   ```

---

## 🛣️ Roadmap
This is just the beginning. Here’s what’s next:
- **🚢 More Resources:** Manage deployments, services, configmaps, and more.  
- **✨ Interactive Actions:** Scale, delete, or apply resources with simple commands.  
- **🖌️ Better UX:** Improved output formatting and an intuitive interface.  

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

### 🌌 Join the Revolution  
Simplify your Kubernetes journey with `kctl`. It’s fast, intuitive, and built for YOU. 🚀  
Happy managing, and see you on the next version! 🛠️