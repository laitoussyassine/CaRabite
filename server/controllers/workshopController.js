import Workshop from '../models/workshopSchema.js';

export const createWorkshop = async (req, res) => {
    const { workshopName, city, services, address, mobile, workshopDescription, timeSlots, image } = req.body;

    try {
        
        const workshop = new Workshop({
            workshopName,
            city,
            services,
            address,
            mobile,
            workshopDescription,
            owner: req.userId,
            timeSlots,
            image
        });

        await workshop.save();
        res.status(201).json({ success: true, data: workshop });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};



export const getWorkshopsByOwner = async (req, res) => {
    try {
        const workshops = await Workshop.find({ owner: req.userId }).populate("owner city");
        res.status(200).json({ success: true, data: workshops });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to get workshop by ID
export const getWorkshopById = async (req, res) => {
    try {
        const workshop = await Workshop.findOne({ _id: req.params.id, owner: req.userId });
        if (!workshop) {
            return res.status(404).json({ success: false, error: 'Workshop not found' });
        }
        res.status(200).json({ success: true, data: workshop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateWorkshop = async (req, res) => {
    try {
        let updateData = req.body;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file?.path);

            
            updateData.image = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        let workshop = await Workshop.findOne({ _id: req.params.id, owner: req.userId });

        if (!workshop) {
            return res.status(404).json({ success: false, error: 'Workshop not found' });
        }

        workshop.set(updateData);
        await workshop.save();

        res.status(200).json({ success: true, data: workshop });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Controller to delete workshop by ID
export const deleteWorkshop = async (req, res) => {
    try {
        const workshop = await Workshop.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!workshop) {
            return res.status(404).json({ success: false, error: 'Workshop not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
