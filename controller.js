const { userModel } = require("./db/user");
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID ,  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET, } = require("./utils");
const { AccessToken } = twilio.jwt;
const { VideoGrant, VoiceGrant } = AccessToken;
const { Room } = twilio;



const userSignupController = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const form = await new userModel({
      email,
      name,
    });

    const userDetails = await form.save();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    // return handleError(error.message)(res);
  }
};

const usertwillioapiController = async (req, res, next) => {
  const identity = req.query.identity;
  console.log('identity', identity)
  try {
    const token = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY_SID,
      TWILIO_API_KEY_SECRET,
      { identity }
    );

    const grant =
      req.query.type === "video" ? new VideoGrant() : new VoiceGrant();
    token.addGrant(grant);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: token.toJwt(),
    });
  } catch (error) {
    console.log(error);
    // return handleError(error.message)(res);
  }
};
const usercreateroomapiController = async (req, res, next) => {
  const { roomName } = req.body;
  try {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SECRET);

    const room = await client.video.rooms.create({
      uniqueName: roomName,
      type: "peer-to-peer",
    });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: room
    });
  } catch (error) {
    console.log(error);
    // return handleError(error.message)(res);
  }
};

module.exports = {
  userSignupController,
  usertwillioapiController,  usercreateroomapiController 
};
