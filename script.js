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

  if (window.top !== window.self) {
    try { window.top.location = window.self.location.href; } catch (e) { document.documentElement.style.display = 'none'; }
  }

  var fontsLink = document.getElementById('google-fonts-link');
  if (fontsLink) {
    if (fontsLink.sheet) { fontsLink.media = 'all'; }
    else { fontsLink.addEventListener('load', function () { fontsLink.media = 'all'; }); }
  }

  /* ========================================================================
     DATA
     ======================================================================== */
  var owner = {
    name: 'Rana Ahmad',
    title: 'Full Stack Engineer | AI Developer | Computer Science Student',
    roles: ['Full Stack Engineer', 'AI Developer', 'CS Student @ UCP'],
    company: 'MADigital.pk',
    education: 'BSCS — University of Central Punjab',
    location: 'Faisalabad, Pakistan',
    email: 'Nuznqnfynz0904@tznvy.pbz', // ROT13 obfuscated — decoded at runtime
    phone: '+92 3250444285',
    linkedin: 'https://www.linkedin.com/in/ranahmad0/',
    github: 'https://github.com/Ranahmad1',
    githubUser: 'Ranahmad1',
    resumeFile: 'assets/rana-ahmad-resume.pdf'
  };

  var skillClusters = [
    { name: 'Frontend', code: 'FE-01', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'] },
    { name: 'Backend', code: 'BE-02', skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Auth Systems', 'SQL'] },
    { name: 'AI / ML', code: 'AI-03', skills: ['Python', 'LLM Integration', 'Prompt Engineering', 'AI Agents', 'RAG Pipelines'] },
    { name: 'Business / Design', code: 'BD-04', skills: ['Shopify', 'E-Commerce', 'WordPress', 'Elementor', 'Graphic Design', 'Logo Design', 'ERP Software'] },
    { name: 'Tooling', code: 'TL-05', skills: ['Git / GitHub', 'Vercel', 'Linux', 'CI / CD', 'Figma'] }
  ];

  var githubFallbackProject = {
    name: 'View Live Repositories',
    description: 'GitHub\u2019s API is temporarily unavailable here. Explore the full, up-to-date project archive directly on GitHub.',
    tech: [], github: 'https://github.com/Ranahmad1', live: null, comingSoon: false, isFallback: true
  };

  var linkedinFeatureCard = {
    name: 'Featured on LinkedIn',
    description: 'Certifications, posts, and career updates \u2014 view the full activity and featured section on LinkedIn.',
    tech: ['LinkedIn'], github: null, live: 'https://www.linkedin.com/in/ranahmad0/', comingSoon: false, isLinkedIn: true
  };

  var certificates = [
    { name: 'Soft Skills Training', authority: 'OEC (Overseas Employment Corporation)', date: 'Nov 2025', url: 'https://softskills.oec.gov.pk/certificate/1309bd8e', file: 'assets/certs/soft-skills-training-oec.pdf', thumb: 'assets/certs/thumbs/soft-skills-training-oec.jpg' },
    { name: 'Shopify E-Commerce Expert (Batch-1)', authority: 'Saylani Welfare International Trust (SMIT)', date: 'Mar 2026', url: null, file: 'assets/certs/shopify-ecommerce-expert-smit.pdf', thumb: 'assets/certs/thumbs/shopify-ecommerce-expert-smit.jpg' },
    { name: 'Full Stack Web Engineer', authority: 'NITSEP', date: 'Nov 2025', url: 'https://nitsep.pk/course-certificate/IUT4272410', file: 'assets/certs/full-stack-web-engineer-nitsep.pdf', thumb: 'assets/certs/thumbs/full-stack-web-engineer-nitsep.jpg' },
    { name: 'Certificate of Achievement', authority: 'CertifiedSkill.org', date: 'Mar 2026', url: 'https://certifiedskill.org/', file: 'assets/certs/certificate-of-achievement-certifiedskill.pdf', thumb: 'assets/certs/thumbs/certificate-of-achievement-certifiedskill.jpg' },
    { name: 'Certificate of Appreciation \u2014 Young Entrepreneurs Summit 2026', authority: 'University of Central Punjab (UCP)', date: 'Mar 2026', url: null, file: 'assets/certs/young-entrepreneurs-summit-2026-ucp.jpg', thumb: 'assets/certs/thumbs/young-entrepreneurs-summit-2026-ucp.jpg' },
    { name: 'Certificate of Participation \u2014 UCP Codes and Circuits 2026', authority: 'University of Central Punjab (UCP)', date: '2026', url: null, file: 'assets/images/honor-digital-logic-design-certificate.jpg', thumb: 'assets/images/honor-digital-logic-design-certificate.jpg' },
    { name: 'Getting Started with Generative AI', authority: 'IBM', date: 'Jul 2026', url: 'https://www.credly.com/badges/5b671ec8-676b-45f6-97f3-588d15b27276/linked_in_profile', file: null, thumb: 'assets/certs/thumbs/ibm-generative-ai-badge.jpg' },
    { name: 'UCP Launchpad 2026 \u2014 Certificate of Participation', authority: 'University of Central Punjab (UCP)', date: 'Jul 2026', url: null, file: 'assets/certs/ucp-launchpad-2026-participation.jpg', thumb: 'assets/certs/thumbs/ucp-launchpad-2026-participation.jpg' },
    { name: 'Automating Real-World Tasks with Python', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/1B7N073OTKOG', file: 'assets/certs/automating-real-world-tasks-python.pdf', thumb: 'assets/certs/thumbs/automating-real-world-tasks-python.jpg' },
    { name: 'Crash Course on Python', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/VD8MVV1R0ZGV', file: 'assets/certs/crash-course-python.pdf', thumb: 'assets/certs/thumbs/crash-course-python.jpg' },
    { name: 'Google Prompting Essentials', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/specialization/MTBSQYQV3MX1', file: 'assets/certs/google-prompting-essentials.pdf', thumb: 'assets/certs/thumbs/google-prompting-essentials.jpg' },
    { name: 'Design Prompts for Everyday Work Tasks', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/QBNV64NWTGO3', file: 'assets/certs/design-prompts-everyday-work.pdf', thumb: 'assets/certs/thumbs/design-prompts-everyday-work.jpg' },
    { name: 'Discover the Art of Prompting', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/SMHE1LJ3GCKZ', file: 'assets/certs/discover-art-of-prompting.pdf', thumb: 'assets/certs/thumbs/discover-art-of-prompting.jpg' },
    { name: 'Generative AI for Growth Marketing', authority: 'IBM (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/specialization/C4HJTCW1HPKO', file: 'assets/certs/generative-ai-for-growth-marketing.pdf', thumb: 'assets/certs/thumbs/generative-ai-for-growth-marketing.jpg' },
    { name: 'Google AI Essentials', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/specialization/LDSNWJSL6XA9', file: 'assets/certs/google-ai-essentials-specialization.pdf', thumb: 'assets/certs/thumbs/google-ai-essentials-specialization.jpg' },
    { name: 'Maximize Productivity With AI Tools', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/M9ZBOL629LLN', file: 'assets/certs/maximize-productivity-ai-tools.pdf', thumb: 'assets/certs/thumbs/maximize-productivity-ai-tools.jpg' },
    { name: 'Start Writing Prompts like a Pro', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/NUG0QT5XEZ7I', file: 'assets/certs/start-writing-prompts-like-a-pro.pdf', thumb: 'assets/certs/thumbs/start-writing-prompts-like-a-pro.jpg' },
    { name: 'Use AI as a Creative or Expert Partner', authority: 'Google (Coursera)', date: 'Jul 2026', url: 'https://coursera.org/verify/I2NWZ6F17JIJ', file: 'assets/certs/use-ai-as-creative-partner.pdf', thumb: 'assets/certs/thumbs/use-ai-as-creative-partner.jpg' }
  ];

  var honors = [{ title: 'Overall Best Award \u2014 Digital Logic Design', org: 'UCP Launchpad 2026 \u2014 The Ultimate Tech Pitch', date: 'Jul 2026', description: 'Recognized for excellence in Digital Logic Design \u2014 innovation, technical execution, and presentation quality.', image: 'assets/images/award-ucp-launchpad-2026.jpg' }];
  var moments = [
    { image: 'assets/images/profile-photo.jpg', caption: 'Rana Ahmad', sub: 'Full Stack Engineer & AI Developer' },
    { image: 'assets/images/award-ucp-launchpad-2026.jpg', caption: 'UCP Launchpad 2026', sub: 'Overall Best Award \u2014 Digital Logic Design' },
    { image: 'assets/images/honor-digital-logic-design-certificate.jpg', caption: 'Codes and Circuits 2026', sub: 'University of Central Punjab' },
    { image: 'assets/certs/young-entrepreneurs-summit-2026-ucp.jpg', caption: 'Young Entrepreneurs Summit', sub: 'Certificate of Appreciation, UCP' },
    { image: 'assets/certs/thumbs/shopify-ecommerce-expert-smit.jpg', caption: 'Shopify E-Commerce Expert', sub: 'Saylani Welfare International Trust' },
    { image: 'assets/certs/thumbs/full-stack-web-engineer-nitsep.jpg', caption: 'Full Stack Web Engineer', sub: 'NITSEP' }
  ];

  /* ========================================================================
     BOOT SEQUENCE
     ======================================================================== */
  var bootStatuses = ['Initializing','Loading neural pathways','Compiling full stack modules','Calibrating AI inference engine','Establishing uplink: MADigital.pk','Identity verified: Rana Ahmad','Launching experience'];
  var BOOT_DURATION = 3400;
  var BOOT_CIRCUMFERENCE = 2 * Math.PI * 70;

  function runBoot() {
    var boot = document.getElementById('boot'), ring = document.getElementById('boot-ring'), percent = document.getElementById('boot-percent'), status = document.getElementById('boot-status'), page = document.getElementById('page');
    if (!boot || !ring || !percent || !status || !page) { if (page) page.classList.add('booted'); if (boot) boot.remove(); document.dispatchEvent(new CustomEvent('boot:complete')); return; }
    ring.style.strokeDasharray = String(BOOT_CIRCUMFERENCE); ring.style.strokeDashoffset = String(BOOT_CIRCUMFERENCE);
    function finish() { boot.classList.add('boot-exit'); page.classList.add('booted'); document.dispatchEvent(new CustomEvent('boot:complete')); setTimeout(function () { boot.remove(); }, 1100); }
    if (prefersReducedMotion) { finish(); return; }
    var didFinish = false; var _finish = finish; finish = function () { didFinish = true; _finish(); };
    setTimeout(function () { if (!didFinish) finish(); }, BOOT_DURATION + 2000);
    var start = null, statusIndex = -1;
    function showNextStatus() { statusIndex = Math.min(statusIndex + 1, bootStatuses.length - 1); status.classList.add('boot-status-fade'); setTimeout(function () { status.textContent = bootStatuses[statusIndex]; status.classList.remove('boot-status-fade'); }, 180); }
    showNextStatus();
    function tick(t) { if (start === null) start = t; var elapsed = t - start; var pct = Math.min(100, (elapsed / BOOT_DURATION) * 100); ring.style.strokeDashoffset = String(BOOT_CIRCUMFERENCE * (1 - pct / 100)); percent.textContent = String(Math.round(pct)); var targetIdx = Math.min(bootStatuses.length - 1, Math.floor((pct / 100) * bootStatuses.length)); if (targetIdx > statusIndex) showNextStatus(); if (pct < 100) { requestAnimationFrame(tick); } else { setTimeout(finish, 250); } }
    requestAnimationFrame(tick);
  }

  /* ========================================================================
     SPACE BACKGROUND
     ======================================================================== */
  function initSpace() {
    var canvas = document.getElementById('space-canvas'), ctx = canvas.getContext('2d'), w, h, dpr, mouse = { x: 0, y: 0 }, cam = { x: 0, y: 0 };
    function resize() { dpr = Math.min(window.devicePixelRatio || 1, 1.75); w = window.innerWidth; h = window.innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) { mouse.x = (e.clientX / w) * 2 - 1; mouse.y = (e.clientY / h) * 2 - 1; }, { passive: true });
    var isSmall = window.innerWidth < 768;
    var STARS = isSmall ? 220 : 500, stars = [];
    for (var i = 0; i < STARS; i++) { var r = 18 + Math.random() * 42, theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1); stars.push({ x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi) }); }
    var NEB = isSmall ? 130 : 260, nebula = [];
    for (var n = 0; n < NEB; n++) { var nr = Math.pow(Math.random(), 0.5) * 14, ang = Math.random() * Math.PI * 2 + nr * 0.4; nebula.push({ x: Math.cos(ang) * nr + (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2.2, z: Math.sin(ang) * nr + (Math.random() - 0.5) * 2 - 6 }); }
    var NODES = isSmall ? 26 : 42, nodes = [];
    for (var k = 0; k < NODES; k++) { nodes.push({ x: (Math.random() - 0.5) * 14, y: (Math.random() - 0.5) * 8, z: (Math.random() - 0.5) * 6 }); }
    var links = [];
    for (var a = 0; a < NODES; a++) { for (var b = a + 1; b < NODES; b++) { var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z; if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.4) links.push([a, b]); } }
    var FOV = 340;
    function project(x, y, z) { var cz = 8 - z; if (cz <= 0.5) return null; var s = FOV / cz; return { x: w / 2 + (x - cam.x) * s, y: h / 2 - (y - cam.y) * s, s: s }; }
    function rotY(p, angle) { var c = Math.cos(angle), s = Math.sin(angle); return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }; }
    function rotX(p, angle) { var c = Math.cos(angle), s = Math.sin(angle); return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }; }
    var t0 = performance.now();
    function frame(now) {
      var t = (now - t0) / 1000;
      cam.x += (mouse.x * 1.2 - cam.x) * 0.03; cam.y += (-mouse.y * 0.8 - cam.y) * 0.03;
      ctx.clearRect(0, 0, w, h);
      var sy = t * 0.008, sx = t * 0.002;
      ctx.fillStyle = 'rgba(159, 201, 255, 0.8)';
      for (var i = 0; i < STARS; i++) { var p = rotX(rotY(stars[i], sy), sx), pr = project(p.x, p.y, p.z); if (!pr) continue; var size = Math.max(0.4, pr.s * 0.012); ctx.globalAlpha = Math.min(0.85, pr.s * 0.02); ctx.fillRect(pr.x, pr.y, size, size); }
      ctx.globalCompositeOperation = 'lighter';
      var ny = t * 0.03;
      for (var j = 0; j < NEB; j++) { var q = rotY(nebula[j], ny), g = rotX(q, 0.5), pn = project(g.x + 4, g.y + 2, g.z - 14); if (!pn) continue; ctx.globalAlpha = 0.35; ctx.fillStyle = '#4da3ff'; var ns = Math.max(0.5, pn.s * 0.02); ctx.beginPath(); ctx.arc(pn.x, pn.y, ns, 0, Math.PI * 2); ctx.fill(); }
      var gy = Math.sin(t * 0.06) * 0.25, gx = Math.cos(t * 0.05) * 0.1, lineAlpha = 0.08 + Math.sin(now * 0.0012) * 0.04;
      var proj = [];
      for (var m = 0; m < NODES; m++) { var np = rotX(rotY(nodes[m], gy), gx); proj.push(project(np.x, np.y, np.z - 8)); }
      ctx.strokeStyle = '#4da3ff'; ctx.globalAlpha = Math.max(0.02, lineAlpha); ctx.lineWidth = 1; ctx.beginPath();
      for (var l = 0; l < links.length; l++) { var pa = proj[links[l][0]], pb = proj[links[l][1]]; if (!pa || !pb) continue; ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); }
      ctx.stroke(); ctx.fillStyle = '#7cc4ff';
      for (var d = 0; d < NODES; d++) { var pd = proj[d]; if (!pd) continue; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(pd.x, pd.y, Math.max(0.8, pd.s * 0.018), 0, Math.PI * 2); ctx.fill(); }
      var orbY = Math.sin(t * 0.6) * 0.3, orb = project(5.5, 0.5 + orbY, -4);
      if (orb) { var os = orb.s * 0.9 * (1 + Math.sin(t * 1.4) * 0.04) * 0.09; var grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, os * 4); grad.addColorStop(0, 'rgba(77, 163, 255, 0.35)'); grad.addColorStop(1, 'rgba(77, 163, 255, 0)'); ctx.globalAlpha = 1; ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(orb.x, orb.y, os * 4, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#2f7fe0'; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(orb.x, orb.y, os, 0, Math.PI * 2); ctx.stroke(); for (var ri = 0; ri < 3; ri++) { var rr = os * (1.7 + ri * 0.5), tilt = t * (0.2 + ri * 0.12) + ri; ctx.globalAlpha = 0.5 - ri * 0.12; ctx.strokeStyle = '#4da3ff'; ctx.beginPath(); ctx.ellipse(orb.x, orb.y, rr, rr * Math.abs(Math.sin(tilt)) * 0.6 + rr * 0.1, tilt * 0.5, 0, Math.PI * 2); ctx.stroke(); } }
      var cubeY = -1.5 + Math.sin(t * 0.8 + 2) * 0.35, cube = project(-6, cubeY, -5);
      if (cube) { var cs = cube.s * 0.09 * 0.7; ctx.save(); ctx.translate(cube.x, cube.y); ctx.rotate(t * 0.24); ctx.globalAlpha = 0.5; ctx.strokeStyle = '#1d5fa8'; ctx.strokeRect(-cs, -cs, cs * 2, cs * 2); ctx.rotate(t * 0.18); ctx.globalAlpha = 0.3; ctx.strokeRect(-cs * 0.8, -cs * 0.8, cs * 1.6, cs * 1.6); ctx.restore(); }
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      if (!document.hidden) rafId = requestAnimationFrame(frame);
    }
    var rafId = null, loopStarted = false;
    function startLoop() { if (loopStarted || prefersReducedMotion) return; loopStarted = true; rafId = requestAnimationFrame(frame); document.addEventListener('visibilitychange', function () { if (!document.hidden && !rafId) rafId = requestAnimationFrame(frame); }); }
    frame(t0);
    if (!prefersReducedMotion) { document.addEventListener('boot:complete', startLoop, { once: true }); setTimeout(startLoop, 4000); }
  }

  function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion) return;
    var dot = document.getElementById('cursor-dot'), ring = document.getElementById('cursor-ring');
    document.documentElement.classList.add('custom-cursor-active');
    var pos = { x: -100, y: -100 }, ringPos = { x: -100, y: -100 }, hovering = false;
    window.addEventListener('mousemove', function (e) { pos.x = e.clientX; pos.y = e.clientY; hovering = !!(e.target.closest && e.target.closest('a, button, [role="button"], input, textarea, select, [data-magnetic]')); }, { passive: true });
    (function loop() { ringPos.x += (pos.x - ringPos.x) * 0.16; ringPos.y += (pos.y - ringPos.y) * 0.16; dot.style.transform = 'translate3d(' + (pos.x - 3) + 'px,' + (pos.y - 3) + 'px,0)'; var scale = hovering ? 1.9 : 1; ring.style.transform = 'translate3d(' + (ringPos.x - 18) + 'px,' + (ringPos.y - 18) + 'px,0) scale(' + scale + ')'; ring.style.borderColor = hovering ? 'oklch(0.78 0.13 220 / 90%)' : 'oklch(0.78 0.13 220 / 45%)'; requestAnimationFrame(loop); })();
  }

  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress'); if (!bar) return;
    var ticking = false;
    function update() { var doc = document.documentElement, max = doc.scrollHeight - doc.clientHeight, pct = max > 0 ? (doc.scrollTop / max) * 100 : 0; bar.style.width = pct + '%'; ticking = false; }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true }); update();
  }

  function initMoments() {
    var stage = document.getElementById('moments-stage'), track = document.getElementById('moments-track'), dotsWrap = document.getElementById('moments-dots'), prevBtn = document.getElementById('moments-prev'), nextBtn = document.getElementById('moments-next');
    if (!stage || !track || !dotsWrap || !prevBtn || !nextBtn) return;
    var current = 0, slideEls = [], dotEls = [];
    moments.forEach(function (m, i) {
      var slide = document.createElement('div'); slide.className = 'moment-slide';
      slide.innerHTML = '<img src="' + escapeHtml(m.image) + '" alt="' + escapeHtml(m.caption) + '" loading="lazy" draggable="false" /><div class="moment-caption"><p class="moment-title">' + escapeHtml(m.caption) + '</p><p class="moment-sub font-mono">' + escapeHtml(m.sub) + '</p></div>';
      slide.addEventListener('click', function () { if (i !== current) goTo(i); }); track.appendChild(slide); slideEls.push(slide);
      var dot = document.createElement('button'); dot.className = 'moment-dot'; dot.setAttribute('aria-label', 'Go to slide ' + (i + 1)); dot.addEventListener('click', function () { goTo(i); }); dotsWrap.appendChild(dot); dotEls.push(dot);
    });
    function render() { slideEls.forEach(function (slide, i) { var offset = i - current, abs = Math.abs(offset); if (abs > 3) { slide.style.opacity = '0'; slide.style.pointerEvents = 'none'; return; } slide.style.transform = 'translateX(' + (offset * 62) + '%) translateZ(' + (-abs * 90) + 'px) rotateY(' + (offset * -22) + 'deg) scale(' + (1 - abs * 0.16) + ')'; slide.style.opacity = String(Math.max(0, 1 - abs * 0.32)); slide.style.zIndex = String(10 - abs); slide.style.pointerEvents = 'auto'; slide.classList.toggle('moment-slide-active', offset === 0); }); dotEls.forEach(function (dot, i) { dot.classList.toggle('moment-dot-active', i === current); }); }
    function goTo(i) { current = (i + moments.length) % moments.length; render(); restartAutoplay(); }
    prevBtn.addEventListener('click', function () { goTo(current - 1); }); nextBtn.addEventListener('click', function () { goTo(current + 1); });
    stage.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); } if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); } });
    var dragging = false, dragStartX = 0, dragDelta = 0;
    stage.addEventListener('pointerdown', function (e) { dragging = true; dragStartX = e.clientX; dragDelta = 0; stage.setPointerCapture(e.pointerId); stopAutoplay(); });
    stage.addEventListener('pointermove', function (e) { if (!dragging) return; dragDelta = e.clientX - dragStartX; });
    function endDrag() { if (!dragging) return; dragging = false; if (dragDelta > 40) goTo(current - 1); else if (dragDelta < -40) goTo(current + 1); else restartAutoplay(); }
    stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('mouseenter', stopAutoplay); stage.addEventListener('mouseleave', restartAutoplay);
    var autoplayId = null;
    function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
    function restartAutoplay() { stopAutoplay(); if (prefersReducedMotion) return; autoplayId = setInterval(function () { current = (current + 1 + moments.length) % moments.length; render(); }, 4000); }
    render(); restartAutoplay();
  }

  function initMagnetic() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = 0.35, raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
      function tick() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; el.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)'; if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) { raf = requestAnimationFrame(tick); } else { raf = null; } }
      el.addEventListener('mousemove', function (e) { var rect = el.getBoundingClientRect(); tx = (e.clientX - rect.left - rect.width / 2) * strength; ty = (e.clientY - rect.top - rect.height / 2) * strength; if (!raf) raf = requestAnimationFrame(tick); });
      el.addEventListener('mouseleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
    });
  }

  function initTypewriter() {
    var el = document.getElementById('typed'), words = owner.roles, speed = 70, pause = 1800, text = '', wordIndex = 0, deleting = false;
    if (prefersReducedMotion) { el.textContent = words[0]; return; }
    function tick() { var word = words[wordIndex % words.length]; if (!deleting && text === word) { deleting = true; setTimeout(tick, pause); return; } if (deleting && text === '') { deleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(tick, speed); return; } text = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1); el.textContent = text; setTimeout(tick, deleting ? speed / 2 : speed); }
    tick();
  }

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    items.forEach(function (el) { var x = el.getAttribute('data-reveal-x'), delay = el.getAttribute('data-reveal-delay'); if (x) { el.style.setProperty('--reveal-x', x + 'px'); el.style.setProperty('--reveal-y', '0px'); } if (delay) el.style.setProperty('--reveal-delay', delay + 'ms'); });
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }); }, { rootMargin: '-60px 0px' });
    items.forEach(function (el) { observer.observe(el); });
    var expLine = document.querySelector('.exp-line');
    if (expLine) { var lineObs = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { expLine.classList.add('revealed'); lineObs.disconnect(); } }); }, { rootMargin: '-100px 0px' }); lineObs.observe(expLine.parentElement); }
  }

  function initNav() {
    var nav = document.getElementById('nav'), toggle = document.getElementById('nav-toggle'), mobile = document.getElementById('nav-mobile'), links = document.querySelectorAll('.nav-link'), mobileLinks = document.querySelectorAll('.nav-mobile-link');
    window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 24); }, { passive: true });
    var sections = ['home','about','skills','projects','experience','certificates','honors','moments','contact'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { var id = entry.target.id; links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-section') === id); }); mobileLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-section') === id); }); } }); }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
    function closeMobile() { mobile.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
    toggle.addEventListener('click', function () { var open = mobile.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
    mobileLinks.forEach(function (l) { l.addEventListener('click', closeMobile); });
  }

  function renderSkills() {
    var grid = document.getElementById('skills-grid');
    skillClusters.forEach(function (cluster, i) {
      var card = document.createElement('div'); card.className = 'glass-strong box-glow skill-cluster'; card.setAttribute('data-reveal', ''); card.setAttribute('data-reveal-delay', String(i * 120));
      var chips = cluster.skills.map(function (s) { return '<span class="glass skill-chip font-mono">' + s + '</span>'; }).join('');
      card.innerHTML = '<div class="skill-cluster-head"><div class="skill-node-core"><div class="skill-node-rings"><span class="skill-ring-pulse"></span><span class="skill-ring-spin"></span><span class="pulse-dot skill-node-dot"></span></div><div><h3>' + cluster.name + '</h3><p class="skill-node-code font-mono">NODE ' + cluster.code + '</p></div></div><span class="skill-state font-mono"></span></div><div class="skill-chips">' + chips + '</div><div class="skill-deco" aria-hidden="true"></div>';
      grid.appendChild(card); apply3DTilt(card, 6);
    });
  }

  var certIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>';
  var certArrowIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>';

  function renderCertificates() {
    var grid = document.getElementById('certs-grid'); if (!grid) return; grid.innerHTML = '';
    certificates.forEach(function (c, i) {
      var link = c.url || c.file, hasLink = !!link;
      var flip = document.createElement('div'); flip.className = 'cert-flip'; flip.setAttribute('data-reveal', ''); flip.setAttribute('data-reveal-delay', String((i % 6) * 90)); flip.style.animationDelay = (i % 5) * 0.4 + 's'; flip.setAttribute('tabindex', '0'); flip.setAttribute('role', 'button'); flip.setAttribute('aria-label', escapeHtml(c.name) + ' \u2014 flip for verification details');
      var backContent = hasLink ? '<a href="' + escapeHtml(link) + '" target="_blank" rel="noopener noreferrer" class="cert-verify-btn font-mono">Verify Certificate ' + certArrowIcon + '</a>' : '<span class="cert-pending font-mono">On file \u2014 link pending</span>';
      flip.innerHTML = '<div class="cert-flip-inner"><div class="glass-strong cert-face cert-face-front"><div class="cert-icon">' + certIcon + '</div><h3>' + escapeHtml(c.name) + '</h3><p class="cert-issuer font-mono text-accent">' + escapeHtml(c.authority) + '</p><span class="cert-flip-hint font-mono">TAP TO VERIFY</span></div><div class="cert-face cert-face-back' + (c.thumb ? ' cert-face-back-photo' : '') + '"><div class="cert-back-scrim"><p class="cert-date-back font-mono">' + escapeHtml(c.date) + '</p><p class="cert-back-title">' + escapeHtml(c.name) + '</p>' + backContent + '</div></div></div>';
      if (c.thumb) { flip.querySelector('.cert-face-back').style.backgroundImage = "url('" + c.thumb + "')"; }
      flip.addEventListener('click', function (e) { if (e.target.closest('a')) return; flip.classList.toggle('is-flipped'); });
      flip.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip.classList.toggle('is-flipped'); } });
      grid.appendChild(flip);
    });
  }

  function renderHonors() {
    var grid = document.getElementById('honors-grid'); if (!grid) return; grid.innerHTML = '';
    honors.forEach(function (h, i) {
      var card = document.createElement('div'); card.className = 'glass-strong box-glow honor-card'; card.setAttribute('data-reveal', ''); card.setAttribute('data-reveal-delay', String(i * 150));
      card.innerHTML = (h.image ? '<div class="honor-image"><img src="' + escapeHtml(h.image) + '" alt="' + escapeHtml(h.title) + ' award photo" loading="lazy" /></div>' : '') + '<div class="honor-body"><p class="honor-date font-mono text-primary">' + escapeHtml(h.date) + '</p><h3>' + escapeHtml(h.title) + '</h3><p class="honor-org font-mono">' + escapeHtml(h.org) + '</p><p class="honor-desc">' + escapeHtml(h.description) + '</p></div>';
      grid.appendChild(card); apply3DTilt(card, 8);
    });
  }

  /* ========================================================================
     UTILITIES
     ======================================================================== */
  function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

  /* ROT13 — decodes obfuscated contact info at runtime to deter scrapers */
  function rot13(s) { return String(s).replace(/[a-zA-Z]/g, function(c) { return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26); }); }
  function getDecodedEmail() { return rot13(owner.email); }

  function apply3DTilt(el, maxDeg) {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    maxDeg = maxDeg || 10;
    var rx = 0, ry = 0, trx = 0, try_ = 0, raf = null;
    function animate() { rx += (trx - rx) * 0.15; ry += (try_ - ry) * 0.15; el.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)'; if (Math.abs(trx - rx) > 0.01 || Math.abs(try_ - ry) > 0.01) { raf = requestAnimationFrame(animate); } else { raf = null; } }
    el.addEventListener('mousemove', function (e) { var rect = el.getBoundingClientRect(), px = (e.clientX - rect.left) / rect.width - 0.5, py = (e.clientY - rect.top) / rect.height - 0.5; trx = -py * maxDeg; try_ = px * maxDeg; if (!raf) raf = requestAnimationFrame(animate); });
    el.addEventListener('mouseleave', function () { trx = 0; try_ = 0; if (!raf) raf = requestAnimationFrame(animate); });
  }

  /* ========================================================================
     PROJECTS
     ======================================================================== */
  function projectCard(p, i) {
    var wrap = document.createElement('div'); wrap.className = 'tilt-wrap'; wrap.setAttribute('data-reveal', ''); wrap.setAttribute('data-reveal-delay', String(i * 120));
    var badge = '';
    if (p.comingSoon) { badge = '<span class="glass project-badge project-badge-soon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>COMING SOON</span>'; }
    else if (typeof p.stars === 'number' && p.stars > 0) { badge = '<span class="glass project-badge project-badge-stars"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' + p.stars + '</span>'; }
    var tech = p.tech.map(function (t) { return '<span>' + escapeHtml(t) + '</span>'; }).join('');
    var ghIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>';
    var linksHtml = '';
    if (p.github) { linksHtml += '<a href="' + escapeHtml(p.github) + '" target="_blank" rel="noopener noreferrer" class="project-link">' + ghIcon + 'Source</a>'; }
    else if (!p.isLinkedIn && !p.isFallback) { linksHtml += '<span class="project-link project-link-muted">' + ghIcon + 'Private</span>'; }
    if (p.live) { linksHtml += '<a href="' + escapeHtml(p.live) + '" target="_blank" rel="noopener noreferrer" class="project-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>Live Preview</a>'; }
    if (p.isLinkedIn) badge = '<span class="project-badge project-badge-linkedin font-mono">LINKEDIN</span>';
    if (p.isFallback) badge = '<span class="project-badge project-badge-soon font-mono">LIVE ON GITHUB</span>';
    var card = document.createElement('div'); card.className = 'glass-strong box-glow project-card' + (p.isLinkedIn ? ' project-card-linkedin' : '');
    card.innerHTML = '<div class="project-sweep" aria-hidden="true"></div><div class="project-head"><h3>' + escapeHtml(p.name) + '</h3>' + badge + '</div><p class="project-desc">' + escapeHtml(p.description) + '</p><div class="project-tech">' + tech + '</div><div class="project-links">' + linksHtml + '</div>';
    apply3DTilt(card, 16); wrap.appendChild(card); return wrap;
  }

  function renderProjects(list) { var grid = document.getElementById('projects-grid'); grid.innerHTML = ''; list.forEach(function (p, i) { var card = projectCard(p, i); grid.appendChild(card); setTimeout(function () { card.classList.add('revealed'); }, 60 + i * 120); }); }

  function loadProjects() {
    renderProjects([linkedinFeatureCard]);
    var controller = ('AbortController' in window) ? new AbortController() : null;
    var timeoutId = controller && setTimeout(function () { controller.abort(); }, 8000);
    fetch('https://api.github.com/users/' + owner.githubUser + '/repos?sort=updated&per_page=12', { signal: controller ? controller.signal : undefined })
      .then(function (res) { if (timeoutId) clearTimeout(timeoutId); if (!res.ok) throw new Error('GitHub API ' + res.status); return res.json(); })
      .then(function (repos) { var projects = repos.filter(function (r) { return !r.fork; }).sort(function (a, b) { return b.stargazers_count - a.stargazers_count; }).slice(0, 6).map(function (r) { return { name: r.name, description: r.description || 'No description provided yet on GitHub.', tech: (r.language ? [r.language] : []).concat((r.topics || []).slice(0, 3)), github: r.html_url, live: r.homepage || null, comingSoon: false, stars: r.stargazers_count }; }); renderProjects(projects.concat([linkedinFeatureCard])); })
      .catch(function () { renderProjects([githubFallbackProject, linkedinFeatureCard]); });
  }

  /* ========================================================================
     AHMAD BOT
     ======================================================================== */
  function initBot() {
    var fab = document.getElementById('ab-fab'), win = document.getElementById('ab-window'), closeBtn = document.getElementById('ab-close'), messagesEl = document.getElementById('ab-messages'), inputEl = document.getElementById('ab-input'), sendBtn = document.getElementById('ab-send'), greet = document.getElementById('ab-greet'), greetClose = document.getElementById('ab-greet-close');
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) { fab.addEventListener('mousemove', function (e) { var rect = fab.getBoundingClientRect(), px = (e.clientX - rect.left) / rect.width - 0.5, py = (e.clientY - rect.top) / rect.height - 0.5; fab.style.transform = 'perspective(400px) rotateX(' + (-py * 18) + 'deg) rotateY(' + (px * 18) + 'deg) translateY(-3px)'; }); fab.addEventListener('mouseleave', function () { fab.style.transform = ''; }); }
    var botData = {
      name: owner.name, title: 'Full Stack Engineer & AI Developer',
      bio: owner.name + ' is a Full Stack Engineer at ' + owner.company + ' and a Computer Science student at the University of Central Punjab, building modern web products and integrating AI into production systems.',
      skills: skillClusters.map(function (c) { return c.name + ' \u2014 ' + c.skills.join(', '); }),
      experience: 'Currently a Full Stack Engineer at ' + owner.company + ' (since Jun 2026) \u2014 building full stack products and AI-powered systems end to end, from design to deployment.',
      education: owner.education + ', in progress since 2025.',
      services: ['Full stack web development', 'AI integration (LLMs, agents, RAG)', 'Shopify / e-commerce builds', 'WordPress sites'],
      certCount: certificates.length, honorTitle: honors.length ? honors[0].title : null,
      contact: { email: getDecodedEmail(), phone: owner.phone, linkedin: owner.linkedin, github: owner.github },
      resumeUrl: owner.resumeFile
    };
    var quickOptions = [{ label: '\ud83d\udcbb Skills', text: 'What are your skills?' }, { label: '\ud83d\ude80 Projects', text: 'Tell me about your projects' }, { label: '\ud83c\udf93 Certifications', text: 'What certifications do you have?' }, { label: '\ud83d\udcde Contact', text: 'How can I contact you?' }];
    var knowledgeBase = [
      { id: 'greeting', keywords: ['hi','hii','hiii','hello','hey','salam','assalam','asalam','aoa','hy','helo','yo'], response: function () { var who = visitorName ? escapeHtml(visitorName) + ', ' : ''; return 'Hey ' + who + 'there! \ud83d\udc4b I\'m <strong>Ahmad Bot</strong>. Ask me about ' + botData.name + '\'s skills, projects, experience, or how to get in touch.'; } },
      { id: 'my_name', keywords: ['what is my name','what\'s my name','do you know my name','do you remember me'], response: function () { return visitorName ? 'You told me your name is <strong>' + escapeHtml(visitorName) + '</strong> \u2014 I remember for this session! \ud83d\ude0a' : 'You haven\'t told me your name yet! Try saying "my name is..." and I\'ll remember it for our chat.'; } },
      { id: 'about', keywords: ['who are you','about ahmad','about rana','tell me about','about you','introduce','introduction','kon ho','kya karte','who is ahmad','who is rana','what do you do','yourself'], response: function () { return botData.bio + '<br><br>' + botData.name + ' currently works as a <strong>' + botData.title + '</strong> at ' + owner.company + '.'; } },
      { id: 'skills', keywords: ['skill','skills','technology','technologies','tech stack','programming','language','stack','expertise','mahir','kya ata hai'], response: function () { return botData.name + ' works with:<br>' + botData.skills.map(function (s) { return '\u2022 ' + s; }).join('<br>'); } },
      { id: 'projects', keywords: ['project','projects','work','built','made','kaam','kia hai','portfolio work'], needsClarification: true, clarifyPrompt: function () { return 'Happy to walk you through the projects. Could you tell me a bit more about what you\'re looking for \u2014 a specific project, or a general overview?'; }, clarifyChips: [{ label: 'General overview', text: 'Give me a general overview of the projects' }, { label: 'AI / LLM projects', text: 'Show me AI projects' }, { label: 'Web app projects', text: 'Show me web app projects' }], response: function (context) { var base = 'The Projects section above pulls live from <a href="' + botData.contact.github + '" target="_blank" rel="noopener">GitHub</a>, plus a card linking to what\'s featured on <a href="' + owner.linkedin + '" target="_blank" rel="noopener">LinkedIn</a> \u2014 so it\'s always current.'; if (context && /ai|llm/i.test(context)) return 'For AI-focused work: ' + base + ' Look for repos tagged with Python or AI topics.'; if (context && /web|app/i.test(context)) return 'For web app work: ' + base + ' Repos using React/Next.js/Node.js are the best starting point.'; return base; } },
      { id: 'experience', keywords: ['experience','job','work history','career','tajurba','years of'], response: function () { return botData.experience; } },
      { id: 'education', keywords: ['education','degree','university','qualification','study','parhai','school','ucp'], response: function () { return botData.education; } },
      { id: 'services', keywords: ['service','services','freelance','hire','offer','collaborate','work together','khidmat','rakhna','job offer','available for','open to work'], needsClarification: true, clarifyPrompt: function () { return 'Great to hear! Before I answer \u2014 what best describes what you\'re looking for: a full-time hire, a freelance/contract project, or something else?'; }, clarifyChips: [{ label: 'Full-time hiring', text: 'I want to discuss a full-time role' }, { label: 'Freelance project', text: 'I have a freelance project in mind' }, { label: 'Just exploring', text: 'Just exploring for now' }], response: function (context) { var list = botData.services.map(function (s) { return '\u2022 ' + s; }).join('<br>'); var contact = '<br><br>Best way to start: <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a> or <a href="' + botData.contact.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>.'; if (context && /full[\s-]?time|hiring|role|position/i.test(context)) return botData.name + ' is open to full-time opportunities. Focus areas:<br>' + list + contact; if (context && /freelance|contract|project/i.test(context)) return 'For freelance/contract work, ' + botData.name + ' offers:<br>' + list + contact; return botData.name + ' offers:<br>' + list + contact; } },
      { id: 'contact', keywords: ['contact','email','phone','number','reach','rabta','whatsapp','get in touch','connect'], response: function () { return 'You can reach ' + botData.name + ' here:<br>\ud83d\udce7 <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a><br>\ud83d\udcf1 ' + botData.contact.phone + '<br>\ud83d\udcbc <a href="' + botData.contact.linkedin + '" target="_blank" rel="noopener">LinkedIn</a><br>\ud83d\udcbb <a href="' + botData.contact.github + '" target="_blank" rel="noopener">GitHub</a>'; } },
      { id: 'certificates', keywords: ['certificate','certificates','certification','certifications','credential','credentials','courses'], response: function () { return botData.name + ' holds ' + botData.certCount + ' certifications across full stack development, AI/prompt engineering, and e-commerce \u2014 see the Certificate Museum section above.'; } },
      { id: 'honors', keywords: ['honor','honors','award','awards','achievement','achievements','recognition','won'], response: function () { return botData.honorTitle ? botData.name + ' recently received the <strong>' + botData.honorTitle + '</strong> \u2014 see the Honors &amp; Awards section above.' : 'Check the Honors &amp; Awards section above for the latest recognitions.'; } },
      { id: 'resume', keywords: ['resume','cv','download resume','download cv'], response: function () { return 'Download ' + botData.name + '\'s resume: <a href="' + botData.resumeUrl + '" download>here (PDF)</a>.'; } },
      { id: 'location', keywords: ['location','where','based','city','country','kahan','faisalabad'], response: function () { return botData.name + ' is based in <strong>' + owner.location + '</strong> \ud83c\udf0d'; } },
      { id: 'thanks', keywords: ['thanks','thank you','shukriya','mehrbani','thnx','tysm','thankyou'], response: ['You\'re welcome! \ud83d\ude0a Anything else?', 'Anytime! Happy to help.'] },
      { id: 'bye', keywords: ['bye','goodbye','khuda hafiz','allah hafiz','see you','cya','gtg'], response: ['Take care! \ud83d\udc4b', 'Bye for now!'] },
      { id: 'help', keywords: ['help','what can you do','madad','options','menu'], response: function () { return 'I can tell you about ' + botData.name + '\'s skills, projects, experience, certifications, or how to contact him. Tap an option or ask anything:'; }, showChips: true },
      { id: 'howareyou', keywords: ['how are you','kaisay ho','kaise ho','kya hal','how r u'], response: ['Doing great! What would you like to know?', 'All good! Ready to answer.'] },
      { id: 'identity', keywords: ['your name','what are you','are you real','are you ai','are you a bot','are you human','robot'], response: function () { return 'I\'m <strong>Ahmad Bot</strong> \u2014 a lightweight assistant built into this portfolio. I know ' + botData.name + '\'s work inside out!'; } },
      { id: 'joke', keywords: ['joke','funny','make me laugh','latifa'], response: ['Why do programmers prefer dark mode? Because light attracts bugs. \ud83d\udc1b', 'There are only 10 kinds of people: those who understand binary, and those who don\'t.'] },
      { id: 'time', keywords: ['time','date','today\'s date','kya time','what time'], response: function () { return 'It\'s currently ' + new Date().toLocaleString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' }) + ' on your device. \ud83d\udd52'; } },
      { id: 'company_info', keywords: ['madigital','current company','where does he work','employer'], response: function () { return botData.name + ' works at <strong>' + owner.company + '</strong> as a Full Stack Engineer, since Jun 2026.'; } },
      { id: 'university_info', keywords: ['ucp','university of central punjab','which university'], response: function () { return botData.name + ' is pursuing a BSCS at <strong>University of Central Punjab</strong>, since 2025.'; } },
      { id: 'rate_salary', keywords: ['salary','rate','how much do you charge','pricing','cost','budget'], response: function () { return 'Rates depend on scope. Email <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a> with details.'; } },
      { id: 'availability', keywords: ['availability','when can you start','available from','notice period'], response: function () { return 'Reach out at <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a> for current availability.'; } },
      { id: 'remote_work', keywords: ['remote','work remotely','onsite','relocate'], response: function () { return 'Confirm remote/onsite preferences directly at <a href="mailto:' + botData.contact.email + '">' + botData.contact.email + '</a>.'; } },
      { id: 'source_code', keywords: ['is this site open source','source code of this site','how was this portfolio built','built with what'], response: function () { return 'This portfolio is hand-built with vanilla HTML, CSS, and JavaScript \u2014 no framework. Projects pull live from GitHub.'; } },
      { id: 'bot_meta', keywords: ['how were you built','how were you made','what powers you','are you gpt','are you chatgpt','which model'], response: function () { return 'I\'m a lightweight rule-based assistant built directly into this site \u2014 no external AI API, instant and private.'; } },
      { id: 'compliment', keywords: ['nice portfolio','great portfolio','love this site','this is cool','awesome site','you are helpful','good bot'], response: ['That means a lot, thank you! \ud83d\ude0a', 'Glad you like it!'] },
      { id: 'what_is_html', keywords: ['what is html'], response: function () { return 'HTML (HyperText Markup Language) is the standard language used to structure content on the web.'; } },
      { id: 'what_is_css', keywords: ['what is css'], response: function () { return 'CSS controls the visual presentation of a webpage \u2014 colors, layout, fonts, and animations.'; } },
      { id: 'what_is_js', keywords: ['what is javascript','what is js'], response: function () { return 'JavaScript makes web pages interactive. It runs in the browser and powers backends via Node.js.'; } },
      { id: 'what_is_api', keywords: ['what is an api','what is api'], response: function () { return 'An API lets different software systems communicate with each other \u2014 e.g. a website fetching data from a server.'; } },
      { id: 'what_is_ai', keywords: ['what is ai','what is artificial intelligence'], response: function () { return 'AI builds systems that perform tasks normally requiring human intelligence \u2014 language, vision, decision-making.'; } },
      { id: 'what_is_ml', keywords: ['what is machine learning','what is ml'], response: function () { return 'Machine Learning lets systems learn patterns from data instead of following explicit rules.'; } },
      { id: 'what_is_llm', keywords: ['what is llm','what is a large language model'], response: function () { return 'An LLM is an AI model trained on massive text data to understand and generate human-like language.'; } },
      { id: 'compare_react_vue', keywords: ['react vs vue','react or vue','vue vs react'], response: function () { return '<strong>React</strong> has a larger ecosystem and job market. <strong>Vue</strong> has a gentler learning curve. Both are excellent \u2014 the choice usually comes down to team preference.'; } },
      { id: 'compare_python_js', keywords: ['python vs javascript','javascript vs python','python or javascript'], response: function () { return '<strong>JavaScript</strong> is essential for the web. <strong>Python</strong> dominates AI/ML. Many engineers (like Rana) use both for their respective strengths.'; } }
    ];
    var fallbackResponses = [function () { return 'I don\'t have an answer for that one yet \ud83e\udd14 I\'m best with ' + botData.name + '\'s portfolio and general tech basics. Try one of these:'; }, function () { return 'That\'s outside what I currently know. For anything else, ' + botData.contact.email + ' reaches him directly.'; }];
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
    function findBestIntent(userText) {
      var text = userText.toLowerCase().trim(), best = null, bestScore = 0;
      knowledgeBase.forEach(function (intent) { var score = 0; intent.keywords.forEach(function (kw) { var re = new RegExp('\\b' + escapeRegex(kw.toLowerCase()) + '\\b', 'i'); if (re.test(text)) score += kw.trim().split(/\s+/).length; }); if (score > bestScore) { bestScore = score; best = intent; } });
      if (best) return best;
      knowledgeBase.forEach(function (intent) { var score = 0; intent.keywords.forEach(function (kw) { if (kw.length > 3 && text.indexOf(kw.toLowerCase()) !== -1) score += kw.trim().split(/\s+/).length; }); if (score > bestScore) { bestScore = score; best = intent; } });
      return best;
    }
    function resolveResponse(source, context) { if (typeof source === 'function') return source(context); if (Array.isArray(source)) { var chosen = pick(source); return typeof chosen === 'function' ? chosen(context) : chosen; } return source; }
    var MEM_KEY = 'ab_memory_v1', visitorName = null;
    function loadMemory() { try { var raw = sessionStorage.getItem(MEM_KEY); return raw ? JSON.parse(raw) : { history: [], name: null }; } catch (e) { return { history: [], name: null }; } }
    function saveMemory(mem) { try { sessionStorage.setItem(MEM_KEY, JSON.stringify(mem)); } catch (e) {} }
    var memory = loadMemory(); visitorName = memory.name;
    function addMessage(html, sender, skipSave) { var wrap = document.createElement('div'); wrap.className = 'ab-msg-wrap ' + sender; var bubble = document.createElement('div'); bubble.className = 'ab-bubble ' + sender; bubble.innerHTML = html; var time = document.createElement('div'); time.className = 'ab-time'; var timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); time.textContent = timeLabel; wrap.appendChild(bubble); wrap.appendChild(time); messagesEl.appendChild(wrap); messagesEl.scrollTop = messagesEl.scrollHeight; if (!skipSave) { memory.history.push({ html: html, sender: sender, time: timeLabel }); if (memory.history.length > 60) memory.history = memory.history.slice(-60); saveMemory(memory); } }
    function restoreHistory() { if (!memory.history || !memory.history.length) return false; memory.history.forEach(function (m) { addMessage(m.html, m.sender, true); }); return true; }
    function addChips(options) { var row = document.createElement('div'); row.className = 'ab-chip-row'; options.forEach(function (opt) { var chip = document.createElement('button'); chip.type = 'button'; chip.className = 'ab-chip font-mono'; chip.textContent = opt.label; chip.addEventListener('click', function () { handleUserText(opt.text); }); row.appendChild(chip); }); messagesEl.appendChild(row); messagesEl.scrollTop = messagesEl.scrollHeight; }
    var typingEl = null;
    function showTyping() { typingEl = document.createElement('div'); typingEl.className = 'ab-msg-wrap bot'; typingEl.innerHTML = '<div class="ab-bubble bot ab-typing"><span></span><span></span><span></span></div>'; messagesEl.appendChild(typingEl); messagesEl.scrollTop = messagesEl.scrollHeight; }
    function hideTyping() { if (typingEl) { typingEl.remove(); typingEl = null; } }
    var pending = null, lastIntentId = null;
    function deliverIntentResponse(intent, context) { var responseHtml = resolveResponse(intent.response, context), delay = Math.min(900, 450 + responseHtml.replace(/<[^>]+>/g, '').length * 4); showTyping(); setTimeout(function () { hideTyping(); addMessage(responseHtml, 'bot'); if (intent.showChips) addChips(quickOptions); lastIntentId = intent.id; }, delay); }
    function detectVisitorName(text) { var m = text.match(/\b(?:my name is|call me|this is)\s+([a-zA-Z][a-zA-Z]{1,18}(?:\s[a-zA-Z][a-zA-Z]{1,18})?)\b/i); if (!m) return null; var name = m[1].trim(); if (/^(a|an|the|not|just|here|good|fine|ok|okay|great|nice|cool)\b/i.test(name)) return null; return name.split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }).join(' '); }
    function handleUserText(rawText) {
      var text = (rawText || '').trim(); if (!text) return;
      sendBtn.classList.remove('ab-send-pulse'); void sendBtn.offsetWidth; sendBtn.classList.add('ab-send-pulse');
      addMessage(escapeHtml(text), 'user'); inputEl.value = ''; sendBtn.disabled = true;
      var newName = detectVisitorName(text);
      if (newName && newName !== visitorName) { visitorName = newName; memory.name = visitorName; saveMemory(memory); showTyping(); setTimeout(function () { hideTyping(); addMessage('Nice to meet you, <strong>' + escapeHtml(visitorName) + '</strong>! What would you like to know about ' + botData.name + '?', 'bot'); }, 500); return; }
      if (pending) { var pendingIntent = pending.intent; pending = null; deliverIntentResponse(pendingIntent, text); return; }
      if (/\b(explain more|more detail|elaborate|go deeper|eli5|simpler|dig deeper)\b/i.test(text)) { showTyping(); setTimeout(function () { hideTyping(); addMessage(lastIntentId ? 'Try asking a more specific follow-up and I\'ll do my best!' : 'Ask me something first and I can go deeper! \ud83d\ude42', 'bot'); }, 500); return; }
      var intent = findBestIntent(text); showTyping();
      setTimeout(function () { hideTyping(); if (intent && intent.needsClarification) { addMessage(resolveResponse(intent.clarifyPrompt), 'bot'); if (intent.clarifyChips) addChips(intent.clarifyChips); pending = { intent: intent }; return; } if (intent) { addMessage(resolveResponse(intent.response), 'bot'); if (intent.showChips) addChips(quickOptions); lastIntentId = intent.id; } else { addMessage(resolveResponse(pick(fallbackResponses)), 'bot'); addChips(quickOptions); } }, 500 + Math.random() * 350);
    }
    var hasOpened = false, isOpen = false;
    function openWindow() { isOpen = true; win.classList.add('open'); win.setAttribute('aria-hidden', 'false'); fab.classList.add('open', 'opened-once'); fab.setAttribute('aria-expanded', 'true'); greet.classList.remove('show'); if (!hasOpened) { hasOpened = true; var restored = restoreHistory(); if (!restored) { setTimeout(function () { var intro = visitorName ? 'Welcome back, <strong>' + escapeHtml(visitorName) + '</strong> \ud83d\udc4b What would you like to know about ' + botData.name + '?' : 'Hi, I\'m <strong>Ahmad Bot</strong> \ud83d\udc4b I can help with questions about ' + botData.name + '\'s skills, projects, certifications, or how to get in touch.'; addMessage(intro, 'bot'); addChips(quickOptions); }, 350); } } setTimeout(function () { inputEl.focus(); }, 250); }
    function closeWindow() { isOpen = false; win.classList.remove('open'); win.setAttribute('aria-hidden', 'true'); fab.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }
    fab.addEventListener('click', function () { isOpen ? closeWindow() : openWindow(); });
    closeBtn.addEventListener('click', closeWindow);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeWindow(); });
    sendBtn.addEventListener('click', function () { handleUserText(inputEl.value); });
    inputEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) handleUserText(inputEl.value); });
    inputEl.addEventListener('input', function () { sendBtn.disabled = inputEl.value.trim().length === 0; });
    greet.addEventListener('click', openWindow);
    greet.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWindow(); } });
    greetClose.addEventListener('click', function (e) { e.stopPropagation(); greet.classList.remove('show'); });
    var greetTextEl = document.getElementById('ab-greet-text'), greetMessage = '\ud83d\udc4b Hi! Got a question about ' + botData.name + '? Ask me anything.';
    function typeGreet() { var i = 0; greetTextEl.textContent = ''; greet.classList.remove('ab-greet-done'); (function typeChar() { if (i <= greetMessage.length) { greetTextEl.textContent = greetMessage.slice(0, i); i++; setTimeout(typeChar, 22); } else { greet.classList.add('ab-greet-done'); } })(); }
    setTimeout(function () { if (!hasOpened) { greet.classList.add('show'); typeGreet(); } }, 5200);
    setTimeout(function () { greet.classList.remove('show'); }, 13000);
  }

  /* ========================================================================
     INIT
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    safeRun(runBoot);
    safeRun(function () { document.getElementById('footer-year').textContent = String(new Date().getFullYear()); });
    safeRun(renderSkills); safeRun(renderCertificates); safeRun(renderHonors); safeRun(initMoments);
    safeRun(initSpace); safeRun(initCursor); safeRun(initMagnetic); safeRun(initScrollProgress);
    safeRun(initTypewriter); safeRun(initNav); safeRun(initBot); safeRun(initReveal);
    document.addEventListener('boot:complete', function () { safeRun(loadProjects); }, { once: true });
  });

  function safeRun(fn) { try { fn(); } catch (err) { if (window.console && console.error) console.error('[RA.OS] module failed to init:', fn.name || fn, err); } }
})();
