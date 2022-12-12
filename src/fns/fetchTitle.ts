export const fetchTitle = async (url: string): Promise<string> => {
    let response = await fetch(url)
    let text = await response.text()
    let doc = new DOMParser().parseFromString(text, 'text/html')
    return doc.title
}
