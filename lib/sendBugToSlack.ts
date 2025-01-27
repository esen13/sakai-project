import axios from 'axios'
import { isProd } from '.'

export const fetchSlack = axios.create({
	baseURL: '/api/send-bug-to-slack/',
	timeout: 8000,
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': 'slackBotV2'
	}
})

export const LIST_LOG_COMPONENT = {
	MAIN_FORM: 'MAIN FORM',
	BOOKING_FORM: 'BOOKING FORM',
	CHECKOUT_FORM: 'CHECKOUT FORM',
	CREATE_RESERVATION: 'CREATE RESERVATION',
	VEHICLE_LIST: 'VEHICLES LIST',
	GOOGLE_API: 'GOOGLE_API',
	PAGE_404: '404 FORM',
	BLOG_FORM: 'BLOG FORM'
}

export const sendBugToSlack = async (
	bugText: string,
	componentName: string,
	fromAddress: string = 'Empty',
	dropAddress: string = 'Empty'
) => {
	try {
		if (isProd) {
			// @ts-ignore
			const userData = window.navigator?.userAgentData
			const screenWidth = window.screen.width
			const screenHeight = window.screen.height
			const localIdPosthog = JSON.parse(
				localStorage.getItem(
					'ph_phc_RSBcyf8aioYMum42LCsd8oXWHyYQuSJzNYP8l9WcueS_posthog'
				) as any
			)
			const sessionIdPosthog = JSON.parse(
				sessionStorage.getItem(
					'ph_phc_RSBcyf8aioYMum42LCsd8oXWHyYQuSJzNYP8l9WcueS_window_id'
				) as any
			)
			const urlParams = new URLSearchParams(window.location.href)
			const gclid = urlParams.get('gclid') || 'Empty'

			const parseData = {
				log: bugText,
				componentName,
				posthogIDLocal: localIdPosthog?.$client_session_props?.sessionId,
				posthogIDSession: sessionIdPosthog,
				gclid,
				fromAddress,
				dropAddress,
				page: window.location.href,
				referrer: document.referrer,
				source: 'Landing',
				screenResolution: `${screenWidth}x${screenHeight}`,
				userAgent: window.navigator.userAgent,
				userAgentData: JSON.stringify(userData)
			}

			const response = await fetchSlack.post('', parseData)
			if (response.status === 200) {
				console.log(response.data.message)
			} else {
				console.log(`Error: ${response.data.message}`)
			}
			return response
		}
		return null
	} catch (error: any) {
		console.log(`Error: ${error.message}`)
		return null
	}
}
