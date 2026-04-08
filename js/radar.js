import { VARIABLES, PROFILE_COLORS } from './data.js';

const TAU = Math.PI * 2;
const AXES = 5;
const ANGLE_OFFSET = -Math.PI / 2; // Start from top (12 o'clock)
const MAX_RATING = 4;
const GRID_LEVELS = 4;

/**
 * Create a radar chart SVG element.
 * @param {Object} options
 * @param {number} options.size - SVG width/height in px
 * @returns {{ svg: SVGElement, update: Function, highlight: Function, clearHighlight: Function }}
 */
export function createRadarChart({ size = 480 } = {}) {
  const margin = 60;
  const center = size / 2;
  const maxRadius = (size / 2) - margin;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  svg.style.maxWidth = `${size}px`;

  // Layer groups (back to front)
  const gridGroup = createGroup(svg, 'grid');
  const axisGroup = createGroup(svg, 'axes');
  const shapesGroup = createGroup(svg, 'shapes');
  const labelsGroup = createGroup(svg, 'labels');

  // Draw grid
  for (let level = 1; level <= GRID_LEVELS; level++) {
    const r = (level / GRID_LEVELS) * maxRadius;
    const points = axisPoints(AXES, r, center);
    const polygon = createPolygon(points, {
      fill: 'none',
      stroke: level === GRID_LEVELS ? '#ddd' : '#f0f0f0',
      'stroke-width': '0.5',
    });
    gridGroup.appendChild(polygon);
  }

  // Draw axis lines
  for (let i = 0; i < AXES; i++) {
    const angle = (TAU / AXES) * i + ANGLE_OFFSET;
    const ax = center + maxRadius * Math.cos(angle);
    const ay = center + maxRadius * Math.sin(angle);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center);
    line.setAttribute('y1', center);
    line.setAttribute('x2', ax);
    line.setAttribute('y2', ay);
    line.setAttribute('stroke', '#eaeaea');
    line.setAttribute('stroke-width', '0.5');
    axisGroup.appendChild(line);
  }

  // Draw axis labels
  for (let i = 0; i < AXES; i++) {
    const angle = (TAU / AXES) * i + ANGLE_OFFSET;
    const labelR = maxRadius + 24;
    const lx = center + labelR * Math.cos(angle);
    const ly = center + labelR * Math.sin(angle);

    const variable = VARIABLES[i];

    // Label group (for shared tooltip)
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.style.cursor = variable.explanation ? 'help' : 'default';

    // Main label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', lx);
    text.setAttribute('y', ly);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-weight', '600');
    text.setAttribute('fill', '#444');
    text.textContent = variable.label;
    labelGroup.appendChild(text);

    // Sublabel
    const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sub.setAttribute('x', lx);
    sub.setAttribute('y', ly + 14);
    sub.setAttribute('text-anchor', 'middle');
    sub.setAttribute('dominant-baseline', 'middle');
    sub.setAttribute('font-size', '9.5');
    sub.setAttribute('fill', '#aaa');
    sub.textContent = variable.sublabel;
    labelGroup.appendChild(sub);

    // Tooltip
    if (variable.explanation) {
      const tip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      tip.textContent = variable.explanation;
      labelGroup.appendChild(tip);
    }

    labelsGroup.appendChild(labelGroup);
  }

  // Track active shapes for highlight/dim
  let activeShapes = {};

  /**
   * Update the chart with a set of profiles.
   * @param {Array<{ id: string, ratings: number[], color: string, seniorRatings?: number[] }>} profiles
   */
  function update(profiles) {
    shapesGroup.innerHTML = '';
    activeShapes = {};

    profiles.forEach(({ id, ratings, color, seniorRatings }) => {
      // Main shape
      const points = ratings.map((r, i) => {
        const angle = (TAU / AXES) * i + ANGLE_OFFSET;
        const radius = (r / MAX_RATING) * maxRadius;
        return [
          center + radius * Math.cos(angle),
          center + radius * Math.sin(angle),
        ];
      });

      const shape = createPolygon(points, {
        fill: color,
        'fill-opacity': '0.18',
        stroke: color,
        'stroke-width': '1.5',
      });
      shape.dataset.profileId = id;
      shapesGroup.appendChild(shape);

      // Senior overlay (dashed)
      let seniorShape = null;
      if (seniorRatings) {
        const seniorPoints = seniorRatings.map((r, i) => {
          const angle = (TAU / AXES) * i + ANGLE_OFFSET;
          const radius = (r / MAX_RATING) * maxRadius;
          return [
            center + radius * Math.cos(angle),
            center + radius * Math.sin(angle),
          ];
        });

        seniorShape = createPolygon(seniorPoints, {
          fill: 'none',
          stroke: color,
          'stroke-width': '1.5',
          'stroke-dasharray': '6 4',
          opacity: '0.5',
        });
        seniorShape.dataset.profileId = id;
        seniorShape.dataset.senior = 'true';
        shapesGroup.appendChild(seniorShape);
      }

      activeShapes[id] = { main: shape, senior: seniorShape };
    });
  }

  /**
   * Highlight one profile, dim others.
   * @param {string|null} profileId - ID to highlight, or null to clear
   */
  function highlight(profileId) {
    Object.entries(activeShapes).forEach(([id, { main, senior }]) => {
      if (profileId && id !== profileId) {
        main.style.opacity = '0.2';
        if (senior) senior.style.opacity = '0.1';
      } else {
        main.style.opacity = '1';
        if (senior) senior.style.opacity = '0.5';
      }
    });
  }

  function clearHighlight() {
    Object.values(activeShapes).forEach(({ main, senior }) => {
      main.style.opacity = '1';
      if (senior) senior.style.opacity = '0.5';
    });
  }

  return { svg, update, highlight, clearHighlight };
}

// ── SVG Helpers ──

function createGroup(parent, className) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', className);
  parent.appendChild(g);
  return g;
}

function createPolygon(points, attrs) {
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points.map(p => p.join(',')).join(' '));
  Object.entries(attrs).forEach(([k, v]) => polygon.setAttribute(k, v));
  return polygon;
}

function axisPoints(n, radius, center) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (TAU / n) * i + ANGLE_OFFSET;
    return [
      center + radius * Math.cos(angle),
      center + radius * Math.sin(angle),
    ];
  });
}

/**
 * Render a standalone legend below the chart.
 * @param {HTMLElement} container
 * @param {Array<{ id: string, name: string, color: string }>} items
 * @param {Function} onClickItem - callback(id) when legend item clicked
 */
export function renderLegend(container, items, onClickItem) {
  const legend = document.createElement('div');
  legend.className = 'radar-legend';

  items.forEach(({ id, name, color }) => {
    const item = document.createElement('button');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-swatch" style="background:${color}"></span>${name}`;
    item.onclick = () => onClickItem(id);
    legend.appendChild(item);
  });

  container.appendChild(legend);
  return legend;
}
