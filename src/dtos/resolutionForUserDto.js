export default class ResolutionForUserDto {
  constructor(id, data) {
    this.patient_id = id;
    this.resolution_id = data.resolution_id;
    this.resolution = data.resolution;
    this.createdData = data.createdAt;
    this.doctorName = data['doctor.name'];
  }
}
