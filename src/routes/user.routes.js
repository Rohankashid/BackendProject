import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    incomingRefreshAccessToken,
    changeCurrentUserPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import pkg from 'jsonwebtoken';
const { verify } = pkg;



const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

//secured  routes

router.route("/logout").post(verify, logoutUser)

router.route("/refresh-token").post(incomingRefreshAccessToken)

router.route("/change-password").post(verify, changeCurrentUserPassword())

router.route("/current-user").get(verify, getCurrentUser)

router.route("/update-account").patch(verify, updateAccountDetails)

router.route("/avatar").patch(verify, upload.single("avatar"), updateUserAvatar)

router.route("/cover-image").patch(verify, upload.single("/coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verify, getUserChannelProfile)

router.route("/history").get(verify, getWatchHistory)


export default router