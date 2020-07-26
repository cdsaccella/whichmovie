import { getNewRiddle } from '../../services/riddleService.js'

const DEFAULT_MODE = 'normal';
const DEFAULT_LANGUAGE = 'en';

export default async ({ request, response }) => {
  try {
    const paramLanguage = request.url.searchParams.get("lang");
    const paramMode = request.url.searchParams.get("mode");
    const language = paramLanguage ? paramLanguage : DEFAULT_LANGUAGE;
    const mode = paramMode ? paramMode : DEFAULT_MODE;
    const riddle = await getNewRiddle(language, mode);
    response.body = { status: 'success', data: riddle };
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.body = { status: 'failed', data: [] };
  }
};
