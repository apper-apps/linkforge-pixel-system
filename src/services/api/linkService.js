import mockLinks from '@/services/mockData/links.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage to persist changes during session
let linksData = [...mockLinks];

const linkService = {
  async getAll() {
    await delay(300);
    return [...linksData];
  },

  async getById(id) {
    await delay(200);
    const link = linksData.find(link => link.Id === parseInt(id));
    if (!link) {
      throw new Error('Link not found');
    }
    return { ...link };
  },

  async create(linkData) {
    await delay(250);
    
    // Validation
    if (!linkData.originalUrl) {
      throw new Error('Original URL is required');
    }

    // Check if custom alias already exists
    if (linkData.customAlias && linksData.some(link => link.customAlias === linkData.customAlias)) {
      throw new Error('Custom alias already exists');
    }

    // Find highest existing Id and add 1
    const maxId = linksData.reduce((max, link) => Math.max(max, link.Id), 0);
    
    // Generate short code
    const shortCode = linkData.customAlias || generateShortCode();
    
    const newLink = {
      Id: maxId + 1,
      originalUrl: linkData.originalUrl,
      shortCode: shortCode,
      customAlias: linkData.customAlias || null,
      clicks: 0,
      createdAt: new Date().toISOString(),
      qrCode: `qr-${shortCode}`,
      isActive: true
    };

    linksData.push(newLink);
    return { ...newLink };
  },

  async update(id, updatedData) {
    await delay(200);
    
    const index = linksData.findIndex(link => link.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Link not found');
    }

    linksData[index] = { ...linksData[index], ...updatedData };
    return { ...linksData[index] };
  },

  async delete(id) {
    await delay(200);
    
    const index = linksData.findIndex(link => link.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Link not found');
    }

    linksData.splice(index, 1);
    return true;
  }
};

// Helper function to generate random short codes
function generateShortCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default linkService;