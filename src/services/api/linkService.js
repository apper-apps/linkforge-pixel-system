// ApperClient database service for link operations
const linkService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "original_url" } },
          { field: { Name: "short_code" } },
          { field: { Name: "custom_alias" } },
          { field: { Name: "clicks" } },
          { field: { Name: "created_at" } },
          { field: { Name: "qr_code" } },
          { field: { Name: "is_active" } }
        ]
      };

      const response = await apperClient.fetchRecords('link', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform database response to UI format
      return (response.data || []).map(item => ({
        Id: item.Id,
        originalUrl: item.original_url || '',
        shortCode: item.short_code || '',
        customAlias: item.custom_alias || null,
        clicks: item.clicks || 0,
        createdAt: item.created_at || item.CreatedOn || new Date().toISOString(),
        qrCode: item.qr_code || '',
        isActive: item.is_active !== false
      }));
    } catch (error) {
      console.error('Error fetching links:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "original_url" } },
          { field: { Name: "short_code" } },
          { field: { Name: "custom_alias" } },
          { field: { Name: "clicks" } },
          { field: { Name: "created_at" } },
          { field: { Name: "qr_code" } },
          { field: { Name: "is_active" } }
        ]
      };

      const response = await apperClient.getRecordById('link', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error('Link not found');
      }

      // Transform database response to UI format
      const item = response.data;
      return {
        Id: item.Id,
        originalUrl: item.original_url || '',
        shortCode: item.short_code || '',
        customAlias: item.custom_alias || null,
        clicks: item.clicks || 0,
        createdAt: item.created_at || item.CreatedOn || new Date().toISOString(),
        qrCode: item.qr_code || '',
        isActive: item.is_active !== false
      };
    } catch (error) {
      console.error(`Error fetching link with ID ${id}:`, error);
      throw error;
    }
  },

  async create(linkData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Validation
      if (!linkData.originalUrl) {
        throw new Error('Original URL is required');
      }

      // Generate short code
      const shortCode = linkData.customAlias || generateShortCode();

      // Only include Updateable fields
      const params = {
        records: [{
          Name: shortCode, // Using short_code as Name
          Tags: '',
          original_url: linkData.originalUrl,
          short_code: shortCode,
          custom_alias: linkData.customAlias || '',
          clicks: 0,
          created_at: new Date().toISOString(),
          qr_code: `qr-${shortCode}`,
          is_active: true
        }]
      };

      const response = await apperClient.createRecord('link', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          if (failedRecords[0]?.message) {
            throw new Error(failedRecords[0].message);
          }
        }

        if (successfulRecords.length > 0) {
          const item = successfulRecords[0].data;
          return {
            Id: item.Id,
            originalUrl: item.original_url || linkData.originalUrl,
            shortCode: item.short_code || shortCode,
            customAlias: item.custom_alias || linkData.customAlias || null,
            clicks: item.clicks || 0,
            createdAt: item.created_at || item.CreatedOn || new Date().toISOString(),
            qrCode: item.qr_code || `qr-${shortCode}`,
            isActive: item.is_active !== false
          };
        }
      }

      throw new Error('Failed to create link');
    } catch (error) {
      console.error('Error creating link:', error);
      throw error;
    }
  },

  async update(id, updatedData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields and Id
      const updateFields = {
        Id: parseInt(id)
      };

      if (updatedData.originalUrl !== undefined) {
        updateFields.original_url = updatedData.originalUrl;
      }
      if (updatedData.shortCode !== undefined) {
        updateFields.short_code = updatedData.shortCode;
        updateFields.Name = updatedData.shortCode; // Update Name field as well
      }
      if (updatedData.customAlias !== undefined) {
        updateFields.custom_alias = updatedData.customAlias;
      }
      if (updatedData.clicks !== undefined) {
        updateFields.clicks = updatedData.clicks;
      }
      if (updatedData.qrCode !== undefined) {
        updateFields.qr_code = updatedData.qrCode;
      }
      if (updatedData.isActive !== undefined) {
        updateFields.is_active = updatedData.isActive;
      }

      const params = {
        records: [updateFields]
      };

      const response = await apperClient.updateRecord('link', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          if (failedUpdates[0]?.message) {
            throw new Error(failedUpdates[0].message);
          }
        }

        if (successfulUpdates.length > 0) {
          const item = successfulUpdates[0].data;
          return {
            Id: item.Id,
            originalUrl: item.original_url || '',
            shortCode: item.short_code || '',
            customAlias: item.custom_alias || null,
            clicks: item.clicks || 0,
            createdAt: item.created_at || item.CreatedOn || new Date().toISOString(),
            qrCode: item.qr_code || '',
            isActive: item.is_active !== false
          };
        }
      }

      throw new Error('Failed to update link');
    } catch (error) {
      console.error('Error updating link:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('link', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          if (failedDeletions[0]?.message) {
            throw new Error(failedDeletions[0].message);
          }
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
  },

  // Analytics aggregation methods (using mock data for demonstration)
  getGeographicData(links = []) {
    const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada'];
    const total = links.reduce((sum, link) => sum + link.clicks, 0);
    
    return countries.map((country, index) => {
      const clicks = Math.floor(total * [0.35, 0.25, 0.18, 0.12, 0.10][index]);
      return { country, clicks };
    }).filter(item => item.clicks > 0);
  },

  getDeviceData(links = []) {
    const devices = ['Desktop', 'Mobile', 'Tablet'];
    const total = links.reduce((sum, link) => sum + link.clicks, 0);
    
    return devices.map((device, index) => {
      const clicks = Math.floor(total * [0.45, 0.42, 0.13][index]);
      return { device, clicks };
    }).filter(item => item.clicks > 0);
  },

  getReferralData(links = []) {
    const sources = ['Direct', 'Social Media', 'Email', 'Search', 'Other'];
    const total = links.reduce((sum, link) => sum + link.clicks, 0);
    
    return sources.map((source, index) => {
      const clicks = Math.floor(total * [0.40, 0.25, 0.18, 0.12, 0.05][index]);
      return { source, clicks };
    }).filter(item => item.clicks > 0);
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