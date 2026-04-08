import { PROFILES, VARIABLES, FRAMEWORK_SOURCE, PROFILE_COLORS, VERDICT_STYLES, PRACTICE_TREE, FIRM_TREE, collectProfileIds } from '../data.js';
import { createRadarChart, renderLegend } from '../radar.js';
import { isStarred, toggleStar, getStarredCount, getCustomProfile, getCustomProfiles } from '../state.js';

export function renderCompare(container, params) {
  // Parse route: compare/{mode}/{path...}
  const fullPath = params.segments?.[0] || '';
  const parts = fullPath.split('/');
  const mode = parts[0]; // 'practice' or 'firm'
  const pathSegments = parts.slice(1).map(decodeURIComponent);

  // Resolve which profiles to show
  const tree = mode === 'practice' ? PRACTICE_TREE : FIRM_TREE;
  const modeLabel = mode === 'practice' ? 'Practice Area' : 'Firm Type';
  let profileIds = [];
  let sectionLabel = modeLabel;

  // Walk the tree to find the leaf profiles
  let current = tree;
  const breadcrumbs = [{ label: 'Explorer', href: '#/' }, { label: modeLabel, href: `#/${mode}` }];

  for (let i = 0; i < pathSegments.length; i++) {
    const node = current.find(n => typeof n === 'object' && n.label === pathSegments[i]);
    if (!node) break;
    const pathSoFar = pathSegments.slice(0, i + 1).map(encodeURIComponent).join('/');
    breadcrumbs.push({ label: node.label, href: `#/${mode}/${pathSoFar}` });
    sectionLabel = node.label;
    current = node.children;
  }

  // Collect leaf IDs
  profileIds = current.filter(c => typeof c === 'string');
  if (profileIds.length === 0) {
    profileIds = collectProfileIds(current);
  }

  // Add any custom profiles to the comparison
  const customProfiles = getCustomProfiles();
  Object.keys(customProfiles).forEach(id => {
    if (!profileIds.includes(id)) {
      profileIds.push(id);
    }
  });

  // State for this view
  const activeProfiles = new Set(profileIds.slice(0, 3));

  // Auto-activate custom profiles
  Object.keys(customProfiles).forEach(id => {
    activeProfiles.add(id);
  });
  const seniorOverlays = new Set();
  let highlightedId = null;
  let colorAssignment = {};

  // ── Build the view ──
  container.innerHTML = '';

  // Breadcrumbs
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';
  nav.innerHTML = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span class="breadcrumb-current">${b.label}</span>`;
    return `<a href="${b.href}" class="breadcrumb-link">${b.label}</a>`;
  }).join('<span class="breadcrumb-sep"> › </span>');
  container.appendChild(nav);

  // Title
  const title = document.createElement('h1');
  title.className = 'compare-title';
  title.textContent = sectionLabel;
  container.appendChild(title);

  // Chip bar (profile selectors)
  const chipBar = document.createElement('div');
  chipBar.className = 'chip-bar';
  container.appendChild(chipBar);

  // Tip for 4+ profiles
  const tip = document.createElement('div');
  tip.className = 'compare-tip';
  tip.textContent = 'Tip: Compare 2-3 profiles at a time for clarity.';
  tip.style.display = 'none';
  container.appendChild(tip);

  // ── Chart section (hero) ──
  const chartSection = document.createElement('div');
  chartSection.className = 'chart-section';
  container.appendChild(chartSection);

  const chart = createRadarChart({ size: 480 });
  chartSection.appendChild(chart.svg);

  // Legend sits right under the chart
  const legendContainer = document.createElement('div');
  chartSection.appendChild(legendContainer);

  // Chart reading hint + about link
  const chartFooter = document.createElement('div');
  chartFooter.className = 'chart-footer';
  chartFooter.innerHTML = `
    <span class="chart-hint">Each axis runs 1–4 from center to edge. Larger shape = stronger positioning against AI displacement.</span>
    <button class="about-link">About these factors</button>
  `;
  chartSection.appendChild(chartFooter);

  // About panel (hidden by default, expands in place)
  const aboutPanel = document.createElement('div');
  aboutPanel.className = 'about-panel';
  aboutPanel.style.display = 'none';
  aboutPanel.innerHTML = `
    <div class="about-panel-inner">
      <div class="about-panel-header">
        <h3 class="about-panel-title">The O-Ring Framework</h3>
        <button class="about-panel-close">&times;</button>
      </div>
      <p class="about-panel-intro">When tasks are quality complements — each must be done well for the whole to succeed — automating some frees the worker to concentrate on the rest. When all tasks are automated, the worker is displaced entirely. Five factors determine which outcome you get:</p>
      <div class="about-panel-grid">
        ${VARIABLES.map(v => `
          <div class="about-panel-factor">
            <span class="about-panel-badge">${v.shortLabel}</span>
            <div>
              <strong>${v.label}</strong>
              <p>${v.explanation}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <p class="about-panel-source">Source: ${FRAMEWORK_SOURCE.authors}, "${FRAMEWORK_SOURCE.title}," <em>${FRAMEWORK_SOURCE.publication}</em>, ${FRAMEWORK_SOURCE.year}.</p>
    </div>
  `;
  chartSection.appendChild(aboutPanel);

  // Wire about toggle
  chartFooter.querySelector('.about-link').onclick = () => {
    aboutPanel.style.display = 'block';
  };
  aboutPanel.querySelector('.about-panel-close').onclick = () => {
    aboutPanel.style.display = 'none';
  };

  // ── Detail cards section ──
  const cardsSection = document.createElement('div');
  cardsSection.className = 'cards-section';
  container.appendChild(cardsSection);

  // ── Render functions ──

  function assignColors() {
    colorAssignment = {};
    let slot = 0;
    profileIds.forEach(id => {
      if (activeProfiles.has(id)) {
        if (id.startsWith('custom-')) {
          colorAssignment[id] = '#059669';
        } else {
          colorAssignment[id] = PROFILE_COLORS[slot % PROFILE_COLORS.length];
          slot++;
        }
      }
    });
  }

  function renderChips() {
    chipBar.innerHTML = '';
    profileIds.forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const isActive = activeProfiles.has(id);
      const chip = document.createElement('button');
      chip.className = `chip ${isActive ? 'chip-active' : ''}`;
      if (isActive && colorAssignment[id]) {
        chip.style.borderColor = colorAssignment[id];
        chip.style.background = colorAssignment[id] + '15';
        chip.style.color = colorAssignment[id];
      }
      chip.textContent = profile.name;
      chip.onclick = () => {
        if (isActive) activeProfiles.delete(id);
        else activeProfiles.add(id);
        refresh();
      };
      chipBar.appendChild(chip);
    });

    // "+ Custom" chip
    const customChip = document.createElement('button');
    customChip.className = 'chip chip-custom';
    customChip.textContent = '+ Custom';
    customChip.onclick = () => {
      window.location.hash = `#/builder/${encodeURIComponent(fullPath)}`;
    };
    chipBar.appendChild(customChip);
  }

  function renderChart() {
    const chartData = [];
    [...activeProfiles].forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const ratings = VARIABLES.map(v => profile.junior[v.key]);
      const entry = { id, ratings, color: colorAssignment[id] || '#888' };
      if (seniorOverlays.has(id) && profile.senior) {
        entry.seniorRatings = VARIABLES.map(v => profile.senior[v.key]);
      }
      chartData.push(entry);
    });
    chart.update(chartData);
    if (highlightedId) chart.highlight(highlightedId);

    // Legend
    legendContainer.innerHTML = '';
    const items = chartData.map(d => {
      const p = PROFILES[d.id] || getCustomProfile(d.id);
      return { id: d.id, name: p?.name || d.id, color: d.color };
    });
    renderLegend(legendContainer, items, (id) => {
      if (highlightedId === id) {
        highlightedId = null;
        chart.clearHighlight();
      } else {
        highlightedId = id;
        chart.highlight(id);
      }
      renderCards();
    });

    tip.style.display = activeProfiles.size >= 4 ? 'block' : 'none';
  }

  function renderCards() {
    cardsSection.innerHTML = '';
    [...activeProfiles].forEach(id => {
      const profile = PROFILES[id] || getCustomProfile(id);
      if (!profile) return;
      const color = colorAssignment[id] || '#888';
      const isHighlighted = highlightedId === id;
      const data = profile.junior;
      const verdict = VERDICT_STYLES[data.verdictType];

      const card = document.createElement('div');
      card.className = `detail-card ${isHighlighted ? 'detail-card-highlighted' : ''}`;
      card.style.borderTopColor = color;

      // Header (always visible)
      const header = document.createElement('div');
      header.className = 'detail-card-header';
      header.innerHTML = `
        <div class="detail-card-header-info">
          <span class="detail-card-name">${profile.name}</span>
          <span class="detail-card-seniority">Junior</span>
          <span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${data.verdict}</span>
        </div>
        <span class="detail-card-toggle">&#9660;</span>
      `;

      // Body (collapsed by default)
      const body = document.createElement('div');
      body.className = 'detail-card-body';
      body.style.display = 'none';

      // Variable ratings
      const varsHtml = VARIABLES.map(v => {
        const val = data[v.key];
        const pct = (val / 4) * 100;
        const desc = data.descriptions?.[v.key] || '';
        return `
          <div class="detail-var">
            <div class="detail-var-header">
              <span class="detail-var-label">${v.label}</span>
              <span class="detail-var-rating">${ratingWord(val)} (${val}/4)</span>
            </div>
            <div class="detail-var-bar-bg"><div class="detail-var-bar" style="width:${pct}%;background:${color}"></div></div>
            <p class="detail-var-desc">${desc}</p>
          </div>
        `;
      }).join('');

      // Star button
      const starred = isStarred(id);
      const starBtn = `<button class="star-btn ${starred ? 'star-btn-active' : ''}" data-id="${id}">
        ${starred ? '★ Saved' : '☆ Save to My Comparison'}
      </button>`;

      // Seniority toggle
      const hasSenior = !!profile.senior;
      const seniorToggle = hasSenior ? `
        <label class="seniority-toggle">
          <input type="checkbox" ${seniorOverlays.has(id) ? 'checked' : ''} data-id="${id}" class="seniority-checkbox">
          <span class="seniority-toggle-label">Overlay senior trajectory</span>
        </label>
      ` : '';

      // References
      const refs = profile.references;
      const refsHtml = refs?.length ? `
        <div class="detail-references">
          <div class="detail-references-heading">Sources</div>
          ${refs.map(r => `<a class="detail-reference-link" href="${r.url}" target="_blank" rel="noopener">${r.title}<span class="detail-reference-source">${r.source}</span></a>`).join('')}
        </div>
      ` : '';

      body.innerHTML = `
        <div class="detail-card-actions">
          ${starBtn}
          ${seniorToggle}
        </div>
        ${varsHtml}
        ${refsHtml}
      `;

      card.appendChild(header);
      card.appendChild(body);

      // Click header to expand/collapse + highlight
      header.onclick = () => {
        const isExpanded = body.style.display !== 'none';
        if (isExpanded) {
          body.style.display = 'none';
          header.querySelector('.detail-card-toggle').innerHTML = '&#9660;';
          if (highlightedId === id) {
            highlightedId = null;
            chart.clearHighlight();
          }
        } else {
          body.style.display = 'block';
          header.querySelector('.detail-card-toggle').innerHTML = '&#9650;';
          highlightedId = id;
          chart.highlight(id);
        }
        updateCardHighlights();
      };

      cardsSection.appendChild(card);

      // Wire up star button
      body.querySelector('.star-btn')?.addEventListener('click', (e) => {
        toggleStar(id);
        const btn = e.currentTarget;
        const nowStarred = isStarred(id);
        btn.className = `star-btn ${nowStarred ? 'star-btn-active' : ''}`;
        btn.textContent = nowStarred ? '★ Saved' : '☆ Save to My Comparison';
      });

      // Wire up seniority toggle
      body.querySelector('.seniority-checkbox')?.addEventListener('change', (e) => {
        if (e.target.checked) seniorOverlays.add(id);
        else seniorOverlays.delete(id);
        renderChart();
      });
    });
  }

  function updateCardHighlights() {
    cardsSection.querySelectorAll('.detail-card').forEach(card => {
      const id = card.querySelector('.star-btn')?.dataset.id;
      if (highlightedId && id !== highlightedId) {
        card.classList.remove('detail-card-highlighted');
      } else if (id === highlightedId) {
        card.classList.add('detail-card-highlighted');
      }
    });
  }

  function refresh() {
    assignColors();
    renderChips();
    renderChart();
    renderCards();
  }

  // Initial render
  refresh();
}

function ratingWord(val) {
  return ['Low', 'Moderate', 'High', 'Very High'][val - 1] || '';
}
