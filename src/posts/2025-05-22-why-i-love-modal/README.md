---
title: Why I Love Modal
description: A showcase of the syntax for the markdown interpreter.
slug: 2025-05-22-why-i-love-modal
date: '2025-05-22'
published: true
categories:
  - modal
---

> **Modal** is a modern cloud platform designed for developers who want to run Python code in the cloud without dealing with infrastructure.
> 
> Instead of provisioning servers, writing Dockerfiles, or wrestling with Kubernetes, you just write Python functions. Modal handles everything else behind the scenes — from container builds to GPU provisioning, autoscaling, secrets, storage, and deployment. All defined in code, all versioned, all reproducible.

It's especially well-suited for:

* Machine learning workloads
* Data pipelines
* Background jobs
* Anything where local development doesn't scale

Modal is built by a small but highly experienced team, including **Erik Bernhardsson**[^1] (creator of Luigi and Annoy). You can feel their attention to developer experience the moment you write your first:

```python {1}
@app.function
def my_task():
    pass
```

> [!NOTE]
> Modal transforms infrastructure from a roadblock into something you barely notice.

If you've ever thought,
**"Why can't cloud infra feel like writing Python?"**
Modal is your answer.

![Figure 1](./images/figure1.excalidraw.svg)

## 🚀 How I Got Started With Modal

I first stumbled upon Modal while trying to deploy a Stable Diffusion inpainting pipeline. I had already built a complete virtual staging system using **ComfyUI** and **🤗 Diffusers**, but making it *scalable, cost-efficient, and developer-friendly* was frustrating.

Then came Modal.

What immediately stood out:

| Traditional Deployment | Modal Approach |
|----------------------|----------------|
| Write Dockerfile | Define image in Python |
| Manage GPU drivers | GPU access built-in |
| Setup Kubernetes cluster | Zero cluster management |
| Configure autoscaling | Automatic scaling |
| Handle secrets manually | Secure secret injection |

Just Python. I wrapped my existing code into a Modal function and deployed it — **within minutes**, I had a running GPU endpoint faster than anything I'd previously deployed.

> [!TIP]
> Modal makes GPU APIs as easy to deploy as a FastAPI route.

Later, I discovered **ComfyDeploy**[^2] — a remote execution setup where ComfyUI runs inside Modal using powerful cloud GPUs.
That sealed the deal.

Since then, I've used Modal for:

* Internal APIs
* Scheduled ML jobs
* Prototypes and production endpoints

Each time, it scaled with me. Each time, it *just worked*.

## 🧩 Coming Up Next

This post is a breakdown of the **Modal features I use most**, and *why they matter in real workflows*. We'll cover:

1. Containers (without Dockerfiles)
2. Secrets and environment isolation
3. Persistent Volumes and bucket mounts
4. GPUs and autoscaling
5. Scheduling, logging, observability
6. Python-first APIs with seamless local → remote transition

Whether you're scaling a side project or deploying a full ML pipeline, Modal makes the journey *pleasantly boring* — in the best way possible.

> [!IMPORTANT]
> If you've built something cool and you're dreading the deployment phase, Modal might be the missing piece.

## 🐳 3.1 Containers Done Right — Declarative, Pythonic, Reproducible

In most cloud environments, containerizing your code is a chore:

* Writing a Dockerfile
* Managing Python + system dependencies
* Testing locally with Docker Desktop
* Pushing to a registry
* Hoping it works in production

**Modal flips that process on its head.**

Here, you define your image **entirely in Python**, in just a few lines:

```python title="container.py" {3-6}
import modal

image = (
    modal.Image.debian_slim(python_version="3.10")
    .apt_install("git")
    .pip_install("torch==2.2.0", "transformers")
)
```

That's it —
❌ No Dockerfile
❌ No local Docker
❌ No painful rebuilds

### 💡 Why It's Great

| Feature | Traditional Docker | Modal |
|---------|-------------------|-------|
| **Build Location** | Local machine | Cloud (remote) |
| **Layer Caching** | Manual optimization | Automatic |
| **Dependency Management** | Dockerfile syntax | Python methods |
| **Reproducibility** | "Works on my machine" | Guaranteed identical |
| **Local Resources** | Heavy Docker Desktop | Zero local overhead |

* ✅ **Remote Builds**
  Modal builds containers in the cloud — so your laptop can stay cool.

* 🚀 **Layer Caching**
  Only the changed layer is rebuilt. Fast iteration, every time.

* 📁 **Local File Attachments**
  Add local scripts, configs, or whole packages — all from Python.

* 🧪 **Reproducible Runs**
  Every function runs in a clean, identical container. Goodbye "works on my machine."

You're not locked in either — Modal also supports:

* Custom base images (e.g., from Docker Hub)
* Extending your own Dockerfile
* Hybrid approaches using `.pip_install`, `.run_commands`, `.env`, etc.

> [!TIP]
> Modal containers are fully declarative: what you see in Python is exactly what you get in production.

> [!IMPORTANT]
> You never have to open Docker Desktop again.
> Modal gives you Docker power, minus the Docker pain.

![Figure 2](./images/figure2.excalidraw.svg)

## 🔐 3.2 Secrets Mounting — Secure by Default, Easy to Share

Handling secrets — API keys, tokens, credentials — is often painful:

* Hardcoded in code (yikes!)
* `.env` files (okay but risky)
* Secret managers (secure but complex)

**Modal makes it simple.**
With **one line**, secrets are injected securely into your function:

```python title="secure_api.py" {1}
@app.function(secrets=[modal.Secret.from_name("huggingface-token")])
def call_api():
    import os
    token = os.environ["HF_TOKEN"]
    ...
```

> [!CAUTION]
> Secrets are never written to disk or logs. They live only in ephemeral execution environments.

### 🔐 Why It Works So Well

| Approach | Security | Ease of Use | Team Sharing |
|----------|----------|-------------|--------------|
| **Hardcoded** | ❌ Terrible | ✅ Simple | ❌ Risky |
| **`.env` files** | ⚠️ Okay | ✅ Simple | ⚠️ Manual |
| **Cloud Secret Managers** | ✅ Secure | ❌ Complex | ⚠️ Setup heavy |
| **Modal Secrets** | ✅ Secure | ✅ Simple | ✅ Built-in |

* 🔄 **Easily Swappable**
  Change the name — not your code.

* 👥 **Workspace Scoped**
  Share across your team, projects, and functions.

* 🧼 **Safe by Design**
  Secrets are encrypted, scoped, and never persist where they shouldn't.

You can create secrets via:

* Modal **dashboard UI** (pre-built templates for Mongo, HuggingFace, etc.)

* Modal **CLI**:
  ```bash /huggingface-token/#v
  modal secret create huggingface-token
  ```

* Or dynamically in **Python**, e.g. from a `.env` file:
  ```python title=".env loader" {1}
  @app.function(secrets=[modal.Secret.from_dotenv()])
  def secure_fn():
      ...
  ```

> [!NOTE]
> Modal treats secrets like first-class citizens — no plugins, wrappers, or hacks required.

> [!IMPORTANT]
> Secrets are injected cleanly, stored securely, and scoped smartly. All you do is write Python.

<--- Suggestion: Diagram showing a "secret vault" connected via a line to a container bubble → function bubble, all encapsulated in a secure execution environment --->

![Figure 3](./images/figure3.excalidraw.svg)

## 💾 3.3 Volume & Cloud Bucket Mounts — Share Data Like a Pro

Whether you're training models, processing batches of files, or running inference, at some point you'll need **shared persistent storage**.

Modal offers two powerful and Pythonic tools for this:

### 📁 1. Volumes — Ephemeral, Fast, Commit-Consistent

Think of `modal.Volume` as a **distributed scratch disk** — a shared folder that multiple Modal functions can read from and write to:

```python title="volume_example.py" {1,3,7}
vol = modal.Volume.from_name("my-volume")

@app.function(volumes={"/models": vol})
def write_file():
    with open("/models/weights.bin", "wb") as f:
        f.write(...)
    vol.commit()
```

### 🔍 What makes volumes great?

| Feature | Modal Volumes | Traditional NFS | Cloud Block Storage |
|---------|---------------|-----------------|-------------------|
| **Setup Complexity** | Zero config | Complex | Moderate |
| **Cross-function Access** | ✅ Built-in | ✅ Yes | ❌ Single mount |
| **Performance** | ⚡ Optimized | ⚠️ Network dependent | ✅ Good |
| **Consistency** | 🔒 Commit-based | ⚠️ Eventually consistent | ✅ Strong |
| **Cost** | 💰 Pay-per-use | 💰 Always-on | 💰 Always-on |

* ⚡ **Fast Access** — Designed for high-speed reads across workers
* 🧠 **Great for ephemeral data** — model checkpoints, logs, outputs
* 🔁 **Cross-function Sharing** — multiple functions can use the same volume
* ☁️ **Upload support** — send files from local via `volume.batch_upload(...)`

> [!TIP]
> `.commit()` is required to persist writes across functions. Think of it like a distributed save button.

### 🪣 2. CloudBucketMount — Mount S3, GCS, or R2 Directly

Accessing cloud storage should be easy. Modal makes it feel native:

```python title="cloud_mount.py" {2-5}
@app.function(
    volumes={"/my-mount": modal.CloudBucketMount(
        bucket_name="my-s3-bucket",
        secret=modal.Secret.from_name("s3-creds")
    )}
)
def read_data():
    print(open("/my-mount/file.txt").read())
```

### 🌍 Why it's powerful:

* ☁️ **Access cloud buckets like local paths**
* 🔒 **Secure via secrets or OIDC roles** — no hardcoded tokens
* 📂 **Scoped Mounts** — limit to specific paths with `key_prefix`
* 🔁 **Optional write support** — just set `read_only=False`

> [!WARNING]
> You still need credentials — but with Modal secrets, this becomes seamless and secure.

> [!IMPORTANT]
> Modal gives you the best of local and cloud storage:
>
> * Volumes = fast, shared scratch space
> * Buckets = scalable cloud data access
>   All without needing to manage NFS, blob SDKs, or rsync scripts.

## ⏰ 3.4 Cron Jobs and Scheduling — Set It and Forget It

Some things just need to happen on a schedule:

* Refresh a dataset daily
* Retrain a model weekly
* Ping your API every 15 minutes to keep it warm
* Generate reports every Monday at 9am

With Modal, you can schedule any Python function to run — **reliably, remotely, on CPU or GPU**.

### 🧭 Why You'll Love It

| Scheduling Solution | Setup Complexity | Reliability | GPU Support | Cost When Idle |
|-------------------|------------------|-------------|-------------|----------------|
| **Local Cron** | ✅ Simple | ❌ Single point of failure | ❌ No | 💰 Always running |
| **GitHub Actions** | ⚠️ YAML config | ✅ Reliable | ❌ Limited | ✅ Free tier |
| **Airflow** | ❌ Complex setup | ✅ Enterprise grade | ⚠️ With effort | 💰 Always running |
| **Modal Scheduling** | ✅ One line | ✅ Cloud native | ✅ Built-in | ✅ Pay per execution |

* ✅ No Airflow, Cronitor, or GitHub Actions needed
* ✅ Runs even when your laptop is off
* ✅ Define and deploy from Python — just like everything else

```python title="cron_example.py" {1}
@app.function(schedule=modal.Period(days=1))
def refresh_data():
    print("Updating dataset...")
```

Need finer control?

```python title="cron_custom.py" {1}
@app.function(schedule=modal.Cron("0 8 * * 1"))
def monday_task():
    ...
```

> [!NOTE]
> Modal schedules run in the cloud with full infra isolation — unlike local cron jobs or notebooks with timers.

> [!TIP]
> You can pair scheduling with Modal volumes, cloud mounts, or GPU-backed processing — all in one place.

<--- Suggestion: Draw a clock icon funneling into a Modal function icon, optionally annotated with schedule examples like "Daily", "Weekly", "0 8 * * 1" --->


### 🔁 Basic Scheduling with `modal.Period`

Just add a `schedule=` parameter to your function and deploy. Modal takes care of the rest:

```python {1}
@app.function(schedule=modal.Period(days=1))
def refresh_dataset():
    ...
```

* Runs every 24h from deployment time
* Great for low-maintenance automation
* Works with `modal deploy` or `app.deploy()`

You can also use finer intervals:

```python /6/#i /30/#s
modal.Period(hours=6)     # every 6 hours  
modal.Period(minutes=30)  # every 30 minutes  
```

### 📆 Fine Control with `modal.Cron`

Want your job to run **at 8 AM every Monday**? Use cron syntax:

```python {1}
@app.function(schedule=modal.Cron("0 8 * * 1"))
def monday_digest():
    ...
```

* Fully timezone-aware (UTC)
* Great for predictable weekly/monthly runs

### 📋 Monitoring and Managing

* View job history and logs in the Modal dashboard
* Trigger manually anytime with "Run now"
* Want to pause? Just remove the schedule and redeploy

> TL;DR: Modal gives you production-ready scheduling in 1 line of code. No servers, no crontabs, no YAML. Just Python.

## 🌐 3.5 Web Endpoints — Deploy APIs Without a Server

Modal makes it effortless to expose your Python functions as **fully scalable web APIs** — no servers, no ports, no infra setup.

Just decorate, run, and you've got a public HTTP endpoint:

```python title="hello_api.py" {1-2}
@app.function()
@modal.fastapi_endpoint(docs=True)
def hello():
    return "Hello, world!"
```

Run it locally:

```bash /hello_api.py/#v
modal serve hello_api.py
```

You'll get a `.modal.run` domain with automatic FastAPI docs at `/docs`.

To persist it in the cloud:

```bash /hello_api.py/#v
modal deploy hello_api.py
```

> [!NOTE]
> This works great for internal tools, ML-powered endpoints, and rapid prototyping.

### 🤖 FastAPI Compatibility — First-Class

The `@modal.fastapi_endpoint` decorator wraps your function in a real FastAPI app behind the scenes, giving you:

| Feature | Modal FastAPI | Traditional FastAPI | Serverless Functions |
|---------|---------------|-------------------|-------------------|
| **Type Validation** | ✅ Built-in | ✅ Built-in | ⚠️ Manual |
| **Auto Documentation** | ✅ `/docs` endpoint | ✅ `/docs` endpoint | ❌ None |
| **Scaling** | ✅ Automatic | ❌ Manual | ✅ Automatic |
| **GPU Access** | ✅ Optional | ❌ Complex setup | ❌ Not available |
| **Cold Starts** | ⚡ Optimized | N/A | ⚠️ Slow |

* ✅ **Type annotations and input validation**
* ✅ **Auto-generated OpenAPI docs**
* ✅ **Support for query params, POST bodies, or Pydantic models**

```python title="fastapi_input.py" {2-3}
@app.function()
@modal.fastapi_endpoint()
def square(x: int):
    return {"square": x**2}
```

```python title="json_post.py" {2}
@app.function()
@modal.fastapi_endpoint(method="POST")
def greet(data: dict):
    name = data.get("name", "world")
    return {"message": f"Hello {name}!"}
```

Need more flexibility? Use:

* `@modal.asgi_app()` for full FastAPI, Starlette, etc.
* `@modal.wsgi_app()` for Flask, Django
* `@modal.web_server(port=7860)` for Streamlit and custom apps

> [!TIP]
> Modal supports full web frameworks — not just endpoints. Your whole app can live in the cloud.

### ⚙️ Serverless and Scalable

Every endpoint:

* Scales with traffic — from zero to many containers
* Launches in isolated environments
* Optionally runs with GPUs
* Cleans itself up when idle

You don't manage servers or ports. Modal takes care of all the boring parts — reliably.

> [!CAUTION]
> This is real serverless — but with dev ergonomics you'll actually enjoy.

To reduce latency further, jump to [**3.6 – No Cold Starts**](./#⚡-36-no-cold-starts--memory-snapshots--enter).

<--- Suggestion: Diagram showing an HTTP request hitting a Modal cloud endpoint → container spin-up → Python code → response → scale down --->

### 🔐 Security Built-In

Want to restrict access? Just add:

```python title="protected_api.py" {2}
@app.function()
@modal.fastapi_endpoint(requires_proxy_auth=True)
def admin_tools():
    return "Restricted access"
```

For advanced needs: use FastAPI's native security (OAuth2, JWT, etc.) — it all works the same way.

> [!IMPORTANT]
> Modal's web endpoints turn Python functions into production-ready APIs — with autoscaling, FastAPI docs, and zero maintenance.

## ⚡ 3.6 No Cold Starts — Memory Snapshots & `@enter`

Serverless platforms often suffer from one problem: **cold starts**.

When a function spins up:

1. A container is provisioned
2. Code is imported
3. Libraries are loaded
4. Models might download or initialize

This delay can range from **seconds to minutes** — especially in ML workflows.

Modal gives you multiple tools to fight back:

### 🔁 Keep Containers Warm

Avoid spinning up cold containers altogether by keeping a pool ready:

```python title="warm_pool.py" {1}
@app.function(min_containers=2, buffer_containers=2)
def fast_api():
    ...
```

| Parameter | Purpose | Cost Impact | Use Case |
|-----------|---------|-------------|----------|
| `min_containers` | Always-warm pool | 💰 Higher baseline | Consistent traffic |
| `buffer_containers` | Pre-warm for bursts | 💰 Moderate | Spiky workloads |
| `scaledown_window` | Delay shutdown | 💰 Lower | Bursty patterns |

* `min_containers`: always keep N containers warm
* `buffer_containers`: pre-warm extra containers for traffic bursts

You can also delay container shutdown with:

```python title="keep_alive.py" {1}
@app.function(scaledown_window=300)
def long_tail_fn():
    ...
```

This keeps the container alive for 5 minutes after the last request — perfect for bursty workloads.

### 🧠 Preloading with `@enter`

Modal supports **lifecycle hooks** that run before any request is handled:

```python title="preload_model.py" {2-4}
@app.cls()
class MyApp:
    @modal.enter()
    def preload(self):
        self.model = load_big_model()
```

Now `self.model` is instantly available for every method invocation — no repeated loading.

### 📸 Memory Snapshots — The Killer Feature

You can go one step further: **save container memory** after warmup and reuse it for future cold starts.

```python title="snapshot_func.py" {1}
@app.function(enable_memory_snapshot=True)
def my_func():
    ...
```

For classes:

```python title="snapshot_cls.py" {1}
@app.cls(enable_memory_snapshot=True)
class Embedder:
    ...
```

This captures the post-warmup state of the container — so future launches resume from memory instantly.

### 🎯 Best Practices

```python title="snapshot_best.py" {1,3,6}
@app.cls(enable_memory_snapshot=True, gpu="A10G")
class Embedder:
    @modal.enter(snap=True)
    def load_model(self):
        self.model = load_model_to_cpu()

    @modal.enter(snap=False)
    def move_to_gpu(self):
        self.model = self.model.to("cuda")
```

| Lifecycle Hook | When It Runs | GPU Access | Snapshot Included | Best For |
|----------------|--------------|-------------|------------------|----------|
| `@enter(snap=True)` | Before snapshot | ❌ No | ✅ Yes | Model loading, CPU setup |
| `@enter(snap=False)` | After snapshot restore | ✅ Yes | ❌ No | GPU initialization |

Tips:

* Use `@enter(snap=True)` for heavy CPU init (e.g., `from_pretrained()`)
* Use `@enter(snap=False)` for GPU logic
* Use `volumes` to avoid repeated downloads

<--- Suggestion: Diagram showing:

1. Container warmup
2. Model loaded
3. Snapshot saved
4. Future containers start from snapshot state instantly --->

### 🧩 Dynamic Autoscaling

Adjust container counts based on time or logic:

```python title="autoscale_scheduler.py" {1,5-6}
@app.function(schedule=modal.Cron("0 * * * *"))
def update_autoscaler():
    hour = datetime.utcnow().hour
    if 9 <= hour < 18:
        my_func.update_autoscaler(min_containers=3)
    else:
        my_func.update_autoscaler(min_containers=0)
```

### ⚠️ Snapshot Gotchas

> [!WARNING]
> Know these before you go snapshot-heavy:

* GPU access is disabled during `@enter(snap=True)`
* Snapshotting happens **after** the first real run
* Random seeds / global states get frozen into the snapshot
* `torch.cuda.is_available()` may return false during snapshot
* `xformers` needs this env var[^3]:

  ```python {1}
  image = modal.Image.debian_slim().env({"XFORMERS_ENABLE_TRITON": "1"})
  ```

> [!IMPORTANT]
> Modal turns cold starts into **warm launches**:
>
> * Use `@enter()` to preload
> * Use `enable_memory_snapshot=True` to snapshot
> * Use `min_containers` to stay warm
> * Control cost/latency tradeoffs with fine-tuned autoscaling

## 👥 3.7 Organization and Teams — Workspaces & Environments

Modal isn't just solo-developer friendly — it's **team-ready** out of the box.

You don't need to share secrets in Slack, sync buckets manually, or create separate billing accounts. Modal provides two key primitives:

### 🧩 Workspaces

A **workspace** is your team's shared space for:

| Resource | Scope | Sharing | Billing |
|----------|-------|---------|---------|
| **Secrets** | Workspace-wide | ✅ Team access | Shared account |
| **Volumes** | Workspace-wide | ✅ Cross-function | Shared account |
| **Logs** | Workspace-wide | ✅ Team visibility | Shared account |
| **Deployments** | Workspace-wide | ✅ Team management | Shared account |

Everyone in the workspace can access shared resources — without having to copy-paste credentials or redo infrastructure.

### 🌱 Environments

Environments help you separate:

* `dev`
* `staging`
* `prod`

Each with isolated logs, schedules, endpoints, and secrets.

```bash title="Deploy to staging" /my-app/#yb /staging/#yb
modal deploy --name my-app --environment staging
```

> [!NOTE]
> Modal environments are optional — but powerful for teams managing multiple pipelines or app states.

Secrets and volumes are scoped to the **workspace**, but you can use different values per environment if needed.

> [!TIP]
> Think: "GitHub repo = workspace, branch = environment."

<--- Suggestion: Diagram with Workspace (top-level), under it multiple Environments (Dev, Staging, Prod), and each linked to secrets, volumes, endpoints --->

## ☁️ 3.8 Cloud Abstraction & Region Selection

One of Modal's underrated strengths is that it hides the complexity of cloud infrastructure. You don't need:

* AWS/GCP credentials
* Terraform scripts
* VPC networking knowledge

Just write Python, and Modal handles the rest.

### 🧭 When You *Do* Want Control

You can **explicitly select cloud and region** when needed — for:

* 🚀 **Low latency** inference
* 🏛️ **Data residency** & compliance
* 💸 **Cost optimization** (e.g., egress near your storage)

Here's how to do it:

```python {1}
@app.function(cloud="gcp", region="us-west1")
def my_fn():
    ...
```

Modal instantly runs your code on GCP in the `us-west1` region — no provisioning needed.

### �� Supported Clouds

| Cloud Provider | Status | Regions Available | Best For |
|----------------|--------|------------------|----------|
| **AWS** | ✅ Available | Multiple US/EU | General workloads |
| **GCP** | ✅ Available | Multiple US/EU | ML/AI workloads |
| **Azure** | 🚧 Coming soon | TBD | Enterprise integration |
| **Auto** | ✅ Default | All available | Let Modal optimize |

You can choose from:

* `"aws"`
* `"gcp"`
* `"azure"` (coming soon)
* `"auto"` (default — Modal picks best location)

> [!IMPORTANT]
> You get **cloud-level control** *only when you want it*. Otherwise, Modal optimizes for performance and availability.

> [!IMPORTANT]
> Modal gives you a fully managed experience, but when you need to fine-tune your compute location — you can.
> The result? Serverless that scales globally, but respects your constraints.

<--- Suggestion: World map-style sketch with regions marked ("us-west1", "us-central1", "europe-west4") and a Modal box routing functions smartly or via user config --->

### 3.9 — Observability & Monitoring

...
<!-- I will to by my self keep this comment -->

### Conclusion 

... 
<!-- I will to by my self keep this comment -->

---

[^1]: Erik Bernhardsson is the former CTO of Better.com and creator of popular open-source projects like Luigi (Spotify's workflow engine) and Annoy (approximate nearest neighbors library). His experience building large-scale data infrastructure shows in Modal's developer-first design.

[^2]: ComfyDeploy is a service that allows you to run ComfyUI workflows remotely on powerful cloud GPUs. It integrates seamlessly with Modal, making it easy to scale ComfyUI workloads without managing infrastructure.

[^3]: The `XFORMERS_ENABLE_TRITON` environment variable is required when using xformers with memory snapshots because Triton kernels need to be properly initialized in the snapshot environment. Without this, you may encounter CUDA-related errors when the snapshot is restored.

