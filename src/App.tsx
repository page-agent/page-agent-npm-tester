import { useRef, useState } from 'react'

export default function App() {
	const [logs, setLogs] = useState<string[]>([])
	const nextId = useRef(0)

	const handleClick = (num: number) => {
		setLogs((prev) => [
			...prev,
			`[${++nextId.current}] Button ${num} clicked`,
		])
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
