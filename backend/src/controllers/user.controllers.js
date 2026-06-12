import FriendRequest from "../models/friendRequests.js";
import User from "../models/user.js";

export const getRecommended = async (req, res) => {
  try {
    const currentUser = req.user;
    const recommendedList = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } }, // not current user
        { _id: { $nin: currentUser.friends } }, // not in the user friend list
        { isOnboarded: true },
      ],
    });
    return res.status(200).json(recommendedList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );
    return res.status(200).json(user.friends);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const sendFriendRequest = async (req, res) => {
  try {
    const currentId = req.user._id;
    const recipientId = req.params.id;
    const checkRecipient = await User.findOne({ _id: recipientId });

    if (!checkRecipient) {
      return res.status(400).json({ message: "User not found" });
    }
    if (checkRecipient.friends.includes(currentId)) {
      return res.status(400).json({ message: "Cannot send friend request" });
    }
    // kiểm tra yêu cầu đã có chưa
    const request = await FriendRequest.findOne({
      $or: [
        { sender: currentId, recipient: recipientId },
        { sender: recipientId, recipient: currentId },
      ],
    });
    if (request) {
      return res.status(400).json({ message: "Request has already exits" });
    }
    const newRequest = await FriendRequest.create({
      sender: currentId,
      recipient: recipientId,
    });
    return res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const acceptFriendRequest = async (req, res) => {
  const requestId = req.params.id;
  const request = await FriendRequest.findById(requestId);
  if (!request) {
    return res.status(400).json({ message: "Invalid request" });
  }
  // check they are actually the recipient
  if (request.recipient.toString() !== req.user._id) {
    return res.status(403).json({ message: "You are not allowed to do this" });
  }
  request.status = "accepted";
  await request.save();
  // add to 2 user friend list
  await User.findByIdAndUpdate(request.sender, {
    $addToSet: { friends: request.recipient },
  });
  await User.findByIdAndUpdate(request.recipient, {
    $addToSet: { friends: request.sender },
  });
  return res.status(200).json({ message: "Accepted request successfully" });
};
export const getFriendRequest = async (req, res) => {
  try {
    const requestList = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage",
    );
    const acceptList = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    return res.status(200).json({ request: requestList, accept: acceptList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getSentFriendRequest = async (req, res) => {
  try {
    const requestList = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage",
    );
    return res.status(200).json({ sentRequest: requestList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
