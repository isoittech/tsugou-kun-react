const models = require('../models');

export default async () => {
    try {
        const ret: any = await models.event.create({
            name: 'test',
            memo: 'memo',
            schedule_update_id: 'hhehehehe'
        })
        return ret;
    } catch (error) {
        return {
            name: error.name,
            message: error.message,
        };
    }
};