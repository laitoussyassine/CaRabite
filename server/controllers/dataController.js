import City from '../models/CitySchema.js';
import Province from '../models/ProvinceSchema.js';


export const createCity = async (req, res) => {
    try {
        const { name } = req.body;
        const city = new City({ name });
        await city.save();
        res.status(201).json({ success: true, data: city });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};



// Controller to create provinces
export const createProvinces = async (req, res) => {
    try {
        const provincesData = req.body;

        const createdProvinces = await Promise.all(provincesData.map(async (provinceData) => {
            const { name, cityId } = provinceData;

            const city = await City.findById(cityId);
            if (!city) {
                throw new Error(`City with ID ${cityId} not found`);
            }

            const province = new Province({ name });
            await province.save();

            city.provinces.push(province);
            await city.save();

            return province;
        }));

        res.status(201).json({ success: true, data: createdProvinces });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


