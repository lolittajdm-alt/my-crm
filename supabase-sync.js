/**
 * Bazario — Supabase auth + sync for shared online workspace.
 * Requires: supabase-config.js, @supabase/supabase-js (CDN), storage.js
 */
const BazarioSync = (() => {
  const COLLECTIONS = [
    'warehouses',
    'products',
    'shops',
    'finance',
    'tasks',
    'accounts',
    'orderTransactions',
    'accountingSections',
    'profiles',
    'movements',
  ]

  const state = {
    client: null,
    user: null,
    workspaceId: null,
    inviteCode: null,
    workspaceName: null,
    ready: false,
    syncing: false,
    channel: null,
    onReady: null,
    onRemoteChange: null,
  }

  let overlayEl = null
  let authMode = 'login'

  function config() {
    return window.BAZARIO_SUPABASE || {}
  }

  function isEnabled() {
    const { url, anonKey } = config()
    return Boolean(url && anonKey && url !== 'https://YOUR_PROJECT.supabase.co')
  }

  function db() {
    return window.BazarioDB
  }

  function esc(text) {
    const el = document.createElement('span')
    el.textContent = text == null ? '' : String(text)
    return el.innerHTML
  }

  function showError(el, message) {
    if (!el) return
    el.textContent = message || ''
    el.hidden = !message
  }

  function ensureOverlay() {
    if (overlayEl) return overlayEl
    overlayEl = document.createElement('div')
    overlayEl.id = 'authOverlay'
    overlayEl.className = 'auth-overlay'
    overlayEl.innerHTML = `
      <div class="auth-card" role="dialog" aria-labelledby="authTitle">
        <div class="auth-brand">
          <div class="logo" aria-hidden="true">M</div>
          <div>
            <p class="auth-brand-name">MY CRM</p>
            <p class="auth-brand-sub">Онлайн база для команди</p>
          </div>
        </div>
        <div id="authBody"></div>
      </div>`
    document.body.appendChild(overlayEl)
    return overlayEl
  }

  function showOverlay() {
    ensureOverlay().classList.remove('is-hidden')
  }

  function hideOverlay() {
    if (overlayEl) overlayEl.classList.add('is-hidden')
  }

  function renderAuthForm() {
    const body = document.getElementById('authBody')
    if (!body) return

    if (state.user && !state.workspaceId) {
      body.innerHTML = `
        <h2 class="auth-title" id="authTitle">Робочий простір</h2>
        <p class="auth-subtitle">Створіть спільну базу або приєднайтесь за кодом запрошення.</p>
        <div class="auth-workspace">
          <label class="form-field">
            <span>Назва</span>
            <input type="text" id="authWorkspaceName" placeholder="MY CRM" value="MY CRM" />
          </label>
          <button type="button" class="btn-primary auth-submit" id="authCreateWorkspace">Створити простір</button>
          <p class="auth-divider">або</p>
          <form class="auth-join-form" id="authJoinForm">
            <label class="form-field">
              <span>Код запрошення</span>
              <input type="text" id="authInviteCode" placeholder="AB12CD34" autocomplete="off" />
            </label>
            <button type="submit" class="btn-secondary auth-submit">Приєднатися</button>
          </form>
          <p class="auth-error" id="authWorkspaceError" hidden></p>
        </div>`
      document.getElementById('authCreateWorkspace')?.addEventListener('click', handleCreateWorkspace)
      document.getElementById('authJoinForm')?.addEventListener('submit', handleJoinWorkspace)
      return
    }

    const isLogin = authMode === 'login'
    body.innerHTML = `
      <h2 class="auth-title" id="authTitle">${isLogin ? 'Вхід' : 'Реєстрація'}</h2>
      <p class="auth-subtitle">${isLogin ? 'Увійдіть, щоб синхронізувати дані онлайн.' : 'Створіть акаунт для спільної роботи.'}</p>
      <form class="auth-form" id="authForm">
        <label class="form-field">
          <span>Email</span>
          <input type="email" id="authEmail" required autocomplete="username" />
        </label>
        <label class="form-field">
          <span>Пароль</span>
          <input type="password" id="authPassword" required minlength="6" autocomplete="${isLogin ? 'current-password' : 'new-password'}" />
        </label>
        <button type="submit" class="btn-primary auth-submit">${isLogin ? 'Увійти' : 'Зареєструватися'}</button>
        <p class="auth-error" id="authError" hidden></p>
      </form>
      <button type="button" class="btn-link auth-toggle" id="authToggleMode">
        ${isLogin ? 'Немає акаунта? Зареєструватися' : 'Вже є акаунт? Увійти'}
      </button>`

    document.getElementById('authForm')?.addEventListener('submit', handleAuthSubmit)
    document.getElementById('authToggleMode')?.addEventListener('click', () => {
      authMode = isLogin ? 'register' : 'login'
      renderAuthForm()
    })
  }

  function ensureLogoutButton() {
    let btn = document.getElementById('authLogoutBtn')
    if (!btn) {
      btn = document.createElement('button')
      btn.type = 'button'
      btn.id = 'authLogoutBtn'
      btn.className = 'btn-link auth-logout'
      btn.textContent = 'Вийти'
      btn.addEventListener('click', () => signOut())
      document.body.appendChild(btn)
    }
    btn.hidden = !state.ready
  }

  function updateStorageHint() {
    const el = document.getElementById('storageHint')
    if (!el) return
    if (!isEnabled() || !state.ready) {
      el.textContent = 'Дані зберігаються локально у браузері'
      return
    }
    const code = state.inviteCode ? ` · код: ${state.inviteCode}` : ''
    el.textContent = `Онлайн · ${state.workspaceName || 'Supabase'}${code}`
  }

  async function handleAuthSubmit(e) {
    e.preventDefault()
    const errEl = document.getElementById('authError')
    showError(errEl, '')
    const email = document.getElementById('authEmail')?.value?.trim()
    const password = document.getElementById('authPassword')?.value
    if (!email || !password) return

    try {
      if (authMode === 'register') {
        const { error } = await state.client.auth.signUp({ email, password })
        if (error) throw error
      } else {
        const { error } = await state.client.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      await afterAuth()
    } catch (err) {
      showError(errEl, err.message || 'Помилка авторизації')
    }
  }

  async function handleCreateWorkspace() {
    const errEl = document.getElementById('authWorkspaceError')
    showError(errEl, '')
    const name = document.getElementById('authWorkspaceName')?.value?.trim() || 'MY CRM'
    try {
      const { data, error } = await state.client.rpc('create_workspace', { p_name: name })
      if (error) throw error
      const row = Array.isArray(data) ? data[0] : data
      state.workspaceId = row?.workspace_id || row?.id
      state.inviteCode = row?.invite_code
      state.workspaceName = name
      await finishSetup()
    } catch (err) {
      showError(errEl, err.message || 'Не вдалося створити простір')
    }
  }

  async function handleJoinWorkspace(e) {
    e.preventDefault()
    const errEl = document.getElementById('authWorkspaceError')
    showError(errEl, '')
    const code = document.getElementById('authInviteCode')?.value?.trim()
    if (!code) return
    try {
      const { data, error } = await state.client.rpc('join_workspace', { p_invite_code: code })
      if (error) throw error
      state.workspaceId = data
      await loadWorkspaceMeta()
      await finishSetup()
    } catch (err) {
      showError(errEl, err.message || 'Невірний код запрошення')
    }
  }

  async function loadWorkspaceMeta() {
    if (!state.workspaceId) return
    const { data, error } = await state.client
      .from('workspaces')
      .select('name, invite_code')
      .eq('id', state.workspaceId)
      .maybeSingle()
    if (error) throw error
    state.workspaceName = data?.name || 'MY CRM'
    state.inviteCode = data?.invite_code || null
  }

  async function loadUserSession() {
    const { data, error } = await state.client
      .from('user_sessions')
      .select('workspace_id, profile')
      .eq('user_id', state.user.id)
      .maybeSingle()
    if (error) throw error
    state.workspaceId = data?.workspace_id || null
    if (data?.profile && typeof data.profile === 'object' && Object.keys(data.profile).length) {
      applyRemoteProfile(data.profile)
    }
    if (state.workspaceId) await loadWorkspaceMeta()
  }

  function applyRemoteProfile(profile) {
    db().setApplyingRemote(true)
    try {
      const current = db().getProfile()
      db().write('profile', { ...current, ...profile, updatedAt: new Date().toISOString() })
    } finally {
      db().setApplyingRemote(false)
    }
  }

  async function saveUserProfile(profile) {
    if (!state.user || !state.workspaceId) return
    await state.client.from('user_sessions').upsert({
      user_id: state.user.id,
      workspace_id: state.workspaceId,
      profile,
      updated_at: new Date().toISOString(),
    })
  }

  async function saveWorkspaceSettings(settings) {
    if (!state.workspaceId) return
    await state.client
      .from('workspaces')
      .update({ settings })
      .eq('id', state.workspaceId)
  }

  function applyCollection(collection, records) {
    db().write(collection, records)
  }

  async function pullRemote() {
    if (!state.workspaceId) return

    const { data: rows, error } = await state.client
      .from('app_records')
      .select('collection, payload, updated_at')
      .eq('workspace_id', state.workspaceId)
    if (error) throw error

    const grouped = Object.fromEntries(COLLECTIONS.map((c) => [c, []]))
    for (const row of rows || []) {
      if (!grouped[row.collection]) continue
      grouped[row.collection].push(row.payload)
    }

    db().setApplyingRemote(true)
    try {
      for (const collection of COLLECTIONS) {
        applyCollection(collection, grouped[collection] || [])
      }

      const { data: workspace, error: wsError } = await state.client
        .from('workspaces')
        .select('settings')
        .eq('id', state.workspaceId)
        .maybeSingle()
      if (!wsError && workspace?.settings && Object.keys(workspace.settings).length) {
        db().write('settings', { ...db().getSettings(), ...workspace.settings })
      }
    } finally {
      db().setApplyingRemote(false)
    }
  }

  async function pushLocalToRemote() {
    if (!state.workspaceId) return
    const records = []
    for (const collection of COLLECTIONS) {
      for (const item of db().list(collection)) {
        records.push({
          id: item.id,
          workspace_id: state.workspaceId,
          collection,
          payload: item,
          updated_at: item.updatedAt || new Date().toISOString(),
        })
      }
    }
    if (!records.length) return
    const chunkSize = 200
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize)
      const { error } = await state.client.from('app_records').upsert(chunk)
      if (error) throw error
    }
    await saveUserProfile(db().getProfile())
    await saveWorkspaceSettings(db().getSettings())
  }

  async function upsertRecord(collection, record) {
    if (!state.workspaceId || state.syncing) return
    const { error } = await state.client.from('app_records').upsert({
      id: record.id,
      workspace_id: state.workspaceId,
      collection,
      payload: record,
      updated_at: record.updatedAt || new Date().toISOString(),
    })
    if (error) console.warn('BazarioSync upsert:', error.message)
  }

  async function deleteRecord(collection, id) {
    if (!state.workspaceId || state.syncing) return
    const { error } = await state.client
      .from('app_records')
      .delete()
      .eq('workspace_id', state.workspaceId)
      .eq('collection', collection)
      .eq('id', id)
    if (error) console.warn('BazarioSync delete:', error.message)
  }

  function handleLocalChange(event) {
    if (!state.ready || state.syncing) return
    if (event.type === 'upsert') upsertRecord(event.collection, event.record)
    else if (event.type === 'delete') deleteRecord(event.collection, event.id)
    else if (event.type === 'profile') saveUserProfile(event.data)
    else if (event.type === 'settings') saveWorkspaceSettings(event.data)
    else if (event.type === 'full') pushLocalToRemote()
  }

  function applyRemoteRow(row) {
    if (!row?.collection || !COLLECTIONS.includes(row.collection)) return
    db().setApplyingRemote(true)
    try {
      const items = db().list(row.collection)
      const recordId = row.payload?.id
      if (row.eventType === 'DELETE') {
        if (recordId) db().write(row.collection, items.filter((i) => i.id !== recordId))
        return
      }
      if (!row.payload?.id) return
      const idx = items.findIndex((i) => i.id === row.payload.id)
      if (idx === -1) items.unshift(row.payload)
      else items[idx] = row.payload
      db().write(row.collection, items)
    } finally {
      db().setApplyingRemote(false)
    }
    state.onRemoteChange?.()
  }

  function subscribeRealtime() {
    if (state.channel) {
      state.client.removeChannel(state.channel)
      state.channel = null
    }
    state.channel = state.client
      .channel(`workspace-${state.workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'app_records',
          filter: `workspace_id=eq.${state.workspaceId}`,
        },
        (payload) => {
          applyRemoteRow({
            collection: payload.new?.collection || payload.old?.collection,
            payload: payload.new?.payload || payload.old?.payload,
            eventType: payload.eventType,
          })
        },
      )
      .subscribe()
  }

  async function finishSetup() {
    state.syncing = true
    showOverlay()
    const body = document.getElementById('authBody')
    if (body) {
      body.innerHTML = `
        <h2 class="auth-title">Синхронізація</h2>
        <p class="auth-subtitle">Завантажуємо дані з хмари…</p>`
    }

    try {
      const { count, error: countError } = await state.client
        .from('app_records')
        .select('*', { count: 'exact', head: true })
        .eq('workspace_id', state.workspaceId)
      if (countError) throw countError

      if (!count) await pushLocalToRemote()
      else await pullRemote()

      subscribeRealtime()
      state.ready = true
      hideOverlay()
      ensureLogoutButton()
      updateStorageHint()
      state.onReady?.()
    } catch (err) {
      if (body) {
        body.innerHTML = `
          <h2 class="auth-title">Помилка</h2>
          <p class="auth-subtitle">${esc(err.message || 'Не вдалося синхронізувати')}</p>
          <button type="button" class="btn-primary auth-submit" id="authRetrySync">Спробувати знову</button>`
        document.getElementById('authRetrySync')?.addEventListener('click', finishSetup)
      }
    } finally {
      state.syncing = false
    }
  }

  async function afterAuth() {
    try {
      const { data: { user }, error } = await state.client.auth.getUser()
      if (error) throw error
      state.user = user
      await loadUserSession()

      if (!state.workspaceId) {
        showOverlay()
        renderAuthForm()
        return
      }

      await finishSetup()
    } catch (err) {
      showOverlay()
      const body = document.getElementById('authBody')
      if (body) {
        body.innerHTML = `
          <h2 class="auth-title">Помилка</h2>
          <p class="auth-subtitle">${esc(err.message || 'Не вдалося увійти')}</p>
          <button type="button" class="btn-primary auth-submit" id="authRetryAfterAuth">Спробувати знову</button>`
        document.getElementById('authRetryAfterAuth')?.addEventListener('click', afterAuth)
      }
    }
  }

  async function signOut() {
    state.ready = false
    state.workspaceId = null
    state.inviteCode = null
    if (state.channel) {
      await state.client.removeChannel(state.channel)
      state.channel = null
    }
    await state.client.auth.signOut()
    state.user = null
    authMode = 'login'
    ensureLogoutButton()
    updateStorageHint()
    showOverlay()
    renderAuthForm()
  }

  async function init({ onReady, onRemoteChange } = {}) {
    if (!isEnabled()) return false

    state.onReady = onReady
    state.onRemoteChange = onRemoteChange

    try {
      if (!window.supabase?.createClient) {
        throw new Error('Не завантажився Supabase SDK. Перевірте інтернет і оновіть сторінку.')
      }
      state.client = window.supabase.createClient(config().url, config().anonKey)
      db().setSyncListener(handleLocalChange)

      const { data: { session } } = await state.client.auth.getSession()
      if (session?.user) {
        state.user = session.user
        showOverlay()
        await afterAuth()
      } else {
        showOverlay()
        renderAuthForm()
      }

      state.client.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          state.user = null
          state.ready = false
        }
        if (event === 'SIGNED_IN' && session?.user && !state.ready) {
          state.user = session.user
          await afterAuth()
        }
      })
    } catch (err) {
      showOverlay()
      const body = document.getElementById('authBody')
      if (body) {
        body.innerHTML = `
          <h2 class="auth-title">Помилка</h2>
          <p class="auth-subtitle">${esc(err.message || 'Не вдалося підключити Supabase')}</p>
          <button type="button" class="btn-primary auth-submit" id="authRetryInit">Спробувати знову</button>`
        document.getElementById('authRetryInit')?.addEventListener('click', () => init({ onReady, onRemoteChange }))
      }
    }

    return true
  }

  return {
    init,
    isEnabled,
    isReady: () => state.ready,
    signOut,
    getInviteCode: () => state.inviteCode,
  }
})()

window.BazarioSync = BazarioSync
