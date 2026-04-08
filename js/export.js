import { getStarredIds, getCustomProfile, setStarredIds, saveCustomProfile } from './state.js';
import { PROFILES, VARIABLES } from './data.js';

/**
 * Export the radar chart container as a PNG download.
 */
export async function exportPNG(chartContainer) {
  if (typeof html2canvas === 'undefined') {
    alert('Export library not loaded. Please check your internet connection.');
    return;
  }

  try {
    const canvas = await html2canvas(chartContainer, {
      backgroundColor: '#ffffff',
      scale: 2, // Retina quality
    });

    const link = document.createElement('a');
    link.download = 'career-landscape-comparison.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('Export failed:', e);
    alert('Failed to export chart. Try taking a screenshot instead.');
  }
}

/**
 * Copy a shareable link to the clipboard encoding current starred profiles.
 * Format: ?starred=id1,id2,custom-1&custom-1=Name,D,F,E,R,A
 */
export function copyShareableLink() {
  const starredIds = getStarredIds();
  if (starredIds.length === 0) return;

  const url = new URL(window.location.href.split('#')[0]);
  url.searchParams.set('starred', starredIds.join(','));

  // Encode custom profile data
  starredIds.forEach(id => {
    if (id.startsWith('custom-')) {
      const profile = getCustomProfile(id);
      if (profile) {
        const ratings = VARIABLES.map(v => profile.junior[v.key]);
        url.searchParams.set(id, [profile.name, ...ratings].join(','));
      }
    }
  });

  // Remove hash from URL, add starred hash
  const shareUrl = url.toString();

  navigator.clipboard.writeText(shareUrl).catch(() => {
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = shareUrl;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  });
}

/**
 * Load state from URL query parameters (called by router on first load).
 */
export function loadFromURL(params) {
  const starredParam = params.get('starred');
  if (!starredParam) return;

  const ids = starredParam.split(',').filter(Boolean);

  // Decode custom profiles from URL
  ids.forEach(id => {
    if (id.startsWith('custom-') && params.has(id)) {
      const parts = params.get(id).split(',');
      const name = parts[0];
      const ratings = parts.slice(1).map(Number);

      if (name && ratings.length === 5 && ratings.every(r => r >= 1 && r <= 4)) {
        const profile = {
          id,
          name,
          category: 'Custom',
          firmType: 'Custom',
          junior: {
            ...Object.fromEntries(VARIABLES.map((v, i) => [v.key, ratings[i]])),
            verdict: 'Custom Profile',
            verdictType: 'protected',
            descriptions: Object.fromEntries(VARIABLES.map(v => [v.key, ''])),
          },
          senior: null,
        };
        saveCustomProfile(profile);
      }
    }
  });

  // Only star IDs that exist (either in PROFILES or just saved as custom)
  const validIds = ids.filter(id => PROFILES[id] || id.startsWith('custom-'));
  setStarredIds(validIds);

  // Clean URL params
  const cleanUrl = window.location.href.split('?')[0];
  window.history.replaceState({}, '', cleanUrl);
}
