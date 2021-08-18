const express = require("express");
const {
  postChannel,
  getChannels,
  postMessages,
  getConversation,
} = require("../controllers/conversations");
const router = express.Router();

//post-channels
router.post("/new/channel", postChannel);

//get-channels
router.get("/channels", getChannels);

//post-messages
router.post("/new/message", postMessages);

router.get("/get/conversation", getConversation);

module.exports = router;
