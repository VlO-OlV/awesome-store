export default () => ({
	port: parseInt(process.env.PORT as string) || 3030,
	jwt: {
		secret: process.env.ACCESS_SECRET,
		accessTTL: process.env.ACCESS_TTL,
		refreshTTL: process.env.REFRESH_TTL,
	},
});
