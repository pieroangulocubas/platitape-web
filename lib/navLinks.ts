// Orden alineado con la secuencia vertical real en app/page.tsx:
// Proyectos → Planes → ¿Cómo funciona? → Respaldo → Simulador → Comparativo → App → (Registro) → Testimonios → Kids → Asesores
// secondary: en la barra de escritorio solo desde xl (en tablet no caben);
// siempre visibles en el menú móvil y en el footer.
export const navLinks: { label: string; href: string; secondary?: boolean }[] = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Planes", href: "#planes" },
  { label: "¿Cómo funciona?", href: "#como-funciona" },
  { label: "Simulador", href: "#simulador" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "App", href: "#app" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Kids", href: "#kids", secondary: true },
  { label: "Asesores", href: "#asesores", secondary: true },
];
