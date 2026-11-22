# EnvGuardian Demo

A small web playground that installs and executes the **published**
`@ansari_mehran_24/envguardian` npm package against a safe sample project.

## What this demonstrates

- Installs `@ansari_mehran_24/envguardian@1.0.0` from the public npm registry.
- Invokes the package's actual `envguardian` executable from a Node.js server.
- Shows command output in a browser UI.
- Restricts execution to a fixed allowlist of supported commands.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone <your-demo-repository-url>
cd envguardian-demo
npm install
npm start
```

Open http://localhost:3000.

Click a command to run it against `demo-project/`.

## Commands exposed

- `scan`
- `validate`
- `compare`
- `doctor`
- `git-check`
- `generate-example`
- `init`

The server does not accept arbitrary shell commands or user-supplied arguments.
Commands run only in the included `demo-project` directory.

## Deploy on Render

1. Push this repository to a **public GitHub repository**.
2. Sign in to https://render.com and choose **New → Web Service**.
3. Connect the public demo repository.
4. Render detects `render.yaml`. If entering settings manually:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
5. Deploy. The live site URL will be shown in the Render dashboard.

The health endpoint is `/api/health`.

## Links

- npm: https://www.npmjs.com/package/@ansari_mehran_24/envguardian
- Source package repository: https://github.com/ansarimehran24/env-guard

## Safety note

This is a demonstration environment, not a production command-execution service.
It uses a fixed command allowlist and a fixture directory. Do not add real
credentials to the demo project or expose arbitrary command execution.
