/**
 * Bazario — UI animations (respects prefers-reduced-motion)
 */
const BazarioAnim = (() => {
  const PAGE_MS = 200
  const ROW_MS = 320
  let prevBadgeCount = null
  let navIndicatorEl = null
  const NAV_RING_PX = 40
  let pendingPageTransition = false
  let lastCreatedRowId = null
  let lastDeletedRowEl = null
  let searchFadeTimer = null

  function reduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function ensureNavIndicator() {
    const nav = document.getElementById('nav')
    if (!nav || navIndicatorEl) return
    navIndicatorEl = document.createElement('span')
    navIndicatorEl.className = 'nav-active-indicator'
    navIndicatorEl.setAttribute('aria-hidden', 'true')
    nav.appendChild(navIndicatorEl)
  }

  function moveNavIndicator({ pulse = false } = {}) {
    if (reduced()) return
    ensureNavIndicator()
    const nav = document.getElementById('nav')
    const active = nav?.querySelector('.nav-btn.active')
    if (!nav || !active || !navIndicatorEl) return
    const navRect = nav.getBoundingClientRect()
    const btnRect = active.getBoundingClientRect()
    const left = btnRect.left - navRect.left + (btnRect.width - NAV_RING_PX) / 2
    const top = btnRect.top - navRect.top + (btnRect.height - NAV_RING_PX) / 2
    navIndicatorEl.style.width = `${NAV_RING_PX}px`
    navIndicatorEl.style.height = `${NAV_RING_PX}px`
    navIndicatorEl.style.borderRadius = '50%'
    navIndicatorEl.style.transform = `translate3d(${left}px, ${top}px, 0)`
    navIndicatorEl.style.opacity = '1'
    if (pulse) {
      navIndicatorEl.classList.remove('nav-indicator-pulse')
      void navIndicatorEl.offsetWidth
      navIndicatorEl.classList.add('nav-indicator-pulse')
      navIndicatorEl.addEventListener('animationend', () => {
        navIndicatorEl?.classList.remove('nav-indicator-pulse')
      }, { once: true })
    }
  }

  function markPageTransition() {
    pendingPageTransition = true
  }

  function runPageTransition(contentEl, renderFn) {
    if (!contentEl || reduced() || !pendingPageTransition) {
      pendingPageTransition = false
      renderFn()
      return
    }
    pendingPageTransition = false
    contentEl.classList.add('content-page-exit')
    setTimeout(() => {
      renderFn()
      contentEl.classList.remove('content-page-exit')
      contentEl.classList.add('content-page-enter')
      const onEnd = () => {
        contentEl.classList.remove('content-page-enter')
        contentEl.removeEventListener('animationend', onEnd)
      }
      contentEl.addEventListener('animationend', onEnd)
    }, PAGE_MS)
  }

  function afterPageRender(contentEl) {
    moveNavIndicator()
    const nav = window.__bazarioActiveNav
    if (nav === 'home') runHomeCascade(contentEl)
    flashCreatedRow(contentEl)
    animateCountBadges(contentEl)
    animateHomeStats(contentEl)
    initTableRowEffects(contentEl)
  }

  function runHomeCascade(contentEl) {
    if (reduced()) return
    const greeting = contentEl.querySelector('.home-greeting')
    const grid = contentEl.querySelector('.grid')
    let i = 0
    if (greeting) {
      greeting.classList.add('anim-cascade-item')
      greeting.style.setProperty('--anim-i', String(i++))
    }
    if (!grid) return
    grid.classList.add('anim-cascade')
    grid.querySelectorAll('.card').forEach((el) => {
      el.classList.add('anim-cascade-item')
      el.style.setProperty('--anim-i', String(i++))
    })
  }

  function markRowCreated(id) {
    lastCreatedRowId = id
  }

  function flashCreatedRow(contentEl) {
    if (!lastCreatedRowId || reduced()) {
      lastCreatedRowId = null
      return
    }
    const row = contentEl.querySelector(`tr[data-id="${lastCreatedRowId}"], tr[data-profile-id="${lastCreatedRowId}"], tr[data-task-id="${lastCreatedRowId}"], tr[data-order-tx-id="${lastCreatedRowId}"]`)
    lastCreatedRowId = null
    if (row) {
      row.classList.add('anim-row-new')
      row.addEventListener('animationend', () => row.classList.remove('anim-row-new'), { once: true })
    }
  }

  function animateRowRemove(row, onDone) {
    if (!row || reduced()) {
      onDone?.()
      return
    }
    row.classList.add('anim-row-remove')
    row.addEventListener('animationend', () => onDone?.(), { once: true })
    setTimeout(() => onDone?.(), ROW_MS + 40)
  }

  function animateCountBadges(root = document) {
    if (reduced()) return
    root.querySelectorAll('.count-badge:not(.count-badge-btn)').forEach((badge) => {
      const text = badge.textContent?.trim() || ''
      const num = parseInt(text.replace(/\D/g, ''), 10)
      if (Number.isNaN(num)) return
      if (badge.dataset.countAnim === String(num)) return
      badge.dataset.countAnim = String(num)
      badge.classList.add('anim-count-pop')
      const span = document.createElement('span')
      span.className = 'anim-count-value'
      const from = parseInt(badge.dataset.countFrom || '0', 10)
      badge.dataset.countFrom = String(num)
      animateNumber(span, from, num, 400)
      if (!badge.querySelector('.anim-count-value')) {
        badge.textContent = ''
        badge.appendChild(span)
      } else {
        badge.querySelector('.anim-count-value')?.replaceWith(span)
      }
      badge.addEventListener('animationend', () => badge.classList.remove('anim-count-pop'), { once: true })
    })
  }

  function animateNumber(el, from, to, duration) {
    if (reduced() || from === to) {
      el.textContent = String(to)
      return
    }
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      el.textContent = String(Math.round(from + (to - from) * eased))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  function animateHomeStats(contentEl) {
    if (reduced()) return
    contentEl.querySelectorAll('.gauge-pct, .finance-pct, .stock-value').forEach((el) => {
      if (el.dataset.statAnim === '1') return
      el.dataset.statAnim = '1'
      const raw = el.textContent?.trim() || ''
      const match = raw.match(/[\d.,]+/)
      if (!match) return
      const target = parseFloat(match[0].replace(',', '.'))
      if (Number.isNaN(target)) return
      const suffix = raw.slice(match.index + match[0].length)
      const prefix = raw.slice(0, match.index)
      const isPct = raw.includes('%')
      const decimals = isPct ? 0 : (raw.includes('.') ? 2 : 0)
      const start = performance.now()
      const duration = 500
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - (1 - t) ** 3
        const val = target * eased
        const formatted = isPct
          ? `${Math.round(val)}%`
          : (decimals ? val.toFixed(decimals) : String(Math.round(val)))
        el.textContent = `${prefix}${formatted}${suffix}`
        if (t < 1) requestAnimationFrame(step)
        else el.textContent = raw
      }
      requestAnimationFrame(step)
    })
    contentEl.querySelectorAll('.track .fill').forEach((fill) => {
      if (fill.dataset.barAnim === '1') return
      fill.dataset.barAnim = '1'
      const w = fill.style.width
      fill.style.width = '0%'
      requestAnimationFrame(() => { fill.style.width = w })
    })
  }

  let notificationAudioCtx = null

  function ensureNotificationAudioContext() {
    if (notificationAudioCtx) return notificationAudioCtx
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    notificationAudioCtx = new Ctx()
    return notificationAudioCtx
  }

  function unlockNotificationAudio() {
    const ctx = ensureNotificationAudioContext()
    if (ctx?.state === 'suspended') ctx.resume().catch(() => {})
  }

  /** iPhone SMS «Tri-tone» — три короткі ноти вгору (C6 → E6 → G6). */
  const IPHONE_SMS_TRITONE = [
    { freq: 1046.504, offset: 0, duration: 0.082 },
    { freq: 1318.51, offset: 0.097, duration: 0.082 },
    { freq: 1567.984, offset: 0.194, duration: 0.128 },
  ]

  function playIphoneSmsTriToneNote(ctx, frequency, start, duration) {
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, start)
    master.gain.linearRampToValueAtTime(0.2, start + 0.003)
    master.gain.exponentialRampToValueAtTime(0.0001, start + duration)

    const fundamental = ctx.createOscillator()
    fundamental.type = 'sine'
    fundamental.frequency.value = frequency

    const partial = ctx.createOscillator()
    partial.type = 'sine'
    partial.frequency.value = frequency * 2.756

    const partialGain = ctx.createGain()
    partialGain.gain.value = 0.07

    fundamental.connect(master)
    partial.connect(partialGain)
    partialGain.connect(master)
    master.connect(ctx.destination)

    const stopAt = start + duration + 0.04
    fundamental.start(start)
    partial.start(start)
    fundamental.stop(stopAt)
    partial.stop(stopAt)
  }

  function playNotificationSound() {
    if (reduced()) return
    const ctx = ensureNotificationAudioContext()
    if (!ctx) return
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => playNotificationSound()).catch(() => {})
      return
    }
    const t0 = ctx.currentTime + 0.01
    IPHONE_SMS_TRITONE.forEach(({ freq, offset, duration }) => {
      playIphoneSmsTriToneNote(ctx, freq, t0 + offset, duration)
    })
  }

  function initNotificationSound() {
    const unlock = () => {
      unlockNotificationAudio()
      document.removeEventListener('pointerdown', unlock, true)
      document.removeEventListener('keydown', unlock, true)
    }
    document.addEventListener('pointerdown', unlock, true)
    document.addEventListener('keydown', unlock, true)
  }

  function pulseBellEmit() {
    if (reduced()) return
    const btn = document.getElementById('notificationsBtn')
    if (!btn) return
    btn.classList.remove('anim-bell-emit', 'anim-bell-shake')
    void btn.offsetWidth
    btn.classList.add('anim-bell-emit', 'anim-bell-shake')
    const onEnd = (e) => {
      if (e.target !== btn) return
      btn.classList.remove('anim-bell-shake')
      btn.removeEventListener('animationend', onEnd)
    }
    btn.addEventListener('animationend', onEnd)
    setTimeout(() => btn.classList.remove('anim-bell-emit'), 750)
  }

  function animateOrderPushIn(el) {
    if (!el) return
    pulseBellEmit()
    if (reduced()) return
    el.classList.remove('order-push--in')
    void el.offsetWidth
    el.classList.add('order-push--in')
    el.addEventListener('animationend', () => el.classList.remove('order-push--in'), { once: true })
  }

  function onNotificationsUpdate(count) {
    const btn = document.getElementById('notificationsBtn')
    const badge = document.getElementById('notificationsBadge')
    const panel = document.getElementById('notificationsPanel')
    if (prevBadgeCount !== null && count > prevBadgeCount && !reduced()) {
      btn?.classList.add('anim-bell-shake')
      btn?.addEventListener('animationend', () => btn.classList.remove('anim-bell-shake'), { once: true })
    }
    if (badge && count > 0 && count !== prevBadgeCount && !reduced()) {
      badge.classList.remove('anim-badge-pop')
      void badge.offsetWidth
      badge.classList.add('anim-badge-pop')
    }
    prevBadgeCount = count
    if (panel && !panel.classList.contains('is-hidden') && !reduced()) {
      panel.classList.remove('anim-panel-in')
      void panel.offsetWidth
      panel.classList.add('anim-panel-in')
    }
  }

  function showToast(message, { success = true } = {}) {
    const el = document.getElementById('toast')
    if (!el) return
    el.textContent = message
    el.hidden = false
    el.classList.remove('visible', 'toast--success', 'toast--exit')
    if (success) el.classList.add('toast--success')
    if (!reduced()) {
      void el.offsetWidth
      el.classList.add('visible')
    } else {
      el.classList.add('visible')
    }
    clearTimeout(el._toastTimer)
    clearTimeout(el._toastExitTimer)
    el._toastTimer = setTimeout(() => {
      if (reduced()) {
        el.hidden = true
        el.classList.remove('visible', 'toast--success')
        return
      }
      el.classList.add('toast--exit')
      el._toastExitTimer = setTimeout(() => {
        el.hidden = true
        el.classList.remove('visible', 'toast--success', 'toast--exit')
      }, 220)
    }, 2800)
  }

  function pulseStatusBadge(badge) {
    if (!badge || reduced()) return
    badge.classList.add('anim-status-change')
    badge.addEventListener('animationend', () => badge.classList.remove('anim-status-change'), { once: true })
  }

  function pulseEditField(el) {
    if (!el || reduced()) return
    el.classList.add('anim-field-edit')
    el.addEventListener('animationend', () => el.classList.remove('anim-field-edit'), { once: true })
  }

  function applySearchRowFade(tableWrap) {
    if (reduced()) return
    clearTimeout(searchFadeTimer)
    const rows = tableWrap?.querySelectorAll('tbody tr[data-search], tbody tr[data-id]')
    if (!rows?.length) return
    rows.forEach((row) => row.classList.add('anim-search-fade'))
    searchFadeTimer = setTimeout(() => {
      rows.forEach((row) => row.classList.remove('anim-search-fade'))
    }, 220)
  }

  function initTableRowEffects(contentEl) {
    contentEl.querySelectorAll('.table-input:focus, .task-detail-select:focus').forEach((el) => {
      if (el.dataset.animFocus === '1') return
      el.dataset.animFocus = '1'
      el.addEventListener('focus', () => pulseEditField(el))
    })
  }

  function initSearchFocus() {
    const search = document.querySelector('.search')
    const input = document.getElementById('searchInput')
    if (!search || search.dataset.animBound === '1') return
    search.dataset.animBound = '1'
    input?.addEventListener('focus', () => search.classList.add('search--focused'))
    input?.addEventListener('blur', () => search.classList.remove('search--focused'))
  }

  function initButtonPress() {
    if (document.body.dataset.btnPress === '1') return
    document.body.dataset.btnPress = '1'
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('.btn-primary, .btn-secondary, .notifications-btn, .nav-btn')
      if (btn && !reduced()) btn.classList.add('anim-btn-press')
    })
    document.addEventListener('pointerup', () => {
      document.querySelectorAll('.anim-btn-press').forEach((b) => b.classList.remove('anim-btn-press'))
    })
    document.addEventListener('pointercancel', () => {
      document.querySelectorAll('.anim-btn-press').forEach((b) => b.classList.remove('anim-btn-press'))
    })
  }

  function initModalObserver() {
    if (document.body.dataset.modalAnim === '1') return
    document.body.dataset.modalAnim = '1'
    const obs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName !== 'class') return
        const el = m.target
        if (!el.classList?.contains('modal-overlay')) return
        if (reduced()) return
        const wasHidden = m.oldValue?.includes('is-hidden')
        const isHidden = el.classList.contains('is-hidden')
        if (wasHidden === isHidden) return
        if (!isHidden) {
          el.classList.add('modal-anim')
          requestAnimationFrame(() => el.classList.add('modal-anim--visible'))
        } else {
          el.classList.remove('modal-anim--visible', 'modal-anim')
        }
      })
    })
    const watch = (root) => {
      root.querySelectorAll('.modal-overlay').forEach((el) => {
        obs.observe(el, { attributes: true, attributeFilter: ['class'], attributeOldValue: true })
      })
    }
    watch(document)
    new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (node.classList?.contains('modal-overlay')) obs.observe(node, { attributes: true, attributeFilter: ['class'], attributeOldValue: true })
          node.querySelectorAll?.('.modal-overlay').forEach((el) => obs.observe(el, { attributes: true, attributeFilter: ['class'], attributeOldValue: true }))
        })
      })
    }).observe(document.getElementById('content') || document.body, { childList: true, subtree: true })
  }

  function initStatusSelectPulse() {
    document.addEventListener('change', (e) => {
      const sel = e.target.closest('[data-field="status"], .task-detail-select[data-field="status"]')
      if (!sel) return
      const row = sel.closest('tr')
      const badge = row?.querySelector('.status, .order-tx-status-badge')
      pulseStatusBadge(badge || sel)
    }, true)
  }

  function initNavRipple() {
    const nav = document.getElementById('nav')
    if (!nav || nav.dataset.animRipple === '1') return
    nav.dataset.animRipple = '1'
    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn')
      if (!btn || reduced()) return
      moveNavIndicator({ pulse: true })
    })
  }

  function init() {
    ensureNavIndicator()
    moveNavIndicator()
    initNavRipple()
    initSearchFocus()
    initButtonPress()
    initModalObserver()
    initStatusSelectPulse()
    initNotificationSound()
    window.addEventListener('resize', moveNavIndicator)
  }

  return {
    init,
    reduced,
    markPageTransition,
    runPageTransition,
    afterPageRender,
    markRowCreated,
    animateRowRemove,
    animateCountBadges,
    onNotificationsUpdate,
    animateOrderPushIn,
    playNotificationSound,
    showToast,
    pulseStatusBadge,
    applySearchRowFade,
    moveNavIndicator,
  }
})()

window.BazarioAnim = BazarioAnim
