const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Storage {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(LEADS_FILE)) {
      this.saveLeads([]);
    }
  }

  readLeads() {
    try {
      if (!fs.existsSync(LEADS_FILE)) {
        return [];
      }
      const data = fs.readFileSync(LEADS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading leads file:', err);
      return [];
    }
  }

  saveLeads(leads) {
    try {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('Error saving leads file:', err);
      return false;
    }
  }

  clearAllLeads() {
    this.saveLeads([]);
  }

  getAllLeads(filters = {}) {
    let leads = this.readLeads();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      leads = leads.filter(l => 
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.category && l.category.toLowerCase().includes(q)) ||
        (l.locality && l.locality.toLowerCase().includes(q)) ||
        (l.address && l.address.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q))
      );
    }

    if (filters.websiteStatus && filters.websiteStatus !== 'ALL') {
      leads = leads.filter(l => l.websiteStatus === filters.websiteStatus);
    }

    if (filters.locality && filters.locality !== 'ALL') {
      leads = leads.filter(l => l.locality && l.locality.toLowerCase() === filters.locality.toLowerCase());
    }

    if (filters.nicheId && filters.nicheId !== 'ALL') {
      leads = leads.filter(l => l.nicheId === filters.nicheId);
    }

    if (filters.crmStatus && filters.crmStatus !== 'ALL') {
      leads = leads.filter(l => l.crmStatus === filters.crmStatus);
    }

    if (filters.minRating) {
      const minR = parseFloat(filters.minRating);
      if (!isNaN(minR)) leads = leads.filter(l => (parseFloat(l.rating) || 0) >= minR);
    }

    if (filters.minReviews) {
      const minRev = parseInt(filters.minReviews);
      if (!isNaN(minRev)) leads = leads.filter(l => (parseInt(l.reviewsCount) || 0) >= minRev);
    }

    // Sort by Opportunity Score descending
    leads.sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0));

    return leads;
  }

  getLeadById(id) {
    const leads = this.readLeads();
    return leads.find(l => l.id === id);
  }

  addLeads(newLeads) {
    const existing = this.readLeads();
    let addedCount = 0;

    for (const lead of newLeads) {
      // Deduplicate by phone or exact name+locality
      const isDuplicate = existing.some(e => {
        if (lead.phone && e.phone && lead.phone.replace(/\D/g, '') === e.phone.replace(/\D/g, '')) {
          return true;
        }
        if (lead.name && e.name && lead.name.trim().toLowerCase() === e.name.trim().toLowerCase()) {
          if (lead.locality && e.locality && lead.locality.toLowerCase() === e.locality.toLowerCase()) {
            return true;
          }
        }
        return false;
      });

      if (!isDuplicate) {
        existing.unshift(lead);
        addedCount++;
      }
    }

    this.saveLeads(existing);
    return { addedCount, total: existing.length };
  }

  updateLead(id, updates) {
    const leads = this.readLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveLeads(leads);
    return leads[index];
  }

  deleteLead(id) {
    let leads = this.readLeads();
    const initialLen = leads.length;
    leads = leads.filter(l => l.id !== id);
    this.saveLeads(leads);
    return leads.length < initialLen;
  }

  getStats() {
    const leads = this.readLeads();
    const noWebsiteCount = leads.filter(l => l.websiteStatus === 'NO_WEBSITE').length;
    const socialOnlyCount = leads.filter(l => l.websiteStatus === 'SOCIAL_ONLY').length;
    const contactedCount = leads.filter(l => ['CONTACTED', 'PITCH_SENT', 'MEETING_BOOKED', 'CLOSED_WON'].includes(l.crmStatus)).length;
    const closedCount = leads.filter(l => l.crmStatus === 'CLOSED_WON').length;
    
    const targetOpportunities = noWebsiteCount + socialOnlyCount;
    const potentialPipelineInr = targetOpportunities * 30000;
    const closedRevenueInr = closedCount * 35000;

    const localityMap = {};
    leads.forEach(l => {
      if (l.locality) {
        localityMap[l.locality] = (localityMap[l.locality] || 0) + 1;
      }
    });

    return {
      totalLeads: leads.length,
      noWebsiteCount,
      socialOnlyCount,
      highPriorityLeads: targetOpportunities,
      contactedCount,
      closedCount,
      potentialPipelineInr,
      closedRevenueInr,
      localityBreakdown: localityMap
    };
  }

  exportCsv(filters = {}) {
    const leads = this.getAllLeads(filters);
    const headers = [
      'Business Name',
      'Category',
      'Locality',
      'Phone',
      'Rating',
      'Reviews Count',
      'Website Status',
      'Opportunity Score',
      'CRM Status',
      'Address',
      'Google Maps URL',
      'WhatsApp Outreach Link'
    ];

    const rows = leads.map(l => {
      const phoneDigits = l.phone ? l.phone.replace(/[^0-9]/g, '') : '';
      const waLink = phoneDigits ? `https://wa.me/${phoneDigits}` : '';
      
      return [
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.category || '').replace(/"/g, '""')}"`,
        `"${(l.locality || '').replace(/"/g, '""')}"`,
        `"${(l.phone || '').replace(/"/g, '""')}"`,
        l.rating || '',
        l.reviewsCount || '',
        l.websiteStatus || '',
        l.opportunityScore || '',
        l.crmStatus || 'NEW',
        `"${(l.address || '').replace(/"/g, '""')}"`,
        `"${(l.googleMapsUrl || '').replace(/"/g, '""')}"`,
        `"${waLink}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}

module.exports = new Storage();
