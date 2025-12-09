import React, { useState } from 'react'

export default function Timepass() {
  const [items, setItems] = useState([
    { id: 1, text: 'First test item', value: 42 },
    { id: 2, text: 'Second item', value: 7 },
  ])
  const [text, setText] = useState('')
  const [num, setNum] = useState('')

  function addItem(e) {
    e.preventDefault()
    if (!text.trim()) return
    const newItem = { id: Date.now(), text: text.trim(), value: Number(num) || 0 }
    setItems((s) => [newItem, ...s])
    setText('')
    setNum('')
  }

  function clearItems() {
    setItems([])
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Timepass — Tailwind Test Page</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">A small playground to verify Tailwind utility classes, layout, and simple interactions.</p>
      </header>

      <main className="max-w-5xl mx-auto grid gap-6">
        {/* Controls card */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add an item</h2>
          <form onSubmit={addItem} className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Item text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              className="w-32 px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="numeric value"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              type="number"
            />

            <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700" type="submit">Add</button>
            <button type="button" onClick={clearItems} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-sm">Clear</button>
          </form>
        </section>

        {/* Stats + list */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Items</h3>
            {items.length === 0 ? (
              <p className="text-gray-500">No items yet — add something to test.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center justify-between p-3 rounded border border-gray-100 dark:border-gray-700">
                    <div>
                      <div className="font-semibold">{it.text}</div>
                      <div className="text-xs text-gray-500">id: {it.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{it.value}</div>
                      <div className="text-xs text-gray-500">numeric value</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Quick stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total items</span>
                <strong>{items.length}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sum of values</span>
                <strong>{items.reduce((a, c) => a + Number(c.value || 0), 0)}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average</span>
                <strong>{items.length ? Math.round(items.reduce((a, c) => a + Number(c.value || 0), 0) / items.length) : 0}</strong>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => alert('This is a test action')}
                className="w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Test action
              </button>
            </div>
          </aside>
        </section>

        {/* Footer / utilities */}
        <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Tailwind utilities verified:</div>
            <div className="mt-2 text-sm">flex, grid, gap, rounded, shadow, dark: variants, @apply-ready classes</div>
          </div>
          <div className="text-right text-xs text-gray-400">Component built for testing — tweak classes to experiment.</div>
        </section>
      </main>
    </div>
  )
}