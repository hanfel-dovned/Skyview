customElements.define(
  'vi-ew',
  class extends HTMLElement {
    static get observedAttributes() {
      //
      return ['our', 'open', 'windows-open', 'default-strategies']
    }
    constructor() {
      //
      super()
      const shadow = this.attachShadow({ mode: 'open' })
      this.loadCSSs(['style.css', 'feather.css']).then((sheets) => {
        shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, ...sheets]
      })
      shadow.innerHTML = `
      <div id="tray" class="fc g2 js af">
        <button
          id="sky-open"
          class="br1 p1 b2 hover fc js ac grow"
          style="margin-bottom: 20px;"
          onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('sky-open', {bubbles:true, composed: true}))"
          >
          <span class="p1 s-1 bold">~</span>
        </button>
      </div>
      <nav id="nav" class="fc" style="padding-bottom: 15px;">
        <div id="tab-controller" class="fc g3 grow">
          <button
            id="sky-open"
            class="br1 p1 b2 hover fc jc ac hideable"
            onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('sky-open', {bubbles:true, composed: true}))"
            >
            <span class="p1 s-1 bold">~</span>
          </button>
          <div class="fc g3 grow scroll-y">
            <div class="fr g1 jb">
              <span class="wfc p2 tc grow f2" id="welcome"></span>
            </div>
            <div class="fr jc g2">
              <button onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-forum'))" 
              class="b2 p3 bd0 br1 hover">
                <span class="material-symbols-outlined" id="icon">forum</span>
              </button>
              <button onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-landscape'))"
              class="b2 p3 bd0 br1 hover">
                <img src="icons/landscape.svg" alt="landscape" height="30">
              </button>
              <button onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-bridge'))"
              class="b2 p3 bd0 br1 hover">
                <img src="icons/semi-bold_02_planet.svg" alt="bridge" height="30">
              </button>
              <button onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('open-watch'))" 
              class="b2 p3 bd0 br1 hover">
                <span class="material-symbols-outlined" id="icon">schedule</span>
              </button>
            </div>
            <div id="tabs" class="fc g2"></div>
            <div class="grow"></div>
          </div>
          <footer class="fc g2 p2">
            <div class="fr g2">
              <button
              onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('log-out'))"
              class="b2 hover br1 bd0 p2 grow fr g2 ac"
              >
                <span class="f3 wf tc">logout</span>
              </button>
            </div>
          </footer>
        </div>
      </nav>
      <main>
        <slot name="s-none" id="s-none">
          <div class="wf hf b0 br1 fc ac jc f4">no windows open</div>
        </slot>
        <slot name="s-login" id="s-login">
          <div class="wf hf b0 br1 fc ac jc g2">
            <span id="pattern-err" class="hidden f3">Please match requested format.</span>
            <div id="login-name" class="p2">
              <form class="fc g2">
                <input 
                id="ship-input" 
                class="br1 p2 b2 tc"
                type="text"
                placeholder="~zod" 
                pattern="^~((([a-z]{6}){1,2}-{0,2})+|[a-z]{3})$" required
                />
                <div id="fr g2">
                  <input 
                  id="code-input" 
                  class="br1 p2 b2"
                  type="password"
                  placeholder="sampel-ticlyt-migfun-falmel"
                  pattern="^~(([a-z]{6}-){3}[a-z]{6})$" 
                  style="width:220px;"
                  required
                  />
                  <button 
                  type="button" 
                  onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('log-in'))" 
                  class="br1 p2 b2 hover">
                    <span class="f3">login</span>
                  </button>
                </div>
              </form>
            </div>
            <button
            class="br1 p3 b2 hover fr g2 jc ac hideable"
            onclick="this.getRootNode().host.dispatchEvent(new CustomEvent('bridge-redirect'))">
              <span class="f3 s1">purchase a planet</span>
              <img src="icons/02_planet.svg" alt="planet" width="25" height="25">
            </button>
          </div>
        </slot>
        <slot name="s0" id="s0"></slot>
        <slot name="s1" id="s1"></slot>
        <slot name="s2" id="s2"></slot>
        <slot name="s3" id="s3"></slot>
      </main>
      <slot id="default" style="display: none;"></slot>
    `
      const script = document.createElement('script')
      script.textContent = `
      window.addEventListener('message', (event) => {
        if (event.origin === window.location.origin){
          if(event.data.messagetype === 'new-wind'){
            const customEvent = new CustomEvent('new-window', {detail: {href: event.data.href, slot: 's-2'}});
            const element = document.querySelector('vi-ew');
            if (element) {
              element.dispatchEvent(customEvent);
            }
          }
        }else{
        return;
        }
      })`
      shadow.appendChild(script)
    }
    async loadCSSs(urls) {
      const sheets = await Promise.all(urls.map((url) => this.loadCSS(url)))
      return sheets
    }
    async loadCSS(url) {
      const response = await fetch(url)
      const cssText = await response.text()
      const sheet = new CSSStyleSheet()
      await sheet.replace(cssText)
      return sheet
    }
    get windowsOpen() {
      return parseInt(this.getAttribute('windows-open') || '0')
    }
    get our() {
      return this.getAttribute('our')
    }
    get currentFeatherRules() {
      return this.qs('feather-settings')?.currentFeatherRules || []
    }
    get windows() {
      let slots = $(this)
        .children('wi-nd[slot]')
        .get()
        .toSorted((a, b) => {
          let aSlot = parseFloat(a.getAttribute('slot').slice(1))
          let bSlot = parseFloat(b.getAttribute('slot').slice(1))
          if (aSlot > bSlot) return 1
          if (aSlot < bSlot) return -1
          return 0
        })
      let noslots = $(this).children('wi-nd:not([slot])').get()
      return [...slots, ...noslots]
    }
    qs(sel) {
      return this.shadowRoot.querySelector(sel)
    }
    qsa(sel) {
      return this.shadowRoot.querySelectorAll(sel)
    }
    gid(id) {
      return this.shadowRoot.getElementById(id)
    }
    connectedCallback() {
      $(this).off()
      $(this).on('sky-open', (e) => {
        this.toggleAttribute('open')
        this.saveLayout()
      })
      $(this).on('fix-slots', () => {
        this.fixSlots()
      })
      $(this).on('new-window', (e) => {
        console.log('new-window event', e)
        let wind = document.createElement('wi-nd')
        let here = `http://localhost:8000`
        let slot = e.detail && e.detail.slot ? e.detail.slot : `s-1`
        $(wind).attr('here', here)
        $(wind).attr('slot', slot)
        this.appendChild(wind)
        this.growFlock()
        this.fixSlots()
      })
      $(this).on('close-window', (e) => {
        let wind = $(e.target)
        if (wind.attr('slot') != undefined) {
          this.shrinkFlock()
        }
        wind.remove()
        this.fixSlots()
        if (!!localStorage.getItem('show-bridge')) {
          localStorage.removeItem('show-bridge')
          localStorage.removeItem('sky-layout')
          this.restoreLayout()
        } else {
          this.renderTabs()
        }
      })
      $(this).on('minimize-window', (e) => {
        let wind = $(e.target)
        let slotAttr = wind.attr('slot')
        if (slotAttr != undefined) {
          let slot = this.qs(`[name="${slotAttr}"]`)
          slot.classList.add('min')
          setTimeout(() => {
            wind.removeAttr('slot')
            this.shrinkFlock()
            slot.classList.remove('min')
            this.fixSlots()
            this.renderTabs()
          }, 300)
        } else {
          this.fixSlots()
          this.renderTabs()
        }
      })
      $(this).on('maximize-window', (e) => {
        let wind = $(e.target)
        if (!wind.attr('slot')) {
          this.growFlock()
        }
        wind.attr('slot', 's-1')
        this.fixSlots()
        this.renderTabs()
      })
      $(this).on('drag-start', (e) => {
        $(this.windows).attr('dragging', '')
      })
      $(this).on('drag-end', (e) => {
        $(this.windows).removeAttr('dragging')
      })
      $(this).on('here-moved', () => {
        this.renderTabs()
      })
      $(this.gid('s0')).off()
      $(this.gid('s0')).on('slotchange', (e) => {
        let authenticated = localStorage.getItem('auth')
        if (authenticated) {
          this.renderTabs()
        }
      })
      $(this.gid('s1')).off()
      $(this.gid('s1')).on('slotchange', () => {
        let authenticated = localStorage.getItem('auth')
        if (authenticated) {
          this.renderTabs()
        }
      })
      $(this.gid('s2')).off()
      $(this.gid('s2')).on('slotchange', () => {
        this.renderTabs()
      })
      $(this.gid('s3')).off()
      $(this.gid('s3')).on('slotchange', () => {
        this.renderTabs()
      })
      $(this.gid('default')).off()
      $(this.gid('default')).on('slotchange', () => {
        this.renderTabs()
      })

      $(this.gid('nav')).off()
      $(this.gid('nav')).on('dragover', (e) => {
        e.preventDefault()
      })
      $(this.gid('nav')).on('drop', (e) => {
        e.preventDefault()
        let wid = e.originalEvent.dataTransfer.getData('text/plain')
        let wind = $(`[wid='${wid}']`)
      })
      //
      $(this).on('log-in', (e) => {
        //  sending post request here to login
        e.preventDefault()
        let input = $(this.gid('ship-input'))[0]
        if (!input.checkValidity()) {
          $(this.gid('pattern-err')).removeClass('hidden')
        } else {
          $(this.gid('pattern-err')).addClass('hidden')
          this.getUrl()
          this.postCode()
        }
      })
      $(this).on('log-out', () => {
        localStorage.removeItem('auth')
        this.toggleAttribute('open')
        this.restoreLayout()
      })
      $(this).on('bridge-redirect', () => {
        localStorage.setItem('show-bridge', true)
        let layout = {
          open: false,
          windowsOpen: 1,
          windows: [
            {
              here: `https://bridge.urbit.org/`,
              slot: 's0'
            }
          ]
        }
        localStorage.setItem('sky-layout', JSON.stringify(layout))
        this.restoreLayout()
      })
      $(this).on('open-landscape', (e) => {
        let shipUrl = localStorage.getItem('local-url')
        this.openWindow(e, `${shipUrl}/apps/landscape`)
      })
      $(this).on('open-forum', (e) => {
        this.openWindow(e, `${window.location.origin}/forum`)
      })
      $(this).on('open-bridge', (e) => {
        this.openWindow(e, 'https://bridge.urbit.org/')
      })
      $(this).on('open-watch', (e) => {
        this.openWindow(e, `${window.location.origin}/watch`)
      })
      this.qs('main').className = !this.windowsOpen
        ? 'open-0'
        : `open-${this.windowsOpen}`
      this.restoreLayout()
      this.zoomListener()
    }
    attributeChangedCallback(name, oldValue, newValue) {
      //
      if (name === 'open') {
        $(this.gid('tab-controller')).addClass('hidden')
        if (newValue === null) {
          $(this).removeClass('open')
        } else {
          $(this).addClass('open')
          $(this.gid('tab-controller')).removeClass('hidden')
        }
      } else if (name === 'windows-open') {
        console.log(this.windowsOpen)
        this.qs('main').className = !this.windowsOpen
          ? 'open-0'
          : `open-${this.windowsOpen}`
      }
    }
    zoomListener() {
      let slots = this.qsa('slot')
      slots.forEach((slot) => {
        let inner = slot.assignedNodes()
        if (inner[0]) {
          let wind = inner[0]
          console.log(wind, wind)
          wind.addEventListener('dblclick', (e) => {
            if (e.target === wind || wind.contains(e.target)) {
              e.stopPropagation()
              slot.classList.toggle('zoom')
            }
          })
          wind.addEventListener('wheel', (e) => {
            if (e.ctrlKey && e.deltaY > 0) {
              slot.classList.remove('zoom')
              e.preventDefault()
            }
          })
        }
      })
    }
    getUrl() {
      let our = $(this.gid('ship-input'))[0].value
      localStorage.setItem('our', our)
      const url = `https://bitdeg.arvo.network/apps/ship-url-getter/${our}`

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            // err handling
            throw new Error('Network response ' + response.statusText)
          }
          return response.json()
        })
        .then((data) => {
          console.log('Success:', data)
          let url = data.replace(/\/~\/eauth$/, '')
          localStorage.setItem('local-url', url)
        })
        .catch((error) => {
          // err handling
          console.error('Error:', error)
        })
    }
    async postCode() {
      let shipUrl = localStorage.getItem('local-url')
      let our = localStorage.getItem('our')
      let ticket = $(this.gid('code-input'))[0].value

      localStorage.setItem('auth', true)
      this.initialLayout(`${shipUrl}`)
      this.restoreLayout()
      $(this.gid('code-input'))[0].value = ''

      try {
        const kg = urbitKeyGeneration

        const wallet = await kg.generateWallet
        const ob = require('urbit-ob')({
          boot: false, // do not boot
          // TODO do not hardcode @p / AZP
          ship: ob.patp2dec(our),
          ticket: ticket
        })

        const networkSeed = kg.deriveNetworkSeed(
          wallet.management.seed,
          null,
          // TODO do not hardcode revision number
          2
        )
        //console.log(networkSeed)
        const networkKeys = kg.deriveNetworkKeys(networkSeed)
        //console.log(networkKeys)
        const lusCode = kg.generateCode(networkKeys)
        //console.log('+code: ' + kg.generateCode(networkKeys));

        //console.log(`${shipUrl}/~/login`)
        const url = `${shipUrl}/~/login`
        const body = `password=${lusCode}`

        // TODO Not compatible with https:// URLs
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body,
          credentials: 'include'
        })
          .then((response) => response.text())
          .then((data) => {
            console.log('Success:', data)
            localStorage.setItem('auth', true)
            this.initialLayout(`${shipUrl}`)
            this.restoreLayout()
            $(this.gid('code-input'))[0].value = ''
          })
          .catch((error) => console.error('Error:', error))
      } catch (err) {
        console.log('Error during log-in process: ' + err)
      }
    }
    renderIcon(name) {
      let s = document.createElement('span')
      s.className = 'mso'
      s.textContent = name
      return s
    }
    renderTabs() {
      let tabs = $(this.gid('tabs'))
      tabs.children().remove()
      let windowsOpen = this.windowsOpen
      let that = this
      $(this.windows).each(function (i) {
        let wind = this
        let tab = document.createElement('div')
        $(tab).addClass('b2 br1 fr af js bd1')
        if (i < windowsOpen) {
          $(tab).addClass('toggled')
        }
        let mux = document.createElement('button')
        mux.className = 'b2 hover br1 bd0 p2 grow tl fr g2 ac js'
        mux.style =
          'overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;'
        let im = wind.getAttribute('favicon')
          ? `
        <img src="${wind.getAttribute(
          'favicon'
        )}" style="width: 20px; height: 20px;" />
        `
          : ``
        mux.innerHTML = `
        ${im}
        <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;">
          ${$(wind).attr('tab-title') || $(wind).attr('here')}
        </span>
      `
        let max = $(mux)
        $(max).on('click', () => {
          $(wind).trigger('maximize-window')
        })

        let min = document.createElement('button')
        $(min).append(that.renderIcon('minimize'))
        $(min).addClass('b2 hover br1 bd0 p1 f3')
        $(min).on('click', () => {
          $(wind).trigger('minimize-window')
        })
        if (i >= windowsOpen) {
          $(min).hide()
        }

        let close = document.createElement('button')
        $(close).append(that.renderIcon('close'))
        $(close).addClass('b2 hover br1 bd0 p1 f3')
        $(close).on('click', () => {
          $(wind).trigger('close-window')
        })

        $(tab).append(max)
        $(tab).append(min)
        $(tab).append(close)
        tabs.append(tab)
      })
      this.saveLayout()
    }
    fixSlots() {
      let slotted = $(this.windows).filter('[slot]').get().slice(0, 4)
      $(this.windows).removeAttr('slot')
      slotted.forEach((s, i) => {
        s.setAttribute('slot', `s${i}`)
      })
    }
    openWindow(e, here) {
      let wind = document.createElement('wi-nd')
      let slot = e.detail && e.detail.slot ? e.detail.slot : `s-1`
      $(wind).attr('here', here)
      $(wind).attr('slot', slot)
      this.appendChild(wind)
      this.growFlock()
      this.fixSlots()
    }
    growFlock() {
      let currentWindowsOpen = this.windowsOpen
      console.log('currentWindowsOpen', currentWindowsOpen)
      if (isNaN(currentWindowsOpen)) {
        currentWindowsOpen = 0
      }
      $(this).attr('windows-open', Math.min(4, currentWindowsOpen + 1))
      console.log('windows-open', Math.min(4, currentWindowsOpen + 1))
    }
    shrinkFlock() {
      $(this).attr('windows-open', Math.max(0, this.windowsOpen - 1))
    }
    saveLayout() {
      let layout = {
        open: this.hasAttribute('open'),
        windowsOpen: parseInt(this.getAttribute('windows-open')),
        windows: $(this)
          .children('wi-nd')
          .get()
          .map((w) => {
            return {
              here: w.getAttribute('here'),
              slot: w.getAttribute('slot')
            }
          })
      }
      localStorage.setItem('sky-layout', JSON.stringify(layout))
    }
    restoreLayout() {
      let layoutString = localStorage.getItem('sky-layout')
      let authenticated = localStorage.getItem('auth')
      let showBridge = localStorage.getItem('show-bridge')
      console.log(layoutString)
      if (!authenticated) {
        if (showBridge) {
          this.settingLayout(layoutString)
        } else {
          //  opening login setup
          this.qs('main').className = `open-login`
          //
          //  easy solution for now
          //
          if (layoutString) {
            $(this).children('wi-nd').remove()
            localStorage.removeItem('sky-layout')
          }
        }
        // disabling side-menu
        $(this.gid('sky-open')).removeClass('hover')
        $(this.gid('sky-open')).prop('disabled', true)
      } else if (!!layoutString && authenticated) {
        console.log('Restoring layout + Authenticated!')

        let our = localStorage.getItem('our')
        $(this.gid('welcome'))[0].innerHTML = `Welcome ${our}`
        //  enabling sidebar menu
        $(this.gid('sky-open')).addClass('hover')
        $(this.gid('sky-open')).prop('disabled', false)
        //  seting up windows layout
        this.settingLayout(layoutString)
      }
    }
    initialLayout(url) {
      console.log('new layout')
      // create initial layout
      let layout = {
        open: false,
        windowsOpen: 3,
        windows: [
          {
            here: `${url}/apps/landscape`,
            slot: 's0'
          },
          {
            here: `https://urbit.org`,
            slot: 's1'
          },
          {
            here: `https://bridge.urbit.org`,
            slot: 's2'
          }
        ]
      }
      localStorage.setItem('sky-layout', JSON.stringify(layout))
      this.restoreLayout()
    }
    settingLayout(layoutString) {
      let layout = JSON.parse(layoutString)
      $(this).attr('open', layout.open ? '' : null)
      $(this).attr('windows-open', `${layout.windowsOpen}`)
      $(this).children('wi-nd').remove()

      layout.windows.forEach((w) => {
        let wind = document.createElement('wi-nd')
        $(wind).attr('here', w.here)
        $(wind).attr('slot', !!w.slot ? w.slot : null)
        $(wind).attr('here', w.here)
        $(this).append(wind)
      })
    }
  }
)
