import { careerModel } from "../../DB/models/careersModel.js";



export const createcareer = async (req, res) => {
    try {
        const careerData = req.body;
        const newCareer = new careerModel(careerData);
        await newCareer.save();
        res.status(201).json({ message: "Career created successfully", career: newCareer });
    } catch (error) {
        res.status(500).json({ message: "Error creating career", error: error.message });
    }
};