const https = require('https');

const handler = (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const message = req.body.text;
      const webhookUrl = 'https://hooks.slack.com/services/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';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const request = https.request(webhookUrl, options, (response) => {
        if (response.statusCode === 200) {
          res.status(200).json({ success: true, message: 'Slack message sent' });
          resolve();
        } else {
          res.status(500).json({ success: false, message: 'Failed to send Slack message' });
          reject();
        }
      });

      request.on('error', (error) => {
        res.status(500).json({ success: false, message: 'Failed to send Slack message', error });
        reject();
      });

      request.write(JSON.stringify({ text: message }));
      request.end();
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      reject();
    }
  });
};

module.exports = handler;