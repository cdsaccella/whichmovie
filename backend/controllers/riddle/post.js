import { checkOption } from "../../services/riddleService.js";

export default async ({ request, response }) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = { status: 'failed', data: [] };
        return;
    }

    const {
        value: { riddle, option }
    } = await request.body();

    if (!riddle || !option) {
        response.status = 422;
        response.body = { status: 'failed', data: { message: "Riddle and option are required" } };
        return;
    }

    const result = checkOption(riddle, option);
    response.body = { status: 'success', data: { result: result } };
};
