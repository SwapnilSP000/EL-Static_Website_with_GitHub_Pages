/* Project NEXUS - Main Operations Script */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1️⃣ Boot Loader Sequence ---
  const bootLoader = document.getElementById('boot-loader');
  const bootBody = document.getElementById('boot-body');
  const bootProgressFill = document.getElementById('boot-progress-fill');

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const bootSequenceLines = [
    "BOOTING PROJECT NEXUS v2.0...",
    "Initializing microservice clusters...",
    "Loading Cloud environment parameters...",
    "Connecting AWS APIs...             [ OK ]",
    "Verifying Docker container daemon...  [ RUNNING ]",
    "Syncing Terraform remote state...    [ OK ]",
    "Checking AI/ML workspace logs...    [ ACTIVE ]",
    "Welcome Operator Swapnil Patil."
  ];

  async function runBootLoader() {
    if (!bootLoader || !bootBody || !bootProgressFill) return;

    // Start progress bar animation
    setTimeout(() => {
      bootProgressFill.style.width = "100%";
    }, 100);

    for (let i = 0; i < bootSequenceLines.length; i++) {
      const line = document.createElement('p');
      line.textContent = bootSequenceLines[i];
      if (bootSequenceLines[i].includes('[ OK ]') || bootSequenceLines[i].includes('[ RUNNING ]') || bootSequenceLines[i].includes('[ ACTIVE ]')) {
        line.style.color = '#22c55e'; // success green
      }
      bootBody.appendChild(line);
      await sleep(220);
    }

    await sleep(400);
    bootLoader.classList.add('fade-out');
    // Allow page scrolling after loader exits
    document.body.classList.remove('no-scroll');
  }

  // Lock scrolling during boot
  document.body.classList.add('no-scroll');
  runBootLoader();

  // --- 2️⃣ Mobile Drawer Navigation Menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const navIndicator = document.querySelector('.nav-indicator');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Navbar Indicator slide animation helper
  function updateNavIndicator(activeLink) {
    if (!navIndicator || !activeLink) return;
    const navRect = activeLink.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
  }

  // --- 3️⃣ Typewriter Role Title Effect ---
  const typedRoleEl = document.getElementById('typed-role');
  const roles = [
    "Cloud Engineer",
    "DevOps Automation Specialist",
    "Data Science Intern"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!typedRoleEl) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedRoleEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typedRoleEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of title
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next title
    }

    setTimeout(typeRole, typingSpeed);
  }

  setTimeout(typeRole, 2500); // Start typing after boot completes

  // --- 4️⃣ Telemetry Stats Counter Animation ---
  const countStats = (entry) => {
    const statsElements = entry.target.querySelectorAll('.stat-number');
    statsElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;

      const timer = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  // --- 5️⃣ Intersection Observer for reveals and counters ---
  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const sectionsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Trigger counters if dashboard visible
        if (entry.target.id === 'dashboard') {
          countStats(entry);
        }

        // Trigger skills progress bar transition
        if (entry.target.id === 'skills') {
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
          });
        }

        // Highlight active navbar link
        const matchingLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (matchingLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
          updateNavIndicator(matchingLink);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(section => {
    sectionsObserver.observe(section);
  });

  // Track navbar click indicator updates
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavIndicator(link);
    });
  });

  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) updateNavIndicator(active);
  });

  // --- 6️⃣ Interactive Linux Command Shell Console ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');

  function scrollTerminalToBottom() {
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  const initialConsolePrompt = [
    "NEXUS Shell System v2.0",
    "Initializing shell services...       [ OK ]",
    "Type 'help' to review shell command configurations."
  ];

  initialConsolePrompt.forEach(pLine => {
    if (!terminalOutput) return;
    const line = document.createElement('p');
    line.textContent = pLine;
    if (pLine.includes('[ OK ]')) {
      line.style.color = '#10b981';
    }
    terminalOutput.appendChild(line);
  });

  function processTerminalQuery(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    switch (cleanCmd) {
      case 'help':
        return `Available system operations:
  - <b style="color:#10b981;">about</b>       : Swapnil's professional profile overview
  - <b style="color:#10b981;">skills</b>      : Technical competencies and tooling matrix
  - <b style="color:#10b981;">projects</b>    : Display active software engineering projects
  - <b style="color:#10b981;">experience</b>  : History of engineering internship nodes
  - <b style="color:#10b981;">docker</b>      : Check container deployment registries
  - <b style="color:#10b981;">neofetch</b>    : Display NEXUS systems hardware profiles
  - <b style="color:#10b981;">contact</b>     : List system email and LinkedIn channels
  - <b style="color:#10b981;">clear</b>       : Wipe the console logging history`;

      case 'whoami':
      case 'about':
        return `Swapnil Patil | Cloud, DevOps & Data Science Intern.
Postgraduate MCA candidate focused on Kubernetes, Docker, and IaC pipelines.
Based in Pune, Maharashtra, India.`;

      case 'skills':
        return `Cloud Platform  : AWS (EC2, S3, RDS), Google Cloud
Containerization: Docker, Kubernetes, Docker Compose
Infrastructure  : Terraform, Jenkins pipelines, Nginx configs
Languages Core  : Python, Bash Shell, Javascript, SQL`;

      case 'projects':
        return `Active Nodes:
  - <b style="color:#3b82f6;">EL-Task-2-Jenkins-CICD</b>: NodeJS webhook docker pipelines.
  - <b style="color:#3b82f6;">AI-Enhanced_Intrusion_Detection</b>: Intrusion ML checks.
  - <b style="color:#3b82f6;">El-IaC-with-Terraform-project</b>: Virtual resources modules.
  - <b style="color:#3b82f6;">telesupport-hub</b>: Flask RDS app.`;

      case 'experience':
        return `Internship Nodes:
  - Fourise Software Pvt. Ltd (Sep 2025 - Present): Data Science Intern (EDA, Cleaning).
  - Velsync (Nov - Dec 2025): Cloud & DevOps Intern (Docker build pipelines).
  - Yuva Intern (Oct - Nov 2025): DevOps Assistant (Prometheus telemetry).`;

      case 'docker':
        return `Docker registry: hub.docker.com/u/swapnilsp00
Container repositories:
  - swapnilsp00/intrusion-detection : ML classifier containers
  - swapnilsp00/jenkins-pipeline    : Jenkins automation agents`;

      case 'neofetch':
        return `<pre style="font-family: inherit; line-height: 1.35; color:#10b981;">
   .---.       swapnil@devops
  /     \\      --------------
  \\_.._/       OS: Cloud & DevOps Dashboard v2.0
   |  |        Host: DY Patil Technical Campus MCA
   |  |        Shell: NEXUS Interactive CLI
  .'  '.       Uptime: Online
  '----'       CPU: Python Virtual Engines
               RAM: 16GB Virtual Buffer
               Cloud: Amazon Web Services (AWS)
               DevOps: Docker Core Containers
</pre>`;

      case 'contact':
        return `Secure channels:
  - Email: sp2557295@gmail.com
  - LinkedIn: www.linkedin.com/in/swapnil-sp-sp80dp55
  - Github: github.com/SwapnilSP000`;

      case 'clear':
        if (terminalOutput) terminalOutput.innerHTML = '';
        return '';

      default:
        return `<span style="color:#ef4444">Command shell error: system does not recognize '${cmd}'. Type 'help' for commands.</span>`;
    }
  }

  if (terminalInput) {
    // Focus keyboard when clicking anywhere inside console card
    const terminalCard = document.querySelector('#terminal .terminal-card');
    if (terminalCard) {
      terminalCard.addEventListener('click', () => {
        terminalInput.focus();
      });
    }

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = terminalInput.value.trim();
        terminalInput.value = '';

        if (!terminalOutput) return;

        // Display user input line
        const echoLine = document.createElement('p');
        echoLine.innerHTML = `<span class="prompt">swapnil@devops:~$</span> <span style="color:#fff;">${query}</span>`;
        terminalOutput.appendChild(echoLine);

        if (query) {
          const resp = processTerminalQuery(query);
          if (resp) {
            const respEl = document.createElement('div');
            respEl.innerHTML = resp;
            respEl.style.margin = '4px 0 12px 0';
            terminalOutput.appendChild(respEl);
          }
        }

        scrollTerminalToBottom();
      }
    });
  }

  // --- 7️⃣ DevOps Pipeline Scroll Animator ---
  const pipelineVisualizer = document.getElementById('pipeline-visualizer');
  const pipelineProgressLine = document.getElementById('pipeline-progress-line');
  const pipelineNodes = document.querySelectorAll('.pipeline-node');

  function animateDevOpsPipeline() {
    if (!pipelineVisualizer || !pipelineProgressLine) return;
    const rect = pipelineVisualizer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Scroll progress calculations (from 0% to 100%)
    const startPoint = windowHeight * 0.8;
    const endPoint = windowHeight * 0.2;
    const totalDist = startPoint - endPoint;
    const progress = Math.min(Math.max((startPoint - rect.top) / totalDist, 0), 1);

    pipelineProgressLine.style.height = `${progress * 100}%`;

    // Toggle active classes based on scroll progress heights
    pipelineNodes.forEach((node, idx) => {
      const nodePercent = idx / (pipelineNodes.length - 1);
      if (progress >= nodePercent) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', animateDevOpsPipeline);
  window.addEventListener('resize', animateDevOpsPipeline);

  // --- 8️⃣ Projects Explorer Finder logic ---
  const FALLBACK_REPOS = [
    {
      name: "AI-Enhanced_Intrusion_Detection_System",
      description: "Machine learning based network intrusion detection framework utilizing Decision Trees, Random Forests, and custom Pandas preprocessing pipelines.",
      html_url: "https://github.com/SwapnilSP000/AI-Enhanced_Intrusion_Detection_System",
      stargazers_count: 2,
      topics: ["machine-learning", "python", "network-security", "datascience"]
    },
    {
      name: "EL-Task-2-Jenkins-CICD",
      description: "Automated continuous integration pipeline configured with GitHub webhooks, Jenkins execution agents, Docker registry builds, and local NodeJS testing suites.",
      html_url: "https://github.com/SwapnilSP000/EL-Task-2-Jenkins-CICD",
      stargazers_count: 1,
      topics: ["jenkins", "docker", "nodejs", "devops"]
    },
    {
      name: "El-IaC-with-Terraform-project",
      description: "Provisioning virtual infrastructure resources on cloud instances, establishing security firewalls, routing gateways, and remote resource modular files.",
      html_url: "https://github.com/SwapnilSP000/El-IaC-with-Terraform-project",
      stargazers_count: 1,
      topics: ["terraform", "aws", "infrastructure", "cloud"]
    },
    {
      name: "smart-waste-management",
      description: "Static responsive web portal implementing waste sorting classification lists, CSS styling cards, and responsive viewport interfaces.",
      html_url: "https://github.com/SwapnilSP000/smart-waste-management",
      stargazers_count: 1,
      topics: ["html", "css", "web"]
    },
    {
      name: "telesupport-hub",
      description: "Cloud-based customer support ticketing gateway created with Flask, containerized via Docker compose, and run on AWS EC2 nodes connected to an RDS MySQL instance.",
      html_url: "https://github.com/SwapnilSP000/telesupport-hub",
      stargazers_count: 1,
      topics: ["flask", "aws", "mysql", "cloud"]
    },
    {
      name: "Green-Classify",
      description: "Deep learning waste classification pipeline utilizing CNN architectures to segment and categorize compostable and recyclable elements.",
      html_url: "https://github.com/SwapnilSP000/Green-Classify",
      stargazers_count: 2,
      topics: ["pytorch", "deep-learning", "cnn", "datascience"]
    },
    {
      name: "yuva_intern_week_3",
      description: "Deploying a complete container monitoring stack using Prometheus metrics collectors, Grafana visualization dashboards, and Loki log collectors.",
      html_url: "https://github.com/SwapnilSP000/yuva_intern_week_3",
      stargazers_count: 1,
      topics: ["prometheus", "grafana", "monitoring", "devops"]
    }
  ];

  const projectGrid = document.getElementById('project-grid');
  const explorerFolderTabs = document.querySelectorAll('.explorer-folder-tab');
  const explorerAddress = document.getElementById('explorer-address');
  let loadedRepositories = [];

  function displayProjectCards(repos) {
    if (!projectGrid) return;
    projectGrid.innerHTML = '';

    if (repos.length === 0) {
      projectGrid.innerHTML = '<div style="color:var(--text-dim); padding:20px;">No repository elements found matching this folder directory.</div>';
      return;
    }

    repos.forEach(repo => {
      const title = repo.name.replace(/_/g, ' ').replace(/-/g, ' ');
      const stars = repo.stargazers_count || 0;

      const card = document.createElement('div');
      card.className = 'project-card';

      const tags = repo.topics && repo.topics.length > 0
        ? repo.topics.slice(0, 3).map(t => `<span class="tech-badge">${t}</span>`).join('')
        : `<span class="tech-badge">repository</span>`;

      card.innerHTML = `
        <h3>${title}</h3>
        <p>${repo.description || 'DevOps and Cloud operations registry node.'}</p>
        <div class="tech-list">${tags}</div>
        <a class="project-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="Open source files of project ${title} on GitHub">
          View Repository &rarr;
        </a>
      `;
      projectGrid.appendChild(card);
    });
  }

  async function fetchGitHubRegistry() {
    try {
      const res = await fetch("https://api.github.com/users/SwapnilSP000/repos?sort=updated&per_page=100");
      if (!res.ok) throw new Error("API rate limits exceeded");
      const repos = await res.json();
      const nonForks = repos.filter(r => !r.fork && r.name !== 'ci-cd-resume');

      // Match from API or fallback
      loadedRepositories = nonForks.length > 0 ? nonForks : FALLBACK_REPOS;
      filterExplorerFolder("all");
    } catch (err) {
      console.warn("GitHub fetch failed, rendering fallbacks:", err);
      loadedRepositories = FALLBACK_REPOS;
      filterExplorerFolder("all");
    }
  }

  function filterExplorerFolder(category) {
    explorerFolderTabs.forEach(t => t.classList.remove('active'));
    const clickedTab = document.querySelector(`.explorer-folder-tab[data-filter="${category}"]`);
    if (clickedTab) clickedTab.classList.add('active');

    if (explorerAddress) {
      explorerAddress.textContent = `C:\\nexus\\projects\\${category}`;
    }

    if (category === 'all') {
      displayProjectCards(loadedRepositories);
    } else {
      const filtered = loadedRepositories.filter(r => {
        // Tag filter checks
        if (category === 'devops') {
          return r.topics && (r.topics.includes('devops') || r.topics.includes('jenkins') || r.topics.includes('monitoring') || r.topics.includes('prometheus'));
        }
        if (category === 'cloud') {
          return r.topics && (r.topics.includes('cloud') || r.topics.includes('terraform') || r.topics.includes('aws') || r.topics.includes('infrastructure'));
        }
        if (category === 'datascience') {
          return r.topics && (r.topics.includes('datascience') || r.topics.includes('machine-learning') || r.topics.includes('pytorch') || r.topics.includes('deep-learning'));
        }
        return false;
      });
      displayProjectCards(filtered);
    }
  }

  explorerFolderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterExplorerFolder(tab.getAttribute('data-filter'));
    });
  });

  fetchGitHubRegistry();

  // --- 9️⃣ JupyterLab Data Science Notebooks Workspace ---
  const labWorkspace = document.getElementById('lab-workspace');
  const labTabs = document.querySelectorAll('.lab-tab');

  const notebooksData = {
    intrusion: `
      <div class="lab-cell">
        <div class="lab-cell-input">
          <span>In [1]:</span>
          <pre>import pandas as pd
import sklearn.ensemble as ensemble
import matplotlib.pyplot as plt

# Load network intrusion transaction packets logs
df = pd.read_csv("network_intrusion_data.csv")
print("Intrusion records shape:", df.shape)</pre>
        </div>
        <div class="lab-cell-output">
          <p>Intrusion records shape: (125973, 42)</p>
        </div>
      </div>
      <div class="lab-cell">
        <div class="lab-cell-input">
          <span>In [2]:</span>
          <pre>model = ensemble.RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
print(f"Random Forest Validation Accuracy: {acc*100:.2f}%")</pre>
        </div>
        <div class="lab-cell-output">
          <p>Random Forest Validation Accuracy: 94.20%</p>
          <div class="accuracy-bar-track" aria-label="Accuracy rate indicator 94.20%">
            <div class="accuracy-bar-fill"></div>
          </div>
        </div>
      </div>
    `,
    waste: `
      <div class="lab-cell">
        <div class="lab-cell-input">
          <span>In [1]:</span>
          <pre>import torch
import torchvision.models as models

# Initialize deep learning wastes CNN categorizer
model = models.resnet18(pretrained=True)
print(model.fc)</pre>
        </div>
        <div class="lab-cell-output">
          <p>Linear(in_features=512, out_features=1000, bias=True)</p>
        </div>
      </div>
      <div class="lab-cell">
        <div class="lab-cell-input">
          <span>In [2]:</span>
          <pre># CNN category outputs preview
classes = ["Compostable", "Recyclable", "Hazardous", "Residual"]
print("Target categorizations:", classes)</pre>
        </div>
        <div class="lab-cell-output">
          <table class="dataset-table" aria-label="Wastes classification epoch validation metrics">
            <thead>
              <tr><th>Epoch</th><th>Loss</th><th>Validation Accuracy</th></tr>
            </thead>
            <tbody>
              <tr><td>1/5</td><td>0.453</td><td>82.4%</td></tr>
              <tr><td>3/5</td><td>0.198</td><td>91.6%</td></tr>
              <tr><td>5/5</td><td>0.087</td><td>95.8%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  };

  function renderLabNotebook(tabKey) {
    if (!labWorkspace) return;
    labWorkspace.innerHTML = notebooksData[tabKey] || '';
  }

  labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      labTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderLabNotebook(tab.getAttribute('data-tab'));
    });
  });

  // Default load
  renderLabNotebook('intrusion');

  // --- 🔟 Certificates Vault & Credentials Popups ---
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBodyContent = document.getElementById('modal-body-content');

  const credentialsMetadata = {
    aws: {
      title: "AWS Cloud Quest: Cloud Practitioner",
      org: "Amazon Web Services (AWS)",
      date: "Issued Jun 2026",
      expiry: "Expires Jun 2028",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    },
    'rich-docs': {
      title: "Inspect Rich Documents with Gemini",
      org: "Google Cloud Platform (GCP)",
      date: "Issued May 2026",
      expiry: "No Expiration Date",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    },
    prompt: {
      title: "Prompt Design in Vertex AI",
      org: "Google Cloud Platform (GCP)",
      date: "Issued May 2026",
      expiry: "No Expiration Date",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    },
    'ibm-cloud': {
      title: "Journey to Cloud: Envision Cloud Solutions",
      org: "IBM SkillsBuild Credentials",
      date: "Issued Apr 2026",
      expiry: "No Expiration Date",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    },
    'ds-smart': {
      title: "Applied Data Science",
      org: "SmartBridge (Google Colab Learning Hub)",
      date: "Issued Feb 2026",
      expiry: "No Expiration Date",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    },
    'cp-smart': {
      title: "Cloud Practitioner Certification",
      org: "SmartBridge Platform Credentials",
      date: "Issued Jan 2026",
      expiry: "No Expiration Date",
      verify: "https://www.credly.com/users/swapnil-patil.bbda7d25/badges"
    }
  };

  function openCredentialsPopup(certKey) {
    if (!certModal || !modalBodyContent) return;
    const meta = credentialsMetadata[certKey];
    if (!meta) return;

    modalBodyContent.innerHTML = `
      <h3>${meta.title}</h3>
      <p style="color:#a855f7; font-weight:600; margin-bottom:12px;">${meta.org}</p>
      <div class="modal-meta-row"><span>DATE ISSUE</span><span>${meta.date}</span></div>
      <div class="modal-meta-row"><span>VALID EXPIRY</span><span>${meta.expiry}</span></div>
      <div class="modal-meta-row"><span>VERIFY URL</span>
        <span><a href="${meta.verify}" target="_blank" rel="noopener noreferrer" style="color:#22c55e; font-weight:700;">Credly Portal &rarr;</a></span>
      </div>
    `;

    certModal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeCredentialsPopup() {
    if (certModal) {
      certModal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      openCredentialsPopup(card.getAttribute('data-cert'));
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeCredentialsPopup);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCredentialsPopup();
    });
  }

  // Keyboard navigation support for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCredentialsPopup();
  });
});
