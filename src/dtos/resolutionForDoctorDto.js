export default class ResolutionForDoctorDto {
  constructor(resolution, patient) {
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.gender = patient.gender;
    this.birthday = patient.birthday;
    this.resolution_id = resolution.resolution_id;
    this.resolution = resolution.resolution;
    this.createdData = resolution.createdAt;
    this.doctorName = resolution["doctor.name"];
  }
}
