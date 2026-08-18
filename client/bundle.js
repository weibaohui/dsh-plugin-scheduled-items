/* Generated from client/index.js by scripts/build-client.mjs — do not edit by hand.
 * Regenerate with: npm run build:client
 */
window.__ModuleLoader__.load({
  id: "dsh-plugin-scheduled-items",
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
    var React = require("react")
    'use strict'

    /**
     * dsh-plugin-scheduled-items — Client half
     *
     * Registers two surfaces over the same store:
     *  - `settings.section` "定时事项" management page, and
     *  - a `sidebar.footer.action` button opening the same management surface
     *    as a full-page overlay.
     *
     * Data arrives from the Host half through plain `fetch` on the
     * `/scheduled-items/api` route (the bundle runs in the real page, not a
     * sandbox). Workspace options come from the standard `useWorkspaces` prop
     * seat. UI text is localized through the harness `locale` service
     * (namespace `settings.scheduledItems`; zh/en dictionaries, active-locale
     * fallback handled by the service).
     *
     * This file is the dynamic-plugin source of truth; `client/bundle.js` is
     * the static-install artifact regenerated from it via `npm run build:client`.
     */

    const LOCALE_NS = 'settings.scheduledItems'

    const ZH = {
      nav: '定时事项',
      title: '定时事项',
      intro: '按 cron 定时器把提示词交给全新的 agent 会话执行——也可以立即执行。',
      loading: '正在加载定时事项…',
      error: '无法连接定时事项服务。',
      empty: '还没有定时事项，先创建一个吧。',
      retry: '重试',
      newItem: '新建定时事项',
      editItem: '编辑定时事项',
      save: '保存',
      saving: '保存中…',
      cancel: '取消',
      deleting: '删除中…',
      delete: '删除',
      running: '执行中…',
      runNow: '立即执行',
      lastRun: '上次执行',
      neverRun: '从未执行',
      failed: '失败',
      cronLabel: 'cron 定时器',
      cronHint: 'croner 表达式，例如 "0 9 * * *" 表示每天 09:00。',
      titleLabel: '标题',
      titlePlaceholder: '例如：晨会纪要',
      promptLabel: '提示词',
      promptPlaceholder: '该事项执行时，让 agent 做什么？',
      enabledLabel: '启用',
      enabledHint: '停用的事项保留数据，但不会定时触发。',
      invalidForm: '标题、提示词和 cron 定时器都是必填项。',
      deleteConfirm: '确定删除这个定时事项？',
      close: '关闭',
      workspace: '工作区',
      workspaceLabel: '工作区',
      workspaceNone: '不绑定工作区（默认目录）',
      workspaceHint: '执行时会在此工作区下新建会话，并显示在工作区分组中。',
    }

    const EN = {
      nav: 'Scheduled items',
      title: 'Scheduled items',
      intro: 'Prompt a fresh agent session on a cron schedule — or run it right now.',
      loading: 'Loading scheduled items…',
      error: 'Could not reach the scheduled-items service.',
      empty: 'No scheduled items yet. Create your first one below.',
      retry: 'Retry',
      newItem: 'New scheduled item',
      editItem: 'Edit scheduled item',
      save: 'Save',
      saving: 'Saving…',
      cancel: 'Cancel',
      deleting: 'Deleting…',
      delete: 'Delete',
      running: 'Running…',
      runNow: 'Run now',
      lastRun: 'Last run',
      neverRun: 'Never',
      failed: 'failed',
      cronLabel: 'Cron schedule',
      cronHint: 'croner expression, e.g. "0 9 * * *" for 09:00 daily.',
      titleLabel: 'Title',
      titlePlaceholder: 'e.g. Morning standup notes',
      promptLabel: 'Prompt',
      promptPlaceholder: 'What should the agent do when this item runs?',
      enabledLabel: 'Enabled',
      enabledHint: 'Disabled items keep their data but never fire on schedule.',
      invalidForm: 'Title, prompt, and cron schedule are required.',
      deleteConfirm: 'Delete this scheduled item?',
      close: 'Close',
      workspace: 'Workspace',
      workspaceLabel: 'Workspace',
      workspaceNone: 'No workspace (default directory)',
      workspaceHint: 'Executions spawn a session in this workspace and appear under it in the sidebar.',
    }

    const LOCALE_DICT = { zh: ZH, en: EN }

    const API = '/scheduled-items/api'

    const styles = {
      _head: null,
      insert(css) {
        if (typeof document === 'undefined') return
        if (!this._head) {
          const style = document.createElement('style')
          style.setAttribute('data-plugin', 'dsh-plugin-scheduled-items')
          document.head.appendChild(style)
          this._head = style
        }
        this._head.textContent = css
      },
    }

    styles.insert(`
    .si-root{display:flex;flex-direction:column;gap:14px;width:100%;max-width:760px;color:var(--dsw-alias-label-primary,#e8e8e8)}
    .si-title{font-size:20px;font-weight:600;margin:0}
    .si-intro{font-size:13px;color:var(--dsw-alias-label-tertiary,#999);margin:0}
    .si-muted{font-size:13px;color:var(--dsw-alias-label-tertiary,#999);margin:0}
    .si-error{font-size:13px;color:var(--dsw-alias-state-error-primary,#ef4444);display:flex;align-items:center;gap:8px;margin:0}
    .si-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
    .si-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2,#444);border-radius:12px;background:var(--dsw-alias-bg-layer-3,#1c1c1c);transition:border-color .16s,background .16s}
    .si-row:hover{border-color:var(--dsw-alias-label-dimmed,#777);background:var(--dsw-alias-bg-layer-2,#242424)}
    .si-rowMain{display:flex;flex-direction:column;gap:3px;min-width:0}
    .si-rowTitle{font-size:14px;font-weight:600}
    .si-rowCron{font-size:12px;font-family:var(--dsw-font-mono,monospace);color:var(--dsw-alias-label-secondary,#bbb)}
    .si-rowMeta{font-size:12px;color:var(--dsw-alias-label-tertiary,#999)}
    .si-rowActions{display:flex;gap:8px;flex-shrink:0}
    .si-btn{font-size:13px;padding:5px 10px;border-radius:7px;border:1px solid var(--dsw-alias-border-l2,#555);background:transparent;color:var(--dsw-alias-label-primary,#e8e8e8);cursor:pointer}
    .si-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}
    .si-btn:disabled{opacity:.5;cursor:default}
    .si-btn-primary{border-color:transparent;background:var(--dsw-alias-button-primary-fill,#4f8cff);color:#fff}
    .si-btn-primary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover,#3f78e8)}
    .si-btn-danger{color:var(--dsw-alias-state-error-primary,#ef4444)}
    .si-btn-danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger,rgba(239,68,68,.14))}
    .si-form{display:flex;flex-direction:column;gap:12px;padding:16px;border:1px solid var(--dsw-alias-border-l2,#444);border-radius:12px;background:var(--dsw-alias-bg-layer-3,#1c1c1c)}
    .si-formTitle{font-size:15px;font-weight:600;margin:0}
    .si-field{display:flex;flex-direction:column;gap:5px;font-size:13px;color:var(--dsw-alias-label-secondary,#bbb)}
    .si-field input,.si-field textarea,.si-field select{padding:8px 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2,#444);background:var(--dsw-alias-bg-layer-2,#242424);color:var(--dsw-alias-label-primary,#e8e8e8);font-size:13px;font-family:inherit}
    .si-field textarea{resize:vertical;min-height:72px}
    .si-hint{font-size:12px;color:var(--dsw-alias-label-tertiary,#999)}
    .si-checkbox{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--dsw-alias-label-secondary,#bbb)}
    .si-formActions{display:flex;gap:8px}
    .si-page{position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1,#141414)}
    .si-pageHeader{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;border-bottom:1px solid var(--dsw-alias-border-l2,#444);background:var(--dsw-alias-bg-layer-2,#242424);flex-shrink:0}
    .si-pageTitle{font-size:17px;font-weight:600;margin:0}
    .si-pageClose{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary,#bbb);cursor:pointer}
    .si-pageClose:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}
    .si-pageBody{flex:1;overflow:auto;padding:24px 20px;display:flex;justify-content:center}
    `)

    async function readJson(response) {
      const payload = await response.json()
      if (!response.ok) throw new Error((payload && payload.error) || `HTTP ${response.status}`)
      return payload
    }

    function lastRunText(t, item) {
      if (!item.lastRunAt) return t('neverRun')
      const time = new Date(item.lastRunAt).toLocaleString()
      return item.lastRunError === undefined ? time : `${time} (${t('failed')}: ${item.lastRunError})`
    }

    /**
     * Shared management surface: list + create/edit form. Pure presentation —
     * state and actions arrive through props (bound by the slot renderer).
     */
    function ScheduledItemsPanel({ t, state, actions, workspaceOptions }) {
      const disabled = state.loading || state.saving
      const rowMeta = (item) => {
        const parts = []
        if (item.workspaceId !== undefined) {
          const option = (workspaceOptions || []).find((o) => o.id === item.workspaceId)
          parts.push(`${t('workspace')}: ${option ? option.title : item.workspaceId}`)
        }
        if (!item.enabled) parts.push(`${t('enabledLabel')}: ✕`)
        parts.push(`${t('lastRun')}: ${lastRunText(t, item)}`)
        return parts.join(' · ')
      }
      return React.createElement('div', { className: 'si-root' },
        state.error && React.createElement('p', { className: 'si-error', role: 'alert' },
          state.error,
          React.createElement('button', { type: 'button', className: 'si-btn', onClick: () => actions.load() }, t('retry'))
        ),
        state.loading && React.createElement('p', { className: 'si-muted' }, t('loading')),
        !state.loading && state.items.length === 0 && !state.error && React.createElement('p', { className: 'si-muted' }, t('empty')),
        React.createElement('ul', { className: 'si-list' },
          state.items.map((item) =>
            React.createElement('li', { key: item.id, className: 'si-row' },
              React.createElement('div', { className: 'si-rowMain' },
                React.createElement('span', { className: 'si-rowTitle' }, item.title),
                React.createElement('span', { className: 'si-rowCron' }, item.cron),
                React.createElement('span', { className: 'si-rowMeta' }, rowMeta(item))
              ),
              React.createElement('div', { className: 'si-rowActions' },
                React.createElement('button', {
                  type: 'button',
                  className: 'si-btn',
                  disabled: state.runningId === item.id,
                  onClick: () => actions.runNow(item.id),
                }, state.runningId === item.id ? t('running') : t('runNow')),
                React.createElement('button', { type: 'button', className: 'si-btn', onClick: () => actions.beginEdit(item.id) }, t('editItem')),
                React.createElement('button', {
                  type: 'button',
                  className: 'si-btn si-btn-danger',
                  onClick: () => { if (window.confirm(t('deleteConfirm'))) actions.remove(item.id) },
                }, t('delete'))
              )
            )
          )
        ),
        state.form === null
          ? React.createElement('button', { type: 'button', className: 'si-btn si-btn-primary', onClick: actions.beginCreate }, t('newItem'))
          : React.createElement('form', {
            className: 'si-form',
            onSubmit: (event) => {
              event.preventDefault()
              const form = state.form
              if (!form) return
              if (!form.title.trim() || !form.prompt.trim() || !form.cron.trim()) {
                window.alert(t('invalidForm'))
                return
              }
              actions.submit()
            },
          },
            React.createElement('h3', { className: 'si-formTitle' }, state.form.editingId === null ? t('newItem') : t('editItem')),
            React.createElement('label', { className: 'si-field' },
              React.createElement('span', null, t('titleLabel')),
              React.createElement('input', {
                value: state.form.title,
                disabled,
                placeholder: t('titlePlaceholder'),
                onChange: (e) => actions.setFormField('title', e.target.value),
              })
            ),
            React.createElement('label', { className: 'si-field' },
              React.createElement('span', null, t('promptLabel')),
              React.createElement('textarea', {
                value: state.form.prompt,
                disabled,
                rows: 4,
                placeholder: t('promptPlaceholder'),
                onChange: (e) => actions.setFormField('prompt', e.target.value),
              })
            ),
            React.createElement('label', { className: 'si-field' },
              React.createElement('span', null, t('cronLabel')),
              React.createElement('input', {
                value: state.form.cron,
                disabled,
                placeholder: '0 9 * * *',
                onChange: (e) => actions.setFormField('cron', e.target.value),
              }),
              React.createElement('small', { className: 'si-hint' }, t('cronHint'))
            ),
            workspaceOptions && workspaceOptions.length > 0 && React.createElement('label', { className: 'si-field' },
              React.createElement('span', null, t('workspaceLabel')),
              React.createElement('select', {
                value: state.form.workspaceId || '',
                disabled,
                onChange: (e) => actions.setFormField('workspaceId', e.target.value === '' ? undefined : e.target.value),
              },
                React.createElement('option', { value: '' }, t('workspaceNone')),
                workspaceOptions.map((option) =>
                  React.createElement('option', { key: option.id, value: option.id }, option.title))
              ),
              React.createElement('small', { className: 'si-hint' }, t('workspaceHint'))
            ),
            React.createElement('label', { className: 'si-checkbox' },
              React.createElement('input', {
                type: 'checkbox',
                checked: state.form.enabled,
                disabled,
                onChange: (e) => actions.setFormField('enabled', e.target.checked),
              }),
              React.createElement('span', null, t('enabledLabel')),
              React.createElement('small', { className: 'si-hint' }, t('enabledHint'))
            ),
            React.createElement('div', { className: 'si-formActions' },
              React.createElement('button', { type: 'submit', className: 'si-btn si-btn-primary', disabled }, state.saving ? t('saving') : t('save')),
              React.createElement('button', { type: 'button', className: 'si-btn', disabled, onClick: actions.cancelForm }, t('cancel'))
            )
          )
      )
    }

    /** Full-page management overlay. */
    function ScheduledItemsPage({ t, state, actions, workspaceOptions, onClose }) {
      return React.createElement('div', { className: 'si-page', role: 'dialog', 'aria-modal': 'true' },
        React.createElement('div', { className: 'si-pageHeader' },
          React.createElement('h2', { className: 'si-pageTitle' }, t('title')),
          React.createElement('button', { type: 'button', className: 'si-pageClose', 'aria-label': t('close'), onClick: onClose }, '✕')
        ),
        React.createElement('div', { className: 'si-pageBody' },
          React.createElement(ScheduledItemsPanel, { t, state, actions, workspaceOptions })
        )
      )
    }

    module.exports = {
      name: 'scheduled-items-client',
      inject: ['slots', 'locale'],

      apply(ctx) {
        const slots = ctx.get('slots')
        if (slots === undefined) return
        const t = ctx.locale.bind(LOCALE_NS)
        ctx.effect(() => ctx.locale.register(LOCALE_NS, LOCALE_DICT))

        // One shared store for both surfaces.
        const store = {
          items: [],
          loading: false,
          error: null,
          form: null,
          saving: false,
          runningId: null,
        }
        const setState = (patch) => { Object.assign(store, patch) }

        const load = async () => {
          setState({ loading: true, error: null })
          try {
            const response = await fetch(API)
            const payload = await readJson(response)
            setState({ items: payload.items || [] })
          } catch (error) {
            setState({ error: String((error && error.message) || error) })
          }
          setState({ loading: false })
        }

        const saveForm = async () => {
          const form = store.form
          if (!form || store.saving) return
          setState({ saving: true, error: null })
          try {
            const payload = {
              title: form.title,
              prompt: form.prompt,
              cron: form.cron,
              enabled: form.enabled,
              ...(form.workspaceId === undefined ? {} : { workspaceId: form.workspaceId }),
            }
            const response = form.editingId === null
              ? await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
              : await fetch(API, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: form.editingId, ...payload }) })
            await readJson(response)
            setState({ form: null })
            await load()
          } catch (error) {
            setState({ error: String((error && error.message) || error) })
          }
          setState({ saving: false })
        }

        const remove = async (id) => {
          try {
            const response = await fetch(API, { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) })
            await readJson(response)
            await load()
          } catch (error) {
            setState({ error: String((error && error.message) || error) })
          }
        }

        const runNow = async (id) => {
          setState({ runningId: id })
          try {
            const response = await fetch(`${API}/run`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) })
            await readJson(response)
            await load()
          } catch (error) {
            setState({ error: String((error && error.message) || error) })
          }
          setState({ runningId: null })
        }

        const injected = () => ({
          hooks: { scheduledItems: store },
          load,
          beginCreate: () => setState({ form: { editingId: null, title: '', prompt: '', cron: '', enabled: true } }),
          beginEdit: (id) => {
            const row = store.items.find((item) => item.id === id)
            if (row) setState({
              form: {
                editingId: row.id,
                title: row.title,
                prompt: row.prompt,
                cron: row.cron,
                enabled: row.enabled,
                ...(row.workspaceId === undefined ? {} : { workspaceId: row.workspaceId }),
              },
            })
          },
          cancelForm: () => setState({ form: null, error: null }),
          setFormField: (field, value) => {
            if (!store.form) return
            setState({ form: { ...store.form, [field]: value } })
          },
          submit: () => saveForm(),
          runNow,
          remove,
        })

        // Settings page.
        slots.inject('settings.section', () => slots.register(
          {
            name: 'settings.section',
            id: 'scheduled-items',
            order: 30,
            label: () => t('nav'),
            locale: LOCALE_NS,
            inject: injected,
          },
          (props) => {
            const state = props.useScheduledItems((snapshot) => snapshot)
            const workspaces = props.useWorkspaces((snapshot) => snapshot)
            const workspaceOptions = workspaces.items.map((workspace) => ({
              id: workspace.workspaceId,
              title: workspace.title,
            }))
            return React.createElement('div', { className: 'si-root' },
              React.createElement('h2', { className: 'si-title' }, t('title')),
              React.createElement('p', { className: 'si-intro' }, t('intro')),
              React.createElement(ScheduledItemsPanel, { t, state, actions: props, workspaceOptions })
            )
          }
        ))

        // Sidebar footer action: full-page management overlay.
        slots.inject('sidebar.footer.action', () => slots.register(
          {
            name: 'sidebar.footer.action',
            id: 'scheduled-items',
            order: 30,
            locale: LOCALE_NS,
            inject: injected,
          },
          (props) => {
            const state = props.useScheduledItems((snapshot) => snapshot)
            const workspaces = props.useWorkspaces((snapshot) => snapshot)
            const workspaceOptions = workspaces.items.map((workspace) => ({
              id: workspace.workspaceId,
              title: workspace.title,
            }))
            return React.createElement(FooterAction, { t, state, actions: props, workspaceOptions, wide: props.wide })
          }
        ))

        void load()
      },
    }

    /** Footer trigger + full-page overlay holder. */
    function FooterAction({ t, state, actions, workspaceOptions, wide }) {
      const [open, setOpen] = React.useState(false)
      return React.createElement(React.Fragment, null,
        React.createElement('button', {
          type: 'button',
          className: 'si-btn',
          'aria-label': t('nav'),
          onClick: () => setOpen(true),
          style: { display: 'flex', alignItems: 'center', gap: 6 },
        },
          React.createElement('span', null, '⏱'),
          wide && React.createElement('span', null, t('nav'))
        ),
        open && React.createElement(ScheduledItemsPage, {
          t,
          state,
          actions,
          workspaceOptions,
          onClose: () => setOpen(false),
        })
      )
    }

    return module.exports
  }
})
