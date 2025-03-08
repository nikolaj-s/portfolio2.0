
export const safeJsonParse = (str) => {
    try {

        const parsed = JSON.parse(str);

        return parsed;

    } catch (error) {
        return {};
    }
}