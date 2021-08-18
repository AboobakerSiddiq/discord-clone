const Conversations = require("../models/conversations");

exports.getConversationsbyId = (req, res, next, id) => {
  Conversations.findById(id).exec((err, conversations) => {
    if (err) {
      return res.status(400).json({
        error: "Channel not found in DB",
      });
    }
    req.conversations = conversations;
    next();
  });
};

exports.postChannel = (req, res) => {
  const conversations = new Conversations(req.body);
  conversations.save((err, conversations) => {
    if (err) {
      return res.status(400).json({
        error: "Can't Store the messages",
      });
    }
    res.json(conversations);
  });
};

exports.getChannels = (req, res) => {
  Conversations.find().exec((err, conversations) => {
    if (err) {
      return res.status(400).json({
        error: "No conversations Found",
      });
    }
    // res.json(conversations);
    res.json(
      conversations.map((convo) => {
        return {
          id: convo._id,
          name: convo.channelName,
        };
      })
    );
  });
};

exports.postMessages = (req, res) => {
  const newMessage = req.body;

  Conversations.updateOne(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Can't save the conversation",
        });
      }
      res.json(data);
    }
  );
};

exports.getConversation = (req, res) => {
  const id = req.query.id;

  Conversations.find({ _id: id }).exec((err, conversations) => {
    if (err) {
      return res.status(400).json({
        error: "Channel not found in DB",
      });
    }
    return res.json(conversations);
  });
};
