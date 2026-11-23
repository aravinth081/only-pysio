const fs = require('fs');
const path = require('path');

const logoPath = path.resolve('public/images/logo.jpg');
const svgPath = path.resolve('public/icon.svg');
const icoPath = path.resolve('public/favicon.ico');
const appleIconPath = path.resolve('public/apple-touch-icon.png');

const buf = fs.readFileSync(logoPath);
console.log('Logo size bytes:', buf.length);

// Also copy to favicon.ico and apple-touch-icon.png
fs.writeFileSync(icoPath, buf);
fs.writeFileSync(appleIconPath, buf);

// Create SVG embedding the exact logo image
const b64 = buf.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <clipPath id="circleClip">
    <circle cx="50" cy="50" r="50"/>
  </clipPath>
  <image width="100" height="100" href="data:image/jpeg;base64,${b64}" clip-path="url(#circleClip)"/>
</svg>`;

fs.writeFileSync(svgPath, svgContent);
console.log('Successfully generated public/icon.svg, public/favicon.ico, public/apple-touch-icon.png');
