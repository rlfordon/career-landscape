import { PRACTICE_TREE, FIRM_TREE, PROFILES, collectProfileIds, VERDICT_STYLES } from '../data.js';

export function renderBrowse(container, params) {
  const { mode, segments } = params;
  const tree = mode === 'practice' ? PRACTICE_TREE : FIRM_TREE;
  const modeLabel = mode === 'practice' ? 'Practice Area' : 'Firm Type';
  const basePath = `#/${mode}`;

  // Parse path segments
  const pathSegments = segments?.[0] ? segments[0].split('/') : [];

  // Navigate the tree
  let current = tree;
  const breadcrumbs = [{ label: 'Explorer', href: '#/' }, { label: modeLabel, href: basePath }];

  for (let i = 0; i < pathSegments.length; i++) {
    const decoded = decodeURIComponent(pathSegments[i]);
    const node = current.find(n => typeof n === 'object' && n.label === decoded);
    if (!node) {
      container.innerHTML = '<p>Category not found.</p>';
      return;
    }
    const pathSoFar = pathSegments.slice(0, i + 1).map(encodeURIComponent).join('/');
    breadcrumbs.push({ label: node.label, href: `${basePath}/${pathSoFar}` });
    current = node.children;
  }

  // Determine if children are all leaf profiles (strings) or subcategories (objects)
  const hasSubcategories = current.some(c => typeof c === 'object');
  const isLeafLevel = current.every(c => typeof c === 'string');
  // Mixed: some subcategories, some leaf profiles — shouldn't happen in our tree but handle it

  // If all children are profile IDs, redirect to compare view
  if (isLeafLevel) {
    const compareSlug = pathSegments.map(encodeURIComponent).join('/');
    window.location.hash = `#/compare/${mode}/${compareSlug}`;
    return;
  }

  // Render breadcrumbs + category list
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
  title.className = 'browse-title';
  title.textContent = breadcrumbs[breadcrumbs.length - 1].label;
  container.appendChild(title);

  // Category list
  const list = document.createElement('div');
  list.className = 'browse-list';

  current.forEach(child => {
    if (typeof child === 'object') {
      // Subcategory
      const profileCount = collectProfileIds(child.children).length;
      const childPath = [...pathSegments, encodeURIComponent(child.label)].join('/');

      // Check if clicking this would go to a leaf level (all children are strings)
      const allLeaf = child.children.every(c => typeof c === 'string');
      const href = allLeaf
        ? `#/compare/${mode}/${childPath}`
        : `${basePath}/${childPath}`;

      const row = document.createElement('a');
      row.href = href;
      row.className = 'browse-row';
      row.innerHTML = `
        <div class="browse-row-info">
          <span class="browse-row-name">${child.label}</span>
          <span class="browse-row-count">${profileCount} profile${profileCount !== 1 ? 's' : ''}</span>
        </div>
        <span class="browse-row-arrow">&rarr;</span>
      `;
      list.appendChild(row);
    } else {
      // Leaf profile (shouldn't happen in mixed mode, but just in case)
      const profile = PROFILES[child];
      if (!profile) return;
      const verdict = VERDICT_STYLES[profile.junior.verdictType];
      const row = document.createElement('a');
      row.href = `#/compare/${mode}/${pathSegments.map(encodeURIComponent).join('/')}`;
      row.className = 'browse-row';
      row.innerHTML = `
        <div class="browse-row-info">
          <span class="browse-row-name">${profile.name}</span>
          <span class="verdict-badge" style="background:${verdict.bg};color:${verdict.color}">${profile.junior.verdict}</span>
        </div>
        <span class="browse-row-arrow">&rarr;</span>
      `;
      list.appendChild(row);
    }
  });

  container.appendChild(list);
}
