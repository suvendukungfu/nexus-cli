# Nexus DevTools CLI 🌐

Nexus is a senior-grade, production-ready developer productivity suite. Built with high-precision architecture, it consolidates disparate developer telemetry (GitHub, Weather, Systems, Markets) into a single, object-oriented command-line interface.

## 🏗️ Technical Architecture

- **Object-Oriented Integrity**: Strictly typed `BaseCommand` pattern ensuring consistent error propagation and command registration.
- **Service-Oriented Core**: Decoupled integration layers for high-performance external API orchestration.
- **Resilient Connectivity**: Centralized `ApiClient` with automated response interceptors and fault containment.
- **Data Integrity**: Unified `Validator` utility and environment-aware `ConfigLoader` via Zod.

## ⚙️ Core Modules & Capabilities

### 🌐 Global Connectivity

- `nexus github <name>`: Deep user profile analytics and repository tracking.
- `nexus weather <city>`: Real-time climate telemetry for targeted geographic regions.
- `nexus crypto <coin>`: Live financial asset tracking via market intelligence.
- `nexus news <category>`: Filtered global headline aggregation for developer awareness.

### 🔬 Systematic Utilities

- `nexus sysinfo`: Complete hardware and operating system metrics audit.
- `nexus fileinfo <path>`: Local file statistical analysis and modification history.
- `nexus todo <add|list|remove>`: High-performance, file-persistent task lifecycle management.

### 🔌 Developer Experience

- `nexus greet <name>`: Branded session initialization and identity validation.
- `nexus quote`: Philosophical wisdom aggregation for session mindfulness.
- `nexus joke`: Automated humor pulse check for workspace morale.

## 🚀 Setup & Activation

### 1. Build & Registration

```bash
# Register nexus binary globally
npm install
npm run build
npm link
```

### 2. Environment Configuration

```bash
cp .env.example .env
# Open .env and insert your professional API keys
```

### 3. Verification

```bash
nexus greet suvendukungfu
nexus sysinfo
```

## 📜 Repository Guidelines

- **Commit Pattern**: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Fault Isolation**: Internal `NexusError` domain must be used for all service-level rejections.
- **Scalability**: For new capabilities, extend `BaseCommand` and register in `src/index.ts`.

---

_Developed for Nexus DevOps | Built with Precision & Paws._
