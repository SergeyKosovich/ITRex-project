export default class ResolutionForUserDto {
  constructor(data) {
    this.resolution_id = data.resolution_id;
    this.resolution = data.resolution;
    this.createdData = data.createdAt;
    this.doctorName = data["doctor.name"];
  }
}
