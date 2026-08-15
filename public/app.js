/**
 * BLR Leads Finder - Interactive Frontend Application with Mass Harvester & Auto-Resume
 */

// Application State
const state = {
  config: { areas: [], niches: [] },
  leads: [],
  stats: {},
  currentView: 'cards', // 'cards' | 'table'
  activeFilters: {
    search: '',
    websiteStatus: 'NO_WEBSITE', // Default to hot leads
    locality: 'ALL',
    nicheId: 'ALL',
    crmStatus: 'ALL'
  },
  harvesterStatus: null,
  currentPitchLead: null,
  eventSource: null
};

// DOM Elements Cache
const DOM = {
  // Stats
  statTotalLeads: document.getElementById('statTotalLeads'),
  statNoWebsite: document.getElementById('statNoWebsite'),
  statSocialOnly: document.getElementById('statSocialOnly'),
  statContacted: document.getElementById('statContacted'),
  statContactedRate: document.getElementById('statContactedRate'),
  statPipelineValue: document.getElementById('statPipelineValue'),

  // Auto Resume Banner
  autoResumeBanner: document.getElementById('autoResumeBanner'),
  resumeBannerTitle: document.getElementById('resumeBannerTitle'),
  resumeBannerSub: document.getElementById('resumeBannerSub'),
  btnAutoResume: document.getElementById('btnAutoResume'),
  btnDismissResume: document.getElementById('btnDismissResume'),
  btnHarvestAll: document.getElementById('btnHarvestAll'),

  // Scraper Controls
  scraperForm: document.getElementById('scraperForm'),
  nicheSelect: document.getElementById('nicheSelect'),
  localitySelect: document.getElementById('localitySelect'),
  maxResultsInput: document.getElementById('maxResultsInput'),
  filterNoWebCheckbox: document.getElementById('filterNoWebCheckbox'),
  btnStartScrape: document.getElementById('btnStartScrape'),
  toggleCustomQuery: document.getElementById('toggleCustomQuery'),
  customQueryContainer: document.getElementById('customQueryContainer'),
  customQueryInput: document.getElementById('customQueryInput'),

  // Scraper Terminal & Controls
  scraperTerminal: document.getElementById('scraperTerminal'),
  terminalTitle: document.getElementById('terminalTitle'),
  terminalLogs: document.getElementById('terminalLogs'),
  terminalProgressFill: document.getElementById('terminalProgressFill'),
  btnCloseTerminal: document.getElementById('btnCloseTerminal'),
  btnPauseHarvester: document.getElementById('btnPauseHarvester'),
  btnResumeHarvester: document.getElementById('btnResumeHarvester'),
  btnStopHarvester: document.getElementById('btnStopHarvester'),

  // Filters & Search
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  filterWebsiteStatus: document.getElementById('filterWebsiteStatus'),
  filterLocality: document.getElementById('filterLocality'),
  filterNiche: document.getElementById('filterNiche'),
  filterCrmStatus: document.getElementById('filterCrmStatus'),
  leadsCountBadge: document.getElementById('leadsCountBadge'),
  btnResetFilters: document.getElementById('btnResetFilters'),

  // Views & Containers
  btnViewCards: document.getElementById('btnViewCards'),
  btnViewTable: document.getElementById('btnViewTable'),
  leadsCardsContainer: document.getElementById('leadsCardsContainer'),
  leadsTableContainer: document.getElementById('leadsTableContainer'),
  leadsTableBody: document.getElementById('leadsTableBody'),
  emptyState: document.getElementById('emptyState'),

  // Actions
  btnExportCsv: document.getElementById('btnExportCsv'),
  btnOpenGuide: document.getElementById('btnOpenGuide'),

  // Pitch Modal
  pitchModal: document.getElementById('pitchModal'),
  btnCloseModal: document.getElementById('btnCloseModal'),
  modalBusinessName: document.getElementById('modalBusinessName'),
  modalLocalityCategory: document.getElementById('modalLocalityCategory'),
  pitchWhatsAppText: document.getElementById('pitchWhatsAppText'),
  btnCopyWhatsApp: document.getElementById('btnCopyWhatsApp'),
  btnDirectWhatsApp: document.getElementById('btnDirectWhatsApp'),
  pitchJustdialText: document.getElementById('pitchJustdialText'),
  btnCopyJustdial: document.getElementById('btnCopyJustdial'),
  btnDirectJustdialWA: document.getElementById('btnDirectJustdialWA'),
  scriptIntro: document.getElementById('scriptIntro'),
  scriptHook: document.getElementById('scriptHook'),
  scriptProblem: document.getElementById('scriptProblem'),
  scriptCta: document.getElementById('scriptCta'),
  btnDialPhone: document.getElementById('btnDialPhone'),
  pitchEmailSubject: document.getElementById('pitchEmailSubject'),
  pitchEmailBody: document.getElementById('pitchEmailBody'),
  btnCopyEmail: document.getElementById('btnCopyEmail'),
  modalTabs: document.querySelectorAll('.modal-tab'),

  // Guide Modal
  guideModal: document.getElementById('guideModal'),
  btnCloseGuideModal: document.getElementById('btnCloseGuideModal')
};

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// -------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------
async function initApp() {
  setupEventListeners();
  await loadConfig();
  initEventStream();
  await Promise.all([loadStats(), loadLeads(), checkHarvesterStatus()]);
}

// Load Bangalore Configuration (Localities & Niches)
async function loadConfig() {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    state.config = data;

    // Populate Scraper Niches (With ALL option)
    DOM.nicheSelect.innerHTML = 
      `<option value="ALL">🌟 ALL Niches (Auto-Scrape All 12 Categories)</option>` +
      data.niches.map(n => `<option value="${n.id}">🎯 ${n.name} (${n.category})</option>`).join('');

    // Populate Scraper Localities (With ALL option)
    DOM.localitySelect.innerHTML = 
      `<option value="ALL">🌐 ALL Bangalore Areas (30+ Localities)</option>` +
      data.areas.map(a => `<option value="${a.name}">📍 ${a.name} (${a.zone} Bangalore)</option>`).join('');

    // Populate Filter Localities
    DOM.filterLocality.innerHTML = '<option value="ALL">📍 All Bangalore Areas</option>' + 
      data.areas.map(a => `<option value="${a.name}">${a.name} (${a.zone})</option>`).join('');

    // Populate Filter Niches
    DOM.filterNiche.innerHTML = '<option value="ALL">🎯 All Niches</option>' + 
      data.niches.map(n => `<option value="${n.id}">${n.name}</option>`).join('');

  } catch (err) {
    console.error('Failed to load configuration:', err);
  }
}

// Check if there is an incomplete queue to auto-resume
async function checkHarvesterStatus() {
  try {
    const res = await fetch('/api/harvester/status');
    const status = await res.json();
    state.harvesterStatus = status;

    if (status.hasResumableQueue && !status.isRunning) {
      DOM.autoResumeBanner.classList.remove('hidden');
      DOM.resumeBannerTitle.textContent = `Incomplete Scrape Job Detected (${status.currentIndex}/${status.totalItems} targets completed)`;
      DOM.resumeBannerSub.textContent = `Resume where you left off (${status.progressPercent}% complete) to continue harvesting all Bangalore areas.`;
    } else {
      DOM.autoResumeBanner.classList.add('hidden');
    }

    updateHarvesterControlsUI(status);
  } catch (err) {
    console.error('Error checking harvester status:', err);
  }
}

function updateHarvesterControlsUI(status) {
  if (status && status.isRunning) {
    DOM.btnPauseHarvester.classList.remove('hidden');
    DOM.btnResumeHarvester.classList.add('hidden');
    DOM.btnStopHarvester.classList.remove('hidden');
    DOM.terminalTitle.textContent = `MASS HARVESTER ACTIVE · TARGET ${status.currentIndex + 1}/${status.totalItems} (${status.progressPercent}%)`;
  } else if (status && status.isPaused) {
    DOM.btnPauseHarvester.classList.add('hidden');
    DOM.btnResumeHarvester.classList.remove('hidden');
    DOM.btnStopHarvester.classList.remove('hidden');
    DOM.terminalTitle.textContent = `MASS HARVESTER PAUSED · ${status.currentIndex}/${status.totalItems} COMPLETED`;
  } else {
    DOM.btnPauseHarvester.classList.add('hidden');
    DOM.btnResumeHarvester.classList.add('hidden');
    DOM.btnStopHarvester.classList.add('hidden');
    DOM.terminalTitle.textContent = `LIVE SCRAPER STREAM · GOOGLE MAPS AUTOMATION`;
  }
}

// Load Dashboard Pipeline Stats
async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const stats = await res.json();
    state.stats = stats;

    DOM.statTotalLeads.textContent = stats.totalLeads || 0;
    DOM.statNoWebsite.textContent = stats.noWebsiteCount || 0;
    DOM.statSocialOnly.textContent = stats.socialOnlyCount || 0;
    DOM.statContacted.textContent = stats.contactedCount || 0;

    const rate = stats.totalLeads > 0 ? Math.round((stats.contactedCount / stats.totalLeads) * 100) : 0;
    DOM.statContactedRate.textContent = `${rate}% Pipeline Activity (${stats.closedCount || 0} Deals Won)`;

    DOM.statPipelineValue.textContent = formatINR(stats.potentialPipelineInr || 0);
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

// Load Leads with Active Filters
async function loadLeads() {
  try {
    const params = new URLSearchParams();
    if (state.activeFilters.search) params.append('search', state.activeFilters.search);
    if (state.activeFilters.websiteStatus !== 'ALL') params.append('websiteStatus', state.activeFilters.websiteStatus);
    if (state.activeFilters.locality !== 'ALL') params.append('locality', state.activeFilters.locality);
    if (state.activeFilters.nicheId !== 'ALL') params.append('nicheId', state.activeFilters.nicheId);
    if (state.activeFilters.crmStatus !== 'ALL') params.append('crmStatus', state.activeFilters.crmStatus);

    const res = await fetch(`/api/leads?${params.toString()}`);
    const data = await res.json();
    state.leads = data.leads || [];

    DOM.leadsCountBadge.textContent = `${state.leads.length} Leads`;

    renderLeads();
  } catch (err) {
    console.error('Failed to load leads:', err);
  }
}

// -------------------------------------------------------------
// RENDERING
// -------------------------------------------------------------
function renderLeads() {
  if (state.leads.length === 0) {
    DOM.leadsCardsContainer.innerHTML = '';
    DOM.leadsTableBody.innerHTML = '';
    DOM.emptyState.classList.remove('hidden');
    return;
  }

  DOM.emptyState.classList.add('hidden');

  if (state.currentView === 'cards') {
    renderCardsView();
    DOM.leadsCardsContainer.classList.remove('hidden');
    DOM.leadsTableContainer.classList.add('hidden');
  } else {
    renderTableView();
    DOM.leadsCardsContainer.classList.add('hidden');
    DOM.leadsTableContainer.classList.remove('hidden');
  }
}

// Builds a live demo-site preview link for any lead, passing its real
// scraped data through URL params so that niche's deployed demo site
// dynamically renders that specific business — no per-lead build step.
// Each niche is its own separately-deployed site (see /api/config demoSites),
// so this returns null until that niche's site has a live baseUrl configured.
function buildDemoUrl(lead) {
  const site = (state.config.demoSites || {})[lead.nicheId];
  if (!site) return null;

  const params = new URLSearchParams({
    name: lead.name || '',
    locality: lead.locality || '',
    rating: lead.rating || '4.8',
    reviews: lead.reviewsCount || '0',
    phone: lead.phone || '',
    address: lead.address || '',
  });
  if (lead.googleMapsUrl) params.set('mapsUrl', lead.googleMapsUrl);
  return `${site.baseUrl}${site.path}?${params.toString()}`;
}

function renderCardsView() {
  DOM.leadsCardsContainer.innerHTML = state.leads.map((lead, index) => {
    const isNoWeb = lead.websiteStatus === 'NO_WEBSITE';
    const isSocial = lead.websiteStatus === 'SOCIAL_ONLY';
    const cardClass = isNoWeb ? 'card-no-web' : (isSocial ? 'card-social' : '');
    const demoUrl = buildDemoUrl(lead);

    let webStatusBadge = '';
    if (isNoWeb) {
      webStatusBadge = `<span class="web-status-pill web-status-noweb">🔴 Zero Website (Missing)</span>`;
    } else if (isSocial) {
      webStatusBadge = `<span class="web-status-pill web-status-social">🟡 Social Only (${getSocialDomain(lead.website)})</span>`;
    } else {
      webStatusBadge = `<span class="web-status-pill web-status-hasweb">🟢 Has Website</span>`;
    }

    const phoneDisplay = lead.phone || 'No phone listed';

    return `
      <div class="lead-card ${cardClass}" data-id="${lead.id}">
        <div class="lead-header">
          <div class="lead-title-area">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="lead-serial-pill">#${index + 1}</span>
              <h4 class="lead-name" style="margin: 0;">${escapeHtml(lead.name)}</h4>
            </div>
            <div class="lead-tags">
              <span class="tag">${escapeHtml(lead.category)}</span>
              <span class="tag tag-locality">📍 ${escapeHtml(lead.locality || 'Bengaluru')}</span>
            </div>
          </div>
          <div class="lead-score-badge">
            <span class="score-num">${lead.opportunityScore || 90}</span>
            <span class="score-label">Score</span>
          </div>
        </div>

        <div class="lead-metrics-row">
          <div class="rating-pill">
            <span>★</span>
            <span>${lead.rating || '4.5'}</span>
            <span class="review-count">(${lead.reviewsCount || 0} reviews)</span>
          </div>
          ${webStatusBadge}
        </div>

        <div class="lead-details">
          <div class="detail-item">
            <span class="detail-icon">🏢</span>
            <span>${escapeHtml(lead.address || `${lead.locality}, Bengaluru`)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">📞</span>
            <strong>${phoneDisplay}</strong>
          </div>
        </div>

        <div class="lead-crm-row">
          <span class="crm-label">Pipeline Stage:</span>
          <select class="crm-select" onchange="updateLeadCrmStatus('${lead.id}', this.value)">
            <option value="NEW" ${lead.crmStatus === 'NEW' ? 'selected' : ''}>New Lead</option>
            <option value="CONTACTED" ${lead.crmStatus === 'CONTACTED' ? 'selected' : ''}>Contacted</option>
            <option value="PITCH_SENT" ${lead.crmStatus === 'PITCH_SENT' ? 'selected' : ''}>Pitch Sent</option>
            <option value="MEETING_BOOKED" ${lead.crmStatus === 'MEETING_BOOKED' ? 'selected' : ''}>Meeting Booked</option>
            <option value="CLOSED_WON" ${lead.crmStatus === 'CLOSED_WON' ? 'selected' : ''}>Closed / Won 🏆</option>
            <option value="REJECTED" ${lead.crmStatus === 'REJECTED' ? 'selected' : ''}>Not Interested</option>
          </select>
        </div>

        <div class="lead-actions-grid">
          <button class="btn btn-whatsapp-action" onclick="sendDirectWhatsApp('${lead.id}', 'whatsapp')" title="Launch 1-Click WhatsApp with Standard No-Website Pitch">
            <span>💬</span> Standard WA
          </button>
          <button class="btn btn-justdial-action" onclick="sendDirectWhatsApp('${lead.id}', 'justdial')" title="Launch 1-Click WhatsApp with Justdial / Directory Hook Pitch">
            <span>⚔️</span> Justdial Hook
          </button>
        </div>

        <div class="lead-footer-links">
          ${demoUrl ? `<a href="${demoUrl}" target="_blank" rel="noopener">🎨 Live Demo</a>` : `<span class="link-disabled" title="Demo site for this niche isn't deployed yet">🎨 Live Demo</span>`}
          <a href="javascript:void(0)" onclick="openPitchModal('${lead.id}', 'coldCall')" style="color: #A78BFA;">📋 Pitch Toolkit</a>
          <a href="${lead.googleMapsUrl || '#'}" target="_blank" rel="noopener">🗺️ Maps</a>
          ${lead.phone ? `<a href="tel:${lead.phone}">📞 Call</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderTableView() {
  DOM.leadsTableBody.innerHTML = state.leads.map((lead, index) => {
    const isNoWeb = lead.websiteStatus === 'NO_WEBSITE';
    const isSocial = lead.websiteStatus === 'SOCIAL_ONLY';
    let statusText = isNoWeb ? '🔴 No Website' : (isSocial ? '🟡 Social Only' : '🟢 Has Website');

    return `
      <tr>
        <td style="color: var(--text-muted); font-family: var(--font-mono); font-size: 12px; font-weight: 700;">
          #${index + 1}
        </td>
        <td>
          <span class="score-num" style="font-size: 15px; color: #EF4444; font-weight: 800;">
            🔥 ${lead.opportunityScore || 90}
          </span>
        </td>
        <td>
          <strong>${escapeHtml(lead.name)}</strong>
          <br><small style="color: #64748B;">${escapeHtml(lead.address ? lead.address.substring(0, 40) + '...' : '')}</small>
        </td>
        <td>
          <span class="tag">${escapeHtml(lead.category)}</span>
          <br><span style="font-size: 11px; color: #00F0FF;">📍 ${escapeHtml(lead.locality)}</span>
        </td>
        <td>
          <span style="color: #FBBF24; font-weight: 700;">★ ${lead.rating || '4.5'}</span>
          <br><small style="color: #94A3B8;">${lead.reviewsCount || 0} reviews</small>
        </td>
        <td>
          <span style="font-size: 12px; font-weight: 600;">${statusText}</span>
        </td>
        <td>
          <strong>${lead.phone || '-'}</strong>
        </td>
        <td>
          <select class="crm-select" onchange="updateLeadCrmStatus('${lead.id}', this.value)">
            <option value="NEW" ${lead.crmStatus === 'NEW' ? 'selected' : ''}>New</option>
            <option value="CONTACTED" ${lead.crmStatus === 'CONTACTED' ? 'selected' : ''}>Contacted</option>
            <option value="PITCH_SENT" ${lead.crmStatus === 'PITCH_SENT' ? 'selected' : ''}>Pitch Sent</option>
            <option value="MEETING_BOOKED" ${lead.crmStatus === 'MEETING_BOOKED' ? 'selected' : ''}>Meeting</option>
            <option value="CLOSED_WON" ${lead.crmStatus === 'CLOSED_WON' ? 'selected' : ''}>Closed 🏆</option>
            <option value="REJECTED" ${lead.crmStatus === 'REJECTED' ? 'selected' : ''}>Rejected</option>
          </select>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-sm btn-whatsapp-action" onclick="sendDirectWhatsApp('${lead.id}', 'whatsapp')" title="Launch 1-Click WhatsApp with Standard Pitch">
              💬 Standard WA
            </button>
            <button class="btn btn-sm btn-justdial-action" onclick="sendDirectWhatsApp('${lead.id}', 'justdial')" title="Launch 1-Click WhatsApp with Justdial Hook Pitch">
              ⚔️ Justdial Hook
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function getSocialDomain(url) {
  if (!url) return 'Social';
  if (url.includes('instagram')) return 'Instagram';
  if (url.includes('facebook') || url.includes('fb.com')) return 'Facebook';
  if (url.includes('justdial')) return 'Justdial';
  if (url.includes('linktr.ee')) return 'Linktree';
  if (url.includes('zoca')) return 'Zoca';
  return 'Directory';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// -------------------------------------------------------------
// EVENT HANDLERS
// -------------------------------------------------------------
function setupEventListeners() {
  DOM.scraperForm.addEventListener('submit', handleStartScrape);

  // Quick Harvest All Button
  DOM.btnHarvestAll.addEventListener('click', () => {
    DOM.localitySelect.value = 'ALL';
    DOM.nicheSelect.value = 'ALL';
    DOM.scraperForm.dispatchEvent(new Event('submit'));
  });

  // Auto Resume Banner Actions
  DOM.btnAutoResume.addEventListener('click', async () => {
    DOM.autoResumeBanner.classList.add('hidden');
    DOM.scraperTerminal.classList.remove('hidden');
    appendTerminalLog('[AUTO-RESUME] Resuming queue from saved state...', 'text-cyan');
    await fetch('/api/harvester/resume', { method: 'POST' });
  });

  DOM.btnDismissResume.addEventListener('click', async () => {
    DOM.autoResumeBanner.classList.add('hidden');
    await fetch('/api/harvester/stop', { method: 'POST' });
  });

  // Harvester Controls (Pause, Resume, Stop)
  DOM.btnPauseHarvester.addEventListener('click', async () => {
    appendTerminalLog('[PAUSE] Pausing harvester queue after current item...', 'text-amber');
    await fetch('/api/harvester/pause', { method: 'POST' });
  });

  DOM.btnResumeHarvester.addEventListener('click', async () => {
    appendTerminalLog('[RESUME] Resuming harvester queue...', 'text-green');
    await fetch('/api/harvester/resume', { method: 'POST' });
  });

  DOM.btnStopHarvester.addEventListener('click', async () => {
    if (confirm('Are you sure you want to stop and reset the harvester queue?')) {
      appendTerminalLog('[STOP] Scraper queue stopped and reset.', 'text-red');
      await fetch('/api/harvester/stop', { method: 'POST' });
    }
  });

  // Search Input (Debounced)
  let searchTimeout = null;
  DOM.searchInput.addEventListener('input', (e) => {
    DOM.btnClearSearch.classList.toggle('hidden', !e.target.value);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.activeFilters.search = e.target.value.trim();
      loadLeads();
    }, 300);
  });

  DOM.btnClearSearch.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.btnClearSearch.classList.add('hidden');
    state.activeFilters.search = '';
    loadLeads();
  });

  // Filter Dropdowns
  DOM.filterWebsiteStatus.addEventListener('change', (e) => {
    state.activeFilters.websiteStatus = e.target.value;
    loadLeads();
  });

  DOM.filterLocality.addEventListener('change', (e) => {
    state.activeFilters.locality = e.target.value;
    loadLeads();
  });

  DOM.filterNiche.addEventListener('change', (e) => {
    state.activeFilters.nicheId = e.target.value;
    loadLeads();
  });

  DOM.filterCrmStatus.addEventListener('change', (e) => {
    state.activeFilters.crmStatus = e.target.value;
    loadLeads();
  });

  DOM.btnResetFilters.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.btnClearSearch.classList.add('hidden');
    DOM.filterWebsiteStatus.value = 'ALL';
    DOM.filterLocality.value = 'ALL';
    DOM.filterNiche.value = 'ALL';
    DOM.filterCrmStatus.value = 'ALL';
    state.activeFilters = { search: '', websiteStatus: 'ALL', locality: 'ALL', nicheId: 'ALL', crmStatus: 'ALL' };
    loadLeads();
  });

  // View Switchers
  DOM.btnViewCards.addEventListener('click', () => {
    state.currentView = 'cards';
    DOM.btnViewCards.classList.add('active');
    DOM.btnViewTable.classList.remove('active');
    renderLeads();
  });

  DOM.btnViewTable.addEventListener('click', () => {
    state.currentView = 'table';
    DOM.btnViewTable.classList.add('active');
    DOM.btnViewCards.classList.remove('active');
    renderLeads();
  });

  DOM.toggleCustomQuery.addEventListener('click', () => {
    DOM.customQueryContainer.classList.toggle('hidden');
  });

  DOM.btnCloseTerminal.addEventListener('click', () => {
    DOM.scraperTerminal.classList.add('hidden');
  });

  // Export CSV
  DOM.btnExportCsv.addEventListener('click', () => {
    const params = new URLSearchParams();
    if (state.activeFilters.search) params.append('search', state.activeFilters.search);
    if (state.activeFilters.websiteStatus !== 'ALL') params.append('websiteStatus', state.activeFilters.websiteStatus);
    if (state.activeFilters.locality !== 'ALL') params.append('locality', state.activeFilters.locality);
    if (state.activeFilters.nicheId !== 'ALL') params.append('nicheId', state.activeFilters.nicheId);
    if (state.activeFilters.crmStatus !== 'ALL') params.append('crmStatus', state.activeFilters.crmStatus);

    window.location.href = `/api/export/csv?${params.toString()}`;
  });

  // Guide Modal
  DOM.btnOpenGuide.addEventListener('click', () => DOM.guideModal.classList.remove('hidden'));
  DOM.btnCloseGuideModal.addEventListener('click', () => DOM.guideModal.classList.add('hidden'));

  // Pitch Modal Tabs
  DOM.modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const activeContent = document.getElementById(targetId);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  DOM.btnCloseModal.addEventListener('click', () => DOM.pitchModal.classList.add('hidden'));

  // Copy Buttons
  DOM.btnCopyWhatsApp.addEventListener('click', () => copyToClipboard(DOM.pitchWhatsAppText.value, DOM.btnCopyWhatsApp));
  DOM.btnCopyJustdial.addEventListener('click', () => copyToClipboard(DOM.pitchJustdialText.value, DOM.btnCopyJustdial));
  DOM.btnCopyEmail.addEventListener('click', () => {
    const text = `Subject: ${DOM.pitchEmailSubject.value}\n\n${DOM.pitchEmailBody.value}`;
    copyToClipboard(text, DOM.btnCopyEmail);
  });

  window.addEventListener('click', (e) => {
    if (e.target === DOM.pitchModal) DOM.pitchModal.classList.add('hidden');
    if (e.target === DOM.guideModal) DOM.guideModal.classList.add('hidden');
  });
}

function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const origText = btnElement.innerHTML;
    btnElement.innerHTML = '✅ Copied!';
    btnElement.style.borderColor = '#10B981';
    setTimeout(() => {
      btnElement.innerHTML = origText;
      btnElement.style.borderColor = '';
    }, 2000);
  });
}

// -------------------------------------------------------------
// EVENT STREAM (SSE) & HARVESTER HANDLERS
// -------------------------------------------------------------
function initEventStream() {
  if (state.eventSource) state.eventSource.close();

  state.eventSource = new EventSource('/api/scrape/stream');

  state.eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleSseMessage(data);
    } catch (e) {
      console.error('Error parsing SSE message:', e);
    }
  };
}

function handleSseMessage(data) {
  if (data.type === 'STATUS_SYNC') {
    state.harvesterStatus = data.status;
    updateHarvesterControlsUI(data.status);
    return;
  }

  // Mass Harvester Queue Events
  if (data.source === 'HARVESTER_QUEUE') {
    if (data.type === 'QUEUE_STARTED') {
      DOM.scraperTerminal.classList.remove('hidden');
      DOM.autoResumeBanner.classList.add('hidden');
      appendTerminalLog(`[MASS HARVESTER] Started queue of ${data.totalItems} total queries across Bangalore!`, 'text-cyan');
      updateHarvesterControlsUI({ isRunning: true, totalItems: data.totalItems, currentIndex: 0, progressPercent: 0 });
    } else if (data.type === 'ITEM_START') {
      const pct = Math.round((data.index / data.total) * 100);
      DOM.terminalProgressFill.style.width = `${pct}%`;
      DOM.terminalTitle.textContent = `MASS HARVESTER · [${data.index}/${data.total}] ${data.item.query} (${pct}%)`;
      appendTerminalLog(`[QUEUE ${data.index}/${data.total}] Starting: "${data.item.query}"...`, 'text-cyan');
      updateHarvesterControlsUI({ isRunning: true, totalItems: data.total, currentIndex: data.index - 1, progressPercent: pct });
    } else if (data.type === 'SCRAPER_PROGRESS') {
      let color = 'text-cyan';
      if (data.status === 'ITEM_SCRAPED') {
        color = data.lead && data.lead.websiteStatus === 'NO_WEBSITE' ? 'text-red' : 'text-amber';
      }
      appendTerminalLog(`[${data.status}] ${data.message}`, color);
    } else if (data.type === 'ITEM_COMPLETED') {
      appendTerminalLog(`[DONE] ${data.item.locality} -> Saved ${data.qualifiedSaved} new leads with NO website`, 'text-green');
      loadStats();
      loadLeads();
    } else if (data.type === 'QUEUE_PAUSED') {
      appendTerminalLog(`[PAUSED] Harvester paused at query ${data.currentIndex}/${data.totalItems}. Auto-resume ready!`, 'text-amber');
      updateHarvesterControlsUI({ isPaused: true, isRunning: false, totalItems: data.totalItems, currentIndex: data.currentIndex });
    } else if (data.type === 'QUEUE_RESUMED') {
      appendTerminalLog(`[RESUMED] Resuming queue from target ${data.currentIndex + 1}/${data.totalItems}...`, 'text-green');
      updateHarvesterControlsUI({ isRunning: true, isPaused: false, totalItems: data.totalItems, currentIndex: data.currentIndex });
    } else if (data.type === 'QUEUE_STOPPED') {
      appendTerminalLog(`[STOPPED] Queue stopped by user.`, 'text-red');
      updateHarvesterControlsUI({ isRunning: false, isPaused: false });
    } else if (data.type === 'QUEUE_COMPLETED') {
      appendTerminalLog(`🎉 [HARVESTER COMPLETED] All Bangalore targets scraped! Total queries: ${data.totalProcessed}`, 'text-green');
      DOM.terminalProgressFill.style.width = '100%';
      updateHarvesterControlsUI({ isRunning: false, isPaused: false });
      loadStats();
      loadLeads();
    }
    return;
  }

  // Single Scrape Job Events
  if (data.type === 'JOB_START') {
    appendTerminalLog(`[START] Target: "${data.query}" in ${data.locality}`, 'text-cyan');
    DOM.terminalProgressFill.style.width = '10%';
  } else if (data.type === 'PROGRESS') {
    let color = 'text-cyan';
    if (data.status === 'ITEM_SCRAPED') {
      color = data.lead && data.lead.websiteStatus === 'NO_WEBSITE' ? 'text-red' : 'text-amber';
    } else if (data.status === 'ERROR') {
      color = 'text-red';
    } else if (data.status === 'COMPLETED') {
      color = 'text-green';
      DOM.terminalProgressFill.style.width = '100%';
    }
    appendTerminalLog(`[${data.status}] ${data.message}`, color);
  } else if (data.type === 'JOB_COMPLETE') {
    appendTerminalLog(`[SUCCESS] Scraping completed! Qualified leads saved: ${data.qualifiedSaved}`, 'text-green');
    DOM.terminalProgressFill.style.width = '100%';
    DOM.btnStartScrape.disabled = false;
    DOM.btnStartScrape.innerHTML = `<span class="btn-icon">🔍</span><span class="btn-text">Start Live Scraping</span>`;
    loadStats();
    loadLeads();
  } else if (data.type === 'JOB_ERROR') {
    appendTerminalLog(`[ERROR] Job failed: ${data.error}`, 'text-red');
    DOM.btnStartScrape.disabled = false;
    DOM.btnStartScrape.innerHTML = `<span class="btn-icon">🔍</span><span class="btn-text">Start Live Scraping</span>`;
  }
}

function appendTerminalLog(msg, colorClass = '') {
  const line = document.createElement('div');
  line.className = `log-line ${colorClass}`;
  const timestamp = new Date().toLocaleTimeString();
  line.textContent = `[${timestamp}] ${msg}`;
  DOM.terminalLogs.appendChild(line);
  DOM.terminalLogs.scrollTop = DOM.terminalLogs.scrollHeight;
}

async function handleStartScrape(e) {
  e.preventDefault();

  const locality = DOM.localitySelect.value;
  const nicheId = DOM.nicheSelect.value;
  const maxResults = parseInt(DOM.maxResultsInput.value, 10) || 15;
  const filterNoWebsiteOnly = DOM.filterNoWebCheckbox.checked;
  const customQuery = DOM.customQueryInput.value.trim() || null;

  DOM.scraperTerminal.classList.remove('hidden');
  DOM.terminalLogs.innerHTML = '';
  DOM.terminalProgressFill.style.width = '5%';

  if (locality === 'ALL' || nicheId === 'ALL') {
    appendTerminalLog(`Launching Mass Harvester Queue across Bangalore...`, 'text-cyan');
  } else {
    appendTerminalLog(`Initiating Google Maps automation for ${locality}...`, 'text-cyan');
  }

  DOM.btnStartScrape.disabled = true;
  DOM.btnStartScrape.innerHTML = `<span class="btn-icon">⏳</span><span class="btn-text">Scraping Google Maps...</span>`;

  try {
    const res = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locality,
        nicheId,
        customQuery,
        maxResults,
        filterNoWebsiteOnly
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to start scraping job');
    }
  } catch (err) {
    appendTerminalLog(`Request error: ${err.message}`, 'text-red');
    DOM.btnStartScrape.disabled = false;
    DOM.btnStartScrape.innerHTML = `<span class="btn-icon">🔍</span><span class="btn-text">Start Live Scraping</span>`;
  }
}

// -------------------------------------------------------------
// PITCH MODAL
// -------------------------------------------------------------
window.openPitchModal = async function(leadId, defaultTab = 'whatsapp') {
  try {
    const res = await fetch(`/api/leads/${leadId}/pitch`);
    if (!res.ok) throw new Error('Failed to load lead pitch data');
    const data = await res.json();
    const { lead, pitches } = data;

    state.currentPitchLead = lead;

    DOM.modalBusinessName.textContent = lead.name;
    DOM.modalLocalityCategory.textContent = `${lead.category} · ${lead.locality || 'Bangalore'}, Karnataka`;

    DOM.pitchWhatsAppText.value = pitches.whatsapp.text;
    if (pitches.whatsapp.whatsappUrl) {
      DOM.btnDirectWhatsApp.href = pitches.whatsapp.whatsappUrl;
      DOM.btnDirectWhatsApp.classList.remove('hidden');
    } else {
      DOM.btnDirectWhatsApp.classList.add('hidden');
    }

    // Justdial / Directory Hook
    if (pitches.justdialHook) {
      DOM.pitchJustdialText.value = pitches.justdialHook.text;
      if (pitches.justdialHook.whatsappUrl) {
        DOM.btnDirectJustdialWA.href = pitches.justdialHook.whatsappUrl;
        DOM.btnDirectJustdialWA.classList.remove('hidden');
      } else {
        DOM.btnDirectJustdialWA.classList.add('hidden');
      }
    }

    DOM.scriptIntro.textContent = pitches.coldCall.introduction;
    DOM.scriptHook.textContent = pitches.coldCall.hook;
    DOM.scriptProblem.textContent = pitches.coldCall.theProblem;
    DOM.scriptCta.textContent = pitches.coldCall.callToAction;
    if (lead.phone) {
      DOM.btnDialPhone.href = `tel:${lead.phone}`;
      DOM.btnDialPhone.classList.remove('hidden');
    } else {
      DOM.btnDialPhone.classList.add('hidden');
    }

    DOM.pitchEmailSubject.value = pitches.email.subject;
    DOM.pitchEmailBody.value = pitches.email.body;

    let targetTab = 'tabWhatsApp';
    if (defaultTab === 'justdial') targetTab = 'tabJustdial';
    else if (defaultTab === 'coldCall') targetTab = 'tabColdCall';
    else if (defaultTab === 'email') targetTab = 'tabEmail';

    DOM.modalTabs.forEach(t => {
      if (t.dataset.tab === targetTab) {
        t.click();
      }
    });

    DOM.pitchModal.classList.remove('hidden');
  } catch (err) {
    console.error('Error opening pitch modal:', err);
    alert('Unable to load pitch templates: ' + err.message);
  }
};

window.updateLeadCrmStatus = async function(leadId, newStatus) {
  try {
    const res = await fetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crmStatus: newStatus })
    });
    if (res.ok) {
      await loadStats();
      const item = state.leads.find(l => l.id === leadId);
      if (item) item.crmStatus = newStatus;
    }
  } catch (err) {
    console.error('Error updating CRM status:', err);
  }
};

window.sendDirectWhatsApp = async function(leadId, pitchType = 'whatsapp') {
  try {
    const res = await fetch(`/api/leads/${leadId}/pitch`);
    if (!res.ok) throw new Error('Failed to load lead pitch data');
    const data = await res.json();
    const { lead, pitches } = data;

    if (!lead.phone) {
      alert(`No phone number available for "${lead.name}".`);
      return;
    }

    const pitchObj = pitchType === 'justdial' ? pitches.justdialHook : pitches.whatsapp;
    if (pitchObj && pitchObj.text) {
      let digits = lead.phone.replace(/[^0-9]/g, '');
      if (digits.length === 10) digits = '91' + digits;
      const url = `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(pitchObj.text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      // Automatically move lead to PITCH_SENT stage if NEW
      if (lead.crmStatus === 'NEW') {
        await updateLeadCrmStatus(leadId, 'PITCH_SENT');
        const select = document.querySelector(`.lead-card[data-id="${leadId}"] .crm-select`);
        if (select) select.value = 'PITCH_SENT';
      }
    } else {
      alert('Unable to format WhatsApp link for this contact.');
    }
  } catch (err) {
    console.error('Error launching WhatsApp:', err);
    alert('Error launching WhatsApp: ' + err.message);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
