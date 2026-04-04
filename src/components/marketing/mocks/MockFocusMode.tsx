export function MockFocusMode() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#1a1816] shadow-sm">
      {/* Dimmed top content */}
      <div className="px-12 pt-10 opacity-20" style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm leading-[1.9] text-[#d4cfc7]">
          Los cristales del estante principal habian perdido brillo durante la noche. Lyra los observo
          sin decir nada, conteniendo el aliento.
        </p>
      </div>

      {/* Focused paragraph (bright) */}
      <div className="px-12 py-6" style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm leading-[1.9] text-[#e8e2da]">
          Paso los dedos por la superficie del cristal mas grande, buscando la vibracion que sentia desde
          nina. Esta vez no hubo respuesta. Solo un frio seco, como tocar piedra comun. Algo habia cambiado
          en el mundo y ella era la unica que lo notaba.
        </p>
      </div>

      {/* Dimmed bottom content */}
      <div className="px-12 pb-10 opacity-20" style={{ fontFamily: "Georgia, serif" }}>
        <p className="text-sm leading-[1.9] text-[#d4cfc7]">
          Kael entro sin hacer ruido. Llevaba la espada envainada, pero la mano no se apartaba de la
          empunadura. Habia aprendido a no confiar en las mananas tranquilas.
        </p>
      </div>

      {/* Keyboard shortcut badge */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 backdrop-blur-sm">
        <span className="text-[10px] font-medium text-white/60">Modo concentracion</span>
        <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-white/50">
          Cmd+Shift+F
        </kbd>
      </div>

      {/* Typewriter cursor indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="text-[9px] text-white/40">Escritura con desplazamiento</span>
        </div>
      </div>
    </div>
  );
}
