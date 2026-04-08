export function renderEntry(container) {
  container.innerHTML = `
    <div class="entry-screen">
      <div class="entry-header">
        <h1 class="entry-title">How will AI reshape your future practice?</h1>
        <p class="entry-subtitle">
          Explore how AI's economic impact varies across legal practice areas, firm types, and seniority levels
          using a five-variable framework adapted from the O-Ring model.
        </p>
      </div>

      <div class="entry-cards">
        <a href="#/practice" class="entry-card">
          <div class="entry-card-icon">&#9878;</div>
          <h2 class="entry-card-title">Browse by Practice Area</h2>
          <p class="entry-card-desc">
            Litigation, Corporate, IP, Regulatory, Family, Immigration, Estate, Employment
          </p>
          <span class="entry-card-example">e.g., Litigation &rarr; Civil &rarr; BigLaw Defense</span>
        </a>

        <a href="#/firm" class="entry-card">
          <div class="entry-card-icon">&#127970;</div>
          <h2 class="entry-card-title">Browse by Firm Type</h2>
          <p class="entry-card-desc">
            BigLaw, Mid-Market, Small Firm, Solo, Government, In-House, Legal Aid
          </p>
          <span class="entry-card-example">e.g., BigLaw &rarr; M&A / Capital Markets</span>
        </a>
      </div>

      <a href="#/builder" class="entry-custom-btn">
        + Build a Custom Profile
      </a>
    </div>
  `;
}
