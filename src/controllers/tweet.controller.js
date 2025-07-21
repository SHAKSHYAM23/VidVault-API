import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content is required")
    }

    const tweet = await Tweet.create({
        content,
        author: req.user._id
    })

    res.status(201).json(new ApiResponse(201, tweet, "Tweet created"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const { userId } = req.params

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const tweets = await Tweet.find({ author: userId })
        .sort({ createdAt: -1 })

    res.status(200).json(new ApiResponse(200, tweets, "User tweets fetched"))
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params
    const { content } = req.body

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    if (tweet.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet")
    }

    tweet.content = content || tweet.content
    await tweet.save()

    res.status(200).json(new ApiResponse(200, tweet, "Tweet updated"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    if (tweet.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this tweet")
    }

    await tweet.deleteOne()

    res.status(200).json(new ApiResponse(200, null, "Tweet deleted"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
