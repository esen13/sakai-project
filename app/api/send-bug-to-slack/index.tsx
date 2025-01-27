import NextCors from 'nextjs-cors'

export default async function handler(req, res) {
	// res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, x-api-key')

	await NextCors(req, res, {
		// Options
		methods: ['GET', 'POST', 'OPTIONS'],
		origin: '*', // replace this with your actual origin
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	})

	if (req.method === 'POST' || req.method === 'OPTIONS') {
		const apiKey = req.headers['x-api-key']
		const accessKey = process.env.SLACK_API_KEY_X

		// if (req.method === 'OPTIONS') {
		// 	res.status(200).end()
		// 	return
		// }

		if (apiKey !== accessKey) {
			return res.status(401).json({ error: 'Unauthorized' })
		}

		// const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 60000))

		const SLACK_WEBHOOK_URL = 'https://slack.com/api/chat.postMessage' // 12 dec 2024
		const apiToken = process.env.SLACK_API_TOKEN
		const channel = process.env.SLACK_CHANNEL_ID

		try {
			const {
				log,
				componentName,
				posthogIDLocal,
				posthogIDSession,
				gclid,
				fromAddress,
				dropAddress,
				page,
				referrer,
				source,
				screenResolution,
				userAgent,
				userAgentData
			} = req.body

			// if (!fromAddress) {
			// 	return res.status(400).json({ error: 'From not be empty' })
			// }
			// if (!dropAddress) {
			// 	return res.status(400).json({ error: 'Dropoff not be empty' })
			// }
			if (!log) {
				return res.status(400).json({ error: 'Log not be empty' })
			}
			// if (!page) {
			// 	return res.status(400).json({ error: 'Page not be empty' })
			// }
			if (!source) {
				return res.status(400).json({ error: 'Source not be empty' })
			}

			const iconsSource = source === 'Landing' ? ' :large_purple_circle:' : ' :large_blue_circle:'
			const iconsAddress = ':round_pushpin:'
			const iconsLaptop = ':computer:'

			const blocks = [
				{
					type: 'divider'
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `You have a new log :rotating_light:: *${log}*`
					}
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*From ${iconsAddress}:*\n${fromAddress || 'Empty'}`
						},
						{
							type: 'mrkdwn',
							text: `*Dropoff ${iconsAddress}:*\n${dropAddress || 'Empty'}`
						}
					]
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*PosthogID (Local):*\n${posthogIDLocal || 'Empty'}`
						},
						{
							type: 'mrkdwn',
							text: `*PosthogID (Session):*\n${posthogIDSession || 'Empty'}`
						}
					]
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*Component name:*\n${componentName}`
						},
						{
							type: 'mrkdwn',
							text: `*Gclid:*\n${gclid || 'Empty'}`
						}
					]
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*Page:*\n${page || 'Empty'}`
						},
						{
							type: 'mrkdwn',
							text: `*Referrer:*\n${referrer || 'Empty'}`
						}
					]
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*UserAgent ${iconsLaptop}:*\n${userAgent || 'Empty'} `
						},
						{
							type: 'mrkdwn',
							text: `*UserAgentData ${iconsLaptop}:*\n${userAgentData || 'Empty'}`
						}
					]
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*Screen Resolution:*\n${screenResolution || 'Empty'}`
						},
						{
							type: 'mrkdwn',
							text: `*Source:*\n${source + iconsSource}`
						}
					]
				}
			]

			const response = await fetch(SLACK_WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiToken}`
				},
				body: JSON.stringify({
					channel,
					text: '',
					unfurl_links: false,
					unfurl_media: false,
					blocks
				})
			})

			if (response.ok) {
				return res.status(200).json({ message: 'Message successfully sent to Slack' })
			} else {
				return res.status(response.status).json({ error: 'Error sending to Slack' })
			}
		} catch (error) {
			return res.status(500).json({ error: 'Server error: ' + error.message })
		}
	}
	return res.status(405).json({ error: 'Method not allowed' })
}
