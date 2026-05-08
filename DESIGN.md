---
version: alpha
name: Forge One Daylight Foundry
description: A bright AI-native incubator design system for Forge One.
colors:
  primary: "#1457FF"
  primary-dark: "#0B2A75"
  secondary: "#13B8A6"
  tertiary: "#F59E0B"
  neutral: "#F6F8FB"
  surface: "#FFFFFF"
  surface-soft: "#EEF3F8"
  on-surface: "#111827"
  on-muted: "#52606D"
  line: "#D8E0EA"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 96px
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: 0em
  headline-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: 0em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0.14em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 104px
  gutter: 24px
  max-width: 1180px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    padding: 14px
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 28px
  page-shell:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 0px
  section-band:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 64px
  divider:
    backgroundColor: "{colors.line}"
    textColor: "{colors.on-muted}"
    rounded: "{rounded.none}"
    height: 1px
  agent-signal:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    padding: 10px
  stage-marker:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.sm}"
    padding: 10px
---

# Forge One Design System

## Overview

Forge One should feel like a daylight AI foundry: intelligent, precise, optimistic, and operational. The experience should communicate an AI-native incubator where human judgment, agent workforces, autonomous workflows, and product incubation happen inside one coherent system. Avoid dark cyberpunk, generic AI gradients, heavy corporate SaaS styling, and decorative sci-fi cliches.

## Colors

The palette uses bright neutrals, graphite text, a decisive electric blue, a secondary teal for system intelligence, and restrained amber for incubation energy.

- **Primary (#1457FF):** Main action color, used sparingly for decisive CTAs and key system highlights.
- **Primary Dark (#0B2A75):** Deep blue for navigation, high-emphasis text, and technical anchors.
- **Secondary (#13B8A6):** Agent-network and automation accent, used for labels and supporting signals.
- **Tertiary (#F59E0B):** Warm incubator accent for stage numbers and selective emphasis.
- **Neutral (#F6F8FB):** Page foundation; clean, bright, and less sterile than pure white.
- **Surface (#FFFFFF):** Primary content panels and navigation surfaces.
- **Line (#D8E0EA):** Structural dividers, grid borders, and low-noise separation.

## Typography

Use **Inter** with **Noto Sans SC** fallback. Headlines are heavy and confident, but letter spacing remains `0` for readability across English and Chinese. Body text should feel editorial and precise, with generous line height. Labels use uppercase English and compact Chinese headings only when they serve navigation or metadata.

## Layout

Use a max-width content grid of 1180px with full-width bands for major sections. The landing page should read like an operating system for incubation: hero, mission, principles, incubation pipeline, governance, product philosophy, and culture. Use whitespace to separate ideas, not oversized cards or decorative wrappers.

## Elevation & Depth

Use tonal layers, borders, and subtle glass effects instead of heavy shadows. Depth should come from crisp surfaces over soft backgrounds, not dark overlays. Hero imagery can carry atmosphere, but text areas must remain bright and highly legible.

## Shapes

Use architectural sharpness with small radii. Buttons and panels should generally use 4px to 8px radius. Avoid pill-heavy styling unless a chip is semantically a tag.

## Components

Primary buttons use electric blue with white text. Secondary buttons use white or translucent white surfaces with blue graphite text. Panels use white backgrounds, thin borders, and structured spacing. Pipeline and principle modules should feel like system cells in an incubator dashboard.

## Do's and Don'ts

- Do make the first viewport immediately signal Forge One as an AI-native incubator.
- Do use blue for primary action and teal for agent-system signals.
- Do keep content structured, operational, and suitable for repeated scanning.
- Do preserve bilingual meaning from the charter when editing copy.
- Don't use black as the dominant background.
- Don't rely on purple gradients, foggy overlays, bokeh, or decorative orbs.
- Don't make the page feel like a generic marketing SaaS template.
