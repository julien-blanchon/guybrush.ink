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

## The Vision Behind Modal

Modal was born from a simple but powerful observation: **data teams deserve better tools**. As [Erik Bernhardsson explains in his foundational blog post](https://erikbern.com/2022/12/07/what-i-have-been-working-on-modal.html), data work is fundamentally different from traditional software engineering, yet we've been forcing data teams to adopt backend-normative workflows that don't fit their needs.

The core insight? **Data teams need fast feedback loops on production data**. Whether you're running SQL queries or training ML models, it's often pointless to work with non-production data. But this creates a fundamental tension with traditional software engineering practices that strictly separate local development from production environments.

Erik and his team at Modal[^1] asked: *What if we could take the cloud inside the innermost feedback loop?* What if instead of the painful cycle of:

```
build container → push container → trigger job → download logs
```

You could just write Python and have it run in the cloud in under a second?

### Building the Infrastructure for Speed

To deliver this vision, Modal went deep — building their own custom infrastructure from the ground up. This includes their own file system, container runtime, scheduler, and container image builder. As Erik puts it, the secret to developer productivity is **fast feedback loops**. Modal's architecture is designed around this principle, enabling developers to iterate at the speed of thought rather than the speed of infrastructure.

The team behind Modal reflects this commitment to excellence: based across New York, Stockholm, and San Francisco, it includes creators of popular open-source projects like Seaborn and Luigi, academic researchers, international olympiad medalists, and experienced engineering leaders. Their deep technical expertise shows in every aspect of the platform.

Modal's impact extends beyond their direct customers. They're proud sponsors of the [Axolotl project](https://github.com/OpenAccess-AI-Collective/axolotl), a tool that streamlines post-training for AI models including fine-tuning, LoRA, QLoRA, and alignment techniques — making advanced ML techniques more accessible to the community.

> [!NOTE]
> Modal transforms infrastructure from a roadblock into something you barely notice — exactly what data teams need to be productive.

The foundational building block is deceptively simple: a decorator that takes any Python function and moves its execution to the cloud:

```python {1}
@app.function()
def my_task():
    pass
```

But this primitive unlocks incredible power. As Erik puts it: *"This might seem like a very trivial thing, but it turns out you can use this as a very powerful primitive to build a lot of cool stuff."*

If you've ever thought,
**"Why can't cloud infra feel like writing Python?"**
Modal is your answer.

## 🚀 How I Got Started With Modal

I first stumbled upon Modal while trying to deploy a Stable Diffusion inpainting pipeline. I had already built a complete virtual staging system using **ComfyUI** and **🤗 Diffusers**, but making it *scalable, cost-efficient, and developer-friendly* was frustrating.

Then came Modal.

What immediately stood out was how it embodied Erik's vision of fast feedback loops. Modal customers use the platform for an incredibly diverse range of applications — from Generative AI inference and LLM fine-tuning to computational biotech and media processing. But the common thread is always the same: **eliminating infrastructure friction** so teams can focus on shipping value.

Instead of the traditional deployment pain:

| Traditional Deployment | Modal Approach |
|----------------------|----------------|
| Write Dockerfile | Define image in Python |
| Manage GPU drivers | GPU access built-in |
| Setup Kubernetes cluster | Zero cluster management |
| Configure autoscaling | Automatic scaling |
| Handle secrets manually | Secure secret injection |
| Pay for idle resources | Usage-based pricing |

Just Python. I wrapped my existing code into a Modal function and deployed it — **within minutes**, I had a running GPU endpoint faster than anything I'd previously deployed. And since Modal's pricing is entirely usage-based, I only paid for the time my code was actually running.

> [!TIP]
> Modal makes GPU APIs as easy to deploy as a FastAPI route — exactly the kind of fast feedback loop that data teams need.

Since then, I've used Modal for internal APIs, scheduled ML jobs, and both prototypes and production endpoints. Each time, it scaled with me. Each time, it *just worked*. Each time, I experienced what Erik envisioned: infrastructure that gets out of your way so you can focus on the actual work.

---

[^1]: Erik Bernhardsson is the co-founder and CEO of Modal. He was previously CTO of Better.com and spent seven years at Spotify building large-scale data infrastructure. He's also the creator of popular open-source projects like Luigi (Spotify's workflow engine) and Annoy (approximate nearest neighbors library). His 2022 blog post ["What I have been working on: Modal"](https://erikbern.com/2022/12/07/what-i-have-been-working-on-modal.html) explains the foundational vision behind Modal and why data teams deserve better tools. 