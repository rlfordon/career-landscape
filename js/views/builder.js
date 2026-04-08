import { VARIABLES } from '../data.js';
import { saveCustomProfile } from '../state.js';

const THINKING_PROMPTS = {
  dimensionality: 'Think about a typical matter in this role. How many distinct, complementary tasks does the lawyer handle personally? Could you automate one task without affecting the others, or are they tightly linked?',
  focusEffect: 'If AI handled the routine parts of this role tomorrow, would you spend that freed-up time on higher-value work you\'re already qualified to do? Or would the routine work being gone mean there\'s less reason to have you?',
  demandElasticity: 'If legal services in this area became 40% cheaper, would clients buy significantly more? Or is demand fixed — people only need a lawyer when they need a lawyer, regardless of price?',
  selfServiceResistance: 'Could your clients handle this work themselves using AI tools? Consider: Can they evaluate the quality of legal output? How bad is it if they get it wrong? Are there regulatory gates that prevent DIY?',
  decisionMakerAlignment: 'Who decides whether to hire, keep, or replace lawyers in this role? A partner protecting revenue? A CFO cutting costs? A legislature setting appropriations? Do their incentives favor keeping you — or replacing you?',
};

const RATING_ANCHORS = {
  dimensionality: [
    '1-2 core tasks. The job is basically one thing done repeatedly.',
    '3-4 tasks. Some variety, but tasks are somewhat independent.',
    '5-6 linked tasks. Doing one well requires doing the others well.',
    '7+ deeply intertwined tasks. The role is a complex bundle.',
  ],
  focusEffect: [
    'The routine tasks ARE the job. Automating them eliminates the need for me.',
    'Some freed time, but I\'d mostly just do the same work faster.',
    'Meaningful reallocation. I\'d shift to higher-value work I currently can\'t get to.',
    'Transformative. I currently spend most of my time on tasks AI could handle.',
  ],
  demandElasticity: [
    'Fixed demand. People don\'t buy more legal work just because it\'s cheaper.',
    'Some expansion. Price drops would unlock marginal clients or matters.',
    'Significant latent demand. Many people need this but can\'t currently afford it.',
    'Massive unmet need. Cheaper services would open a flood of new clients.',
  ],
  selfServiceResistance: [
    'Clients are sophisticated, stakes manageable, tools already exist for this.',
    'Some clients could self-serve for routine matters, but not complex ones.',
    'Most clients need a lawyer. Stakes, complexity, or emotions too high for DIY.',
    'No realistic self-service path. Regulatory, adversarial, or existential stakes.',
  ],
  decisionMakerAlignment: [
    'Decision-maker actively wants to reduce outside counsel or headcount.',
    'Mixed incentives. Would keep me if cheap enough, but cost is the priority.',
    'Generally aligned. Keeping lawyers serves the decision-maker\'s interests.',
    'Fully aligned. The decision-maker depends on me and benefits from my success.',
  ],
};

export function renderBuilder(container, params) {
  const returnPath = params.segments?.[0] ? decodeURIComponent(params.segments[0]) : null;

  const selections = {};

  container.innerHTML = `
    <div class="builder-screen">
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Explorer</a>
        <span class="breadcrumb-sep"> › </span>
        <span class="breadcrumb-current">Build a Custom Profile</span>
      </nav>

      <h1 class="builder-title">Build a Custom Profile</h1>
      <p class="builder-subtitle">Challenge the ratings. Name a role, commit to a number on each variable, and defend it.</p>

      <div class="builder-form">
        <div class="builder-field">
          <label class="builder-label" for="profile-name">Name your profile</label>
          <input type="text" id="profile-name" class="builder-input" placeholder="e.g., Immigration Solo Practice">
        </div>

        <div id="builder-variables"></div>

        <div class="builder-actions">
          <button id="builder-submit" class="builder-submit" disabled>Add to Comparison &rarr;</button>
          <button id="builder-cancel" class="builder-cancel">Cancel</button>
        </div>
      </div>
    </div>
  `;

  const varsContainer = document.getElementById('builder-variables');
  const submitBtn = document.getElementById('builder-submit');
  const nameInput = document.getElementById('profile-name');

  // Render variable sections
  VARIABLES.forEach(v => {
    const section = document.createElement('div');
    section.className = 'builder-variable';

    const anchors = RATING_ANCHORS[v.key];
    const prompt = THINKING_PROMPTS[v.key];

    section.innerHTML = `
      <h3 class="builder-var-name">${v.label}</h3>
      <p class="builder-var-prompt">${prompt}</p>
      <div class="builder-options" data-key="${v.key}">
        ${anchors.map((anchor, i) => `
          <button class="builder-option" data-key="${v.key}" data-value="${i + 1}">
            <span class="builder-option-num">${i + 1}</span>
            <span class="builder-option-text">${anchor}</span>
          </button>
        `).join('')}
      </div>
    `;
    varsContainer.appendChild(section);
  });

  // Selection handling
  varsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.builder-option');
    if (!btn) return;
    const key = btn.dataset.key;
    const value = parseInt(btn.dataset.value);

    selections[key] = value;

    // Update visual state for this variable group
    const group = btn.closest('.builder-options');
    group.querySelectorAll('.builder-option').forEach(b => {
      b.classList.toggle('builder-option-selected', b.dataset.value == value);
    });

    checkCanSubmit();
  });

  function checkCanSubmit() {
    const hasName = nameInput.value.trim().length > 0;
    const allRated = VARIABLES.every(v => selections[v.key] !== undefined);
    submitBtn.disabled = !(hasName && allRated);
  }

  nameInput.addEventListener('input', checkCanSubmit);

  // Submit
  submitBtn.onclick = () => {
    const name = nameInput.value.trim();
    const id = 'custom-' + Date.now();

    const profile = {
      id,
      name,
      category: 'Custom',
      firmType: 'Custom',
      junior: {
        ...Object.fromEntries(VARIABLES.map(v => [v.key, selections[v.key]])),
        verdict: 'Custom Profile',
        verdictType: 'protected', // neutral default
        descriptions: Object.fromEntries(VARIABLES.map(v => [v.key, ''])),
      },
      senior: null,
    };

    saveCustomProfile(profile);

    // Navigate back to compare view or starred view
    if (returnPath) {
      window.location.hash = `#/compare/${returnPath}`;
    } else {
      window.location.hash = '#/starred';
    }
  };

  // Cancel
  document.getElementById('builder-cancel').onclick = () => {
    if (returnPath) {
      window.location.hash = `#/compare/${returnPath}`;
    } else {
      window.location.hash = '#/';
    }
  };
}
