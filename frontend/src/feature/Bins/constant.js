export const getStatus = (status) => {
    switch (status) {
        case "empty":
            return "empty";
        case "mid":
            return "mid";
        case "full":
            return "full";
        default:
            return "unknown";
    }
}