/**
 * Comprehensive Bangalore Localities categorized by zones
 * Ideal for targeted micro-location scraping
 */

const BANGALORE_AREAS = [
  // South Bangalore (High Tech, Premium Residential & Commercial Hubs)
  { name: 'Koramangala', zone: 'South', tier: 1, keywords: ['Koramangala 4th Block', 'Koramangala 5th Block', 'Koramangala 6th Block', 'Sony World Signal'] },
  { name: 'HSR Layout', zone: 'South', tier: 1, keywords: ['HSR Layout Sector 1', 'HSR Layout Sector 2', 'HSR Layout Sector 7', '27th Main HSR'] },
  { name: 'Jayanagar', zone: 'South', tier: 1, keywords: ['Jayanagar 4th Block', 'Jayanagar 3rd Block', 'Jayanagar 9th Block', 'South End Circle'] },
  { name: 'JP Nagar', zone: 'South', tier: 1, keywords: ['JP Nagar 2nd Phase', 'JP Nagar 5th Phase', 'JP Nagar 7th Phase', 'Puttenahalli'] },
  { name: 'BTM Layout', zone: 'South', tier: 2, keywords: ['BTM 2nd Stage', 'BTM 1st Stage', 'Udupi Garden'] },
  { name: 'Bannerghatta Road', zone: 'South', tier: 1, keywords: ['Arekere', 'Hulimavu', 'Gottigere', 'Meenakshi Mall area'] },
  { name: 'Electronic City', zone: 'South', tier: 1, keywords: ['Electronic City Phase 1', 'Electronic City Phase 2', 'Neeladri Nagar'] },
  { name: 'Sarjapur Road', zone: 'South', tier: 1, keywords: ['Sarjapur Road', 'Doddakannelli', 'Kaikondrahalli', 'Carmelaram'] },
  { name: 'Bellandur', zone: 'South', tier: 1, keywords: ['Bellandur Green Glen Layout', 'EcoSpace area', 'Outer Ring Road Bellandur'] },
  { name: 'Banashankari', zone: 'South', tier: 2, keywords: ['Banashankari 2nd Stage', 'Banashankari 3rd Stage', 'BSK BDA Complex'] },
  { name: 'Basavanagudi', zone: 'South', tier: 2, keywords: ['Gandhi Bazaar', 'DVG Road', 'Bull Temple Road'] },

  // East Bangalore (IT Corridor, Affluent Expats & Techies)
  { name: 'Indiranagar', zone: 'East', tier: 1, keywords: ['100 Feet Road Indiranagar', '12th Main Indiranagar', 'Indiranagar Double Road', 'HAL 2nd Stage'] },
  { name: 'Whitefield', zone: 'East', tier: 1, keywords: ['ITPL Main Road', 'ECC Road Whitefield', 'Varthur Road', 'Kadugodi'] },
  { name: 'Marathahalli', zone: 'East', tier: 2, keywords: ['Marathahalli Bridge', 'Munnekolala', 'Kalamandir area'] },
  { name: 'Domlur', zone: 'East', tier: 2, keywords: ['Domlur Layout', 'Embassy Golf Links area', 'Old Airport Road'] },
  { name: 'Kalyan Nagar / Kammanahalli', zone: 'East', tier: 1, keywords: ['HRBR Layout', 'CMR Road Kalyan Nagar', 'Kammanahalli Main Road'] },
  { name: 'Brookefield', zone: 'East', tier: 2, keywords: ['Brookefield Main Road', 'Kundalahalli Gate', 'AECS Layout'] },
  { name: 'Mahadevapura', zone: 'East', tier: 2, keywords: ['Mahadevapura Main Road', 'Bagmane Tech Park area'] },

  // Central / CBD Bangalore (Upscale, Legacy & High-End)
  { name: 'MG Road / Brigade Road', zone: 'Central', tier: 1, keywords: ['MG Road', 'Brigade Road', 'Church Street', 'Residency Road'] },
  { name: 'Richmond Town / Lavelle Road', zone: 'Central', tier: 1, keywords: ['Lavelle Road', 'Richmond Road', 'Vittal Mallya Road', 'Langford Town'] },
  { name: 'Malleshwaram', zone: 'Central', tier: 1, keywords: ['Sampige Road', 'Margosa Road', 'Malleshwaram 8th Cross'] },
  { name: 'Vasanth Nagar / Cunningham Road', zone: 'Central', tier: 1, keywords: ['Cunningham Road', 'Millers Road', 'Ali Asker Road'] },
  { name: 'Frazer Town / Cox Town', zone: 'Central', tier: 2, keywords: ['Mosque Road', 'Coles Road', 'Wheeler Road'] },

  // North Bangalore (Rapid Growth, Airport Corridor)
  { name: 'Hebbal', zone: 'North', tier: 1, keywords: ['Hebbal Kempapura', 'Manyata Tech Park area', 'Bellary Road'] },
  { name: 'Yelahanka', zone: 'North', tier: 1, keywords: ['Yelahanka New Town', 'Yelahanka Old Town', 'Doddaballapur Road'] },
  { name: 'Sahakara Nagar', zone: 'North', tier: 1, keywords: ['Sahakara Nagar Main Road', 'Judicial Layout'] },
  { name: 'RT Nagar', zone: 'North', tier: 2, keywords: ['RT Nagar Main Road', 'Dinnur Main Road'] },
  { name: 'Hennur Road', zone: 'North', tier: 2, keywords: ['Hennur Cross', 'Geddalahalli', 'Kothanur'] },

  // West Bangalore (Dense Residential, Commercial Hubs)
  { name: 'Rajajinagar', zone: 'West', tier: 1, keywords: ['Rajajinagar 1st Block', 'Rajajinagar 4th Block', 'Dr Rajkumar Road'] },
  { name: 'Vijayanagar', zone: 'West', tier: 2, keywords: ['Vijayanagar Club Road', 'Pipeline Road', 'RPC Layout'] },
  { name: 'Nagarbhavi', zone: 'West', tier: 2, keywords: ['Nagarbhavi 2nd Stage', 'BDA Complex Nagarbhavi'] }
];

module.exports = { BANGALORE_AREAS };
