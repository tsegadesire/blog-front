module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#06B6D4',
        surface: '#F8FAFC',
        success: '#10B981',
        danger: '#EF4444',
      },
      boxShadow: {
        glow: '0 32px 80px rgba(15, 23, 42, 0.12)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'auth-hero': 'radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 36%), radial-gradient(circle at 70% 0%, rgba(6, 182, 212, 0.14), transparent 22%)',
        'gradient-blue': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      },
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-14px)', opacity: '0.9' },
        },
        'appear-up': {
          from: { transform: 'translateY(24px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        'float-up': 'float-up 8s ease-in-out infinite',
        'appear-up': 'appear-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-in-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'blob': 'blob 7s infinite',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '24px',
      },
    },
  },
  plugins: [],
};
