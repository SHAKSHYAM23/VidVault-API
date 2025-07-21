import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query

    const filter = {}
    if (query) {
        filter.title = { $regex: query, $options: "i" }
    }
    if (userId && isValidObjectId(userId)) {
        filter.owner = userId
    }
    filter.isPublished = true

    const sort = {}
    sort[sortBy] = sortType === "asc" ? 1 : -1

    const videos = await Video.find(filter)
        .populate("owner", "username avatar")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))

    const total = await Video.countDocuments(filter)

    res.status(200).json(
        new ApiResponse(200, { total, page: Number(page), videos }, "Videos fetched")
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body

    const videoFile = req.files?.video?.[0]
    const thumbnailFile = req.files?.thumbnail?.[0]

    if (!videoFile) {
        throw new ApiError(400, "Video file is required")
    }

    const uploadedVideo = await uploadOnCloudinary(videoFile.path)
    const uploadedThumbnail = thumbnailFile ? await uploadOnCloudinary(thumbnailFile.path) : null

    const video = await Video.create({
        title,
        description,
        videoFile: uploadedVideo.url,
        thumbnail: uploadedThumbnail?.url || "",
        owner: req.user._id,
        isPublished: true,
    })

    res.status(201).json(new ApiResponse(201, video, "Video published successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId).populate("owner", "username avatar")

    if (!video || !video.isPublished) {
        throw new ApiError(404, "Video not found")
    }

    video.views += 1
    await video.save()

    res.status(200).json(new ApiResponse(200, video, "Video fetched"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video")
    }

    const thumbnailFile = req.files?.thumbnail?.[0]
    let uploadedThumbnail = null
    if (thumbnailFile) {
        uploadedThumbnail = await uploadOnCloudinary(thumbnailFile.path)
    }

    video.title = title || video.title
    video.description = description || video.description
    video.thumbnail = uploadedThumbnail?.url || video.thumbnail

    await video.save()

    res.status(200).json(new ApiResponse(200, video, "Video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video")
    }

    await video.deleteOne()

    res.status(200).json(new ApiResponse(200, null, "Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to change publish status")
    }

    video.isPublished = !video.isPublished
    await video.save()

    const msg = video.isPublished ? "Video published" : "Video unpublished"

    res.status(200).json(new ApiResponse(200, video, msg))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
