import { useGameStore } from '../../store/gameStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useGameStore()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-2 right-2 z-50 w-9 h-9 rounded-full flex items-center justify-center
                 bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10
                 text-gray-800 dark:text-gray-100 text-lg shadow-lg
                 active:scale-95 transition-transform"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
