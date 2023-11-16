export const successResponse = (data: unknown) => {
    return {
        code: 200,
        message: "success",
        responseTime: new Date().getTime(),
        response: {
            results: data,
            totalCount: JSON.parse(JSON.stringify(data)).length,
        },
    };
};
