module.exports = {
    index: async ctx => {
        await strapi.plugins['email'].services.email.send({
            from: 'email@jeelinfotech.com',
            to: 'jigar09091992@gmail.com',
            cc: 'snehal@jeelinfotech.com',
            subject: 'Use strapi email provider successfully',
            text: 'Hello world!'
        });

        ctx.send("Email sent...")
    }
}