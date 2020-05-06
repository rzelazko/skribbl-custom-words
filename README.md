# Word Fetcher for https://skribbl.io/

Tiny utility to fetch words from [e-kalambury.pl](https://e-kalambury.pl/) to [skribbl.io](https://skribbl.io/)

## Usage

1. Clone repo
2. Install required packages and run
   ```bash
   npm install
   npm run main
   # OR
   node index.js
   ```

## Customize amount of words returned 

By defult output will contain 50 comma separated words.
To adjust this value use `-t` or `--total` option. 
Example:
```bash
npm run main -- --total 10
# OR
node index.js --total 10