import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        video: videoId
    })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Video unliked"))
    }

    const like = await Like.create({
        user: req.user._id,
        video: videoId
    })

    res.status(201).json(new ApiResponse(201, like, "Video liked"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        comment: commentId
    })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Comment unliked"))
    }

    const like = await Like.create({
        user: req.user._id,
        comment: commentId
    })

    res.status(201).json(new ApiResponse(201, like, "Comment liked"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    const existingLike = await Like.findOne({
        user: req.user._id,
        tweet: tweetId
    })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.status(200).json(new ApiResponse(200, null, "Tweet unliked"))
    }

    const like = await Like.create({
        user: req.user._id,
        tweet: tweetId
    })

    res.status(201).json(new ApiResponse(201, like, "Tweet liked"))
})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideos = await Like.find({ user: req.user._id, video: { $ne: null } })
        .populate("video") // populates video details
        .sort({ createdAt: -1 })

    res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
