import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { channelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    const videos = await Video.find({ owner: channelId })

    const totalVideos = videos.length
    const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0)

    const totalSubscribers = await Subscription.countDocuments({ channel: channelId })

    const videoIds = videos.map(video => video._id)
    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } })

    res.status(200).json(
        new ApiResponse(200, {
            totalVideos,
            totalViews,
            totalSubscribers,
            totalLikes
        }, "Channel stats fetched successfully")
    )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { channelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    const videos = await Video.find({ owner: channelId }).sort({ createdAt: -1 })

    res.status(200).json(
        new ApiResponse(200, videos, "Channel videos fetched successfully")
    )
})

export {
    getChannelStats,
    getChannelVideos
}