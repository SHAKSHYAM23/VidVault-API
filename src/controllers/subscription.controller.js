import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    if (channelId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel")
    }

    const existing = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id
    })

    if (existing) {
        await existing.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Unsubscribed from channel"))
    }

    const newSub = await Subscription.create({
        channel: channelId,
        subscriber: req.user._id
    })

    res.status(201).json(new ApiResponse(201, newSub, "Subscribed to channel"))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    const subscribers = await Subscription.find({ channel: channelId })
        .populate("subscriber", "username avatar") // populate subscriber info

    res.status(200).json(new ApiResponse(200, subscribers, "Subscribers fetched"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID")
    }

    const channels = await Subscription.find({ subscriber: subscriberId })
        .populate("channel", "username avatar") // populate channel info

    res.status(200).json(new ApiResponse(200, channels, "Subscribed channels fetched"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
