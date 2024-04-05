// searchController.js

import Workshop from '../models/workshopSchema.js'; // Import your Workshop model

// Controller to search workshops by city, service, and province
export const searchWorkshops = async (req, res) => {
  try {
    const { city, service, province } = req.query;

    const query = {};

    if (city) query['workshopBranches.city'] = city;
    if (service) query.workshopServices = service;
    if (province) query['workshopBranches.province'] = province;

    const workshops = await Workshop.find(query);

    res.status(200).json({ success: true, data: workshops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all workshops
export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json({ success: true, data: workshops });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get workshop by ID
export const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }
    res.status(200).json({ success: true, data: workshop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
