import { getNewRiddle } from '../../services/riddleService.js'

export default async ({ response }) => {
    try {
        const riddle = await getNewRiddle();
        response.body = { status: 'success', data: riddle };
    } catch (error) {
        console.log(error);
        response.status = 500;
        response.body = { status: 'failed', data: [] };
    }
};
