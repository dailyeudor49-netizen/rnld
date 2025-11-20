const fs = require('fs');

// Leggi il file HTML
const html = fs.readFileSync('C:\\mk\\airwave-original.html', 'utf8');

// Estrai il contenuto del body
const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
const bodyContent = bodyMatch ? bodyMatch[1] : '';

// Estrai gli stili
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

// Estrai gli script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const scripts = scriptMatch ? scriptMatch[1] : '';

// Salva body, styles e scripts separatamente
fs.writeFileSync('C:\\mk\\body-content.txt', bodyContent, 'utf8');
fs.writeFileSync('C:\\mk\\styles-content.txt', styles, 'utf8');
fs.writeFileSync('C:\\mk\\scripts-content.txt', scripts, 'utf8');

console.log('Extracted successfully!');
console.log('Body length:', bodyContent.length);
console.log('Styles length:', styles.length);
console.log('Scripts length:', scripts.length);
