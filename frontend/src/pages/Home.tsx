import Typewriter from 'typewriter-effect';

export function Home() {
  return (
    <main className='flex items-center justify-center mt-80 text-5xl'>
      <Typewriter
        options={{
          strings: ['Melhor Gerencimento de contas bancárias', 'Tranferências Rapidas e Seguras', 'Totalmente gratuidas e Ilimitadas'],
          autoStart: true,
          loop: true,
          delay: 40
        }}
      />
    </main>
  )
}