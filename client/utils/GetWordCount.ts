export function getWordCount(text: string) {
    return text.split(" ").length;
}

export function getFirstXWords(text: string, x: number) {
    return text.split(" ").slice(0, x).join(" ");
}