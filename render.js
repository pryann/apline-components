import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, 'index.html');
const outputPath = path.join(__dirname, 'output.html');
const layoutPath = path.join(__dirname, 'src/view/layout/default.html');


fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading template file:', err);
        return;
    }

    const page = {
        domain: "example.com",
        title: "My vue project!",
        description: "Page description here. Less than 200 characters",
        og: {
            type: "Page Type Here",
            title: "Title Here",
            description: "Description Here",
            url: "http://www.example.com/",
            image: "http://example.com/image.jpg"
        },
        twitter: {
            card: "summary_large_image",
            title: "Title Here",
            description: "Page description here. Less than 200 characters",
            site: "@publisher",
            creator: "@author_handle",
            image: "http://www.example.com/image.jpg"
        },
    };

    const options = {
        filename: templatePath // This helps EJS resolve relative paths for includes
    };

    ejs.render(data, { page, layoutPath }, options, (err, str) => {
        if (err) {
            console.error('Error rendering template:', err);
            return;
        }

        fs.writeFile(outputPath, str, (err) => {
            if (err) {
                console.error('Error writing output file:', err);
                return;
            }

            console.log('Template rendered successfully to', outputPath);
        });
    });
});