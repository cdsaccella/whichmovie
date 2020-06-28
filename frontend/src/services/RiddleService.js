export const getNewRiddle = async () => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/riddles`);
    return result.json();
};

export const assertRiddle = async (riddle, option) => {
    const data = {
        riddle: riddle,
        option: option,
    };
    const result = await fetch(`${process.env.REACT_APP_API_URL}/riddles`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return result.json();
}