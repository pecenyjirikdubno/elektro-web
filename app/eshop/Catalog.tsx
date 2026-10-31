"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  sku: string;
  ean: string;
  category: string;
  description: string;
  image: string | null;
  availability: string;
  erpCode?: string;
};

type CategoryNode = { name: string; path: string; count: number; children: CategoryNode[] };

function parts(category: string): string[] {
  return category.split("/").map((part) => part.trim()).filter(Boolean);
}

function categoryTree(products: Product[]): CategoryNode[] {
  const roots: CategoryNode[] = [];
  for (const product of products) {
    let siblings = roots;
    let path = "";
    for (const part of parts(product.category)) {
      path = path ? `${path}/${part}` : part;
      let node = siblings.find((item) => item.name === part);
      if (!node) {
        node = { name: part, path, count: 0, children: [] };
        siblings.push(node);
      }
      node.count += 1;
      siblings = node.children;
    }
  }
  const sort = (nodes: CategoryNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name, "cs"));
    nodes.forEach((node) => sort(node.children));
  };
  sort(roots);
  return roots;
}

function CategoryBranch({
  node,
  active,
  expanded,
  onChoose,
  onToggle,
  depth = 0,
}: {
  node: CategoryNode;
  active: string;
  expanded: Set<string>;
  onChoose: (path: string) => void;
  onToggle: (path: string) => void;
  depth?: number;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expanded.has(node.path) || (active !== "" && (active === node.path || active.startsWith(`${node.path}/`)));
  return (
    <li className="category-node">
      <div className={`category-row ${active === node.path ? "is-active" : ""}`} style={{ paddingLeft: `${depth * 13 + 8}px` }}>
        {hasChildren ? (
          <button type="button" className="tree-toggle" aria-label={`${isExpanded ? "Sbalit" : "Rozbalit"} ${node.name}`} aria-expanded={isExpanded} onClick={() => onToggle(node.path)}>
            {isExpanded ? "▾" : "▸"}
          </button>
        ) : <span className="tree-spacer" />}
        <button type="button" className="category-choice" onClick={() => onChoose(node.path)} aria-current={active === node.path ? "true" : undefined}>
          <span>{node.name}</span><span className="category-count">{node.count}</span>
        </button>
      </div>
      {hasChildren && isExpanded && <ul className="category-children">{node.children.map((child) => (
        <CategoryBranch key={child.path} node={child} active={active} expanded={expanded} onChoose={onChoose} onToggle={onToggle} depth={depth + 1} />
      ))}</ul>}
    </li>
  );
}

export default function Catalog({ products }: { products: Product[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [selected, setSelected] = useState<Product | null>(null);
  const tree = useMemo(() => categoryTree(products), [products]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("cs");
    return products.filter((product) => {
      const path = parts(product.category).join("/");
      const inCategory = !category || path === category || path.startsWith(`${category}/`);
      const searchable = [product.name, product.sku, product.ean, product.description, product.category].join(" ").toLocaleLowerCase("cs");
      return inCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [products, query, category]);
  const breadcrumbs = category ? category.split("/") : [];
  const chooseCategory = (path: string) => setCategory(path);
  const toggle = (path: string) => setExpanded((previous) => {
    const next = new Set(previous);
    if (next.has(path)) next.delete(path); else next.add(path);
    return next;
  });

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return <>
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="/" aria-label="JZ Elektro - hlavni stranka">
          <img src="/logo.svg" alt="" />
          <span>JZ <strong>ELEKTRO</strong></span>
        </a>
        <nav className="site-nav" aria-label="Hlavni navigace">
          <a href="/">Domů</a>
          <a href="/#sluzby">Naše služby</a>
          <a href="/eshop" aria-current="page">E-shop</a>
          <a href="/#reference">Realizace</a>
          <a href="/nastroje">Elektro nástroje</a>
          <a href="/#proc">O nás</a>
          <a href="/#kontakt">Kontakt</a>
        </nav>
        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="eshop-mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕ Zavřít menu" : "☰ Menu"}
        </button>
      </div>
      {mobileMenuOpen && (
        <nav id="eshop-mobile-navigation" className="site-mobile-nav" aria-label="Mobilni navigace">
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Domů</a>
          <a href="/#sluzby" onClick={() => setMobileMenuOpen(false)}>Naše služby</a>
          <a href="/eshop" aria-current="page" onClick={() => setMobileMenuOpen(false)}>E-shop</a>
          <a href="/#reference" onClick={() => setMobileMenuOpen(false)}>Realizace</a>
          <a href="/nastroje" onClick={() => setMobileMenuOpen(false)}>Elektro nástroje</a>
          <a href="/#proc" onClick={() => setMobileMenuOpen(false)}>O nás</a>
          <a href="/#kontakt" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
        </nav>
      )}
      <div className="site-pilot">PILOTNÍ KATALOG · BEZ OBJEDNÁVEK</div>
    </header>
    <main className="wrap">
      <section className="hero">
        <div className="eyebrow">JZ Elektro · odborný výběr</div>
        <h1>Elektromateriál od lidí,<br /> kteří elektrotechnice rozumějí.</h1>
        <p>Pečlivě vybrané produkty, technické informace a odborné zázemí. Připravujeme internetový obchod.</p>
        <span className="notice">Zkušební verze – ceny a objednávky zatím nejsou aktivní.</span>
      </section>
      <div className="heading"><div><h2>Katalog výrobků</h2><p>{filtered.length} z {products.length} položek</p></div></div>
      <div className="shop-layout">
        <aside className="shop-sidebar" aria-label="Kategorie produktů">
          <div className="sidebar-heading">Kategorie produktů</div>
          <button type="button" className={`all-categories ${category === "" ? "is-active" : ""}`} onClick={() => chooseCategory("")}>Všechny kategorie <span>{products.length}</span></button>
          <ul className="category-tree">{tree.map((node) => <CategoryBranch key={node.path} node={node} active={category} expanded={expanded} onChoose={chooseCategory} onToggle={toggle} />)}</ul>
        </aside>
        <section className="shop-results" aria-label="Výrobky">
          <div className="filters"><input aria-label="Hledat výrobek" placeholder="Hledat výrobek, typ, kód nebo EAN…" value={query} onChange={(event) => setQuery(event.target.value)} />{(query || category) && <button type="button" className="reset-filters" onClick={() => { setQuery(""); setCategory(""); }}>Zrušit filtry</button>}</div>
          <nav className="breadcrumbs" aria-label="Cesta v kategoriích"><button type="button" onClick={() => chooseCategory("")}>Všechny kategorie</button>{breadcrumbs.map((part, index) => { const path = breadcrumbs.slice(0, index + 1).join("/"); return <span key={path}><span aria-hidden="true"> / </span><button type="button" onClick={() => chooseCategory(path)} aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}>{part}</button></span>; })}</nav>
          <div className="products">{filtered.map((product) => <article className="product" key={product.id}>
            <div className="photo">{product.image ? <img src={product.image} alt={product.name} loading="lazy" /> : <div className="placeholder">JZ <b>ELEKTRO</b><small>Fotografie se připravuje</small></div>}</div>
            <div className="info"><div className="category">{parts(product.category).join(" / ")}</div><h3>{product.name}</h3><div className="sku">Kód: {product.sku || "doplníme"}</div><div className="stock-status">{product.erpCode ? (product.availability === "Skladem" ? "Skladem" : "Na dotaz") : "Dostupnost ověřujeme"}</div><p className="desc">{product.description || "Technické informace připravujeme."}</p><div className="bottom"><span>Cena na dotaz</span><button type="button" onClick={() => setSelected(product)}>Detail výrobku</button></div></div>
          </article>)}</div>
          {filtered.length === 0 && <p className="empty">Žádné výrobky neodpovídají hledání. <button type="button" onClick={() => { setQuery(""); setCategory(""); }}>Zobrazit všechny</button></p>}
        </section>
      </div>
    </main>
    <footer><div className="wrap">JZ Elektro · Pilotní návrh katalogu · Bez možnosti nákupu</div></footer>
    {selected && <div className="overlay" role="presentation" onClick={() => setSelected(null)}><div className="modal" role="dialog" aria-modal="true" aria-label="Detail výrobku" onClick={(event) => event.stopPropagation()}><button type="button" className="close" onClick={() => setSelected(null)} aria-label="Zavřít">×</button><div className="category">{parts(selected.category).join(" / ")}</div><h2>{selected.name}</h2><p><b>Interní kód:</b> {selected.sku || "není uveden"}</p><p><b>EAN:</b> {selected.ean || "není uveden"}</p><p>{selected.description}</p><div className="notice">Cena na dotaz. Dostupnost: {selected.erpCode ? (selected.availability === "Skladem" ? "Skladem" : "Na dotaz") : "ověřujeme"}.</div></div></div>}
  </>;
}
