import Car from "../models/Car.mjs";

export const getAllCars = async () => {
  return await Car.find().populate("type");
};

export const getCarById = async (id) => {
  return await Car.findById(id);
};

export const createCar = async (carData) => {
  const car = new Car(carData);
  return await car.save();
};

export const updataCar = async (id, carData) => {
  return await Car.findByIdAndUpdate(id, carData, {
    new: true,
    runValidators: true,
  });
};

export const deleteCar = async (id) => {
  return await Car.findByIdAndDelete(id);
};
