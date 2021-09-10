/* eslint-disable max-classes-per-file */
import SqlStorage from "../storageClasses/sqlStorage.js";
import { Resolution, User, Patient } from "../db/models.js";

const service = new SqlStorage();

Resolution.findAll = jest.fn();
Resolution.create = jest.fn();
Resolution.destroy = jest.fn();
User.findOne = jest.fn();
User.create = jest.fn();
Patient.create = jest.fn();

beforeEach(() => jest.clearAllMocks());

test("getResolutionInStorage should search patient in storage and return resolution if patient exist", async () => {
  Resolution.findAll.mockResolvedValue(["resolution1", "resolution2"]);
  const patientId = 328;
  const resolutions = await service.getResolutionInStorage(patientId);
  expect(Resolution.findAll).toHaveBeenCalledTimes(1);
  expect(Resolution.findAll).toHaveBeenCalledWith({
    attributes: ["resolution"],
    where: {
      patient_id: patientId,
    },
  });
  expect(resolutions).toEqual(["resolution1", "resolution2"]);
});

test("setResolutionInStorage should create new resolution in db", async () => {
  const data = { patient_id: "333", resolution: "resolution test" };
  // Resolution.create = jest.fn();
  await service.setResolutionInStorage(data);
  expect(Resolution.create).toHaveBeenCalledTimes(1);
  expect(Resolution.create).toHaveBeenCalledWith({
    patient_id: data.patient_id,
    resolution: data.resolution,
  });
});

test("deleteResolutionInStorage should call destroy method and delete resolution from storage", async () => {
  // Resolution.destroy = jest.fn();
  const id = 24;
  await service.deleteResolutionInStorage(id);
  expect(Resolution.destroy).toHaveBeenCalledTimes(1);
  expect(Resolution.destroy).toHaveBeenCalledWith({
    where: {
      patient_id: id,
    },
  });
});

test("checkUserAndPassInDb should search user by email and return null if user not exist", async () => {
  User.findOne.mockResolvedValue(null);
  const userMail = "test";
  const res = await service.checkUserAndPassInDb(userMail);
  expect(User.findOne).toHaveBeenCalledTimes(1);
  expect(User.findOne).toHaveBeenCalledWith({
    attributes: ["email", "password", "user_id"],
    where: {
      email: userMail,
    },
  });
  expect(res).toBe(null);
});

test("checkUserAndPassInDb should search user by email and return user", async () => {
  const user = {};
  User.findOne.mockResolvedValue(user);
  const userMail = "test";
  const res = await service.checkUserAndPassInDb(userMail);
  expect(User.findOne).toHaveBeenCalledTimes(1);
  expect(User.findOne).toHaveBeenCalledWith({
    attributes: ["email", "password", "user_id"],
    where: {
      email: userMail,
    },
  });
  expect(res).toEqual(user);
});

test("createNewUserAndPatient should create new User and Patient in db", async () => {
  const user = { user_id: 14 };
  const patient = { patient_id: 15 };
  User.create.mockResolvedValue(user);
  Patient.create.mockResolvedValue(patient);
  const userMail = "test email";
  const userPass = "test pass";
  const userFirstName = "test name";
  const userLastName = "test last";
  const userGender = "test gender";
  const userBirthday = "13.02.1966";
  await service.createNewUserAndPatient(
    userMail,
    userPass,
    userFirstName,
    userLastName,
    userGender,
    userBirthday
  );
  expect(User.create).toHaveBeenCalledTimes(1);
  expect(User.create).toHaveBeenCalledWith({
    email: userMail,
    password: userPass,
  });
  expect(Patient.create).toHaveBeenCalledTimes(1);
  expect(Patient.create).toHaveBeenCalledWith({
    user_id: user.user_id,
    firstName: userFirstName,
    lastName: userLastName,
    gender: userGender,
    birthday: userBirthday,
  });
});
