/**
 * Supabase auth + workspace bootstrap for Bazario standalone app.
 */
(function initBazarioAuth() {
  const db = window.BazarioDB
  if (!db) return

  const overlay = document.getElementById('authOverlay')
  const authForm = document.getElementById('authForm')
  const workspacePanel = document.getElementById('workspacePanel')
  const authError = document.getElementById('authError')
  const authTitle = document.getElementById('authTitle')
  const authSubtitle = document.getElementById('authSubtitle')
  const authSubmit = document.getElementById('authSubmit')
  const authToggleMode = document.getElementById('authToggleMode')
  const workspaceCreateBtn = document.getElementById('workspaceCreateBtn')
  const workspaceJoinForm = document.getElementById('workspaceJoinForm')
  const inviteCodeDisplay = document.getElementById('inviteCodeDisplay')
  const logoutBtn = document.getElementById('logoutBtn')
  const storageHint = document.getElementById('storageHint')

  let authMode = 'login'
  let appStarted = false

  function setError(message) {
    if (!authError) return
    authError.textContent = message || ''
    authError.hidden = !message
  }

  function showOverlay(mode) {
    if (!overlay) return
    overlay.classList.remove('is-hidden')
    overlay.dataset.mode = mode
    if (authForm) authForm.hidden = mode !== 'auth'
    if (workspacePanel) workspacePanel.hidden = mode !== 'workspace'
  }

  function hideOverlay() {
    overlay?.classList.add('is-hidden')
    setError('')
  }

  function updateStorageHint() {
    if (!storageHint) return
    if (db.isRemote()) {
      const code = db.getWorkspaceInviteCode()
      storageHint.textContent = code
        ? `Дані в Supabase · код запрошення: ${code}`
        : 'Дані синхронізуються через Supabase'
      logoutBtn?.removeAttribute('hidden')
    } else {
      storageHint.textContent = 'Дані зберігаються локально у браузері'
      logoutBtn?.setAttribute('hidden', '')
    }
  }

  function setAuthMode(nextMode) {
    authMode = nextMode
    if (authTitle) authTitle.textContent = nextMode === 'signup' ? 'Реєстрація' : 'Вхід'
    if (authSubtitle) {
      authSubtitle.textContent = nextMode === 'signup'
        ? 'Створіть акаунт для доступу до спільної бази'
        : 'Увійдіть, щоб працювати зі спільними даними'
    }
    if (authSubmit) authSubmit.textContent = nextMode === 'signup' ? 'Зареєструватися' : 'Увійти'
    if (authToggleMode) {
      authToggleMode.textContent = nextMode === 'signup'
        ? 'Вже є акаунт? Увійти'
        : 'Немає акаунта? Зареєструватися'
    }
  }

  function startApp() {
    if (appStarted) {
      if (typeof window.__bazarioRender === 'function') window.__bazarioRender()
      updateStorageHint()
      return
    }
    appStarted = true
    hideOverlay()
    updateStorageHint()
    if (typeof window.__bazarioStart === 'function') window.__bazarioStart()
  }

  async function handleAuthSubmit(e) {
    e.preventDefault()
    setError('')
    const email = document.getElementById('authEmail')?.value?.trim()
    const password = document.getElementById('authPassword')?.value || ''
    if (!email || !password) {
      setError('Введіть email і пароль')
      return
    }
    authSubmit.disabled = true
    try {
      if (authMode === 'signup') await db.signUp(email, password)
      else await db.signIn(email, password)
      const state = await db.reinitAfterAuth()
      if (state.status === 'workspace') {
        showOverlay('workspace')
      } else {
        startApp()
      }
    } catch (err) {
      setError(err?.message || 'Помилка авторизації')
    } finally {
      authSubmit.disabled = false
    }
  }

  async function handleCreateWorkspace() {
    setError('')
    workspaceCreateBtn.disabled = true
    try {
      const result = await db.createWorkspace('Bazario')
      if (inviteCodeDisplay) inviteCodeDisplay.textContent = result.inviteCode || '—'
      startApp()
    } catch (err) {
      setError(err?.message || 'Не вдалося створити workspace')
    } finally {
      workspaceCreateBtn.disabled = false
    }
  }

  async function handleJoinWorkspace(e) {
    e.preventDefault()
    setError('')
    const code = document.getElementById('workspaceInviteCode')?.value?.trim()
    if (!code) {
      setError('Введіть код запрошення')
      return
    }
    try {
      await db.joinWorkspace(code)
      startApp()
    } catch (err) {
      setError(err?.message || 'Невірний код запрошення')
    }
  }

  authToggleMode?.addEventListener('click', (e) => {
    e.preventDefault()
    setAuthMode(authMode === 'signup' ? 'login' : 'signup')
  })

  authForm?.addEventListener('submit', handleAuthSubmit)
  workspaceCreateBtn?.addEventListener('click', handleCreateWorkspace)
  workspaceJoinForm?.addEventListener('submit', handleJoinWorkspace)

  logoutBtn?.addEventListener('click', async () => {
    await db.signOut()
    appStarted = false
    location.reload()
  })

  window.addEventListener('bazario:sync-error', (e) => {
    const msg = e.detail?.message || 'Помилка синхронізації з Supabase'
    if (typeof showToast === 'function') showToast(msg)
  })

  setAuthMode('login')

  db.ready().then((state) => {
    if (state.status === 'auth') {
      showOverlay('auth')
      return
    }
    if (state.status === 'workspace') {
      showOverlay('workspace')
      return
    }
    startApp()
  }).catch((err) => {
    console.error(err)
    setError(err?.message || 'Помилка ініціалізації')
    showOverlay('auth')
  })
})()
