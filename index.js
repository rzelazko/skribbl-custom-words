const fetch = require('node-fetch');
const argv = require('yargs')
    .usage('Fetch words from e-kalambury.pl\nUsage: $0 --total 20')
    .options({
        total: {
            alias: 't',
            description: 'Total words returned',
            default: 50
        },
        noDiacritics: {
            alias: 'n',
            description: 'Remove accents/diacritics in all words',
            default: false
        }
    })
    .boolean('noDiacritics')
    .help('h')
    .alias('h', 'help').argv;
const url = "https://e-kalambury.pl/hasla.php";
const options = {
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    },
    "body": "poziom1=1&poziom2=2&czas=0&x=181&y=67",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
};
const wordRegex = /<h4>([^<]+)</i;

const fetchAndParse = async (url, options) => {
    try {
        const response = await fetch(url, options);
        let data = await response.text();
        let matchingData = data.match(wordRegex);
        return sanitizeWord(matchingData[1]);
    } catch (error) {
        console.log(error);
    }
};

function sanitizeWord(string) {
    let result;
    if (string) {
        result = string.replace(/\s+/, ' ').trim().toLowerCase()
    } else {
        result = "";
    }
    if (argv.noDiacritics) {
        result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l")
    }
    return result;
}

const printCustomWords = async () => {
    let customWords = [];
    for (let i = 0; i < argv.total; i++) {
        let response = await fetchAndParse(url, options);
        customWords.push(response);
    }
    console.log(customWords.join(', '));
}

printCustomWords();