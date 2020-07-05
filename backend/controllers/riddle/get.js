import { getNewRiddle } from '../../services/riddleService.js'

export default async ({ params, response }) => {
    try {
        const riddle = await getNewRiddle(params.lang);
        response.body = { status: 'success', data: riddle };
    } catch (error) {
        console.log(error);
        response.status = 500;
        response.body = { status: 'failed', data: [] };
    }
};
