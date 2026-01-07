import { useState } from 'react'

interface Toast {
	id: number
	message: string
}

export default function App() {
	const [toasts, setToasts] = useState<Toast[]>([])

	const handleClick = (num: number) => {
		const id = Date.now()
		setToasts((prev) => [
			...prev,
			{ id, message: `按钮 ${num} 被点击了！` },
		])
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, 5000)
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
			<div className="toasts">
				{toasts.map((toast) => (
					<div key={toast.id} className="toast">
						{toast.message}
					</div>
				))}
			</div>
		</div>
	)
}
