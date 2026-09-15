<template>
  <AppLayout>
    <div class="docs-shell">
      <header class="docs-mobile-header">
        <button class="docs-icon-button" type="button" title="打开文档导航" @click="mobileNavOpen = true">
          <Icon name="menu" />
        </button>
        <span class="docs-mobile-title">文档中心</span>
        <button class="docs-icon-button" type="button" title="搜索文档" @click="openSearch">
          <Icon name="search" />
        </button>
      </header>

      <div v-if="mobileNavOpen" class="docs-drawer-backdrop" @click="mobileNavOpen = false"></div>

      <aside class="docs-sidebar" :class="{ 'docs-sidebar-open': mobileNavOpen }">
        <div class="docs-brand">
          <div class="docs-brand-icon"><Icon name="book" /></div>
          <div>
            <strong>文档中心</strong>
            <span>Sub2API 使用教程</span>
          </div>
          <button class="docs-sidebar-close" type="button" title="关闭文档导航" @click="mobileNavOpen = false">
            <Icon name="x" />
          </button>
        </div>

        <button class="docs-search-button" type="button" @click="openSearch">
          <Icon name="search" size="sm" />
          <span>搜索文档</span>
        </button>

        <nav class="docs-nav" aria-label="文档导航">
          <section v-for="group in documentGroups" :key="group.category">
            <h2>{{ group.category }}</h2>
            <RouterLink
              v-for="document in group.documents"
              :key="document.slug"
              :to="`/help/${document.slug}`"
              :class="{ active: document.slug === activeDocument.slug }"
              @click="mobileNavOpen = false"
            >
              <Icon :name="document.slug === 'claude-code' ? 'terminal' : 'document'" size="sm" />
              <span>{{ document.title }}</span>
            </RouterLink>
          </section>
        </nav>

        <a class="docs-source-link" :href="activeDocument.sourceUrl" target="_blank" rel="noopener noreferrer">
          <Icon name="externalLink" size="sm" />
          <span>查看参考文档</span>
        </a>
      </aside>

      <main ref="articleScroller" class="docs-main" @scroll="updateActiveHeading">
        <article ref="articleElement" class="docs-article" v-html="renderedHtml" @click="handleArticleClick"></article>

        <nav class="docs-pagination" aria-label="文档翻页">
          <RouterLink v-if="previousDocument" :to="`/help/${previousDocument.slug}`" class="previous">
            <span>上一篇</span>
            <strong>{{ previousDocument.title }}</strong>
          </RouterLink>
          <span v-else></span>
          <RouterLink v-if="nextDocument" :to="`/help/${nextDocument.slug}`" class="next">
            <span>下一篇</span>
            <strong>{{ nextDocument.title }}</strong>
          </RouterLink>
        </nav>
      </main>

      <aside class="docs-outline">
        <h2>本页目录</h2>
        <nav>
          <a
            v-for="heading in headings"
            :key="heading.id"
            :href="`#${heading.id}`"
            :class="[{ active: activeHeadingId === heading.id }, `level-${heading.level}`]"
            @click.prevent="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </a>
        </nav>
      </aside>
    </div>

    <Teleport to="body">
      <div v-if="searchOpen" class="docs-search-overlay" role="presentation" @click.self="closeSearch">
        <section class="docs-search-dialog" role="dialog" aria-modal="true" aria-label="搜索文档">
          <div class="docs-search-input-wrap">
            <Icon name="search" />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="search"
              placeholder="搜索安装、配置、错误信息..."
              aria-label="搜索文档"
              @keydown.esc="closeSearch"
            />
            <button v-if="searchQuery" type="button" title="清除搜索" @click="searchQuery = ''">
              <Icon name="x" size="sm" />
            </button>
            <button type="button" class="docs-search-close" @click="closeSearch">关闭</button>
          </div>
          <div class="docs-search-results">
            <p v-if="searchQuery && !searchResults.length" class="docs-empty-search">没有找到相关文档</p>
            <RouterLink
              v-for="document in searchResults"
              :key="document.slug"
              :to="`/help/${document.slug}`"
              @click="closeSearch"
            >
              <Icon name="document" />
              <span>
                <strong>{{ document.title }}</strong>
                <small>{{ document.description }}</small>
              </span>
              <Icon name="arrowRight" size="sm" />
            </RouterLink>
          </div>
        </section>
      </div>
    </Teleport>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import AppLayout from '@/components/layout/AppLayout.vue'
import Icon from '@/components/icons/Icon.vue'
import { buildHelpDocuments, searchHelpDocuments, type HelpDocument } from '@/content/helpDocs'

interface HeadingItem {
  id: string
  text: string
  level: number
}

const route = useRoute()
const router = useRouter()
const documents = buildHelpDocuments(window.location.origin)
const headings = ref<HeadingItem[]>([])
const activeHeadingId = ref('')
const mobileNavOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const articleElement = ref<HTMLElement | null>(null)
const articleScroller = ref<HTMLElement | null>(null)

const requestedSlug = computed(() => String(route.params.slug || 'claude-code'))
const activeDocument = computed<HelpDocument>(() => (
  documents.find((document) => document.slug === requestedSlug.value) || documents[0]
))
const activeIndex = computed(() => documents.findIndex((document) => document.slug === activeDocument.value.slug))
const previousDocument = computed(() => documents[activeIndex.value - 1] || null)
const nextDocument = computed(() => documents[activeIndex.value + 1] || null)
const searchResults = computed(() => searchHelpDocuments(documents, searchQuery.value))
const documentGroups = computed(() => {
  const categories = [...new Set(documents.map((document) => document.category))]
  return categories.map((category) => ({
    category,
    documents: documents.filter((document) => document.category === category),
  }))
})

function headingId(text: string, index: number): string {
  const normalized = text
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return normalized ? `${normalized}-${index}` : `section-${index}`
}

function renderMarkdown(markdown: string): string {
  const parsed = marked.parse(markdown) as string
  const parsedDocument = new DOMParser().parseFromString(parsed, 'text/html')
  const nextHeadings: HeadingItem[] = []

  parsedDocument.querySelectorAll('h2, h3').forEach((element, index) => {
    const text = element.textContent?.trim() || ''
    const id = headingId(text, index)
    element.id = id
    nextHeadings.push({ id, text, level: Number(element.tagName.slice(1)) })
  })

  parsedDocument.querySelectorAll('a').forEach((element) => {
    if (element.origin !== window.location.origin) {
      element.target = '_blank'
      element.rel = 'noopener noreferrer'
    }
  })

  headings.value = nextHeadings
  activeHeadingId.value = nextHeadings[0]?.id || ''
  return DOMPurify.sanitize(parsedDocument.body.innerHTML, { ADD_ATTR: ['target', 'rel'] })
}

const renderedHtml = computed(() => renderMarkdown(activeDocument.value.markdown))

function enhanceCodeBlocks() {
  articleElement.value?.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.docs-copy-button')) return
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'docs-copy-button'
    button.title = '复制代码'
    button.textContent = '复制'
    pre.appendChild(button)
  })
}

async function handleArticleClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const button = target.closest<HTMLButtonElement>('.docs-copy-button')
  if (button) {
    const code = button.parentElement?.querySelector('code')?.textContent || ''
    await navigator.clipboard.writeText(code)
    button.textContent = '已复制'
    window.setTimeout(() => { button.textContent = '复制' }, 1600)
  }
}

function scrollToHeading(id: string) {
  const heading = articleElement.value?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
  if (!heading || !articleScroller.value) return
  articleScroller.value.scrollTo({ top: heading.offsetTop - 24, behavior: 'smooth' })
  activeHeadingId.value = id
  window.history.replaceState(null, '', `${route.path}#${id}`)
}

function updateActiveHeading() {
  const scroller = articleScroller.value
  if (!scroller) return
  let current = headings.value[0]?.id || ''
  for (const heading of headings.value) {
    const element = articleElement.value?.querySelector<HTMLElement>(`#${CSS.escape(heading.id)}`)
    if (element && element.offsetTop <= scroller.scrollTop + 90) current = heading.id
  }
  activeHeadingId.value = current
}

async function openSearch() {
  searchOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}

function handleGlobalKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
    event.preventDefault()
    searchOpen.value ? closeSearch() : openSearch()
  }
}

watch(activeDocument, async () => {
  if (requestedSlug.value !== activeDocument.value.slug) {
    await router.replace(`/help/${activeDocument.value.slug}`)
    return
  }
  articleScroller.value?.scrollTo({ top: 0 })
  await nextTick()
  enhanceCodeBlocks()
})

onMounted(async () => {
  window.addEventListener('keydown', handleGlobalKeydown)
  if (!route.params.slug) await router.replace(`/help/${activeDocument.value.slug}`)
  await nextTick()
  enhanceCodeBlocks()
})

onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>

<style scoped>
.docs-shell {
  display: grid;
  grid-template-columns: 232px minmax(0, 1fr) 190px;
  height: calc(100vh - 7.5rem);
  min-height: 620px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #1f2937;
}
.docs-mobile-header, .docs-sidebar-close, .docs-drawer-backdrop { display: none; }
.docs-sidebar { display: flex; min-width: 0; flex-direction: column; overflow-y: auto; border-right: 1px solid #e5e7eb; background: #f9fafb; padding: 22px 16px 16px; }
.docs-brand { display: flex; align-items: center; gap: 10px; padding: 0 4px 20px; }
.docs-brand-icon { display: flex; width: 34px; height: 34px; flex: none; align-items: center; justify-content: center; border-radius: 7px; background: #2563eb; color: #fff; }
.docs-brand strong { display: block; font-size: 15px; color: #111827; }
.docs-brand span { display: block; margin-top: 2px; font-size: 11px; color: #6b7280; }
.docs-search-button { display: flex; width: 100%; align-items: center; gap: 8px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; padding: 8px 10px; color: #6b7280; font-size: 13px; text-align: left; }
.docs-search-button:hover { border-color: #9ca3af; color: #374151; }
.docs-nav { flex: 1; padding-top: 24px; }
.docs-nav section + section { margin-top: 24px; }
.docs-nav h2 { padding: 0 10px 7px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; }
.docs-nav a { display: flex; align-items: center; gap: 9px; border-radius: 6px; padding: 8px 10px; color: #4b5563; font-size: 13px; line-height: 1.35; }
.docs-nav a:hover { background: #eef2f7; color: #111827; }
.docs-nav a.active { background: #e8efff; color: #1d4ed8; font-weight: 600; }
.docs-nav a svg { flex: none; }
.docs-source-link { display: flex; align-items: center; gap: 8px; margin-top: 18px; border-top: 1px solid #e5e7eb; padding: 16px 8px 2px; color: #6b7280; font-size: 12px; }
.docs-source-link:hover { color: #2563eb; }
.docs-main { position: relative; min-width: 0; overflow-y: auto; scroll-behavior: smooth; }
.docs-article { width: min(100% - 64px, 760px); margin: 0 auto; padding: 54px 0 30px; color: #374151; font-size: 15px; line-height: 1.8; }
.docs-article :deep(h1) { margin: 0 0 16px; color: #111827; font-size: 32px; font-weight: 750; line-height: 1.25; }
.docs-article :deep(h1 + p) { margin-bottom: 32px; color: #6b7280; font-size: 16px; }
.docs-article :deep(h2) { margin: 38px 0 14px; border-top: 1px solid #e5e7eb; padding-top: 28px; color: #111827; font-size: 23px; font-weight: 700; line-height: 1.35; scroll-margin-top: 24px; }
.docs-article :deep(h3) { margin: 27px 0 10px; color: #111827; font-size: 18px; font-weight: 650; line-height: 1.45; scroll-margin-top: 24px; }
.docs-article :deep(p) { margin: 0 0 16px; }
.docs-article :deep(ul), .docs-article :deep(ol) { margin: 0 0 18px; padding-left: 24px; }
.docs-article :deep(ul) { list-style: disc; }
.docs-article :deep(ol) { list-style: decimal; }
.docs-article :deep(li) { margin: 5px 0; padding-left: 3px; }
.docs-article :deep(a) { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; }
.docs-article :deep(strong) { color: #111827; font-weight: 650; }
.docs-article :deep(blockquote) { margin: 22px 0; border-left: 4px solid #3b82f6; border-radius: 0 6px 6px 0; background: #eff6ff; padding: 14px 18px; color: #1e3a5f; }
.docs-article :deep(blockquote p:last-child) { margin-bottom: 0; }
.docs-article :deep(code) { border-radius: 4px; background: #f3f4f6; padding: 2px 5px; color: #be123c; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: .88em; }
.docs-article :deep(pre) { position: relative; margin: 18px 0 22px; overflow-x: auto; border: 1px solid #263244; border-radius: 7px; background: #111827; padding: 18px; color: #e5e7eb; line-height: 1.65; }
.docs-article :deep(pre code) { background: transparent; padding: 0; color: inherit; font-size: 13px; }
.docs-article :deep(.docs-copy-button) { position: absolute; top: 8px; right: 8px; border: 1px solid #4b5563; border-radius: 5px; background: #1f2937; padding: 4px 8px; color: #d1d5db; font-size: 11px; line-height: 1.4; }
.docs-article :deep(.docs-copy-button:hover) { background: #374151; color: #fff; }
.docs-article :deep(table) { display: block; width: 100%; margin: 18px 0 24px; overflow-x: auto; border-collapse: collapse; font-size: 14px; }
.docs-article :deep(th), .docs-article :deep(td) { border: 1px solid #d1d5db; padding: 9px 12px; text-align: left; }
.docs-article :deep(th) { background: #f3f4f6; color: #111827; font-weight: 650; }
.docs-article :deep(hr) { margin: 36px 0 22px; border: 0; border-top: 1px solid #e5e7eb; }
.docs-pagination { display: grid; width: min(100% - 64px, 760px); grid-template-columns: 1fr 1fr; gap: 14px; margin: 10px auto 54px; border-top: 1px solid #e5e7eb; padding-top: 24px; }
.docs-pagination a { display: flex; min-width: 0; flex-direction: column; border: 1px solid #dbe2ea; border-radius: 7px; padding: 13px 15px; }
.docs-pagination a:hover { border-color: #3b82f6; }
.docs-pagination a.next { text-align: right; }
.docs-pagination span { color: #6b7280; font-size: 11px; }
.docs-pagination strong { overflow-wrap: anywhere; color: #2563eb; font-size: 13px; font-weight: 600; }
.docs-outline { overflow-y: auto; padding: 56px 18px 30px 12px; }
.docs-outline h2 { margin-bottom: 11px; color: #111827; font-size: 12px; font-weight: 700; }
.docs-outline nav { border-left: 1px solid #e5e7eb; }
.docs-outline a { display: block; border-left: 2px solid transparent; margin-left: -1px; padding: 5px 0 5px 12px; color: #6b7280; font-size: 12px; line-height: 1.4; }
.docs-outline a.level-3 { padding-left: 22px; }
.docs-outline a:hover, .docs-outline a.active { color: #2563eb; }
.docs-outline a.active { border-left-color: #2563eb; font-weight: 600; }
.docs-search-overlay { position: fixed; z-index: 100; inset: 0; display: flex; justify-content: center; background: rgba(17, 24, 39, .48); padding: 12vh 18px 40px; backdrop-filter: blur(2px); }
.docs-search-dialog { width: min(100%, 620px); height: fit-content; max-height: 72vh; overflow: hidden; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; box-shadow: 0 24px 64px rgba(0, 0, 0, .22); }
.docs-search-input-wrap { display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #e5e7eb; padding: 12px 14px; color: #6b7280; }
.docs-search-input-wrap input { min-width: 0; flex: 1; border: 0; background: transparent; color: #111827; font-size: 15px; outline: none; }
.docs-search-input-wrap button { color: #6b7280; font-size: 12px; }
.docs-search-input-wrap .docs-search-close { border-left: 1px solid #e5e7eb; padding-left: 12px; }
.docs-search-results { max-height: calc(72vh - 58px); overflow-y: auto; padding: 8px; }
.docs-search-results a { display: flex; align-items: center; gap: 12px; border-radius: 6px; padding: 12px; color: #374151; }
.docs-search-results a:hover { background: #f3f4f6; }
.docs-search-results a > svg { flex: none; color: #6b7280; }
.docs-search-results a span { min-width: 0; flex: 1; }
.docs-search-results strong, .docs-search-results small { display: block; }
.docs-search-results strong { color: #111827; font-size: 14px; }
.docs-search-results small { margin-top: 3px; overflow-wrap: anywhere; color: #6b7280; font-size: 12px; }
.docs-empty-search { padding: 34px 12px; text-align: center; color: #6b7280; font-size: 13px; }
:global(.dark) .docs-shell { border-color: #303846; background: #111827; color: #d1d5db; }
:global(.dark) .docs-sidebar { border-color: #303846; background: #0d1420; }
:global(.dark) .docs-brand strong, :global(.dark) .docs-nav a:hover, :global(.dark) .docs-outline h2 { color: #f3f4f6; }
:global(.dark) .docs-brand span, :global(.dark) .docs-nav h2, :global(.dark) .docs-source-link { color: #8f9bad; }
:global(.dark) .docs-search-button { border-color: #374151; background: #172033; color: #9ca3af; }
:global(.dark) .docs-nav a { color: #aeb8c8; }
:global(.dark) .docs-nav a:hover { background: #172033; }
:global(.dark) .docs-nav a.active { background: #172554; color: #93c5fd; }
:global(.dark) .docs-source-link, :global(.dark) .docs-article :deep(h2), :global(.dark) .docs-article :deep(hr), :global(.dark) .docs-pagination, :global(.dark) .docs-outline nav { border-color: #303846; }
:global(.dark) .docs-article { color: #c5cedb; }
:global(.dark) .docs-article :deep(h1), :global(.dark) .docs-article :deep(h2), :global(.dark) .docs-article :deep(h3), :global(.dark) .docs-article :deep(strong) { color: #f8fafc; }
:global(.dark) .docs-article :deep(h1 + p), :global(.dark) .docs-outline a, :global(.dark) .docs-pagination span { color: #94a3b8; }
:global(.dark) .docs-article :deep(blockquote) { border-color: #60a5fa; background: #172554; color: #bfdbfe; }
:global(.dark) .docs-article :deep(code) { background: #202b3b; color: #fda4af; }
:global(.dark) .docs-article :deep(pre) { border-color: #374151; background: #080d16; }
:global(.dark) .docs-article :deep(pre code) { background: transparent; color: #e5e7eb; }
:global(.dark) .docs-article :deep(th), :global(.dark) .docs-article :deep(td) { border-color: #3b4657; }
:global(.dark) .docs-article :deep(th) { background: #202b3b; color: #f3f4f6; }
:global(.dark) .docs-pagination a { border-color: #374151; }
:global(.dark) .docs-search-dialog { border-color: #374151; background: #111827; }
:global(.dark) .docs-search-input-wrap { border-color: #374151; }
:global(.dark) .docs-search-input-wrap input, :global(.dark) .docs-search-results strong { color: #f3f4f6; }
:global(.dark) .docs-search-results a:hover { background: #1f2937; }
@media (max-width: 1180px) {
  .docs-shell { grid-template-columns: 220px minmax(0, 1fr); }
  .docs-outline { display: none; }
}
@media (max-width: 767px) {
  .docs-shell { display: flex; height: calc(100vh - 6.5rem); min-height: 520px; flex-direction: column; }
  .docs-mobile-header { display: grid; height: 48px; flex: none; grid-template-columns: 40px 1fr 40px; align-items: center; border-bottom: 1px solid #e5e7eb; padding: 0 4px; }
  .docs-mobile-title { text-align: center; color: #111827; font-size: 14px; font-weight: 650; }
  .docs-icon-button { display: flex; width: 36px; height: 36px; align-items: center; justify-content: center; color: #4b5563; }
  .docs-sidebar { position: fixed; z-index: 102; top: 0; bottom: 0; left: 0; width: min(84vw, 300px); transform: translateX(-105%); border-right: 1px solid #d1d5db; box-shadow: 16px 0 40px rgba(0, 0, 0, .16); transition: transform .2s ease; }
  .docs-sidebar-open { transform: translateX(0); }
  .docs-sidebar-close { display: flex; width: 34px; height: 34px; margin-left: auto; align-items: center; justify-content: center; color: #6b7280; }
  .docs-drawer-backdrop { position: fixed; z-index: 101; inset: 0; display: block; background: rgba(17, 24, 39, .45); }
  .docs-main { flex: 1; }
  .docs-article { width: 100%; padding: 32px 20px 24px; font-size: 14px; }
  .docs-article :deep(h1) { font-size: 27px; }
  .docs-article :deep(h2) { font-size: 21px; }
  .docs-pagination { width: calc(100% - 40px); grid-template-columns: 1fr; margin-bottom: 32px; }
  .docs-pagination > span { display: none; }
  .docs-pagination a.next { text-align: left; }
  :global(.dark) .docs-mobile-header { border-color: #303846; }
  :global(.dark) .docs-mobile-title { color: #f3f4f6; }
  :global(.dark) .docs-icon-button { color: #cbd5e1; }
}
</style>
