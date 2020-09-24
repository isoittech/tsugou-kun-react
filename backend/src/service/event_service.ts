import e from "express";

const models = require('../models');

export default async (moyooshiModel: any) => {
    try {
        console.log("async test log moyooshi_service 1")

        console.log(`moyooshiModel:${moyooshiModel}`)

        const ret: any = await models.Moyooshi.create(moyooshiModel)
        console.log("async test log moyooshi_service 2")
        return ret;
    } catch (error) {
        console.log("async test log moyooshi_service error 1")
        return {
            name: error.name,
            message: error.message,
        };
    }
};