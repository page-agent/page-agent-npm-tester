import { useRef, useState } from 'react'
import { PageAgent } from 'page-agent'

// Demo server - has rate limit, prompt limit, origin limit
const DEMO_MODEL = 'PAGE-AGENT-FREE-TESTING-RANDOM'
const DEMO_BASE_URL =
	'https://hwcxiuzfylggtcktqgij.supabase.co/functions/v1/llm-testing-proxy'
const DEMO_API_KEY = 'PAGE-AGENT-FREE-TESTING-RANDOM'

const agent = new PageAgent({
	model: DEMO_MODEL,
	baseURL: DEMO_BASE_URL,
	apiKey: DEMO_API_KEY,
	language: 'zh-CN',
})

export default function App() {
	const [logs, setLogs] = useState<string[]>([])
	const [isRunning, setIsRunning] = useState(false)
	const nextId = useRef(0)

	const handleClick = (num: number) => {
		setLogs((prev) => [
			...prev,
			`[${++nextId.current}] Button ${num} clicked`,
		])
	}

	const handleAgentClick = async () => {
		if (isRunning) return
		setIsRunning(true)
		setLogs((prev) => [
			...prev,
			`[${++nextId.current}] 🤖 Agent starting...`,
		])
		try {
			await agent.execute('点击按钮 3')
			setLogs((prev) => [
				...prev,
				`[${++nextId.current}] 🤖 Agent finished`,
			])
		} catch (err) {
			setLogs((prev) => [
				...prev,
				`[${++nextId.current}] ❌ Agent error: ${err}`,
			])
		} finally {
			setIsRunning(false)
		}
	}

	return (
		<div className="container">
			<div className="buttons">
				{[1, 2, 3, 4, 5].map((num) => (
					<button key={num} onClick={() => handleClick(num)}>
						{num}
					</button>
				))}
			</div>
			<button
				className="agent-button"
				onClick={handleAgentClick}
				disabled={isRunning}
			>
				{isRunning ? '🤖 Running...' : '🤖 Let Agent Click Button 3'}
			</button>
			<div className="logs">
				{logs.map((log, i) => (
					<div key={i} className="log">
						{log}
					</div>
				))}
			</div>
		</div>
	)
}
