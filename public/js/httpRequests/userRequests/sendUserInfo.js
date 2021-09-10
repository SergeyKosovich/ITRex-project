export default async function sendUserInfo(
  userMail,
  userPass,
  userFirstName,
  userLastName,
  userGender,
  userBirthday,
) {
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userMail,
        password: userPass,
        firstName: userFirstName,
        lastName: userLastName,
        gender: userGender,
        birthday: userBirthday,
      }),
    });
    if (response.status !== 201) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
