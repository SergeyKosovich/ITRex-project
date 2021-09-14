import doctorStorage from "../../repositories/doctorStorage.js";
import { Doctor, Specialization } from "../../db/models.js";

Doctor.findByPk = jest.fn();
Doctor.findOne = jest.fn();
Specialization.findOne = jest.fn();

const objectData = {};
objectData.get = jest.fn();

const id = 1;
const userId = 1;
const specialization = "therapist";
const doctor = {
  doctor_id: id,
  field1: "data",
  field2: "data2",
  field3: "data3",
};

beforeEach(() => jest.clearAllMocks());

describe("'doctorStorage' repository", () => {
  test("'getDoctorById' method, if doctor exist", async () => {
    Doctor.findByPk.mockResolvedValue(objectData);
    objectData.get.mockReturnValue(doctor);

    expect(await doctorStorage.getDoctorById(id)).toEqual(doctor);
    expect(Doctor.findByPk).toHaveBeenCalledWith(id, {
      include: {
        model: Specialization,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    expect(Doctor.findByPk).toHaveBeenCalledTimes(1);

    expect(objectData.get).toHaveBeenCalledWith({ plain: true });
    expect(objectData.get).toHaveBeenCalledTimes(1);
  });

  test("'getDoctorById' method, if doctor doesn't exist", async () => {
    Doctor.findByPk.mockResolvedValue(null);
    expect(await doctorStorage.getDoctorById(id)).toBeNull();
  });

  test("'getDoctorByUserId' method, if doctor exist", async () => {
    Doctor.findOne.mockResolvedValue(objectData);
    objectData.get.mockReturnValue(doctor);

    expect(await doctorStorage.getDoctorByUserId(userId)).toEqual(doctor);
    expect(Doctor.findOne).toHaveBeenCalledWith({
      where: { user_id: userId },
      include: {
        model: Specialization,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    expect(Doctor.findOne).toHaveBeenCalledTimes(1);

    expect(objectData.get).toHaveBeenCalledWith({ plain: true });
    expect(objectData.get).toHaveBeenCalledTimes(1);
  });

  test("'getDoctorByUserId' method, if doctor doesn't exist", async () => {
    Doctor.findOne.mockResolvedValue(null);
    expect(await doctorStorage.getDoctorByUserId(userId)).toBeNull();
  });

  test("'getDoctorBySpecialization' method, if specialization exist", async () => {
    Specialization.findOne.mockResolvedValue(objectData);
    const doctor = { doctor_id: 1, user_id: 1, name: "Kyle Simpson" };
    const data = {};
    data.doctors = [doctor];

    objectData.get.mockReturnValue(data);

    expect(
      await doctorStorage.getDoctorBySpecialization(specialization)
    ).toEqual(doctor);
    expect(Specialization.findOne).toHaveBeenCalledWith({
      where: {
        name: specialization,
      },
      include: {
        model: Doctor,
        attributes: ["doctor_id", "user_id", "name"],
        through: { attributes: [] },
      },
    });
    expect(Specialization.findOne).toHaveBeenCalledTimes(1);

    expect(objectData.get).toHaveBeenCalledWith({ plain: true });
    expect(objectData.get).toHaveBeenCalledTimes(1);
  });

  test("'getDoctorBySpecialization' method, if specialization doesn't exist", async () => {
    Specialization.findOne.mockResolvedValue(null);
    expect(
      await doctorStorage.getDoctorBySpecialization(specialization)
    ).toBeNull();
  });
});
