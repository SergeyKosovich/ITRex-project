export default class ResolutionForDoctorDto {
  constructor(patient, resolution) {
    this.patient_id = patient.patient_id;
    this.name = patient.name;
    this.gender = patient.gender;
    this.birthday = patient.birthday;
    this.resolution_id = resolution.resolution_id;
    this.resolution = resolution.resolution;
    this.createdData = resolution.createdAt;
    this.doctorName = resolution['doctor.name'];
  }
}
