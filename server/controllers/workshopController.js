import Workshop from '../models/workshopSchema.js';

export const createWorkshop = async (req, res) => {
    const { workshopName, city, services, address, mobile, workshopDescription, timeSlots, image } = req.body;

    try {

        // Create a new Workshop instance
        const parsedServices = JSON.parse(services);
        const lowerCaseCity = city.toLowerCase();
        const workshop = new Workshop({
            workshopName,
            city: lowerCaseCity,
            address,
            mobile,
            workshopDescription,
            owner: req.userId,
            timeSlots,
            image,
            services: parsedServices,   
        });

        // Save the workshop instance to the database
        await workshop.save();

        // Respond with success and the created workshop data
        res.status(201).json({ success: true, message: "Workshop created successfully", data: workshop });
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({ success: false, error: error.message });
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
    const { id } = req.params;
    try {
        const workshop = await Workshop.findById(id).populate('city owner reviews').exec();
        if (!workshop) {
            return res.status(404).json({ success: false, error: 'Workshop not found' });
        }
        res.status(200).json({ success: true, data: workshop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// export const updateWorkshop = async (req, res) => {
//     try {
//         let updateData = req.body;

//         let workshop = await Workshop.findOne({ _id: req.params.id, owner: req.userId });

//         if (!workshop) {
//             return res.status(404).json({ success: false, error: 'Workshop not found' });
//         }

//         workshop.set(updateData);
//         await workshop.save();

//         res.status(200).json({ success: true, data: workshop });
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//     }
// };


// Controller to delete workshop by ID
export const updateWorkshop = async (req, res) => {
    const { id } = req.params;
    const { workshopName, city, services, address, mobile, workshopDescription, timeSlots, image } = req.body;

    try {
        const parsedServices = JSON.parse(services);
        const lowerCaseCity = city.toLowerCase();

        const workshop = await Workshop.findByIdAndUpdate(
            id,
            {
                workshopName,
                city: lowerCaseCity,
                address,
                mobile,
                workshopDescription,
                timeSlots,
                image,
                services: parsedServices
            },
            { new: true } // Return the updated workshop after the update operation
        ).populate('city').exec();

        if (!workshop) {
            return res.status(404).json({ success: false, message: 'Workshop not found' });
        }

        res.status(200).json({ success: true, message: 'Workshop updated successfully', data: workshop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteWorkshopById = async (req, res) => {
    const { id } = req.params;

    try {
        const workshop = await Workshop.findByIdAndDelete(id);

        if (!workshop) {
            return res.status(404).json({ success: false, message: 'Workshop not found' });
        }

        res.status(200).json({ success: true, message: 'Workshop deleted successfully', data: workshop });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};