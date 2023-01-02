const getKey = () => {}

const generate = async (prompt) => {
    const key = await getKey();
    const url = 'https://api.openai.com/v1/completions';

    const completionResponse = await fetch(url, {
        method: 'POST',
        hearders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.7,
        }),
    });

    const completion = await completionResponse.json();
    return completion.choices.pop();
}


const generateCompletionAction = async (info) => {
    try{
        const {selectionText} = info;
        const basePromptPrefix = 
        `
        `;

        const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);
        console.log(baseCompletion.text);
    }
    catch (error){
        console.log(error);
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'context-run',
        title: 'Poopy Toddler',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(generateCompletionAction);