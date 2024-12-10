<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/andrehrferreira/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/andrehrferreira/cmmv/issues">Report Issue</a>
</p>

## Description

This project is compile source documentation in markdown format into the published format. The Repository contains [cmmv.io](https://cmmv.io) source code, the official CMMV documentation.

## Installing

Install project dependencies and start a local server with the following terminal commands:

```bash
$ pnpm install
$ pnpm run dev
```

Navigate to [http://localhost:3000/](http://localhost:3000/).

All pages are written in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and located in the docs directory.

## Build

Use `pnpm run build` for a production build.

## Submodule Setup

The translations are stored in submodules. To initialize and update them, use the following command:

```bash
git submodule update --init --recursive
```

To push updates for submodules after making commits within the main project, use the following command to ensure the submodules are updated to their remote repositories:

```bash
git submodule foreach git push origin main
```

This command will execute git push origin main for each configured submodule in the project. Make sure you have committed the necessary changes inside the submodules before running this command.

If you want to pull the latest updates for submodules and synchronize them with the main repository, use:

```bash
git submodule foreach git pull origin main
```

## Start Processes

After initializing the submodules, start the PM2 processes using the appropriate ecosystem file for each language. Below is an example configuration for PM2:

```javascript
module.exports = {
    apps: [
        {
            name: "docs-ptbr",
            script: "pnpm run start",
            env: {
                DOCS_LANG: "ptbr",
                PORT: 3001 
            }
        }
    ]
};
```

Start the PM2 process with the following command:

```bash
pm2 start ecosystem-ptbr.config.js
```

## NGINX 

The system is configured to handle languages using the `DOCS_LANG` environment variable. Each documentation process runs on an individual port and can be routed via subdomains using a load balancer like NGINX. Below is an example configuration:

```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_buffering off;
        proxy_set_header Connection "";
        proxy_http_version 1.1;
        proxy_set_header Keep-Alive "";
        proxy_set_header Proxy-Connection "keep-alive";
        proxy_pass http://127.0.0.1:3000;
    }
}

server {
    listen 80;
    server_name pt.cmmv.io;

    location / {
        proxy_buffering off;
        proxy_set_header Connection "";
        proxy_http_version 1.1;
        proxy_set_header Keep-Alive "";
        proxy_set_header Proxy-Connection "keep-alive";
        proxy_pass http://127.0.0.1:3001;
    }
}
```

### Kubernetes

Create a deployment and service for the English version:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docs-en
  labels:
    app: docs
    lang: en
spec:
  replicas: 2
  selector:
    matchLabels:
      app: docs
      lang: en
  template:
    metadata:
      labels:
        app: docs
        lang: en
    spec:
      containers:
        - name: docs-en
          image: your-docker-image:latest
          ports:
            - containerPort: 3000
          env:
            - name: DOCS_LANG
              value: "en"
            - name: PORT
              value: "3000"
---
apiVersion: v1
kind: Service
metadata:
  name: docs-en
spec:
  selector:
    app: docs
    lang: en
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

Create a deployment and service for the Portuguese version:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docs-ptbr
  labels:
    app: docs
    lang: ptbr
spec:
  replicas: 2
  selector:
    matchLabels:
      app: docs
      lang: ptbr
  template:
    metadata:
      labels:
        app: docs
        lang: ptbr
    spec:
      containers:
        - name: docs-ptbr
          image: your-docker-image:latest
          ports:
            - containerPort: 3001
          env:
            - name: DOCS_LANG
              value: "ptbr"
            - name: PORT
              value: "3001"
---
apiVersion: v1
kind: Service
metadata:
  name: docs-ptbr
spec:
  selector:
    app: docs
    lang: ptbr
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3001
  type: ClusterIP
```

### Kubernetes Ingress Configuration

Use an ingress controller to route requests to the correct services based on subdomains:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: docs-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: cmmv.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: docs-en
                port:
                  number: 80
    - host: pt.cmmv.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: docs-ptbr
                port:
                  number: 80
```

Deploy the YAML files to your Kubernetes cluster:

```bash
kubectl apply -f deployment-en.yaml
kubectl apply -f deployment-ptbr.yaml
kubectl apply -f ingress.yaml
```

With this setup, the English documentation will be available at `http://cmmv.io` and the Portuguese documentation at `http://pt.cmmv.io`.
