"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./careers.module.css";

const productTags = ["Saras"] as const;
type ProductTag = (typeof productTags)[number];

type Role = {
  title: string;
  href: string;
  blurb: string;
  meta: string;
  tag: ProductTag;
  theme: string;
};

const roles: readonly Role[] = [
  {
    title: "Agent Engineer (Intern)",
    href: "/careers/agent-engineer",
    blurb: "Set up agent environments and structure, and make the process repeatable.",
    meta: "REMOTE · 2-WEEK PROBATION + 1 MONTH →",
    tag: "Saras",
    theme: styles.cardDark,
  },
  {
    title: "Integration Engineer",
    href: "/careers/integration-engineer",
    blurb:
      "Explore, build and rebuild third-party integrations and MCP servers, and keep them reliable.",
    meta: "REMOTE · 2-WEEK PROBATION + 2 WEEKS →",
    tag: "Saras",
    theme: styles.cardAmber,
  },
  {
    title: "Platform Engineer",
    href: "/careers/platform-engineer",
    blurb:
      "Own DevOps, cloud hosting, networking and security for a platform built to scale.",
    meta: "REMOTE · INFRASTRUCTURE →",
    tag: "Saras",
    theme: styles.cardTeal,
  },
  {
    title: "Lead, Design and Branding",
    href: "/careers/design-lead",
    blurb:
      "Own the brand and produce brand artifacts, video and media for Saras and Sanganak in an AI-native design environment.",
    meta: "REMOTE · LEAD · AI-NATIVE DESIGN →",
    tag: "Saras",
    theme: styles.cardCoral,
  },
];

const transitionDuration = 180;

function rolesForTag(tag: ProductTag | null) {
  return tag === null ? roles : roles.filter((role) => role.tag === tag);
}

export function CareersList() {
  const [activeTag, setActiveTag] = useState<ProductTag | null>(null);
  const [displayedRoles, setDisplayedRoles] = useState<readonly Role[]>(roles);
  const [exitingRoles, setExitingRoles] = useState<ReadonlySet<string>>(new Set());
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (transitionTimer.current !== null) {
        clearTimeout(transitionTimer.current);
      }
    },
    [],
  );

  function applyFilter(tag: ProductTag | null) {
    const nextTag = tag === activeTag ? null : tag;
    const nextRoles = rolesForTag(nextTag);
    const nextHrefs = new Set(nextRoles.map((role) => role.href));
    const rolesLeaving = displayedRoles.filter((role) => !nextHrefs.has(role.href));

    if (transitionTimer.current !== null) {
      clearTimeout(transitionTimer.current);
    }

    setActiveTag(nextTag);

    if (rolesLeaving.length === 0) {
      setExitingRoles(new Set());
      setDisplayedRoles(nextRoles);
      return;
    }

    setExitingRoles(new Set(rolesLeaving.map((role) => role.href)));
    transitionTimer.current = setTimeout(() => {
      setDisplayedRoles(nextRoles);
      setExitingRoles(new Set());
      transitionTimer.current = null;
    }, transitionDuration);
  }

  return (
    <>
      <section className={styles.filterBar} aria-label="Career filters">
        <div
          className={`${styles.container} ${styles.filterRail}`}
          role="group"
          aria-label="Filter open roles by product"
        >
          <span className={styles.filterLabel}>Filter by product</span>
          {productTags.map((tag) => (
            <button
              className={styles.tagButton}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => applyFilter(tag)}
              key={tag}
            >
              {tag}
            </button>
          ))}
          <button
            className={styles.clearButton}
            type="button"
            disabled={activeTag === null}
            onClick={() => applyFilter(null)}
          >
            Clear filters
          </button>
        </div>
      </section>

      <section className={styles.rolesSection} aria-label="Open roles">
        <div className={`${styles.container} ${styles.rolesGrid}`}>
          {displayedRoles.map((role) => (
            <Link
              className={`${styles.roleCard} ${role.theme} ${
                exitingRoles.has(role.href) ? styles.roleCardExiting : ""
              }`}
              href={role.href}
              key={role.href}
            >
              <h2 className={styles.cardTitle}>{role.title}</h2>
              <p className={styles.cardBlurb}>{role.blurb}</p>
              <span className={styles.cardMeta}>{role.meta}</span>
            </Link>
          ))}
          {displayedRoles.length === 0 && activeTag !== null ? (
            <p className={styles.emptyState} role="status">
              No open roles for {activeTag} right now.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
