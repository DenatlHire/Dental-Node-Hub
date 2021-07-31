module.exports = ({ env }) => ({
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
            defaultFrom: 'email@jeelinfotech.com',
            defaultReplyTo: 'email@jeelinfotech.com',
            testAddress: 'snehal@jeelinfotech.com',
        },
    },
});
