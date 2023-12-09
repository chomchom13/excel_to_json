const generateCertificateHtml = (user) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 20px;
                }
                h2 {
                    color: #4CAF50;
                    text-align: center;
                }
                p {
                    text-align: center;
                }
                .certificate-container {
                    border: 2px solid #4CAF50;
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                }
            </style>
        </head>
        <body>
            <div class="certificate-container">
                <h2>Certificate of Contribution</h2>
                <p>This is to certify that ${user.name} has contributed an amount of $${user.amount} towards Go Green initiative.</p>
                <p>Number of trees planted on behalf of ${user.name}: ${user.no_of_trees}</p>
                <p>Best regards,</p>
                <p>chomchom</p>
            </div>
        </body>
        </html>
    `;
};

export { generateCertificateHtml };
