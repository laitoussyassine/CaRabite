import Workshop from '../models/workshopSchema.js'; // Import your Workshop model
import City from '../models/CitySchema.js';



// export const searchWorkshopsByQuery = async (req, res) => {
//   const { query } = req.query;

//   if (!query || typeof query !== 'string' || query.trim() === '') {
//     return res.status(400).json({ success: false, message: 'Invalid search query.' });
//   }

//   try {
//     const workshops = await Workshop.find({
//       $or: [
//         { workshopName: { $regex: query, $options: 'i' } }, // Case-insensitive search by workshop name
//         { address: { $regex: query, $options: 'i' } } // Case-insensitive search by address
//         // Add more fields to search by if needed
//       ]
//     });

//     if (workshops && workshops.length > 0) {
//       res.status(200).json({ success: true, data: workshops });
//     } else {
//       res.status(404).json({ success: false, message: 'No workshops found matching the search query.' });
//     }
//   } catch (error) {
//     console.error('Error searching workshops:', error);
//     res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// };


export const getAllWorkshops = async (req, res) => {
  try {
    const { query } = req.query;
    let workshops;

    if (query) {
      // Use regex to perform case-insensitive search on workshopName or city name
      workshops = await Workshop.find({
        $or: [
          { workshopName: { $regex: query, $options: 'i' } },
          { city: { $in: await City.find({ name: { $regex: query, $options: 'i' } }) }}
        ]
      })
      .populate('city') // Populate 'owner' and 'city' fields with actual documents
      .select('-reviews -averageRating -totalRating'); // Example: Exclude certain fields from the response

    } else {
      // If no query is provided, fetch all workshops and populate 'owner' and 'city' fields
      workshops = await Workshop.find({})
      .populate('city')
      .select('-reviews -averageRating -totalRating'); // Example: Exclude certain fields from the response
    }

    res.status(200).json({
      success: true,
      message: 'Workshops found',
      data: workshops
    });
  } catch (error) {
    console.error('Error searching workshops:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};




// Controller to fetch a single workshop by ID
export const getWorkshopById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const workshop = await Workshop.findById(id).populate('city owner').exec();
    
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }
    
    res.status(200).json({ success: true, data: workshop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
