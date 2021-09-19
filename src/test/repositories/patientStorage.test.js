import Sequelize from 'sequelize';
import patientStorage from '../../repositories/patientStorage.js';
import { Patient } from '../../db/models.js';

const { Op } = Sequelize;

Patient.findByPk = jest.fn();
Patient.findOne = jest.fn();
Patient.findAll = jest.fn();

const id = 1;
const userId = 1;
const name = 'mia';
const patient = {
  patient_id: id,
  field1: 'data',
  field2: 'data2',
  field3: 'data3',
};

beforeEach(() => jest.clearAllMocks());

describe("'patientStorage' repository", () => {
  test("'getPatientByUserId' method, if patient exist", async () => {
    Patient.findOne.mockResolvedValue(patient);

    expect(await patientStorage.getPatientByUserId(userId)).toEqual(patient);
    expect(Patient.findOne).toHaveBeenCalledWith({
      where: {
        user_id: userId,
      },
      attributes: ['name', 'patient_id', 'gender', 'birthday'],
      raw: true,
    });
    expect(Patient.findOne).toHaveBeenCalledTimes(1);
  });

  test("'getPatientByUserId' method, if patient doesn't exist", async () => {
    Patient.findOne.mockResolvedValue(null);
    expect(await patientStorage.getPatientByUserId(userId)).toBeNull();
  });

  test("'getPatientById' method, if patient exist", async () => {
    Patient.findByPk.mockResolvedValue(patient);

    expect(await patientStorage.getPatientById(id)).toEqual(patient);
    expect(Patient.findByPk).toHaveBeenCalledWith(id, {
      attributes: ['name', 'patient_id', 'gender', 'birthday'],
      raw: true,
    });
    expect(Patient.findByPk).toHaveBeenCalledTimes(1);
  });

  test("'getPatientById' method, if patient doesn't exist", async () => {
    Patient.findByPk.mockResolvedValue(null);
    expect(await patientStorage.getPatientById(id)).toBeNull();
  });

  test("'getPatientsByName' method, if patient exist", async () => {
    Patient.findAll.mockResolvedValue(patient);

    expect(await patientStorage.getPatientsByName(name)).toEqual(patient);

    expect(Patient.findAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ['name', 'patient_id', 'gender', 'birthday'],
      raw: true,
    });
    expect(Patient.findAll).toHaveBeenCalledTimes(1);
  });

  test("'getPatientsByName' method, if patient doesn't exist", async () => {
    Patient.findAll.mockResolvedValue(null);
    expect(await patientStorage.getPatientsByName(name)).toBeNull();
  });
});
