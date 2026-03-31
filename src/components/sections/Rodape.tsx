export default function Rodape() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-border py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">

        <p className="font-body text-white/30 text-xs leading-relaxed max-w-xl">
          © 2026 Marcelo Toledo | marcelotoledo.com — Todos os dados coletados são usados exclusivamente para envio do
          acesso à live e comunicações relacionadas ao evento.
        </p>

        <p className="font-body text-white/30 text-xs">
          Desenvolvido por:{' '}
          <a
            href="https://escala.novadimensaohub.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white/50 hover:text-primary transition-colors duration-200"
          >
            Nova Dimensão
          </a>
        </p>

      </div>
    </footer>
  )
}
