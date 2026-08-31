import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  buildPersonGraphEdges,
  decisionById,
  failureById,
  getBreakthroughsForPerson,
  getDecisionsForPerson,
  getDiscoveriesForPerson,
  getExperimentsForPerson,
  getFailuresForPerson,
  getTechnologiesForPerson,
  personById,
} from "@/lib/data/catalog";
import type { GraphEdge } from "@/lib/data/types";

type GraphNodeView = {
  id: string;
  label: string;
  kind: string;
  x: number;
  y: number;
  route?: { to: "/people/$slug" | "/decisions/$slug" | "/failures/$slug"; params: { slug: string } };
};

function nodeRoute(id: string): GraphNodeView["route"] {
  const person = personById[id];
  if (person) return { to: "/people/$slug", params: { slug: person.slug } };

  const decision = decisionById[id];
  if (decision) return { to: "/decisions/$slug", params: { slug: decision.slug } };

  const failure = failureById[id];
  if (failure) return { to: "/failures/$slug", params: { slug: failure.slug } };

  return undefined;
}

function buildNodes(personId: string): { nodes: GraphNodeView[]; edges: GraphEdge[] } {
  const person = personById[personId];
  if (!person) return { nodes: [], edges: [] };

  const items: { id: string; label: string; kind: string }[] = [
    { id: person.id, label: person.name, kind: "person" },
    ...getDecisionsForPerson(personId).map((item) => ({ id: item.id, label: item.title, kind: "decision" })),
    ...getFailuresForPerson(personId).map((item) => ({ id: item.id, label: item.title, kind: "failure" })),
    ...getExperimentsForPerson(personId).map((item) => ({ id: item.id, label: item.title, kind: "experiment" })),
    ...getBreakthroughsForPerson(personId).map((item) => ({ id: item.id, label: item.title, kind: "breakthrough" })),
    ...getTechnologiesForPerson(personId).map((item) => ({ id: item.id, label: item.name, kind: "technology" })),
    ...getDiscoveriesForPerson(personId).map((item) => ({ id: item.id, label: item.title, kind: "discovery" })),
  ].slice(0, 10);

  const edges = buildPersonGraphEdges(personId).filter(
    (edge) => items.some((node) => node.id === edge.from) && items.some((node) => node.id === edge.to),
  );

  const centerX = 280;
  const centerY = 120;
  const radius = 150;
  const nodes: GraphNodeView[] = items.map((item, index) => {
    const angle = index === 0 ? -Math.PI / 2 : ((index - 1) / Math.max(items.length - 1, 1)) * Math.PI * 1.35 - Math.PI * 0.9;
    const x = index === 0 ? centerX - 60 : centerX + Math.cos(angle) * radius - 60;
    const y = index === 0 ? centerY - 16 : centerY + Math.sin(angle) * radius - 16;
    return {
      ...item,
      label: item.label.length > 28 ? `${item.label.slice(0, 28)}…` : item.label,
      x,
      y,
      route: nodeRoute(item.id),
    };
  });

  return { nodes, edges };
}

function GraphNodeShape({
  node,
  onNavigate,
}: {
  node: GraphNodeView;
  onNavigate: (route: NonNullable<GraphNodeView["route"]>) => void;
}) {
  const interactive = Boolean(node.route);
  return (
    <g
      role={interactive ? "link" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={interactive ? "cursor-pointer" : undefined}
      onClick={() => node.route && onNavigate(node.route)}
      onKeyDown={(event) => {
        if (interactive && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          node.route && onNavigate(node.route);
        }
      }}
    >
      <rect
        x={node.x}
        y={node.y}
        width={120}
        height="32"
        rx="4"
        className={node.kind === "person" ? "fill-accent" : "fill-surface stroke-border"}
      />
      <text
        x={node.x + 8}
        y={node.y + 20}
        className={node.kind === "person" ? "fill-accent-fg" : "fill-ink"}
        fontSize="9"
        fontWeight="600"
      >
        {node.label}
      </text>
    </g>
  );
}

export function PersonGraph({ personId }: { personId: string }) {
  const navigate = useNavigate();
  const { nodes, edges } = buildNodes(personId);
  const person = personById[personId];

  if (!nodes.length) {
    return <p className="text-sm text-muted">No graph data for this person.</p>;
  }

  return (
    <div className="overflow-x-auto border border-border bg-paper p-4 shadow-[var(--shadow-border)]">
      <svg viewBox="0 0 560 240" role="img" aria-label="Interactive knowledge graph" className="h-auto min-w-[320px] w-full">
        {edges.map((edge) => {
          const from = nodes.find((node) => node.id === edge.from);
          const to = nodes.find((node) => node.id === edge.to);
          if (!from || !to) return null;
          const x1 = from.x + 60;
          const y1 = from.y + 16;
          const x2 = to.x + 60;
          const y2 = to.y + 16;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          return (
            <g key={edge.id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-rule" strokeWidth="1.5" />
              <text x={mx} y={my - 4} fontSize="8" className="fill-muted">
                {edge.label}
              </text>
            </g>
          );
        })}
        {nodes.map((node) => (
          <GraphNodeShape key={node.id} node={node} onNavigate={(route) => navigate(route)} />
        ))}
      </svg>
      <p className="mt-3 text-xs text-muted">Click person, decision, or failure nodes to drill down. Edge labels describe relationships.</p>
      {person ? (
        <Link to="/people/$slug" params={{ slug: person.slug }} className="mt-2 inline-flex text-sm font-medium text-accent">
          Open full profile
        </Link>
      ) : null}
    </div>
  );
}
