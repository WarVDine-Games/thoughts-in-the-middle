const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base 36
    const randomPart = Math.random().toString(36).substring(2, 10); // Random string
    return `${timestamp}-${randomPart}`; // Combine both parts
};

export const useUniqueClientId = (): string => {
    const uniqueClientId = localStorage.getItem("uniqueClientId");
    if (!uniqueClientId) {
        const newUniqueClientId = generateUniqueId();
        localStorage.setItem("uniqueClientId", newUniqueClientId);
        return newUniqueClientId;
    }

    return uniqueClientId;
};
