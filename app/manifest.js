export default function manifest() {
  return {
    name: 'PrimeFit — Personal Menswear Stylist',
    short_name: 'PrimeFit',
    description: 'Answer four questions about yourself and get menswear that suits you.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f5f1',
    theme_color: '#29352d',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
