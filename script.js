/* ==========================================================================
   RANA AHMAD — RA.OS PORTFOLIO (static build)
   Vanilla JS replacement for the original React/Next.js logic:
   boot sequence, canvas space background, custom cursor, typewriter,
   scroll reveals, navbar spy, 3D tilt cards, GitHub projects, contact form,
   and the integrated Ahmad Bot chat widget.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     DATA (ported from lib/data.ts)
     ======================================================================== */
  var owner = {
    name: 'Rana Ahmad',
    title: 'Full Stack Engineer | AI Developer | Computer Science Student',
    roles: ['Full Stack Engineer', 'AI Developer', 'CS Student @ UCP'],
    company: 'MADigital.pk',
    education: 'BSCS — University of Central Punjab',
    location: 'Faisalabad, Pakistan',
    email: 'Ahmadaslam0904@gmail.com',
    phone: '+92 3250444285',
    linkedin: 'https://www.linkedin.com/in/ranahmad0/',
    github: 'https://github.com/ranahmad0',
    githubUser: 'ranahmad0'
  };

  var skillClusters = [
    { name: 'Frontend', code: 'FE-01', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'] },
    { name: 'Backend', code: 'BE-02', skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Auth Systems'] },
    { name: 'AI / ML', code: 'AI-03', skills: ['Python', 'LLM Integration', 'Prompt Engineering', 'AI Agents', 'RAG Pipelines'] },
    { name: 'Tooling', code: 'TL-04', skills: ['Git / GitHub', 'Vercel', 'Linux', 'CI / CD', 'Figma'] }
  ];

  var placeholderProjects = [
    { name: 'AI Agent Platform', description: 'Case study in progress. An autonomous agent system with tool calling and memory.', tech: ['Next.js', 'TypeScript', 'AI SDK'], github: null, live: null, comingSoon: true },
    { name: 'Full Stack SaaS', description: 'Case study in progress. A production SaaS with auth, billing, and dashboards.', tech: ['Next.js', 'PostgreSQL', 'Stripe'], github: null, live: null, comingSoon: true },
    { name: 'RAG Knowledge Engine', description: 'Case study in progress. Retrieval-augmented generation over custom knowledge bases.', tech: ['Python', 'Embeddings', 'Vector DB'], github: null, live: null, comingSoon: true }
  ];

  /* ========================================================================
     BOOT SEQUENCE
     ======================================================================== */
  var bootLines = [
    '> RA.OS v2.6.0 — kernel init',
    '> mounting /dev/creativity ............ OK',
    '> loading neural pathways ............. OK',
    '> full stack modules .................. ONLINE',
    '> ai inference engine ................. ONLINE',
    '> calibrating particle field .......... OK',
    '> establishing uplink: MADigital.pk ... SECURE',
    '> identity verified: RANA AHMAD',
    '> launching experience...'
  ];

  function runBoot() {
    var boot = document.getElementById('boot');
    var terminal = document.getElementById('boot-terminal');
    var caret = terminal.querySelector('.boot-caret');
    var bar = document.getElementById('boot-bar');
    var percent = document.getElementById('boot-percent');
    var page = document.getElementById('page');
    var visible = 0;
    var progress = 0;

    function finish() {
      boot.classList.add('boot-exit');
      page.classList.add('booted');
      setTimeout(function () { boot.remove(); }, 800);
    }

    if (prefersReducedMotion) { finish(); return; }

    // Smoothly animate the progress bar toward the current target.
    var progressTimer = setInterval(function () {
      var target = (visible / bootLines.length) * 100;
      if (progress < target) {
        progress = Math.min(progress + 2.5, target);
        bar.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';
      }
      if (progress >= 100) clearInterval(progressTimer);
    }, 16);

    function nextLine() {
      if (visible >= bootLines.length) {
        setTimeout(function () { setTimeout(finish, 500); }, 200);
        return;
      }
      var line = bootLines[visible];
      var p = document.createElement('p');
      p.className = 'boot-line' + (line.indexOf('RANA AHMAD') !== -1 ? ' boot-line-hl' : '');
      p.textContent = line;
      terminal.insertBefore(p, caret);
      visible++;
      setTimeout(nextLine, 180 + Math.random() * 160);
    }
    nextLine();
  }

  /* ========================================================================
     SPACE BACKGROUND — 2D canvas port of the Three.js scene
     (starfield, spiral nebula, neural network, energy orb, mouse parallax)
     ======================================================================== */
  function initSpace() {
    var canvas = document.getElementById('space-canvas');
    var ctx = canvas.getContext('2d');
    var w, h, dpr;
    var mouse = { x: 0, y: 0 };
    var cam = { x: 0, y: 0 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / w) * 2 - 1;
      mouse.y = (e.clientY / h) * 2 - 1;
    }, { passive: true });

    // Scale particle counts down on smaller/low-power screens for smoother frame rates
    var isSmallScreen = window.innerWidth < 768;

    // --- Starfield (3D projected points, slow rotation) ---
    var STARS = isSmallScreen ? 220 : 500;
    var stars = [];
    for (var i = 0; i < STARS; i++) {
      var r = 18 + Math.random() * 42;
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      stars.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi)
      });
    }

    // --- Nebula (spiral galaxy disc) ---
    var NEB = isSmallScreen ? 130 : 260;
    var nebula = [];
    for (var n = 0; n < NEB; n++) {
      var nr = Math.pow(Math.random(), 0.5) * 14;
      var ang = Math.random() * Math.PI * 2 + nr * 0.4;
      nebula.push({
        x: Math.cos(ang) * nr + (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2.2,
        z: Math.sin(ang) * nr + (Math.random() - 0.5) * 2 - 6
      });
    }

    // --- Neural network (nodes + connecting lines) ---
    var NODES = isSmallScreen ? 26 : 42;
    var nodes = [];
    for (var k = 0; k < NODES; k++) {
      nodes.push({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6
      });
    }
    var links = [];
    for (var a = 0; a < NODES; a++) {
      for (var b = a + 1; b < NODES; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dz = nodes[a].z - nodes[b].z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.4) links.push([a, b]);
      }
    }

    var FOV = 340; // projection focal length

    // Project a world point (relative to camera at z=8 looking toward -z)
    function project(x, y, z) {
      var cz = 8 - z; // distance from camera
      if (cz <= 0.5) return null;
      var s = FOV / cz;
      return {
        x: w / 2 + (x - cam.x) * s,
        y: h / 2 - (y - cam.y) * s,
        s: s
      };
    }

    function rotY(p, angle) {
      var c = Math.cos(angle), s = Math.sin(angle);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    function rotX(p, angle) {
      var c = Math.cos(angle), s = Math.sin(angle);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    var t0 = performance.now();

    function frame(now) {
      var t = (now - t0) / 1000;

      // Mouse parallax rig (eased, like the original CameraRig)
      cam.x += (mouse.x * 1.2 - cam.x) * 0.03;
      cam.y += (-mouse.y * 0.8 - cam.y) * 0.03;

      ctx.clearRect(0, 0, w, h);

      // -- Stars: slow global rotation
      var sy = t * 0.008, sx = t * 0.002;
      ctx.fillStyle = 'rgba(159, 201, 255, 0.8)';
      for (var i = 0; i < STARS; i++) {
        var p = rotX(rotY(stars[i], sy), sx);
        var pr = project(p.x, p.y, p.z);
        if (!pr) continue;
        var size = Math.max(0.4, pr.s * 0.012);
        ctx.globalAlpha = Math.min(0.85, pr.s * 0.02);
        ctx.fillRect(pr.x, pr.y, size, size);
      }

      // -- Nebula: additive, rotating disc offset to the upper right
      ctx.globalCompositeOperation = 'lighter';
      var ny = t * 0.03;
      for (var j = 0; j < NEB; j++) {
        var q = rotY(nebula[j], ny);
        // static group tilt + position [4, 2, -14]
        var g = rotX(q, 0.5);
        var pn = project(g.x + 4, g.y + 2, g.z - 14);
        if (!pn) continue;
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#4da3ff';
        var ns = Math.max(0.5, pn.s * 0.02);
        ctx.beginPath();
        ctx.arc(pn.x, pn.y, ns, 0, Math.PI * 2);
        ctx.fill();
      }

      // -- Neural network: gentle sway + pulsing line opacity
      var gy = Math.sin(t * 0.06) * 0.25;
      var gx = Math.cos(t * 0.05) * 0.1;
      var lineAlpha = 0.08 + Math.sin(now * 0.0012) * 0.04;
      var proj = [];
      for (var m = 0; m < NODES; m++) {
        var np = rotX(rotY(nodes[m], gy), gx);
        proj.push(project(np.x, np.y, np.z - 8));
      }
      ctx.strokeStyle = '#4da3ff';
      ctx.globalAlpha = Math.max(0.02, lineAlpha);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var l = 0; l < links.length; l++) {
        var pa = proj[links[l][0]], pb = proj[links[l][1]];
        if (!pa || !pb) continue;
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
      }
      ctx.stroke();
      ctx.fillStyle = '#7cc4ff';
      for (var d = 0; d < NODES; d++) {
        var pd = proj[d];
        if (!pd) continue;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(pd.x, pd.y, Math.max(0.8, pd.s * 0.018), 0, Math.PI * 2);
        ctx.fill();
      }

      // -- Energy orb: wireframe icosahedron stand-in (rotating rings + glow core)
      var orbY = Math.sin(t * 0.6) * 0.3;
      var orb = project(5.5, 0.5 + orbY, -4);
      if (orb) {
        var os = orb.s * 0.9 * (1 + Math.sin(t * 1.4) * 0.04) * 0.09;
        // glow
        var grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, os * 4);
        grad.addColorStop(0, 'rgba(77, 163, 255, 0.35)');
        grad.addColorStop(1, 'rgba(77, 163, 255, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, os * 4, 0, Math.PI * 2);
        ctx.fill();
        // wire core
        ctx.strokeStyle = '#2f7fe0';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, os, 0, Math.PI * 2);
        ctx.stroke();
        // orbit rings (ellipses at animated tilts)
        for (var ri = 0; ri < 3; ri++) {
          var rr = os * (1.7 + ri * 0.5);
          var tilt = t * (0.2 + ri * 0.12) + ri;
          ctx.globalAlpha = 0.5 - ri * 0.12;
          ctx.strokeStyle = '#4da3ff';
          ctx.beginPath();
          ctx.ellipse(orb.x, orb.y, rr, rr * Math.abs(Math.sin(tilt)) * 0.6 + rr * 0.1, tilt * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // -- Glass cube: rotating square wireframe bobbing on the left
      var cubeY = -1.5 + Math.sin(t * 0.8 + 2) * 0.35;
      var cube = project(-6, cubeY, -5);
      if (cube) {
        var cs = cube.s * 0.09 * 0.7;
        ctx.save();
        ctx.translate(cube.x, cube.y);
        ctx.rotate(t * 0.24);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#1d5fa8';
        ctx.strokeRect(-cs, -cs, cs * 2, cs * 2);
        ctx.rotate(t * 0.18);
        ctx.globalAlpha = 0.3;
        ctx.strokeRect(-cs * 0.8, -cs * 0.8, cs * 1.6, cs * 1.6);
        ctx.restore();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      if (!document.hidden) rafId = requestAnimationFrame(frame);
    }

    var rafId = null;
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(frame);
      // Resume the render loop when the tab becomes visible again
      // (it stops scheduling itself while hidden, saving CPU/battery)
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden && !rafId) rafId = requestAnimationFrame(frame);
      });
    } else {
      // Static single frame for reduced motion
      frame(t0);
    }
  }

  /* ========================================================================
     CUSTOM CURSOR (fine pointers only)
     ======================================================================== */
  function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;
    var dot = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    document.documentElement.classList.add('custom-cursor-active');

    var pos = { x: -100, y: -100 };
    var ringPos = { x: -100, y: -100 };
    var hovering = false;

    window.addEventListener('mousemove', function (e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      var target = e.target;
      hovering = !!(target.closest && target.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]'));
    }, { passive: true });

    (function loop() {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.style.transform = 'translate3d(' + (pos.x - 3) + 'px,' + (pos.y - 3) + 'px,0)';
      var scale = hovering ? 1.9 : 1;
      ring.style.transform = 'translate3d(' + (ringPos.x - 18) + 'px,' + (ringPos.y - 18) + 'px,0) scale(' + scale + ')';
      ring.style.borderColor = hovering ? 'oklch(0.78 0.13 220 / 90%)' : 'oklch(0.78 0.13 220 / 45%)';
      requestAnimationFrame(loop);
    })();
  }

  /* ========================================================================
     HERO TYPEWRITER
     ======================================================================== */
  function initTypewriter() {
    var el = document.getElementById('typed');
    var words = owner.roles;
    var speed = 70, pause = 1800;
    var text = '', wordIndex = 0, deleting = false;

    if (prefersReducedMotion) { el.textContent = words[0]; return; }

    function tick() {
      var word = words[wordIndex % words.length];
      if (!deleting && text === word) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
      if (deleting && text === '') {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, speed);
        return;
      }
      text = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
      el.textContent = text;
      setTimeout(tick, deleting ? speed / 2 : speed);
    }
    tick();
  }

  /* ========================================================================
     SCROLL REVEAL (IntersectionObserver replaces whileInView)
     ======================================================================== */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    items.forEach(function (el) {
      var x = el.getAttribute('data-reveal-x');
      var delay = el.getAttribute('data-reveal-delay');
      if (x) {
        el.style.setProperty('--reveal-x', x + 'px');
        el.style.setProperty('--reveal-y', '0px');
      }
      if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-60px 0px' });
    items.forEach(function (el) { observer.observe(el); });

    // Experience line grows when visible
    var expLine = document.querySelector('.exp-line');
    if (expLine) {
      var lineObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            expLine.classList.add('revealed');
            lineObs.disconnect();
          }
        });
      }, { rootMargin: '-100px 0px' });
      lineObs.observe(expLine.parentElement);
    }
  }

  /* ========================================================================
     NAVBAR — scroll state, scrollspy, mobile menu
     ======================================================================== */
  function initNav() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('nav-toggle');
    var mobile = document.getElementById('nav-mobile');
    var links = document.querySelectorAll('.nav-link');
    var mobileLinks = document.querySelectorAll('.nav-mobile-link');

    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });

    var sections = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'contact']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-section') === id); });
          mobileLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-section') === id); });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    function closeMobile() {
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileLinks.forEach(function (l) { l.addEventListener('click', closeMobile); });
  }

  /* ========================================================================
     SKILLS — render clusters
     ======================================================================== */
  function renderSkills() {
    var grid = document.getElementById('skills-grid');
    skillClusters.forEach(function (cluster, i) {
      var card = document.createElement('div');
      card.className = 'glass-strong box-glow skill-cluster';
      card.setAttribute('data-reveal', '');
      card.setAttribute('data-reveal-delay', String(i * 120));

      var chips = cluster.skills.map(function (s) {
        return '<span class="glass skill-chip font-mono">' + s + '</span>';
      }).join('');

      card.innerHTML =
        '<div class="skill-cluster-head">' +
          '<div class="skill-node-core">' +
            '<div class="skill-node-rings">' +
              '<span class="skill-ring-pulse"></span>' +
              '<span class="skill-ring-spin"></span>' +
              '<span class="pulse-dot skill-node-dot"></span>' +
            '</div>' +
            '<div>' +
              '<h3>' + cluster.name + '</h3>' +
              '<p class="skill-node-code font-mono">NODE ' + cluster.code + '</p>' +
            '</div>' +
          '</div>' +
          '<span class="skill-state font-mono"></span>' +
        '</div>' +
        '<div class="skill-chips">' + chips + '</div>' +
        '<div class="skill-deco" aria-hidden="true"></div>';

      grid.appendChild(card);
    });
  }

  /* ========================================================================
     PROJECTS — GitHub API with placeholder fallback + 3D tilt
     ======================================================================== */
  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function projectCard(p, i) {
    var wrap = document.createElement('div');
    wrap.className = 'tilt-wrap';
    wrap.setAttribute('data-reveal', '');
    wrap.setAttribute('data-reveal-delay', String(i * 120));

    var badge = '';
    if (p.comingSoon) {
      badge = '<span class="glass project-badge project-badge-soon">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
        'COMING SOON</span>';
    } else if (typeof p.stars === 'number' && p.stars > 0) {
      badge = '<span class="glass project-badge project-badge-stars">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
        p.stars + '</span>';
    }

    var tech = p.tech.map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join('');

    var ghIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>';

    var linksHtml = '';
    if (p.github) {
      linksHtml += '<a href="' + escapeHtml(p.github) + '" target="_blank" rel="noopener noreferrer" class="project-link">' + ghIcon + 'Source</a>';
    } else {
      linksHtml += '<span class="project-link project-link-muted">' + ghIcon + 'Private</span>';
    }
    if (p.live) {
      linksHtml += '<a href="' + escapeHtml(p.live) + '" target="_blank" rel="noopener noreferrer" class="project-link">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>' +
        'Live Preview</a>';
    }

    var card = document.createElement('div');
    card.className = 'glass-strong box-glow project-card';
    card.innerHTML =
      '<div class="project-sweep" aria-hidden="true"></div>' +
      '<div class="project-head"><h3>' + escapeHtml(p.name) + '</h3>' + badge + '</div>' +
      '<p class="project-desc">' + escapeHtml(p.description) + '</p>' +
      '<div class="project-tech">' + tech + '</div>' +
      '<div class="project-links">' + linksHtml + '</div>';

    // 3D tilt on mouse move (replaces framer-motion useMotionValue/useSpring)
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      var rx = 0, ry = 0, trx = 0, try_ = 0, raf = null;
      function animate() {
        rx += (trx - rx) * 0.15;
        ry += (try_ - ry) * 0.15;
        card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
        if (Math.abs(trx - rx) > 0.01 || Math.abs(try_ - ry) > 0.01) {
          raf = requestAnimationFrame(animate);
        } else { raf = null; }
      }
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        trx = -py * 16;
        try_ = px * 16;
        if (!raf) raf = requestAnimationFrame(animate);
      });
      card.addEventListener('mouseleave', function () {
        trx = 0; try_ = 0;
        if (!raf) raf = requestAnimationFrame(animate);
      });
    }

    wrap.appendChild(card);
    return wrap;
  }

  function renderProjects(list) {
    var grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    list.forEach(function (p, i) {
      var card = projectCard(p, i);
      grid.appendChild(card);
      // Grid renders after initial reveal pass — reveal shortly after insert
      setTimeout(function () { card.classList.add('revealed'); }, 60 + i * 120);
    });
  }

  function loadProjects() {
    renderProjects(placeholderProjects);
    fetch('https://api.github.com/users/' + owner.githubUser + '/repos?sort=updated&per_page=12')
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API ' + res.status);
        return res.json();
      })
      .then(function (repos) {
        var projects = repos
          .filter(function (r) { return !r.fork; })
          .slice(0, 6)
          .map(function (r) {
            return {
              name: r.name,
              description: r.description || 'Case study in progress. Full documentation coming soon.',
              tech: (r.language ? [r.language] : []).concat((r.topics || []).slice(0, 3)),
              github: r.html_url,
              live: r.homepage || null,
              comingSoon: false,
              stars: r.stargazers_count
            };
          });
        if (projects.length === 0) return;
        var merged = projects.concat(placeholderProjects).slice(0, Math.max(projects.length, 3));
        renderProjects(merged);
      })
      .catch(function () { /* keep placeholders on failure */ });
  }

  /* ========================================================================
     CONTACT FORM — mailto transmission
     ======================================================================== */
  function initContact() {
    var form = document.getElementById('contact-form');
    var submit = document.getElementById('contact-submit');
    var submitText = document.getElementById('contact-submit-text');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value;
      var email = form.elements.email.value;
      var message = form.elements.message.value;

      submit.disabled = true;
      submitText.textContent = 'TRANSMITTING...';

      var subject = encodeURIComponent('Portfolio Transmission from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:' + owner.email + '?subject=' + subject + '&body=' + body;

      setTimeout(function () {
        submit.disabled = false;
        submitText.textContent = 'SEND TRANSMISSION';
      }, 1500);
    });
  }

  /* ========================================================================
     AHMAD BOT — integrated chat widget (themed to RA.OS)
     ======================================================================== */
  function initBot() {
    var fab = document.getElementById('ab-fab');
    var win = document.getElementById('ab-window');
    var closeBtn = document.getElementById('ab-close');
    var messagesEl = document.getElementById('ab-messages');
    var inputEl = document.getElementById('ab-input');
    var sendBtn = document.getElementById('ab-send');
    var greet = document.getElementById('ab-greet');
    var greetClose = document.getElementById('ab-greet-close');

    /* ---- Bot data (synced with the portfolio) ---- */
    var botData = {
      name: owner.name,
      title: 'Full Stack Engineer & AI Developer',
      bio: owner.name + ' is a full stack engineer and AI developer at ' + owner.company + ' who builds intelligent digital experiences — modern web frontends, robust backends, and LLM-powered systems.',
      skills: [
        'Frontend — React, Next.js, TypeScript, Tailwind CSS',
        'Backend — Node.js, REST APIs, PostgreSQL, MongoDB',
        'AI / ML — Python, LLM integration, AI agents, RAG pipelines',
        'Tooling — Git/GitHub, Vercel, Linux, CI/CD, Figma'
      ],
      projects: [
        { name: 'AI Agent Platform', desc: 'An autonomous agent system with tool calling and memory.' },
        { name: 'Full Stack SaaS', desc: 'A production SaaS with auth, billing, and dashboards.' },
        { name: 'RAG Knowledge Engine', desc: 'Retrieval-augmented generation over custom knowledge bases.' }
      ],
      experience: 'Currently a Full Stack Engineer & AI Developer at ' + owner.company + ' — building full stack products and AI-powered systems end to end, from design to deployment.',
      education: owner.education + ' (in progress).',
      services: ['Full stack web development', 'AI integration (LLMs, agents, RAG)', 'Web app development', 'UI/UX implementation'],
      contact: {
        email: owner.email,
        phone: owner.phone,
        linkedin: owner.linkedin,
        github: owner.github
      },
      resumeUrl: 'mailto:' + owner.email + '?subject=Resume%20Request'
    };

    var quickOptions = [
      { label: '💻 Skills', text: 'What are your skills?' },
      { label: '🚀 Projects', text: 'Tell me about your projects' },
      { label: '💼 Experience', text: 'What is your experience?' },
      { label: '📞 Contact', text: 'How can I contact you?' }
    ];

    var knowledgeBase = [
      {
        id: 'greeting',
        keywords: ['hi', 'hii', 'hiii', 'hello', 'hey', 'salam', 'assalam', 'asalam', 'aoa', 'hy', 'helo', 'yo'],
        response: function () { return 'Hey there! 👋 I\'m <strong>Ahmad Bot</strong>. Ask me about ' + botData.name + '\'s skills, projects, experience, or how to get in touch.'; }
      },
      {
        id: 'about',
        keywords: ['who are you', 'about ahmad', 'about rana', 'tell me about', 'about you', 'introduce', 'introduction', 'kon ho', 'kya karte', 'who is ahmad', 'who is rana', 'what do you do', 'yourself'],
        response: function () { return botData.bio + '<br><br>' + botData.name + ' currently works as a <strong>' + botData.title + '</strong> at ' + owner.company + '.'; }
      },
      {
        id: 'skills',
        keywords: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'programming', 'language', 'stack', 'expertise', 'mahir', 'kya ata hai'],
        response: function () { return botData.name + ' works with:<br>' + botData.skills.map(function (s) { return '• ' + s; }).join('<br>'); }
      },
      {
        id: 'projects',
        keywords: ['project', 'projects', 'work', 'built', 'made', 'kaam', 'kia hai', 'portfolio work'],
        response: function () {
          return 'Here are a few things ' + botData.name + ' is building:<br><br>' +
            botData.projects.map(function (p) { return '<strong>' + p.name + '</strong> — ' + p.desc; }).join('<br><br>') +
            '<br><br>Full archive: <a href="' + botData.contact.github + '" target="_blank" rel="noopener">GitHub</a>';
        }
      },
      {
        id: 'experience',
        keywords: ['experience', 'job', 'work history', 'career', 'tajurba', 'years of'],
        response: function () { return botData.experience; }
      },
      {
        id: 'education',
        keywords: ['education', 'degree', 'university', 'qualification', 'study', 'parhai', 'school', 'ucp'],
        response: function () { return botData.education; }
      },
      {
        id: 'services',
        keywords: ['service', 'services', 'freelance', 'hire', 'offer', 'collaborate', 'work together', 'khidmat', 'rakhna', 'job offer', 'available for', 'open to work'],
        response: function () {
          return botData.name + ' offers:<br>' + botData.services.map(function (s) { return '• ' + s; }).join('<br>') +
            '<br><br>Fastest way to start a conversation: <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a>';
        }
      },
      {
        id: 'contact',
        keywords: ['contact', 'email', 'phone', 'number', 'reach', 'rabta', 'whatsapp', 'get in touch', 'connect'],
        response: function () {
          return 'You can reach ' + botData.name + ' here:<br>' +
            '📧 <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a><br>' +
            '📱 ' + botData.contact.phone + '<br>' +
            '💼 <a href="' + botData.contact.linkedin + '" target="_blank" rel="noopener">LinkedIn</a><br>' +
            '💻 <a href="' + botData.contact.github + '" target="_blank" rel="noopener">GitHub</a>';
        }
      },
      {
        id: 'resume',
        keywords: ['resume', 'cv', 'download resume', 'download cv'],
        response: function () { return 'You can request ' + botData.name + '\'s resume directly <a href="' + botData.resumeUrl + '">via email</a> and he\'ll send it right over.'; }
      },
      {
        id: 'location',
        keywords: ['location', 'where', 'based', 'city', 'country', 'kahan', 'faisalabad'],
        response: function () { return botData.name + ' is based in <strong>' + owner.location + '</strong> 🌍'; }
      },
      {
        id: 'thanks',
        keywords: ['thanks', 'thank you', 'shukriya', 'mehrbani', 'thnx', 'tysm', 'thankyou'],
        response: ['You\'re welcome! 😊 Anything else you\'d like to know?', 'Anytime! Happy to help with anything else.']
      },
      {
        id: 'bye',
        keywords: ['bye', 'goodbye', 'khuda hafiz', 'allah hafiz', 'see you', 'cya', 'gtg'],
        response: ['Take care! Feel free to come back anytime you have questions. 👋', 'Bye for now! Come back whenever you\'d like to know more.']
      },
      {
        id: 'help',
        keywords: ['help', 'what can you do', 'madad', 'options', 'menu'],
        response: function () { return 'I can tell you about ' + botData.name + '\'s skills, projects, experience, education, or how to contact him. Tap an option below or just type your question:'; },
        showChips: true
      },
      {
        id: 'howareyou',
        keywords: ['how are you', 'kaisay ho', 'kaise ho', 'kya hal', 'how r u'],
        response: ['I\'m doing great, thanks for asking! What would you like to know about Rana Ahmad?', 'All good here! Ready to answer whatever you\'re curious about.']
      },
      {
        id: 'identity',
        keywords: ['your name', 'what are you', 'are you real', 'are you ai', 'are you a bot', 'are you human', 'robot'],
        response: function () { return 'I\'m <strong>Ahmad Bot</strong> — a small assistant built to answer questions about ' + botData.name + '\'s work. I\'m not ' + botData.name + ' in person, but I know his portfolio inside out!'; }
      },
      {
        id: 'joke',
        keywords: ['joke', 'funny', 'make me laugh', 'latifa'],
        response: ['Why do programmers prefer dark mode? Because light attracts bugs. 🐛', 'I\'d tell you a UDP joke, but you might not get it.', 'There are only 10 kinds of people: those who understand binary, and those who don\'t.']
      },
      {
        id: 'time',
        keywords: ['time', 'date', "today's date", 'kya time', 'what time'],
        response: function () { return 'It\'s currently ' + new Date().toLocaleString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' }) + ' on your device. 🕒'; }
      }
    ];

    var fallbackResponses = [
      function () { return 'That\'s a bit outside what I know right now 🤔 I\'m best at answering questions about ' + botData.name + '\'s skills, projects, experience, and contact info. Try one of these:'; },
      function () { return 'Hmm, I\'m not sure about that one. I\'m specialized in ' + botData.name + '\'s portfolio — try asking about his skills or projects, or reach him directly at ' + botData.contact.email + '.'; }
    ];

    /* ---- Chat engine ---- */
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function findBestIntent(userText) {
      var text = userText.toLowerCase().trim();
      var best = null, bestScore = 0;
      knowledgeBase.forEach(function (intent) {
        var score = 0;
        intent.keywords.forEach(function (kw) {
          var re = new RegExp('\\b' + escapeRegex(kw.toLowerCase()) + '\\b', 'i');
          if (re.test(text)) score++;
        });
        if (score > bestScore) { bestScore = score; best = intent; }
      });
      return best;
    }

    function resolveResponse(source) {
      if (typeof source === 'function') return source();
      if (Array.isArray(source)) {
        var chosen = pick(source);
        return typeof chosen === 'function' ? chosen() : chosen;
      }
      return source;
    }

    function addMessage(html, sender) {
      var wrap = document.createElement('div');
      wrap.className = 'ab-msg-wrap ' + sender;
      var bubble = document.createElement('div');
      bubble.className = 'ab-bubble ' + sender;
      bubble.innerHTML = html;
      var time = document.createElement('div');
      time.className = 'ab-time';
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      wrap.appendChild(bubble);
      wrap.appendChild(time);
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addChips(options) {
      var row = document.createElement('div');
      row.className = 'ab-chip-row';
      options.forEach(function (opt) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ab-chip font-mono';
        chip.textContent = opt.label;
        chip.addEventListener('click', function () { handleUserText(opt.text); });
        row.appendChild(chip);
      });
      messagesEl.appendChild(row);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    var typingEl = null;
    function showTyping() {
      typingEl = document.createElement('div');
      typingEl.className = 'ab-msg-wrap bot';
      typingEl.innerHTML = '<div class="ab-bubble bot ab-typing"><span></span><span></span><span></span></div>';
      messagesEl.appendChild(typingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
    function hideTyping() {
      if (typingEl) { typingEl.remove(); typingEl = null; }
    }

    function handleUserText(rawText) {
      var text = (rawText || '').trim();
      if (!text) return;
      addMessage(escapeHtml(text), 'user');
      inputEl.value = '';
      sendBtn.disabled = true;
      showTyping();
      var delay = 550 + Math.random() * 500;
      setTimeout(function () {
        hideTyping();
        var intent = findBestIntent(text);
        if (intent) {
          addMessage(resolveResponse(intent.response), 'bot');
          if (intent.showChips) addChips(quickOptions);
        } else {
          addMessage(resolveResponse(pick(fallbackResponses)), 'bot');
          addChips(quickOptions);
        }
      }, delay);
    }

    /* ---- Open / close ---- */
    var hasOpened = false;
    var isOpen = false;

    function openWindow() {
      isOpen = true;
      win.classList.add('open');
      win.setAttribute('aria-hidden', 'false');
      fab.classList.add('open', 'opened-once');
      fab.setAttribute('aria-expanded', 'true');
      greet.classList.remove('show');
      if (!hasOpened) {
        hasOpened = true;
        setTimeout(function () {
          addMessage(
            'Hi! I\'m <strong>Ahmad Bot</strong> 👋<br>I can answer questions about ' + botData.name + '\'s skills, projects, experience, or how to get in touch. What would you like to know?',
            'bot'
          );
          addChips(quickOptions);
        }, 350);
      }
      setTimeout(function () { inputEl.focus(); }, 250);
    }

    function closeWindow() {
      isOpen = false;
      win.classList.remove('open');
      win.setAttribute('aria-hidden', 'true');
      fab.classList.remove('open');
      fab.setAttribute('aria-expanded', 'false');
    }

    fab.addEventListener('click', function () { isOpen ? closeWindow() : openWindow(); });
    closeBtn.addEventListener('click', closeWindow);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeWindow();
    });

    sendBtn.addEventListener('click', function () { handleUserText(inputEl.value); });
    inputEl.addEventListener('keydown', function (e) {
      // Respect CJK IME composition before submitting on Enter
      if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) handleUserText(inputEl.value);
    });
    inputEl.addEventListener('input', function () {
      sendBtn.disabled = inputEl.value.trim().length === 0;
    });

    greet.addEventListener('click', openWindow);
    greet.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWindow(); }
    });
    greetClose.addEventListener('click', function (e) {
      e.stopPropagation();
      greet.classList.remove('show');
    });

    // Greeting bubble appears after boot, disappears if ignored
    setTimeout(function () { if (!hasOpened) greet.classList.add('show'); }, 5200);
    setTimeout(function () { greet.classList.remove('show'); }, 13000);
  }

  /* ========================================================================
     INIT
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('footer-year').textContent = String(new Date().getFullYear());
    renderSkills();
    initSpace();
    initCursor();
    initTypewriter();
    initNav();
    initContact();
    initBot();
    initReveal();
    loadProjects();
    runBoot();
  });
})();
