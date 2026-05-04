import CarType from "../models/CarType.mjs";

export const getAllTypes = async () => {
  return await CarType.find();
};

export const getTypeById = async (id) => {
  return await CarType.findById(id);
};

export const createType = async (typeData) => {
  const carType = new CarType(typeData);
  return await carType.save();
};

export const updateCarType = async (id, carData) => {
  return await CarType.findByIdAndUpdate(id, carData, {
    new: true,
    runValidators: true,
  });
};

export const deleteType = async (id) => {
  return await CarType.findByIdAndDelete(id);
};
