import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Search,
  Filter,
  Sun,
  Moon,
  Download,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  BadgeCheck,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
const PROFILE = {
  name: "Marco",
  role: "Desarrollador Java | MySQL",
  location: "Arequipa, Perú",
  phone: "+51 965067161",
  email: "marco_82004@hotmail.com",
  about:
    "Soy un desarrollador orientado a resultados. Construyo aplicaciones web, enfocándome en buenas prácticas, rendimiento y una experiencia de usuario limpia.",
  socials: {
    github: "https://github.com/Marco2184",
    linkedin: "",
  },
  resumeUrl: "",
  highlights: ["Python", "Java", "MySQL"],
};

const SKILLS = {
  Frontend: ["HTML", "CSS"],
  Backend: ["Java"],
  Datos: ["MySQL", "MongoDB", "Modelado ER"],
  Calidad: ["Clean Code", "Lean/Kaizen"],
};



const EDUCATION = [
  {
    degree: "Carrera",
    school: "TECSUP - Desarrollo de Software",
    date: "2024 — 2026",
    detail: "Enfoque en desarrollo de software, base de datos y mejora continua.",
  },
];

const PROJECTS = [
  {
    id: "p1",
    title: "Sistema de Inventario (CRUD)",
    subtitle: "React + Node + MySQL",
    description:
      "Sistema para registrar, buscar, modificar y eliminar productos con autenticación, roles y reportes.",
    highlights: ["CRUD completo + validaciones", "Búsqueda y filtros", "Reportes"],
    stack: ["React", "Node", "MySQL", "Tailwind"],
    type: "Web App",
    status: "Finalizado",
    year: 2026,
    repoUrl: "",
    liveUrl: "",
  },
  {
    id: "p2",
    title: "App de Gestión Académica",
    subtitle: "React + API REST",
    description:
      "Plataforma para gestionar alumnos, cursos, matrículas y reportes con panel administrativo.",
    highlights: ["Panel con métricas", "Roles/Permisos", "Diseño modular"],
    stack: ["React", "TypeScript", "Express"],
    type: "Dashboard",
    status: "En progreso",
    year: 2026,
    repoUrl: "",
    liveUrl: "",
  },
  {
    id: "p3",
    title: "Java Swing + MySQL",
    subtitle: "Mantenimiento de registros",
    description:
      "Aplicación de escritorio con herencia y polimorfismo, conectada a MySQL, para mantenimiento y búsquedas avanzadas.",
    highlights: ["Arquitectura por capas", "Consultas SQL", "UI enfocada en productividad"],
    stack: ["Java", "Swing", "MySQL"],
    type: "Desktop",
    status: "Finalizado",
    year: 2025,
    repoUrl: "",
    liveUrl: "",
  },
];

const PROJECT_TYPES = ["Todos", "Web App", "Dashboard", "Desktop"];
const PROJECT_STATUSES = ["Todos", "Finalizado", "En progreso"];

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{subtitle}</p> : null}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function ActionButton({ variant = "outline", className = "", ...props }) {
  return (
    <Button
      variant={variant}
      className={
        "rounded-2xl border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground " +
        "shadow-sm " +
        className
      }
      {...props}
    />
  );
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  const applyTheme = (t) => {
    const root = document.documentElement;
    root.classList.remove("dark");

    const setDark = (isDark) => {
      if (isDark) root.classList.add("dark");
    };

    if (t === "system") {
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      setDark(!!prefersDark);
    } else {
      setDark(t === "dark");
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme !== "system") return;

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handler = () => applyTheme("system");
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [theme]);

  return { theme, setTheme };
}

function Navbar({ onNavigate, theme, setTheme }) {
  const items = [
    { id: "home", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "projects", label: "Proyectos" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Educación" },
    { id: "contact", label: "Contacto" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3 justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 rounded-2xl px-2 py-1 hover:bg-accent transition"
        >
          <div className="h-9 w-9 rounded-2xl border border-border bg-card flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-semibold">{PROFILE.name}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">{PROFILE.role}</div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {items.map((it) => (
            <Button
              key={it.id}
              variant="ghost"
              className="rounded-2xl text-foreground hover:bg-accent"
              onClick={() => onNavigate(it.id)}
            >
              {it.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-border bg-card hover:bg-accent">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">Tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Layers className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-border bg-card lg:hidden hover:bg-accent">
                Menú
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              {items.map((it) => (
                <DropdownMenuItem key={it.id} onClick={() => onNavigate(it.id)}>
                  {it.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start"
      >
        <Card className="rounded-3xl border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl tracking-tight">
              Hola, soy <span className="font-extrabold">{PROFILE.name}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{PROFILE.role}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Pill>
                <MapPin className="h-3.5 w-3.5 mr-1" /> {PROFILE.location}
              </Pill>
              <Pill>
                <BadgeCheck className="h-3.5 w-3.5 mr-1" /> Disponible para proyectos
              </Pill>
            </div>

            <p className="text-sm leading-relaxed max-w-2xl">{PROFILE.about}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <ActionButton asChild>
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </ActionButton>
              <ActionButton asChild>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </ActionButton>
              <ActionButton asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Contactar
                </a>
              </ActionButton>
              <ActionButton asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Descargar CV
                </a>
              </ActionButton>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-wrap gap-2">
              {PROFILE.highlights.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Resumen rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Enfoque</div>
                <div className="text-sm text-muted-foreground">
                  Apps web limpias, mantenibles y listas para producción.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Lo que aporto</div>
                <div className="text-sm text-muted-foreground">
                  Arquitectura, UI/UX, bases de datos y buenas prácticas.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Fortalezas</div>
                <div className="text-sm text-muted-foreground">
                  Orden, documentación (UML/ER) y orientación a objetivos.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 pt-12">
      <SectionTitle
        icon={Sparkles}
        title="Sobre mí"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            <p>{PROFILE.about}</p>
            <ul className="mt-4 list-disc pl-5 space-y-2">
              <li>Me importa el orden: código limpio, nombres claros y estructura.</li>
              <li>Trabajo con foco: entregables completos, no solo “funciona en mi PC”.</li>
              <li>Documentación: ER/UML, reglas de negocio y trazabilidad cuando aplica.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Datos de contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-muted-foreground">{PROFILE.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-muted-foreground">{PROFILE.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a className="underline underline-offset-4 text-foreground" href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <ActionButton asChild>
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </ActionButton>
              <ActionButton asChild>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </ActionButton>
              <ActionButton
                asChild
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" /> CV
                </a>
              </ActionButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Projects() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.subtitle, p.description, ...(p.stack || [])].join(" ").toLowerCase().includes(q);
      const matchesType = type === "Todos" || p.type === type;
      const matchesStatus = status === "Todos" || p.status === status;
      return matchesQuery && matchesType && matchesStatus;
    }).sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [query, type, status]);

  return (
    <section id="projects" className="scroll-mt-24 pt-12">
      <SectionTitle
        icon={Layers}
        title="Proyectos"
      />

      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, stack, descripción…"
            className="pl-10 rounded-2xl"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-border bg-card hover:bg-accent">
                <Filter className="mr-2 h-4 w-4" /> {type}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl" align="end">
              {PROJECT_TYPES.map((t) => (
                <DropdownMenuItem key={t} onClick={() => setType(t)}>
                  {t}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-border bg-card hover:bg-accent">
                <BadgeCheck className="mr-2 h-4 w-4" /> {status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl" align="end">
              {PROJECT_STATUSES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setStatus(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl border-border bg-card/80 h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{p.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className="rounded-full" variant="secondary">
                      {p.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                <div className="flex flex-wrap gap-2">
                  {(p.stack || []).slice(0, 8).map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setActive(p)}
                  >
                    Ver detalles
                  </Button>

                  {p.repoUrl ? (
                    <ActionButton asChild>
                      <a href={p.repoUrl} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Repo
                      </a>
                    </ActionButton>
                  ) : null}

                  {p.liveUrl ? (
                    <ActionButton asChild>
                      <a href={p.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                      </a>
                    </ActionButton>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  return (
    <Dialog open={!!project} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-3xl max-w-2xl border-border bg-card/95 backdrop-blur">
        {project ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{project.title}</DialogTitle>
              <DialogDescription className="mt-1">{project.subtitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full" variant="secondary">
                  {project.type}
                </Badge>
                <Badge className="rounded-full" variant="secondary">
                  {project.status}
                </Badge>
                <Badge className="rounded-full" variant="outline">
                  {project.year}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

              <div>
                <div className="text-sm font-semibold mb-2">Lo más importante</div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {(project.highlights || []).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm font-semibold mb-2">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {(project.stack || []).map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                {project.repoUrl ? (
                  <ActionButton asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Ver repositorio
                    </a>
                  </ActionButton>
                ) : null}
                {project.liveUrl ? (
                  <ActionButton asChild>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Ver demo
                    </a>
                  </ActionButton>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 pt-12">
      <SectionTitle icon={BadgeCheck} title="Skills"/>
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([group, items]) => (
          <Card key={group} className="rounded-3xl border-border bg-card/80">
            <CardHeader>
              <CardTitle className="text-base">{group}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


function Education() {
  return (
    <section id="education" className="scroll-mt-24 pt-12">
      <SectionTitle icon={GraduationCap} title="Educación" />
      <div className="grid gap-6 sm:grid-cols-2">
        {EDUCATION.map((ed, idx) => (
          <Card key={idx} className="rounded-3xl border-border bg-card/80">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{ed.degree}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ed.school}</p>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {ed.date}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">{ed.detail}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pt-12 pb-16">
      <SectionTitle icon={Mail} title="Contacto" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-border bg-card/80">
          <CardHeader>
            <CardTitle className="text-base">Escríbeme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
            </p>
            <ActionButton
              asChild
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
            >
              <a href={`mailto:${PROFILE.email}?subject=Contacto%20desde%20tu%20Portafolio`}>
                <Mail className="mr-2 h-4 w-4" /> Enviar correo
              </a>
            </ActionButton>

            <Separator />
            <div className="flex flex-wrap gap-2">
              <ActionButton asChild>
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </ActionButton>
              <ActionButton asChild>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </ActionButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function PortfolioApp() {
  const { theme, setTheme } = useTheme();

  const onNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-foreground">
      <div className="fixed inset-0 -z-10 bg-background" />
      <div className="fixed inset-0 -z-10 opacity-60 [background:radial-gradient(1200px_600px_at_20%_0%,hsl(var(--primary)/0.18),transparent_60%),radial-gradient(1000px_500px_at_80%_10%,hsl(var(--ring)/0.18),transparent_55%)]" />

      <Navbar onNavigate={onNavigate} theme={theme} setTheme={setTheme} />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
