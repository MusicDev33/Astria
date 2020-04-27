export function validateRegister(body: any): {success: boolean, msg: string} {

  // Check if SchoolID has illegal characters
  if (body.schoolID.indexOf(' ') > -1 || !body.schoolID.match(/^[a-z0-9_]+$/g)) {
    return {success: false, msg: 'Illegal SchoolID, make sure you got the right SchoolID and try again.'};
  }

  if (!body.name.match(/^[a-zA-Z0-9_\-']+$/g)) {
    return {
      success: false,
      msg: 'Your name has illegal characters in it'
    };
  }

  if (body.name.length > 50) {
    return {
      success: false,
      msg: 'If your name is actually that long, send a text to 208-631-0704 and we will sort it out. Sorry for the inconvenience.'
    };
  }

  if (body.email && body.email.includes('@')) {
    return {success: false, msg: 'This is not a valid email!'};
  }

  if (body.password.length < 8) {
    return {success: false, msg: 'Your password should be at least 8 characters.'};
  }

  return {success: true, msg: 'Request sent.'};
}
